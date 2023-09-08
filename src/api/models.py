from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, ForeignKey, TIMESTAMP, text, DECIMAL
from sqlalchemy.orm import relationship

db = SQLAlchemy()

# User model
class User(db.Model):
    __tablename__ = 'Users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.Enum('admin', 'user', 'guest', name='role_enum'))
    created_at = db.Column(db.TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

    # Relationships
    shopping_carts = relationship("ShoppingCart", back_populates="user")
    bicycle_reviews = relationship("BicycleReview", back_populates="user")
    shop_reviews = relationship("ShopReview", back_populates="user")
    orders = relationship("Orders", back_populates="user")
    shipping_addresses = relationship("ShippingAddress", back_populates="user")

    def __repr__(self):
        return f'<User {self.username}>'
    

    def serialize(self):
        return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "role": self.role,
        "created_at": self.created_at.isoformat() if self.created_at else None,
    }


# ShoppingCart model
class ShoppingCart(db.Model):
    __tablename__ = 'ShoppingCart'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('Users.id'))
    created_at = db.Column(db.TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

    # Relationships
    user = relationship("User", back_populates="shopping_carts")
    shopping_cart_items = relationship("ShoppingCartItem", back_populates="shopping_cart")

    def __repr__(self):
        return f'<ShoppingCart {self.id}>'

    def serialize(self):
       return {
        "id": self.id,
        "user_id": self.user_id,
        "created_at": self.created_at.isoformat() if self.created_at else None,
    }



# ShoppingCartItem model
class ShoppingCartItem(db.Model):
    __tablename__ = 'ShoppingCartItem'
    
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, ForeignKey('ShoppingCart.id'))
    bicycle_id = db.Column(db.Integer, ForeignKey('Bicycles.id'))
    quantity = db.Column(db.Integer)

    # Relationships
    shopping_cart = relationship("ShoppingCart", back_populates="shopping_cart_items")
    bicycle = relationship("Bicycles", back_populates="shopping_cart_items")

    def __repr__(self):
        return f'<ShoppingCartItem {self.id}>'
    
    def serialize(self):
        return {
        "id": self.id,
        "cart_id": self.cart_id,
        "bicycle_id": self.bicycle_id,
        "quantity": self.quantity,
        "bicycle": self.bicycle.serialize() if self.bicycle else None  # Nested Bicycle object
    }


# Bicycles model
class Bicycles(db.Model):
    __tablename__ = 'Bicycles'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    manufacturer = db.Column(db.String)
    material = db.Column(db.String)
    gender = db.Column(db.String)
    type = db.Column(db.String)
    color = db.Column(db.String)
    weight = db.Column(db.Integer)
    price = db.Column(db.DECIMAL)
    instock = db.Column(db.String)

    # Relationships
    shopping_cart_items = relationship("ShoppingCartItem", back_populates="bicycle")
    bicycle_reviews = relationship("BicycleReview", back_populates="bicycle")
    order_items = relationship("OrderItem", back_populates="bicycle")

    def __repr__(self):
        return f'<Bicycles {self.id}>'
    def serialize(self):
        return {
        "id": self.id,
        "name": self.name,
        "type": self.type,
        "color": self.color,
        "price": str(self.price), 
        "instock": self.instock
    }

# BicycleReview model
class BicycleReview(db.Model):
    __tablename__ = 'BicycleReview'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('Users.id'))
    bicycle_id = db.Column(db.Integer, ForeignKey('Bicycles.id'))
    rating = db.Column(db.Integer)
    title = db.Column(db.Text)
    review_text = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

    # Relationships
    user = relationship("User", back_populates="bicycle_reviews")
    bicycle = relationship("Bicycles", back_populates="bicycle_reviews")

# ShopReview model
class ShopReview(db.Model):
    __tablename__ = 'ShopReview'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('Users.id'))
    rating = db.Column(db.Integer)
    title = db.Column(db.Text)
    review_text = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

    # Relationships
    user = relationship("User", back_populates="shop_reviews")

# Orders model
class Orders(db.Model):
    __tablename__ = 'Orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('Users.id'))
    status = db.Column(db.String)
    ShippingAddress_id = db.Column(db.Integer, ForeignKey('ShippingAddress.id'))
    created_at = db.Column(db.TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

    # Relationships
    user = relationship("User", back_populates="orders")
    shipping_address = relationship("ShippingAddress", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")

# OrderItem model
class OrderItem(db.Model):
    __tablename__ = 'OrderItem'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, ForeignKey('Orders.id'))
    bicycle_id = db.Column(db.Integer, ForeignKey('Bicycles.id'))
    quantity = db.Column(db.Integer)
    price = db.Column(db.DECIMAL)

    # Relationships
    order = relationship("Orders", back_populates="order_items")
    bicycle = relationship("Bicycles", back_populates="order_items")

# ShippingAddress model
class ShippingAddress(db.Model):
    __tablename__ = 'ShippingAddress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('Users.id'))
    userFirstName = db.Column(db.String)
    userLasttName = db.Column(db.String)
    country = db.Column(db.String)
    zipcode = db.Column(db.Integer)
    phone = db.Column(db.String)
 

    # Relationships
    user = relationship("User", back_populates="shipping_addresses")
    orders = relationship("Orders", back_populates="shipping_address")
