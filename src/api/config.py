from datetime import timedelta
import os

class Config:
    SECRET_KEY = os.environ.get('FLASK_APP_KEY', 'fallback-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'fallback-db-uri')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'fallback-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
     # SMTP credentials
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'mariana.placito@gmail.com'
    MAIL_PASSWORD = '912479259'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
