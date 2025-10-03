import axios from "axios";
const BASE_URL = "http://localhost:5000/movie";

export const fetchMovieList = async (req, res) => {
  try {
    const filterReq = req;

    const response = await axios.post(`${BASE_URL}/movies`, filterReq);

    if (response.status == 400) {
      return (res = { status: response.status, message: response.statusText });
    }
    if (response.status == 500) {
      return (res = {
        status: response.status,
        message: "something went wrong",
      });
    }
    res = { status: response.status, data: response.data };

    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchDirectors = async (req = {}) => {
  console.log("request fetchDirectors", req);
  try {
    const response = await axios.get(`${BASE_URL}/directors`, {
      params: req,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message:
          error.response.status === 500
            ? "Something went wrong"
            : error.response.statusText,
      };
    }
    throw error;
  }
};

export const fetchActors = async (req = {}) => {
  console.log("request fetchActors", req);
  try {
    const response = await axios.get(`${BASE_URL}/actors`, {
      params: req,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message:
          error.response.status === 500
            ? "Something went wrong"
            : error.response.statusText,
      };
    }
    throw error; // network/other errors
  }
};