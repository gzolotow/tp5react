const TarjetaPelicula = ({ pelicula, alSeleccionar, favoritos, toggleFavorito }) => {
  const esFav = favoritos.some(f => f.imdbID === pelicula.imdbID);

  return (
    <div className="card">
      <img
        src={pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/150'}
        alt={pelicula.Title}
        onClick={() => alSeleccionar(pelicula.imdbID)}
      />

      <h3>{pelicula.Title}</h3>
      <p>{pelicula.Year}</p>
      <p>{pelicula.Type}</p>

      <button onClick={() => toggleFavorito(pelicula)}>
        {esFav ? '❤️ Quitar' : '🤍 Favorito'}
      </button>
    </div>
  );
};

export default TarjetaPelicula;