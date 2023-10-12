from flask import Blueprint, request, jsonify, redirect
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .models import Bicycle, BicycleReview, Order, OrderItem, User
from .models import db
from flask import Flask, jsonify
from flask_mail import Mail, Message
from flask import current_app
from flask import session
import stripe
from dotenv import load_dotenv
import os

main = Blueprint("main", __name__)
mail = Mail()

# Load variables from .env
load_dotenv()


@main.route("/api/products", methods=["GET"])
@cross_origin()
def get_all_products():
    bicycle_type = request.args.get(
        "type"
    )  # Get the bicycle type from the query parameters
    if bicycle_type:
        # Filter products : bicycle type
        all_bicycles = Bicycle.query.filter_by(type=bicycle_type).all()
    else:
        # If no type is specified, send all products
        all_bicycles = Bicycle.query.all()

    bicycles_list = [bicycle.serialize() for bicycle in all_bicycles]
    return jsonify({"success": "true", "bicycles": bicycles_list})


@main.route("/api/products/<int:id>", methods=["GET"])
@cross_origin()
def get_product_by_id(id):
    bicycle = Bicycle.query.get(id)
    if bicycle is None:
        return jsonify({"success": "false", "message": "Product not found"}), 404
    return jsonify({"success": "true", "bicycle": bicycle.serialize()})

@main.route("/cart", methods=["GET"])
@jwt_required()
@cross_origin(
    origins=os.environ.get('FRONTEND_URL'),
    supports_credentials=True,
)
def user_carts():
    user_id = get_jwt_identity()

    # Initialize the session cart if it does not exist
    if "cart" not in session:
        session["orders"] = []

    cart = [
        item for item in session.get("cart", []) if item["user_id"] == user_id
    ]

    response = {
        "success": True,
        "shopping_cart": {
            "user_id": user_id
        },
        "shopping_cart_items": cart,
    }
    return jsonify(response.serialize())

@main.route("/cart", methods=["POST"])
@jwt_required()
@cross_origin(
    origins=os.environ.get('FRONTEND_URL'),
    supports_credentials=True,
)
def add_to_cart():
    user_id = get_jwt_identity()
    bicycle_id = request.json.get("bicycle_id")
    quantity = request.json.get("quantity")

    # Initialize the session cart if it does not exist
    if "cart" not in session:
        session["orders"] = []

    # Create a orders item
    orders_item = {"user_id": user_id, "bicycle_id": bicycle_id, "quantity": quantity}

    # Add the item to the session orders
    session["orders"].append(orders_item)

    # Save the session
    session.modified = True

    return jsonify({"success": "true", "orders": session["orders"]})
    # return jsonify({'success': 'true', 'orders': session['orders'], 'user_id': user_id})

@main.route("/review", methods=["POST"])
@jwt_required()
@cross_origin(origin="process.env.FRONTEND_URL")
def review_post():
    print("Received Review: ", request.json)
    user_id = get_jwt_identity()

    # Extracting JSON data
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON data"}), 400

    name = data.get("name")
    bicycle_id = data.get("bicycle_id")
    rating = data.get("rating")
    title = data.get("title")
    review = data.get("review")

    # Check if required fields are provided
    if not all([rating, name, title, review, bicycle_id]):
        return jsonify({"error": "Missing required fields"}), 400

    new_review = BicycleReview(
        user_id=user_id,
        bicycle_id=bicycle_id,
        rating=rating,
        title=title,
        review_text=review,
    )

    try:
        db.session.add(new_review)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"error": "Error creating review"}), 500

    response = {
        "success": True,
        "bicycle_review": {
            "user_id": new_review.user_id,
            "bicycle_id": new_review.bicycle_id,
            "rating": new_review.rating,
            "title": new_review.title,
            "review_text": new_review.review_text,
        },
    }

    return jsonify(response), 201


@main.route("/api/products/<int:bicycle_id>/reviews", methods=["GET"])
def get_reviews(bicycle_id):
    print("Hello")
    reviews = BicycleReview.query.filter_by(bicycle_id=bicycle_id).all()
    return jsonify([review.serialize() for review in reviews]), 200

@main.route("/api/create-user", methods=["POST"])
@cross_origin(origin="process.env.FRONTEND_URL")
def create_user():
    data = request.json

    email = data.get("email")
    password = data.get("password")
    print(f"Received password in create_user: {password}")
    username = data.get("username")
    fullName = data.get("fullName")
    # You can also include subscribe and privacy data if you want to store those

    # Validation to check if the email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"success": "false", "message": "Email already exists"}), 409

    # Hash the password for security
    hashed_password = generate_password_hash(password, method="sha256")

    # Create a new user object
    new_user = User(email=email, password=hashed_password, username=username)

    # Save the new user object to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": "true", "message": "User created successfully"}), 201


