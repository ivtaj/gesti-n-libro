from flask import Flask
from flask_cors import CORS
from backend.db import db

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)
db.init_app(app)

@app.route('/')
def home():
    return 'API OK'

from backend.routes.libros import libros_bp
from backend.routes.auth import auth_bp
app.register_blueprint(libros_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
