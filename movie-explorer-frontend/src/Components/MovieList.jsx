import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then(data => setMovies(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Movies</h2>
      <div className="row">
        {movies.map(movie => (
          <div className="col-md-4 mb-3" key={movie._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p>Release Year: {movie.releaseYear}</p>
                <p>Director: {movie.director?.name}</p>
                <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>
                <p>Actors: {movie.actors.map(a => a.name).join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