@main.route("/profile", methods=["GET"])
@jwt_required()
@cross_origin()
def my_profile():
    print("Profile route hit")
    print("Headers: ", request.headers)
    current_user_id = get_jwt_identity()
    print("Current User ID: ", current_user_id)
    user = User.query.filter_by(id=current_user_id).first()

    if not user:
        return jsonify({"success": "false", "message": "User not found"}), 404

    response_body = {"name": user.username, "email": user.email}

    return jsonify(response_body), 200


# endpoint for send an email with a link to reset password
@main.route("/resetPassword", methods=["POST"])
@cross_origin(origin="process.env.FRONTEND_URL")
def send_reset_email():
    try:
        # Ensure that the request has the correct Content-Type header
        if request.headers["Content-Type"] != "application/json":
            return (
                jsonify(
                    {
                        "error": "415 Unsupported Media Type: Content-Type must be 'application/json'"
                    }
                ),
                415,
            )

        email = request.json.get("email")
        print(email)

        # Query the database to check if the email exists
        user = User.query.filter_by(email=email).first()
        print(user)

        if user is None:
            return jsonify({"msg": "User with this email does not exist."}), 404
        else:
            # Generate an access token and construct the reset link
            token = create_access_token(identity=user.email)
            link = f"{os.environ.get('FRONTEND_URL')}/newPassword?token={token}"

            message = Message(
                subject="Password Reset Link",
                sender=current_app.config["MAIL_USERNAME"],
                recipients=[email],
                body="Hey, this is a link for resetting the password.",
                html=f"Reset your password with this link: <a href='{link}'>Reset Password</a>",
            )

            mail.send(message)
            return jsonify({"message": "Password reset email sent successfully"}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


# Endpoint for updating the password
@main.route("/newPassword", methods=["OPTIONS"])
@jwt_required()
@cross_origin()
def reset_password():
    try:
        password = request.json.get("password", None)
        email = get_jwt_identity()

        # Query the database to check if the email exists
        user = User.query.filter_by(email=email).first()
        if user is None:
            return jsonify({"msg": "User with this email does not exist."}), 404
        # Update the user's password
        User.password = password
        print(User.password)
        # Commit the changes to the database
        db.session.commit()

        return jsonify({"msg": "Password reset successful."}), 200
    except Exception as e:
        return jsonify({"msg": "An error occurred", "error": str(e)}), 500


# endpoint for sending an email for support
@main.route("/contactus", methods=["POST"])
@cross_origin()
def send_support_email():
    try:
        # Get the body from the request JSON data
        email_data = request.json.get("body")

        # Create a support email message
        message = Message(
            subject="Support Request",
            recipients=[
                "mariana.placito@gmail.com",
                "aleksandr.klenin@gmail.com",
            ],  # Replace with your support email address
            sender=current_app.config["MAIL_USERNAME"],
            body=f"Support request: {email_data}",
        )

        # Send the email
        mail.send(message)

        return jsonify({"message": "Support email sent successfully"})
    except Exception as e:
        return jsonify({"message": "Error sending support email", "error": str(e)}), 500

# endpoint for checkout session
@main.route("/create-checkout-session", methods=["POST"])
@cross_origin()
@jwt_required()
def create_checkout_session():
    try:
        # Get 'items' from the JSON request
        stripe.api_key = current_app.config['STRIPE_API_KEY']
        
        # Get items from the JSON request
        items = request.json.get('items') 
        line_items = []
        for i in items:
            line_items.append({ "price": i["price"], "quantity": i["quantity"]})
           
        print(line_items)
        print(items) 
        # Create a Stripe checkout session
        checkout_session = stripe.checkout.Session.create(
            mode='payment',
            payment_method_types=["card"],
            line_items=line_items,
            success_url=current_app.config['FRONTEND_URL'] + '/thanksMessage',
            cancel_url=current_app.config['FRONTEND_URL'],
        )

        # Prepare line items for Stripe checkout session
        order = Order()
        order.user_id = get_jwt_identity()
        db.session.add(order)
        db.session.commit()
        print(order.id)
        for i in items:
            order_item = OrderItem()
            order_item.order_id = order.id
            order_item.user_id = get_jwt_identity()
            order_item.bicycle_id = i["id"]
            order_item.quantity = i["quantity"]

            db.session.add(order_item)
            db.session.commit()
        
        print(checkout_session.url)
        # Return the checkout session ID as a JSON response
        return jsonify({ "url": checkout_session.url })


    except Exception as e:
        # Handle exceptions gracefully and return an error response
        return jsonify({'error': str(e)}), 500  # 500 Internal Server Error