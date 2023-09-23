from datetime import timedelta
import os

class Config:
    SECRET_KEY = os.environ.get('FLASK_APP_KEY', 'fallback-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'fallback-db-uri')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'fallback-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
<<<<<<< HEAD
    # SMTP credentials
    MAIL_SERVER = 'sandbox.smtp.mailtrap.io'
    MAIL_PORT = 2525
    MAIL_USERNAME = '5c824fb16674ab'
    MAIL_PASSWORD = '562e49068d33bb'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
=======
>>>>>>> 80ff9f8a7ca9eecf13cf7987ee228d77a7e7cad8
