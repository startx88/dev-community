import React from "react";
import Icons from "../../UI/Icons";
import Links from "../Links/Links";
import { Link } from "react-router-dom";
const Container = props => {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <Link
        to=""
        className="nav-link dropdown-toggle"
        id="messagesDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Icons icon="bell" />
        <span className="badge badge-danger badge-counter">7</span>
      </Link>

      <div
        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="messagesDropdown"
      >
        <h6 className="dropdown-header">Message Center</h6>
        <Links classname="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
              alt=""
            />
            <div className="status-indicator bg-success"></div>
          </div>
          <div className="font-weight-bold">
            <div className="text-truncate">
              Hi there! I am wondering if you can help me with a problem I've
              been having.
            </div>
            <div className="small text-gray-500">Emily Fowler · 58m</div>
          </div>
        </Links>
        <Links classname="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
              alt=""
            />
            <div className="status-indicator bg-success"></div>
          </div>
          <div className="font-weight-bold">
            <div className="text-truncate">
              Hi there! I am wondering if you can help me with a problem I've
              been having.
            </div>
            <div className="small text-gray-500">Emily Fowler · 58m</div>
          </div>
        </Links>
        <Links classname="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
              alt=""
            />
            <div className="status-indicator bg-success"></div>
          </div>
          <div className="font-weight-bold">
            <div className="text-truncate">
              Hi there! I am wondering if you can help me with a problem I've
              been having.
            </div>
            <div className="small text-gray-500">Emily Fowler · 58m</div>
          </div>
        </Links>

        <Links classname="dropdown-item d-flex align-items-center" href="#">
          Read More Messages
        </Links>
      </div>
    </li>
  );
};

export default Container;
