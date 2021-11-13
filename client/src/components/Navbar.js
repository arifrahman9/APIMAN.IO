import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserdata } from "../store/actions/loginAction";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inputMethodUrl, changeMethodUrlHandler, submitHandler, userdata } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow" style={{ backgroundColor: "#fefefe", borderRadius: "0 0 20px 20px" }}>
      <a className="navbar-brand" href="#">
        <FontAwesomeIcon icon={faDatabase} color="#f56e56" /> APIMAN.io
      </a>

      <div className="d-flex align-items-center justify-content-center position-absolute" style={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <form className="user" style={{ width: "40%" }} onSubmit={submitHandler}>
          <div className="input-group">
            <div className="input-group-prepend">
              <select className="custom-select shadow-none" style={{ borderRadius: "20px 0 0 20px", backgroundColor: "#dcdddd", color: "#212121" }} name="method" defaultValue={inputMethodUrl.method} onChange={changeMethodUrlHandler}>
                <option value="get" key="get">
                  Get
                </option>
                <option value="post" key="post">
                  Post
                </option>
                <option value="put" key="put">
                  Put
                </option>
                <option value="patch" key="patch">
                  Patch
                </option>
                <option value="delete" key="delete">
                  Delete
                </option>
              </select>
            </div>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Url"
              style={{ borderRadius: 0, backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
              name="url"
              defaultValue={inputMethodUrl.url}
              onChange={changeMethodUrlHandler}
            />
            <div className="input-group-append">
              <button className="btn btn-danger" type="submit" style={{ borderRadius: "0 20px 20px 0" }}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="ml-auto">
        <ul className="navbar-nav">
          <li className="nav-item dropdown active">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Hello, {userdata.firstName}
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("access_token");
                  dispatch(setUserdata({}));
                  history.push("/login");
                }}
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
