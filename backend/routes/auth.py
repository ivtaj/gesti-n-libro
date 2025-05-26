from flask import Blueprint, request, jsonify
from backend.models.usuario import Usuario, Admin, Moderador

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = None
    
    if data['rol'] == 'admin':
        usuario = Admin.query.filter_by(username=data['username']).first()
    elif data['rol'] == 'moderador':
        usuario = Moderador.query.filter_by(username=data['username']).first()
    
    if usuario and usuario.autenticar(data['password']):
        return jsonify({"token": "fake-jwt-token"})
    
    return jsonify({"error": "Credenciales inválidas"}), 401
