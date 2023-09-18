import json
from app import create_app, db
from api.models import Bicycle

def populate_db():
    with open('../bicycles.json', 'r') as f:
        bicycles = json.load(f)
    
    for bicycle in bicycles:
        bicycle_instance = Bicycle(
            name=bicycle['name'],
            manufacturer=bicycle['manufacturer'],
            material=bicycle['material'],
            gender=bicycle['gender'],
            type=bicycle['type'],
            color=bicycle['color'],
            weight=bicycle['weight'],
            price=bicycle['price'],
            instock=bicycle['instock']
        )
        db.session.add(bicycle_instance)
    db.session.commit()

if __name__ == "__main__":
    populate_db()
