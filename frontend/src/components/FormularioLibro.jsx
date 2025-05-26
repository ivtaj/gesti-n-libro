import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearLibro } from '../services/api';

export default function FormularioLibro() {
  const [form, setForm] = useState({ titulo: '', autor: '', precio: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Validación básica
      if (!form.titulo || !form.autor || form.precio === '') {
        setError('Todos los campos son obligatorios');
        return;
      }
      if (Number(form.precio) < 0) {
        setError('El precio no puede ser negativo');
        return;
      }
      await crearLibro({
        titulo: form.titulo,
        autor: form.autor,
        precio: Number(form.precio)
      });
      alert('Libro creado correctamente');
      navigate('/libros');
    } catch (err) {
      setError('Error al crear libro');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Libro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Autor</label>
          <input
            type="text"
            className="form-control"
            name="autor"
            value={form.autor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={form.precio}
            onChange={handleChange}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
