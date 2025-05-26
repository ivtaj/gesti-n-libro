import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const [credenciales, setCredenciales] = useState({
    username: '',
    password: '',
    rol: 'usuario'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(credenciales);
      localStorage.setItem('token', token);
      navigate('/libros');
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                value={credenciales.username}
                onChange={(e) => setCredenciales({...credenciales, username: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={credenciales.password}
                onChange={(e) => setCredenciales({...credenciales, password: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select 
                className="form-select"
                value={credenciales.rol}
                onChange={(e) => setCredenciales({...credenciales, rol: e.target.value})}
              >
                <option value="usuario">Usuario</option>
                <option value="moderador">Moderador</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
