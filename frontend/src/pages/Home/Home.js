import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import Button from "../../components/common/button/Button";
import Chip from "../../components/common/chip/Chip";
import Card from "../../components/common/card/Card";
import "./Home.css";
import logo from "../../assets/images/bookMyShowLight.png";

const placeholderMovies = [
  { id: 1, title: "The Grand Premiere" },
  { id: 2, title: "Neon Nights" },
  { id: 3, title: "Into The Frames" },
  { id: 4, title: "Sound of Stars" },
  { id: 5, title: "Hidden Alley" },
  { id: 6, title: "The Last Ticket" },
  { id: 7, title: "Popcorn Dreams" },
  { id: 8, title: "City of Reels" },
];

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Thriller",
  "Sci-Fi",
  "Animation",
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

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
    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!searchText.trim()) return placeholderMovies;
    return placeholderMovies.filter((m) =>
      m.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

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

      {/*<section className="section">
        <h2 className="section__title">Trending Now</h2>
        <div className="grid">
          {filtered.map((m) => (
            <Card key={m.id} title={m.title} meta="UA • 2h 10m" onClick={() => navigate("/")} />
          ))}
          {filtered.length === 0 && (
            <div className="empty">No results. Try another search.</div>
          )}
        </div>
      </section>*/}

      {/*<section className="section">
        <h3 className="section__title">Popular Genres</h3>
        <div className="chips">
          {genres.map((g) => (
            <Chip key={g} onClick={() => setQuery(g)}>{g}</Chip>
          ))}
        </div>
      </section>*/}
    </div>
  );
};

export default Home;
