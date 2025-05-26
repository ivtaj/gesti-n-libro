from backend.db import db

class LibroModel(db.Model):
    __tablename__ = 'libros'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)

    def __init__(self, titulo, autor, precio):
        if precio < 0:
            raise ValueError('Precio negativo')
        self.titulo = titulo
        self.autor = autor
        self.precio = precio

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'autor': self.autor,
            'precio': self.precio
        }
