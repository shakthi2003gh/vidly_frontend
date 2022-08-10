import auth from "../../services/authServices";

const TableHead = ({ onSort }) => {
  const user = auth.getCurrentUser();

  return (
    <thead>
      <tr>
        <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
          Title
        </th>
        <th style={{ cursor: "pointer" }} onClick={() => onSort("genre.name")}>
          Genre
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => onSort("numberInStock")}
        >
          Stock
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => onSort("dailyRentalRate")}
        >
          Rate
        </th>
        <th></th>
        {user && user.isAdmin && <th></th>}
      </tr>
    </thead>
  );
};

export default TableHead;
