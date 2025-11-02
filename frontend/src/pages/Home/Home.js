import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import Button from "../../components/common/button/Button";
import Card from "../../components/common/card/Card";
import "./Home.css";
import logo from "../../assets/images/bookMyShowLight.png";

const Home = () => {
  const listRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(movies.length / itemsPerPage));

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/current-user");
        if (mounted) setUser(res.data);
      } catch (error) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    const getMovies = async () => {
      try {
        const res = await api.get("/movies");
        if (mounted) setMovies(res.data);
      } catch (error) {
        if (mounted) setMovies([]);
      }
    };
    fetchUser();
    getMovies();
    return () => {
      mounted = false;
    };
  }, []);

  const scroll = (direction) => {
    if (!listRef.current) return;
    const { clientWidth } = listRef.current;
    let nextPage = page + (direction === "left" ? -1 : 1);
    if (nextPage < 0) nextPage = 0;
    if (nextPage > totalPages - 1) nextPage = totalPages - 1;
    setPage(nextPage);
    listRef.current.scrollTo({
      left: nextPage * clientWidth,
      behavior: "smooth",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <section className="home">
        <div className="home__content">
          <div className="home__actions">
            <img src={logo} alt="BookMyShow" className="home__logo" />
            <input
              className="search__input"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Movies, Events, Plays & More..."
              aria-label="Search"
            />
          </div>

          <div>
            {loading ? (
              <span className="muted">Loading...</span>
            ) : user ? (
              <div className="home__actions">
                <span className="welcome">Hi, {user.name} 👋</span>
                <Button className="home__button" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="home__actions">
                <Link to="/login">
                  <Button className="home__button">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="home__button home__button--white">
                    Create account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Recommended for You</h2>
        <div className="carousel">
          {page > 0 && (
            <button className="arrow left" onClick={() => scroll("left")}>
              ‹
            </button>
          )}
          <div className="list" ref={listRef}>
            {movies.map((movie) => (
              <Card
                key={movie._id}
                movie={movie}
                onClick={() => navigate(`/movies/${movie._id}`)}
              />
            ))}
          </div>

          {page < totalPages - 1 && (
            <button className="arrow right" onClick={() => scroll("right")}>
              ›
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
