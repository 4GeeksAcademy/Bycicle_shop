from datetime import timedelta
import os
#import stripe

class Config:
    SECRET_KEY = os.environ.get('FLASK_APP_KEY', 'fallback-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'fallback-db-uri')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'fallback-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
     # SMTP credentials
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'teest4geeks12@gmail.com'
    MAIL_PASSWORD = 'ahyz rgmy igtb yclg'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    # Stripe key
    #stripe.api_key = 'sk_test_51NuJE8BQV4wKuzoZSh21SCxrw0naH6tIETz7Uut69IahYTU3UaJPzPS4gs2ANWRiAQJZTJU62vxepIrqVplkm5iG00BZCwAVLG'
    #YOUR_DOMAIN = 'http://localhost:4242'
