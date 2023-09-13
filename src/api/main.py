from flask import Blueprint, request,jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from .models import Bicycle, BicycleReview, ShoppingCart, ShoppingCartItem
from .models import db

main = Blueprint('main', __name__)

@main.route('/products')
def products():
    bicycles = Bicycle.query.all()
    response_body = {
        "success": "true",
        "bicycles": [
            {
                "id": bicycle.id,
                "name": bicycle.name,
                "manufacturer": bicycle.manufacturer,
                "material": bicycle.material,
                "gender": bicycle.gender,
                "type": bicycle.type,
                "color": bicycle.color,
                "weight": bicycle.weight,
                "price": bicycle.price,
                "instock": bicycle.instock,
            }
            for bicycle in bicycles
        ]
    }
    return response_body
@main.route('/product')
@jwt_required()
def product():
    bicycle_id = request.args.get("id", None)
    bicycle = Bicycle.query.filter_by(id=bicycle_id).first() # if this returns a user, then the email already exists in database
    bicycle_reviews = BicycleReview.query.filter_by(bicycle_id=bicycle_id)
    response_body = {
        "success": "true",
        "bicycle": 
            {
                "id": bicycle.id,
                "name": bicycle.name,
                "manufacturer": bicycle.manufacturer,
                "material": bicycle.material,
                "gender": bicycle.gender,
                "type": bicycle.type,
                "color": bicycle.color,
                "weight": bicycle.weight,
                "price": bicycle.price,
                "instock": bicycle.instock,
        },
        "bicycle_reviews": [
            {
                "id": review.id,
                "user_id": review.user_id,
                "bicycle_id": review.bicycle_id,
                "rating": review.rating,
                "title": review.title,
                "review_text": review.review_text,
            }
            for review in bicycle_reviews
        ]
        
    }
    return response_body

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
    # code to validate and add user to database goes here
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

@main.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body