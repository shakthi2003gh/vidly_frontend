import Likes from "./likes";
import { Link } from "react-router-dom";
import auth from "../../services/authServices";

const TableBody = ({ movies, onLiked, onDelete }) => {
  const user = auth.getCurrentUser();

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
            {user && user.isAdmin && (
              <td>
                <button
                  onClick={() => onDelete(movie._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
