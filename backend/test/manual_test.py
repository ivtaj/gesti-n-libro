# backend/tests/manual_test.py

from backend.models.libro import Libro
from backend.models.inventario import Inventario
from backend.models.usuario import Usuario, Moderador, Admin, login

# Pruebas de Libro
try:
    libro1 = Libro('Cien Años de Soledad', 'Gabriel García Márquez', 20)
    print("Libro válido creado correctamente.")
    libro2 = Libro('El Principito', 'Antoine de Saint-Exupéry', -5)  # Debe fallar
except ValueError as e:
    print("Error al crear libro:", e)

# Pruebas de Inventario
inventario = Inventario()
inventario.agregar_libro(libro1)
resultado = inventario.buscar_libro('Cien Años de Soledad')
print("Búsqueda exitosa:", resultado.titulo if resultado else "No encontrado")

# Pruebas de Usuario y autenticación
usuario = Usuario('usuario', 'pass123')
moderador = Moderador('mod', 'mod_123')
admin = Admin('admin', 'clave@segura')

print("Login usuario normal:", login(usuario, 'pass123'))    # True
print("Login moderador correcto:", login(moderador, 'mod_123'))  # True
print("Login moderador incorrecto:", login(moderador, '123'))    # False
print("Login admin correcto:", login(admin, 'clave@segura'))     # True
print("Login admin incorrecto:", login(admin, 'clavesinsegura')) # False
