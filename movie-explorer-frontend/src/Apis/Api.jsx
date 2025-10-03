const BASE_URL = "http://localhost:5000/api"; // your backend URL

export const fetchMovies = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/movies?${query}`);
  return res.json();
};

export const fetchActors = async () => {
  const res = await fetch(`${BASE_URL}/actors`);
  return res.json();
};

export const fetchDirectors = async () => {
  const res = await fetch(`${BASE_URL}/directors`);
  return res.json();
};

export const fetchGenres = async () => {
  const res = await fetch(`${BASE_URL}/genres`);
  return res.json();
};
