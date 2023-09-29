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
    price_id = db.Column(db.String(100))
    instock = db.Column(db.String(100))
    reviews = db.relationship('BicycleReview', backref='bicycle')


    def serialize(self):
        return {
        'id': self.id,
        'name': self.name,
        'manufacturer': self.manufacturer,
        'material': self.material,
        'gender': self.gender,
        'type': self.type,
        'color': self.color,
        'weight': self.weight,
        'price': str(self.price),  
        'price_id': self.price_id,  
        'instock': self.instock,
        'image_url': '' 
        }

class BicycleReview(db.Model):
    __tablename__ = 'bicycle_review' 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bicycle_id = db.Column(db.Integer, db.ForeignKey('bicycles.id'))  
    rating = db.Column(db.Integer)
    title = db.Column(db.String(100))
    review_text = db.Column(db.String(1000))
    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bicycle_id': self.bicycle_id,
            'rating': self.rating,
            'title': self.title,
            'review_text': self.review_text
        }
    
class Shipping_data(db.Model):
    __tablename__ = 'shipping_data' 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    userFirstName = db.Column(db.String(250))
    userLastName = db.Column(db.String(250))
    country = db.Column(db.String(250))
    zipCode= db.Column(db.Integer)
    phone= db.Column(db.Integer)
    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'userFirstName': self.userFirstName,
            'userLastName': self.userLastName,
            'country': self.country,
            'zipCode': self.zipCode,
            'phone': self.phone,
        }
class Order(db.Model):
    __tablename__ = 'shopping_cart'  
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer)

class OrderItem(db.Model):
    __tablename__ = 'shopping_cart_item'  
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer)
    bicycle_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)

def test():
    return ""