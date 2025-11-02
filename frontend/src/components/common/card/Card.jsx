import React from "react";
import "./Card.css";
import { TiStarFullOutline } from "react-icons/ti";

function Card({ movie, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="card_img_container">
        <img
          className="card_img"
          alt={"poster of movie"}
          src={movie?.posterUrl}
        />
        <div className="card_img_overlay">
          <TiStarFullOutline
            className="card_img_overlay_icon"
            size={18}
            color={"#F84464"}
          />
          <div className="card_img_overlay_text">{movie.rating} / 10</div>
        </div>
      </div>
      <div className="card_body">
        {movie.title && <div className="card_title">{movie.title}</div>}
        {movie.genres && (
          <div className="card_meta">{movie.genres.join("/")}</div>
        )}
      </div>
    </div>
  );
}

export default Card;
