import React from "react";
import { Flex, Text, Spinner, useToast } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setUserdata } from "../store/actions/loginAction";

export default function NavbarNew(props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
  const { inputMethodUrl, changeMethodUrlHandler, submitHandler, loading, userdata, loadingReq } = props;

  return (
    <Flex width="100%" flexDirection="row" px={4} py={2} alignItems="center">
      <Flex flex={1}>
        <Link className="text-decoration-none" to="/homepage">
          <Text color="white" fontSize="xl">
            <FontAwesomeIcon icon={faDatabase} color="#f56e56" /> APIMAN
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
          Hello,&nbsp;
          {loading ? (
            <>
              <Spinner thickness="2px" speed="0.65s" emptyColor="white" color="#f56e56" size="xs" />
              &nbsp;
            </>
          ) : (
            <>{userdata.firstName}&nbsp;</>
          )}
        </a>
        <div className="dropdown-menu dropdown-menu-right" style={{ backgroundColor: "#2d3748" }}>
          <Link className="dropdown-item text-white" to="/profile">
            Profile
          </Link>
          <a
            className="dropdown-item text-white"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Logout
          </a>
        </div>
      </Flex>

      <div className="modal fade text-white" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="addToCollections" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0" style={{ borderRadius: "20px", backgroundColor: "#2d3748" }}>
            <div className="modal-body mx-3 mt-3 mb-0" style={{ backgroundColor: "#1a202c", borderRadius: "20px" }}>
              Are you sure you want to logout?
            </div>
            <div className={`modal-footer border-0`}>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill"
                data-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("access_token");
                  dispatch(setUserdata({}));
                  history.push("/login");
                  toast({
                    position: "bottom",
                    render: () => (
                      <div className="py-2 px-3 text-center text-white bg-success" style={{ borderRadius: "20px", fontSize: "11pt" }}>
                        You are logged out!
                      </div>
                    ),
                    duration: 2000,
                  });
                }}
                data-dismiss="modal"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  );
}
