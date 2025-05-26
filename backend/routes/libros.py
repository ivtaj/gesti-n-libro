from flask import Blueprint, request, jsonify
from backend.models.libro import LibroModel
from backend.db import db

libros_bp = Blueprint('libros_bp', __name__)

# Obtener todos los libros
@libros_bp.route('/api/libros', methods=['GET'])
def get_libros():
    libros = LibroModel.query.all()
    return jsonify([libro.to_dict() for libro in libros]), 200

# Crear un libro nuevo
@libros_bp.route('/api/libros', methods=['POST'])
def create_libro():
    data = request.get_json()
    titulo = data.get('titulo')
    autor = data.get('autor')
    precio = data.get('precio')
    if titulo is None or autor is None or precio is None:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    try:
        libro = LibroModel(titulo=titulo, autor=autor, precio=precio)
        db.session.add(libro)
        db.session.commit()
        return jsonify(libro.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

# Obtener un libro por id
@libros_bp.route('/api/libros/<int:id>', methods=['GET'])
def get_libro(id):
    libro = LibroModel.query.get_or_404(id)
    return jsonify(libro.to_dict()), 200

# Actualizar el precio de un libro
@libros_bp.route('/api/libros/<int:id>', methods=['PUT'])
def update_libro(id):
    libro = LibroModel.query.get_or_404(id)
    data = request.get_json()
    nuevo_precio = data.get('precio')
    if nuevo_precio is None:
        return jsonify({'error': 'Falta el campo precio'}), 400
    try:
        if float(nuevo_precio) < 0:
            raise ValueError('Precio negativo')
        libro.precio = nuevo_precio
        db.session.commit()
        return jsonify(libro.to_dict()), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

# Eliminar un libro
@libros_bp.route('/api/libros/<int:id>', methods=['DELETE'])
def delete_libro(id):
    libro = LibroModel.query.get_or_404(id)
    db.session.delete(libro)
    db.session.commit()
    return jsonify({'mensaje': 'Libro eliminado'}), 200
