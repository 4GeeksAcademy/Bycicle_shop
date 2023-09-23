from flask import Blueprint, request, jsonify, current_app
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .models import Bicycle, BicycleReview, ShoppingCart, ShoppingCartItem, User
from .models import db
from flask import Flask, jsonify
from flask_mail import Mail, Message

main = Blueprint('main', __name__)

mail = Mail()

@main.route('/resetPassword', methods=['POST'])
def send_reset_email():
    try:
        email = request.json.get('email')

        # Query the database to check if the email exists
        user = User.query.filter_by(email=email).first()
        if user:
            message = Message(
                subject='Password Reset Link',
                recipients=['mariana.placito@gmail.com'],
                sender=current_app.config['sandbox.smtp.mailtrap.io']  # Use your configured sender email
            )
            message.body = 'Hey, this is a link for resetting the password.'
            mail.send(message)

            return jsonify({'message': 'Password reset email sent successfully'})
        else:
            return jsonify({'message': 'Email not found in the database.'}), 404
    except Exception as e:
        return jsonify({'message': 'Error sending reset email', 'error': str(e)}), 500

@main.route('/api/products', methods=['GET'])
@cross_origin()
def get_all_products():
    all_bicycles = Bicycle.query.all()
    bicycles_list = [bicycle.serialize() for bicycle in all_bicycles]
    return jsonify({'success': 'true', 'bicycles': bicycles_list})

@main.route('/api/products/<int:id>', methods=['GET'])
@cross_origin()
def get_product_by_id(id):
    bicycle = Bicycle.query.get(id)
    if bicycle is None:
        return jsonify({'success': 'false', 'message': 'Product not found'}), 404
    return jsonify({'success': 'true', 'bicycle': bicycle.serialize()})

@main.route('/cart', methods=['POST'])
@jwt_required()
def product_post():
    user_id = get_jwt_identity()
    # code to validate and add user to database goes here
    bicycle_id = request.json.get('bicycle_id')
    quantity = request.json.get('quantity')
    cart = ShoppingCart.query.filter_by(user_id=user_id).first() # if this returns a user, then the email already exists in database

    if cart:
        new_cart_item = ShoppingCartItem(cart_id=cart.id, bicycle_id=bicycle_id, quantity=quantity)
        # add the new user to the database
        db.session.add(new_cart_item)
        db.session.commit()
        response = {
                'success': 'true', 
                "shooping_cart": {
                    "id": cart.id,
                    "user_id": cart.user_id,
                },
                "shooping_cart_item":{
                    "id": new_cart_item.id,
                    "cart_id": new_cart_item.cart_id,
                    "bicycle_id": new_cart_item.bicycle_id,
                    "quantity": new_cart_item.quantity,
            }}
        return response
    else:
        new_cart = ShoppingCart(user_id=user_id)
        # add the new user to the database
        db.session.add(new_cart)
        db.session.commit()
        print("====================")
        print(new_cart)
        new_cart_item = ShoppingCartItem(cart_id=new_cart.id, bicycle_id=bicycle_id, quantity=quantity)
        # add the new user to the database
        db.session.add(new_cart_item)
        db.session.commit()
        response = {'success': 'true', 
                "shooping_cart": {
                    "id": new_cart.id,
                    "user_id": new_cart.user_id,
                },
                "shooping_cart_item":{
                "id": new_cart_item.id,
                "cart_id": new_cart_item.cart_id,
                "bicycle_id": new_cart_item.bicycle_id,
                "quantity": new_cart_item.quantity,
        }}
        return response

@main.route('/review', methods=['POST'])
@jwt_required()
def review_post():
    user_id = get_jwt_identity()
    # code to validate and add user to database goes here
    rating = request.json.get('rating')
    name = request.json.get('name')
    title = request.json.get('title')
    review = request.json.get('review')
    bicycle_id = request.json.get('bicycle_id')
    new_review = BicycleReview(user_id=user_id, bicycle_id=bicycle_id, rating=rating, title=title, review_text=review)
    # add the new user to the database
    db.session.add(new_review)
    db.session.commit()
    
    response = {'success': 'true', 
            "bicycle_review":{
            "user_id": new_review.id,
            "bicycle_id": new_review.bicycle_id,
            "rating": new_review.rating,
            "title": new_review.title,
            "review_text": new_review.review_text,
    }}
    return response

@main.route('/cart')
@jwt_required()
def user_carts():
    user_id = get_jwt_identity()
    cart = ShoppingCart.query.filter_by(user_id=user_id).first() # if this returns a user, then the email already exists in database
    if cart:
        cartItems = ShoppingCartItem.query.filter_by(cart_id=cart.id) # if this returns a user, then the email already exists in database
        response = {
                'success': 'true', 
                "shooping_cart": {
                    "id": cart.id,
                    "user_id": cart.user_id,
                },
                "shooping_cart_items":
                [
                    {
                        "id": cart.id,
                        "cart_id": cart.cart_id,
                        "bicycle_id": cart.bicycle_id,
                        "quantity": cart.quantity,
                    }
                    for cart in cartItems
                ]
            }
        return response
    else:
        response = {'success': 'true', 
                "shooping_cart": {
                },
                "shooping_cart_item":{
        }}
        return response
    
@main.route('/api/create-user', methods=['POST'])
@cross_origin(origin="process.env.FRONTEND_URL")
def create_user():
    data = request.json

    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    fullName = data.get('fullName')
    # You can also include subscribe and privacy data if you want to store those

    # Validation to check if the email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'success': 'false', 'message': 'Email already exists'}), 409

    # Hash the password for security
    hashed_password = generate_password_hash(password, method='sha256')

    # Create a new user object
    new_user = User(
        email=email,
        password=hashed_password,
        username=username
       
    )

    # Save the new user object to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': 'true', 'message': 'User created successfully'}), 201

@main.route('/profile', methods=['GET'])
@jwt_required()
@cross_origin()
def my_profile():
    print("Profile route hit")
    print("Headers: ", request.headers)
    current_user_id = get_jwt_identity()
    print("Current User ID: ", current_user_id)
    user = User.query.filter_by(id=current_user_id).first()

    if not user:
        return jsonify({'success': 'false', 'message': 'User not found'}), 404

    response_body = {
        "name": user.username,
        "email": user.email
        
    }

    return jsonify(response_body), 200

