import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListarLibros from './components/ListarLibros';
import Login from './components/Login';
import FormularioLibro from './components/FormularioLibro';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Librería</a>
          <div className="navbar-nav">
            <a className="nav-link" href="/libros">Libros</a>
            <a className="nav-link" href="/nuevo">Nuevo Libro</a>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/libros" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/libros" element={
          <PrivateRoute>
            <ListarLibros />
          </PrivateRoute>
        } />
        <Route path="/nuevo" element={
          <PrivateRoute>
            <FormularioLibro />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default App;
