import { useState } from 'react';

const BarraBusqueda = ({ alBuscar }) => {
  const [texto, setTexto] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    alBuscar(texto);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar..."
      />

      <button type="submit">Buscar</button>

      <button type="button" onClick={() => setTexto('')}>
        Limpiar
      </button>
    </form>
  );
};

export default BarraBusqueda;