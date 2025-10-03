import React, { useEffect, useState } from "react";
import { fetchMovieList, fetchActors, fetchDirectors } from "../Services/Api";
import InfoModal from "./InfoModal";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState({ show: false, title: "", details: {} });
  const moviesPerPage = 6;

  const fetchMovies = async () => {
    try {
      const req = { filter: filterType, value: searchValue };
      const response = await fetchMovieList(req);

      if (response.status !== 200) {
        console.error("Failed to fetch movies:", response.statusText);
        return;
      }

      const data = response.data;
      setMovies(data.movies || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies(filterType, searchValue);
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handleSearch = () => {
    fetchMovies(filterType, searchValue);
  };

  const handleRefresh = () => {
    setSearchValue("");
    setFilterType("");
    fetchMovies();
  };

  const openModal = async (type, title) => {
    let currentDetails = "Loading...";

    try {
      if (type === "actor") {
        const response = await fetchActors({ name: title }); 
        console.log("responsefetchActors",response);
        if (response.status !== 200) {
          currentDetails = {"title":title,"bio":"nothing found"};
        } else {
          currentDetails = {"title":title, "bio":response.data.actor.bio,"movies":response.data.movies};
        }
      }

      if (type === "director") {
        const response = await fetchDirectors({ name: title });
                console.log("responsefetchDirectors",response);

        if (response.status !== 200) {
          currentDetails = {"title":title,"bio":"nothing found"};
        } else {
          currentDetails = {"title":title, "bio":response.data.director.bio,"movies":response.data.movies};
        }
      }
    } catch (err) {
      currentDetails = "Error fetching details";
      console.error(err);
    }

    setModalData({ show: true, title, details: currentDetails });
  };

  const closeModal = () => {
    setModalData({ show: false, title: "", details: "" });
  };

  return (
    <div className="vh-100 p-2">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0">
          Movies <i className="bi bi-film"></i>{" "}
          <button className="btn" onClick={handleRefresh}>
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </h3>

        <div className="input-group w-25">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="actor">Actor</option>
            <option value="director">Director</option>
            <option value="genre">Genre</option>
            <option value="releaseYear">Release Year</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={!filterType || !searchValue.trim()}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="mt-4 p-4">
        <div className="row mt-2">
          {currentMovies.length === 0 ? (
            <h1 className="text-center text-danger">No movies found.</h1>
          ) : (
            currentMovies.map((movie, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Release Year:</strong> {movie.releaseYear} <br />
                      <strong>Actors:</strong>{" "}
                      {movie.actors.map((actor, i) => (
                        <span
                          key={i}
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => openModal("actor", actor)}
                        >
                          {actor}
                          {i < movie.actors.length - 1 && ", "}
                        </span>
                      ))}{" "}
                      <br />
                      <strong>Director:</strong>{" "}
                      <span
                        className="text-success"
                        style={{ cursor: "pointer" }}
                        onClick={() => openModal("director", movie.director)}
                      >
                        {movie.director}
                      </span>
                      <br />
                      <strong>Genres:</strong> {movie.genres.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-2">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Reusable Modal */}
      <InfoModal
        show={modalData.show}
        onClose={closeModal}
        title={modalData.title}
        details={modalData.details}
      />
    </div>
  );
};

export default MovieList;
