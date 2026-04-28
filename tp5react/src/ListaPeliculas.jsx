import TarjetaPelicula from './TarjetaPelicula';

const ListaPeliculas = ({ peliculas, alSeleccionar, favoritos, toggleFavorito }) => {
  return (
    <div className="grid">
      {peliculas.map((p) => (
        <TarjetaPelicula
          key={p.imdbID}
          pelicula={p}
          alSeleccionar={alSeleccionar}
          favoritos={favoritos}
          toggleFavorito={toggleFavorito}
        />
      ))}
    </div>
  );
};

export default ListaPeliculas;