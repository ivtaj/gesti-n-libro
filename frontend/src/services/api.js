const BASE = 'http://localhost:5000/api';

export const getLibros = () => fetch(`${BASE}/libros`).then(r => r.json());

export const crearLibro = (data) => 
  fetch(`${BASE}/libros`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error('Error al crear libro');
    return res.json();
  });

export const borrarLibro = (id) => 
  fetch(`${BASE}/libros/${id}`, { method: 'DELETE' });

export const login = (creds) => 
  fetch(`${BASE}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(creds)
  }).then(res => res.json());
