import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLibros, borrarLibro } from '../services/api';

export default function ListarLibros() {
  const [libros, setLibros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    const data = await getLibros();
    setLibros(data);
  };

  const handleBorrar = async (id) => {
    if (window.confirm('¿Eliminar libro?')) {
      await borrarLibro(id);
      cargarLibros();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Catálogo de Libros</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>${libro.precio}</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBorrar(libro.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
