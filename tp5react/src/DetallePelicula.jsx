const DetallePelicula = ({ pelicula }) => {
  if (!pelicula) return null;

  return (
    <div>
      <h2>{pelicula.Title}</h2>
      <img src={pelicula.Poster} alt={pelicula.Title} />

      <p>Año: {pelicula.Year}</p>
      <p>Género: {pelicula.Genre}</p>
      <p>Director: {pelicula.Director}</p>
      <p>Actores: {pelicula.Actors}</p>
      <p>Sinopsis: {pelicula.Plot}</p>
      <p>Duración: {pelicula.Runtime}</p>
      <p>Idioma: {pelicula.Language}</p>
      <p>País: {pelicula.Country}</p>
      <p>IMDb: {pelicula.imdbRating}</p>
    </div>
  );
};

export default DetallePelicula;