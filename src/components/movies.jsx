import React, { Component } from "react";
import { getMovies, deleteMovie } from "../StarterCode/services/movieServices";
import { getGenres } from "../StarterCode/services/genreServices";
import ListGroup from "./common/listGroup";
import Table from "./table";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class MoviesSection extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    showGenre: "All Genres",
    sortColumn: "title",
  };

  handleLiked = (movie) => {
    const movies = this.state.movies.map((m) => {
      if (m._id === movie._id) m.liked = !m.liked;
      return m;
    });

    this.setState({ movies });
  };

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("this movie already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => this.setState({ currentPage: page });

  handleShowGenre = (genre) =>
    this.setState({ showGenre: genre, currentPage: 1, searchQuery: "" });

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      showGenre: "All Genres",
      currentPage: 1,
    });
  };

  handleSort = (column) => this.setState({ sortColumn: column });

  async componentDidMount() {
    const { data } = await getGenres();

    const { data: movies } = await getMovies();
    this.setState({ movies, genres: [...data] });
  }

  render() {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      showGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    // >>
    let filteredMovies = allMovies.filter(
      (movie) => movie.genre.name === showGenre || showGenre === "All Genres"
    );

    if (searchQuery) {
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.sortBy(filteredMovies, [sortColumn]);
    const movies = paginate(sorted, currentPage, pageSize);
    const movieLength = filteredMovies.length;

    if (allMovies.length === 0)
      return <p className="mt-4 mb-4">There are no movies in database</p>;
    // >>

    return (
      <div className="row">
        <div className="col-3 mt-4">
          <ListGroup
            items={genres}
            showGenre={showGenre}
            onClick={this.handleShowGenre}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary mt-4" to="/movies/new" role="button">
            New movie
          </Link>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <Table
            movies={movies}
            movieLength={movieLength}
            onLiked={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={movieLength}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default MoviesSection;
