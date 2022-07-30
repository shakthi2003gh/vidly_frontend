import PropTypes from "prop-types";

const ListGroup = ({ items: genres, showGenre, onClick }) => {
  const items = ["All Genres", ...genres.map((item) => item.name)];

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item}
          style={{ cursor: "pointer" }}
          className={
            item === showGenre ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onClick(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

ListGroup.prototype = {
  items: PropTypes.array.isRequired,
  showGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListGroup;
