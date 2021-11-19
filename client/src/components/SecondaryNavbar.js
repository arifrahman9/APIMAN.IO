import { Flex, Text, useToast } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setUserdata } from "../store/actions/loginAction";

export default function SecondaryNavbar({ userData }) {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Flex width="100%" flexDirection="row" px={4} py={3} bgColor="gray.700" alignItems="center" borderRadius="0 0 20px 20px">
      <Flex flex={1}>
        <Link className="text-decoration-none" to="/homepage">
          <Text color="white" fontSize="xl">
            <FontAwesomeIcon icon={faDatabase} color="#f56e56" /> APIMAN
          </Text>
        </Link>
      </Flex>
      <Flex flex={1} justifyContent="end">
        <a className="dropdown-toggle text-decoration-none text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hello, {userData.firstName}&nbsp;
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
