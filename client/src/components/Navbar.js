import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setUserdata } from "../store/actions/loginAction";

export default function NavbarNew(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inputMethodUrl, changeMethodUrlHandler, submitHandler, loading, userdata, loadingReq } = props;

  return (
    <Flex width="100%" flexDirection="row" px={4} py={2} alignItems="center">
      <Flex flex={1}>
        <Link className="text-decoration-none" to="/homepage">
          <Text color="white" fontSize="xl">
            <FontAwesomeIcon icon={faDatabase} color="#f56e56" /> APIMAN.io
          </Text>
        </Link>
      </Flex>
      <Flex flex={1.5}>
        <form
          className="user"
          style={{ width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="input-group">
            <div className="input-group-prepend">
              <select className="custom-select shadow-none" style={{ borderRadius: "20px 0 0 20px", backgroundColor: "#dcdddd", color: "#212121" }} name="method" onChange={changeMethodUrlHandler} disabled={loadingReq}>
                <option value="get" key="get" selected={inputMethodUrl.method === "get" ? "selected" : false}>
                  Get
                </option>
                <option value="post" key="post" selected={inputMethodUrl.method === "post" ? "selected" : false}>
                  Post
                </option>
                <option value="put" key="put" selected={inputMethodUrl.method === "put" ? "selected" : false}>
                  Put
                </option>
                <option value="patch" key="patch" selected={inputMethodUrl.method === "patch" ? "selected" : false}>
                  Patch
                </option>
                <option value="delete" key="delete" selected={inputMethodUrl.method === "delete" ? "selected" : false}>
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
              value={inputMethodUrl.url}
              onChange={changeMethodUrlHandler}
              disabled={loadingReq}
            />
            <div className="input-group-append">
              <button className="btn btn-danger shadow-none" type="submit" style={{ borderRadius: "0 20px 20px 0" }} disabled={loadingReq}>
                {loadingReq ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <Spinner size="sm" />
                  </div>
                ) : (
                  <FontAwesomeIcon icon={faPaperPlane} />
                )}
              </button>
            </div>
          </div>
        </form>
      </Flex>
      <Flex flex={1} justifyContent="end">
        <a className="dropdown-toggle text-decoration-none text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hello,{" "}
          {loading ? (
            <>
              <Spinner thickness="2px" speed="0.65s" emptyColor="white" color="#f56e56" size="xs" />
              &nbsp;
            </>
          ) : (
            userdata.firstName
          )}
        </a>
        <div className="dropdown-menu dropdown-menu-right" style={{ backgroundColor: "#2d3748" }}>
          <Link className="dropdown-item text-white" to="/profile">
            Profile
          </Link>
          <a
            className="dropdown-item text-white"
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
      </Flex>
    </Flex>
  );
}
