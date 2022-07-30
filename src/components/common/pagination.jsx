import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = pageCount === 1 ? [] : _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination ">
        {pages.map((page) => {
          let classes = "page-item";
          classes += page === currentPage ? " active" : "";

          return (
            <li
              key={page}
              className={classes}
              onClick={() => onPageChange(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
