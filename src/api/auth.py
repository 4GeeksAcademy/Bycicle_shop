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
    # login code goes here
    email = request.json.get('email')
    password = request.json.get('password')
    #remember = True if request.json.get('remember') else False

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        return {"success":"false", "msg" :"Wrong credential"}# if the user doesn't exist or password is wrong, reload the page

    access_token = create_access_token(identity=user.id)
    response = {"success":"true","access_token":access_token}
    return response
    # if the above check passes, then we know the user has the right credentials

@auth.route('/signup', methods=['POST'])
def signup_post():
    # code to validate and add user to database goes here
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    print(password)
    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again
        return {'success': 'false','msg':"user already exist"}

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, username=username, password=generate_password_hash(password, method='sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    user = User.query.filter_by(email=email).first()
    access_token = create_access_token(identity=user.id)
    response = {'success': 'true', "access_token":access_token}
    return response

@auth.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"success":'true',"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response