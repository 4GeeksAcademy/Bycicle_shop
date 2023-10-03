from flask import Flask, jsonify, send_from_directory
import os
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import json
from api.commands import setup_commands
from api.utils import APIException, generate_sitemap
from flask_mail import Mail, Message
import stripe

# Importing configurations
from api.config import Config

# Importing blueprints
from api.routes import api as api_blueprint
from api.main import main as main_blueprint
from api.auth import auth as auth_blueprint

# Importing admin setup function
from api.admin import setup_admin  

# Importing models
from api.models import db

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Load configurations
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://gitpod:postgres@localhost:5432/bicycle'


    # Initialize database
    db.init_app(app)
    migrate = Migrate(app, db)

    #db = SQLAlchemy(app)

    # Initialize JWT
    jwt = JWTManager(app)

    # Initialize CORS
    #CORS(app, origins="*")
    CORS(app, origins=[os.getenv("FRONTEND_URL")])
    
    # Initialize Admin
    setup_admin(app)  

    # add the admin
    setup_commands(app)

    #inatialize mail instance
    mail = Mail(app) 

    # Register blueprints
    app.register_blueprint(api_blueprint)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint)

    @app.route('/import-data', methods=['POST'])
    def import_data():
        try:
            import_data_from_json('bicycles.json')
            return jsonify({'message': 'Data imported successfully'}), 200
        except Exception as e:
            return jsonify({'message': 'Error importing data', 'error': str(e)}), 500

    def import_data_from_json(json_file):
        # Open and read the JSON file
        with open(json_file, 'r') as file:
            data = json.load(file)

        
        from api.models import Bicycle

        # Iterate over the JSON data and create Bicycle objects
        for item in data:
            bicycle = Bicycle(
                name=item['name'],
                manufacturer=item['manufacturer'],
                material=item['material'],
                gender=item['gender'],
                type=item['type'],
                color=item['color'],
                weight=item['weight'],
                price=item['price'],
                instock=item['instock']
            )
            db.session.add(bicycle)

        # Commit the changes to the database
        db.session.commit()

    # generate sitemap with all your endpoints
    @app.route('/')
    def sitemap():
        
            return generate_sitemap(app)
       

    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
    @app.route('/<path:path>', methods=['GET'])
    def serve_any_other_file(path):
        if not os.path.isfile(os.path.join(static_file_dir, path)):
            path = 'index.html'
        response = send_from_directory(static_file_dir, path)
        response.cache_control.max_age = 0  
        return response

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=4242)