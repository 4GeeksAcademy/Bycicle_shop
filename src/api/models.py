from .base import db

class User(db.Model):
    __tablename__ = 'users'  # Set the desired table name here
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))

class Bicycle(db.Model):
    __tablename__ = 'bicycles'  # Set the desired table name here
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(100))
    manufacturer = db.Column(db.String(100))
    material = db.Column(db.String(100))
    gender = db.Column(db.String(100))
    type = db.Column(db.String(100))
    color = db.Column(db.String(100))
    weight = db.Column(db.Integer)
    price = db.Column(db.Numeric(precision=10, scale=2))
    instock = db.Column(db.String(100))

class BicycleReview(db.Model):
    __tablename__ = 'bicycle_review'  # Set the desired table name here
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    user_id = db.Column(db.Integer)
    bicycle_id = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    title = db.Column(db.String(100))
    review_text = db.Column(db.String(1000))

class ShoppingCart(db.Model):
    __tablename__ = 'shopping_cart'  # Set the desired table name here
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    user_id = db.Column(db.Integer)

class ShoppingCartItem(db.Model):
    __tablename__ = 'shopping_cart_item'  # Set the desired table name here
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    cart_id = db.Column(db.Integer)
    bicycle_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)

def test():
    return ""