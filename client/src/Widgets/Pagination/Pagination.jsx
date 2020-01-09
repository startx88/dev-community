import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pagination, handler }) => {
  /** Paging */
  const nextChangeHandler = text => {
    let currentPage = pagination.currentPage;

    if (text === "next") {
      currentPage++;
    }
    if (text === "prev") {
      currentPage--;
    }
    handler(currentPage);
  };

  return (
    <div className="pagination">
      <div className="page-info">
        <label>
          Showing {pagination.currentPage} to 5 of {pagination.total} entries
        </label>
      </div>
      <nav aria-label="Page navigation example">
        <ul>
          <li>
            <Link
              to="#"
              onClick={() => nextChangeHandler("prev")}
              className={[
                "btn btn-prev",
                !pagination.hasPrev ? "disable" : ""
              ].join(" ")}
            >
              Previous
            </Link>
          </li>
          {/* <li>
            <Link to="#" className={pagination.currentPage && "current"}>
              {pagination.currentPage}
            </Link>
          </li> */}

          {
            <li>
              <Link
                to="#"
                className={[
                  "btn btn-next",
                  !pagination.hasNext ? "disable" : ""
                ].join(" ")}
                onClick={() => nextChangeHandler("next")}
              >
                Next
              </Link>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
