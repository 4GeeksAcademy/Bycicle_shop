from flask import Flask, jsonify, send_from_directory
import os
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import json

# Importing configurations
from api.config import Config

# Importing blueprints
from api.routes import api as api_blueprint
from api.main import main as main_blueprint
from api.auth import auth as auth_blueprint

# Importing models
from api.models import db

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Load configurations
    app.config.from_object(Config)

    # Initialize database
    db.init_app(app)
    migrate = Migrate(app, db)

    # Initialize JWT
    jwt = JWTManager(app)

    # Initialize CORS
    CORS(app)

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

        # Assuming you have a SQLAlchemy model for bicycles (Bicycle)
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

    @app.route('/')
    def sitemap():
        return "This is the home page"  # You can replace this with your sitemap generator if you have one

    # any other endpoint will try to serve it like a static file
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
    @app.route('/<path:path>', methods=['GET'])
    def serve_any_other_file(path):
        if not os.path.isfile(os.path.join(static_file_dir, path)):
            path = 'index.html'
        response = send_from_directory(static_file_dir, path)
        response.cache_control.max_age = 0  # avoid cache memory
        return response

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()
