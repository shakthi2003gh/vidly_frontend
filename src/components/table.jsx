import React from "react";
import PropTypes from "prop-types";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";

const Table = ({ movies, movieLength, onLiked, onDelete, onSort }) => {
  return (
    <React.Fragment>
      <p className="mt-4 mb-3">Showing {movieLength} movies in the database</p>
      <table className="table">
        <TableHead onSort={onSort} />
        <TableBody movies={movies} onLiked={onLiked} onDelete={onDelete} />
      </table>
    </React.Fragment>
  );
};

Table.propTypes = {
  movies: PropTypes.array.isRequired,
  movieLength: PropTypes.number.isRequired,
  onLiked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
