class Usuario:
    def __init__(self, username, password):
        self.username = username
        self._password = password

    def autenticar(self, pwd):
        return pwd == self._password

class Moderador(Usuario):
    def autenticar(self, pwd):
        return pwd.startswith('mod_') and super().autenticar(pwd)

class Admin(Usuario):
    def autenticar(self, pwd):
        especiales = ['@', '#']
        tiene_especial = any(c in pwd for c in especiales)
        return tiene_especial and super().autenticar(pwd)

def login(usuario: Usuario, pwd: str) -> bool:
    return usuario.autenticar(pwd)
