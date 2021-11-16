import { Flex, Text } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setUserdata } from "../store/actions/loginAction";

export default function SecondaryNavbar({ userData }) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Flex width="100%" flexDirection="row" px={4} py={3} bgColor="gray.700" alignItems="center" borderRadius="0 0 20px 20px">
      <Flex flex={1}>
        <Link className="text-decoration-none" to="/">
          <Text color="white" fontSize="xl">
            <FontAwesomeIcon icon={faDatabase} color="#f56e56" /> APIMAN.io
          </Text>
        </Link>
      </Flex>
      <Flex flex={1} justifyContent="end">
        <a className="dropdown-toggle text-decoration-none text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hello, {userData.userProfile.firstName}&nbsp;
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
