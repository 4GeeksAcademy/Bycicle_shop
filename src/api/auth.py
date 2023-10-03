from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from .models import db
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.json.get('email')
    password = request.json.get('password')

    # Debugging: Print received email and password
    print(f"Received email: {email}")
    print(f"Received password: {password}")

    # Find the user in the database
    user = User.query.filter_by(email=email).first()

    if user:
        # Debugging: Print stored password hash
        print(f"Stored password hash: {user.password}")

        # Check the password
        if check_password_hash(user.password, password):
            # Debugging: Print success message
            print("Password matches")

            # Create an access token
            access_token = create_access_token(identity=user.id)
            return {"success": "true", "access_token": access_token}
        else:
            # Debugging: Print failure message
            print("Password does not match")
            return {"success": "false", "msg": "Wrong credentials"}
    else:
        # Debugging: Print user not found message
        print("User not found")
        return {"success": "false", "msg": "User not found"}

@auth.route('/signup', methods=['POST'])
def signup_post():
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    
    # Debugging: print received password
    print(f"Received password during signup: {password}")

    # Check if user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return {'success': 'false', 'msg': "user already exists"}

    # Hash the password using PBKDF2 with SHA-256 and 20,000 iterations
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256:20000')
    
    # Debugging: print hashed password
    print(f"Hashed password: {hashed_password}")

    # Create the new user
    new_user = User(email=email, username=username, password=hashed_password)

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Create access token
    user = User.query.filter_by(email=email).first()
    access_token = create_access_token(identity=user.id)

    return {'success': 'true', "access_token": access_token}

@auth.route("/logout", methods=["POST"])
def logout():
    print("Logout route hit")
    response = jsonify({"success":'true',"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response