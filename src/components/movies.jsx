import React, { Component } from "react";
import { getMovies } from "../StarterCode/services/fakeMovieService";
import { getGenres } from "../StarterCode/services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Table from "./table";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class MoviesSection extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
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

  handleDelete = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);

    this.setState({ movies });
  };

  handlePageChange = (page) => this.setState({ currentPage: page });

  handleShowGenre = (genre) =>
    genre !== this.state.showGenre
      ? this.setState({ showGenre: genre, currentPage: 1 })
      : null;

  handleSort = (column) => this.setState({ sortColumn: column });

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      showGenre,
      sortColumn,
    } = this.state;

    const filteredMovies = allMovies.filter(
      (movie) => movie.genre.name === showGenre || showGenre === "All Genres"
    );
    const sorted = _.sortBy(filteredMovies, [sortColumn]);
    const movies = paginate(sorted, currentPage, pageSize);
    const movieLength = filteredMovies.length;

    if (allMovies.length === 0)
      return <p className="mt-4 mb-4">There are no movies in database</p>;

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
