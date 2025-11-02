import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{movie.title}</h2>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "8px" }}
      />
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Language:</strong> {movie.language}
      </p>
      <p>
        <strong>Duration:</strong> {movie.duration} min
      </p>
      <p>
        <strong>Release Date:</strong>{" "}
        {new Date(movie.releaseDate).toDateString()}
      </p>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetail;
