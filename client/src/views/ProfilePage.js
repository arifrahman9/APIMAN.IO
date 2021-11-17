import { Flex, Text, Icon, Avatar, VStack, Box, HStack, StackDivider, Skeleton, SkeletonCircle, Spinner, Grid } from "@chakra-ui/react";
import { FcPortraitMode, FcOpenedFolder, FcFolder, FcSurvey } from "react-icons/fc";
import { BsFolderFill } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserdata } from "../store/actions/loginAction";
import { fetchCollections } from "../store/actions/collectionAction";
import SecondaryNavbar from "../components/SecondaryNavbar";
import { fetchResults } from "../store/actions/resultAction";
import JSONTree from "react-json-tree";
import Acit from "../assets/profile/Acit.jpeg";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navbar = useRef(null);
  const bodyHtml = useRef(null);
  const [containerHeight, setConteinerHeight] = useState(0);

  const [hoverStatus, setHoverStatus] = useState({ idx: -1 });
  const toggleHover = (idx) => {
    setHoverStatus({
      idx,
    });
  };

  const statusText = (num) => {
    if (num == 2) {
      return "text-success";
    } else if (num == 4) {
      return "text-danger";
    } else {
      return "text-warning";
    }
  };

  useEffect(() => {
    setConteinerHeight(bodyHtml.current.offsetHeight - navbar.current.offsetHeight);
    dispatch(fetchUserdata());
    dispatch(fetchCollections());
    dispatch(fetchResults());
  }, []);

  const { userdata: data } = useSelector((state) => state.loginReducer);
  const { isLoading: loadingCollection, collections } = useSelector((state) => state.collectionReducer);
  const { isLoading: loadingResult, results } = useSelector((state) => state.resultReducer);

  return (
    <Flex ref={bodyHtml} h="100vh" w="100vw" flexDir="column">
      <Flex ref={navbar} bgColor="gray.700" borderRadius="0 0 20px 20px">
        <SecondaryNavbar userData={data} />
      </Flex>
      <Flex h={containerHeight} bgColor="gray.800" alignItems="center" width="100vw" px={1}>
        {/* Left container */}
        <Flex width="50%" height="100%" py={2} px={1}>
          <div className="card o-hidden border-0 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "100%", width: "100%" }}>
            <div className="d-flex card-header mx-2 py-2 px-2 pb-2 align-items-center justify-content-center" style={{ backgroundColor: "#2d3748", borderWidth: "0 0 2px 0" }}>
              <nav>
                <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link text-white" id="pills-collection-tab" role="tab">
                      <Icon as={FcPortraitMode} boxSize={6} /> Profile
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="card-body row py-3 px-3 text-wrap" style={{ overflowY: "auto", overflowX: "hidden" }}>
              <div className="col-4 d-flex justify-content-center p-0">
                <SkeletonCircle display={!data.username ? "flex" : "none"} boxSize="9em" speed=".468" startColor="gray.600" endColor="gray.700" isLoaded={data.username ? true : false} />
                <Avatar display={!data.username ? "none" : "flex"} boxSize="10em" src={Acit} />
              </div>
              <div className="col-8 p-0">
                <VStack divider={<StackDivider borderColor={!data.username ? "transparent" : "gray.600"} />} width="100%" marginLeft={10} justifyContent="center" spacing={5}>
                  <Box width="100%">
                    <Skeleton startColor="gray.600" endColor="gray.700" isLoaded={data.username ? true : false}>
                      <HStack justifyContent="flex-start" width="100%">
                        <Text width="35%" fontSize="lg">
                          Username
                        </Text>
                        <Text fontSize="sm">{data.username}</Text>
                      </HStack>
                    </Skeleton>
                  </Box>
                  <Box width="100%">
                    <Skeleton startColor="gray.600" endColor="gray.700" isLoaded={data.email ? true : false}>
                      <HStack justifyContent="flex-start" width="100%">
                        <Text width="35%" fontSize="lg">
                          Email
                        </Text>
                        <Text fontSize="sm">{data.email}</Text>
                      </HStack>
                    </Skeleton>
                  </Box>
                  <Box width="100%">
                    <Skeleton startColor="gray.600" endColor="gray.700" isLoaded={data.firstName ? true : false}>
                      <HStack justifyContent="flex-start" width="100%">
                        <Text width="35%" fontSize="lg">
                          Name
                        </Text>
                        <Text fontSize="sm">
                          {data.firstName} {data.lastName}
                        </Text>
                      </HStack>
                    </Skeleton>
                  </Box>
                </VStack>
              </div>
            </div>
          </div>
        </Flex>

        {/* Right container */}
        <Flex justifyContent="center" alignItems="center" px={1} py={2} h={containerHeight} w="50%">
          <div className="card o-hidden border-0 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "100%", width: "100%" }}>
            <div className="card-header mx-2 py-2 pt-2 px-2 pb-2" style={{ backgroundColor: "#2d3748", borderWidth: "0 0 2px 0" }}>
              <nav>
                <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link text-white" id="pills-collection-tab" role="tab">
                      <Icon as={FcFolder} boxSize={6} /> Saved Response
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="card-body py-2 px-3 text-wrap" style={{ overflowY: "auto", overflowX: "hidden" }}>
              {results.map((result) => (
                <div key={result._id} className="card bg-transparent mx-1 border-0" style={{ fontSize: "10pt" }}>
                  <div className="card-body p-1 row">
                    <div className="col-3 px-1">
                      <div className="mx-2 mb-1">&nbsp;</div>
                      <div className="p-3" style={{ backgroundColor: "#1A202C", borderRadius: "20px", height: "200px" }}>
                        Code:&nbsp;
                        <span className={statusText(result.code[0])}>{result.code}</span>
                        <br />
                        Status:&nbsp;
                        <span className={statusText(result.code[0])}>{result.status.length > 5 ? <>{result.status.substring(0, 5)}..</> : result.status}</span>
                        <br />
                        Time: <span className="text-info">{result.responseTime} ms</span>
                      </div>
                    </div>
                    <div className="col-9 px-1">
                      <div className="d-flex justify-content-end mx-2 mb-1">
                        <a href="#" className="text-decoration-none text-white">
                          <Icon as={FcSurvey} /> Copy response
                        </a>
                      </div>
                      <div style={{ backgroundColor: "#1A202C", borderRadius: "20px", height: "200px" }}>
                        <JSONTree
                          data={result.content}
                          theme={{
                            tree: {
                              backgroundColor: "#1A202C",
                              padding: "6px",
                              borderRadius: "20px",
                            },
                          }}
                        />
                        {/* <textarea
                          className="form-control shadow-none border-0 border-0 text-white body-raw p-3"
                          cols="30"
                          style={{ resize: "none", height: "100%", fontSize: "10pt", backgroundColor: "#1a202c", borderRadius: "20px" }}
                          disabled
                        >
                          {JSON.stringify(result.content, null, 2)}
                        </textarea> */}
                      </div>
                    </div>
                  </div>
                </div>
                // <div className="row">
                //   <div className="col" style={{ backgroundColor: "#1A202C" }}>
                //     {result.status}
                //   </div>
                //   <div className="col"></div>
                // </div>
              ))}
            </div>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
