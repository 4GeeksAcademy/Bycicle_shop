from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'  
    id = db.Column(db.Integer, primary_key=True) 
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))
    reviews = db.relationship('BicycleReview', backref='user')

class Bicycle(db.Model):
    __tablename__ = 'bicycles'  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    manufacturer = db.Column(db.String(100))
    material = db.Column(db.String(100))
    gender = db.Column(db.String(100))
    type = db.Column(db.String(100))
    color = db.Column(db.String(100))
    weight = db.Column(db.Integer)
    price = db.Column(db.Numeric(precision=10, scale=2))
    instock = db.Column(db.String(100))
    reviews = db.relationship('BicycleReview', backref='bicycle')

class BicycleReview(db.Model):
    __tablename__ = 'bicycle_review' 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bicycle_id = db.Column(db.Integer, db.ForeignKey('bicycles.id'))  # Assuming 'bicycles' is the name of the Bicycle table
    rating = db.Column(db.Integer)
    title = db.Column(db.String(100))
    review_text = db.Column(db.String(1000))

class ShoppingCart(db.Model):
    __tablename__ = 'shopping_cart'  
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer)

class ShoppingCartItem(db.Model):
    __tablename__ = 'shopping_cart_item'  
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer)
    bicycle_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)

def test():
    return ""