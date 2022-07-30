import Likes from "./likes";
import { Link } from "react-router-dom";

const TableBody = ({ movies, onLiked, onDelete }) => {
  return (
    <tbody>
      {movies.map((movie) => {
        return (
          <tr key={movie._id}>
            <td>
              <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Likes liked={movie.liked} onClick={() => onLiked(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
