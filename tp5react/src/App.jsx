import { useState, useEffect } from 'react';
import axios from 'axios';

import BarraBusqueda from './BarraBusqueda';
import ListaPeliculas from './ListaPeliculas';
import DetallePelicula from './DetallePelicula';
import Cargador from './Cargador';
import MensajeError from './MensajeError';

const API_KEY = 'b4af5452';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [buscado, setBuscado] = useState(false);

  const [busquedaActual, setBusquedaActual] = useState('');
  const [pagina, setPagina] = useState(1);
  const [tipo, setTipo] = useState('');

  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem('modoOscuro') === 'true';
  });

  const [historial, setHistorial] = useState(() => {
    return JSON.parse(localStorage.getItem('historial')) || [];
  });

  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
  });

  // Modo oscuro global
  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    localStorage.setItem('modoOscuro', modoOscuro);
  }, [modoOscuro]);

  // Buscar películas
  const buscarPeliculas = async (texto, nuevaPagina = 1) => {
    setBusquedaActual(texto);
    setPagina(nuevaPagina);
    setCargando(true);
    setError('');
    setSeleccionada(null);
    setBuscado(true);

    try {
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${texto}&page=${nuevaPagina}`;

      if (tipo) {
        url += `&type=${tipo}`;
      }

      const res = await axios.get(url);

      if (res.data.Response === "False") {
        setPeliculas([]);
        setError(res.data.Error || 'No se encontraron resultados');
      } else {
        setPeliculas(res.data.Search);

        const nuevoHistorial = [
          texto,
          ...historial.filter((h) => h !== texto)
        ].slice(0, 5);

        setHistorial(nuevoHistorial);
        localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
      }

    } catch (err) {
      console.error(err);
      setError('Error al buscar películas');
    }

    setCargando(false);
  };

  // Obtener detalle
  const obtenerDetalle = async (id) => {
    setCargando(true);
    setError('');

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );

      setSeleccionada(res.data);
    } catch {
      setError('Error al cargar detalle');
    }

    setCargando(false);
  };

  // Favoritos
  const toggleFavorito = (peli) => {
    const existe = favoritos.find((f) => f.imdbID === peli.imdbID);

    let nuevos;

    if (existe) {
      nuevos = favoritos.filter((f) => f.imdbID !== peli.imdbID);
    } else {
      nuevos = [...favoritos, peli];
    }

    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
  };

  return (
    <div className="container">
      <h1>Buscador de películas</h1>

      <button className="toggle" onClick={() => setModoOscuro(!modoOscuro)}>
        {modoOscuro ? 'Modo claro' : 'Modo oscuro'}
      </button>

      <BarraBusqueda alBuscar={buscarPeliculas} />

      <select onChange={(e) => setTipo(e.target.value)}>
        <option value="">Todos</option>
        <option value="movie">Películas</option>
        <option value="series">Series</option>
      </select>

      <div className="historial">
        {historial.map((h, i) => (
          <button key={i} onClick={() => buscarPeliculas(h)}>
            {h}
          </button>
        ))}
      </div>

      {cargando && <Cargador />}

      {!cargando && error && buscado && (
        <MensajeError mensaje={error} />
      )}

      {!cargando && peliculas.length > 0 && !seleccionada && (
        <>
          <ListaPeliculas
            peliculas={peliculas}
            alSeleccionar={obtenerDetalle}
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />

          <div className="paginacion">
            <button
              onClick={() => buscarPeliculas(busquedaActual, pagina - 1)}
              disabled={pagina === 1}
            >
              Anterior
            </button>

            <button
              onClick={() => buscarPeliculas(busquedaActual, pagina + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {seleccionada && (
        <DetallePelicula pelicula={seleccionada} />
      )}
    </div>
  );
}

export default App;