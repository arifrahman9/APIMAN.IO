import { Flex, Text, Icon, Avatar, VStack, Box, HStack, StackDivider, Skeleton, SkeletonCircle, Spinner, Grid } from "@chakra-ui/react";
import { FcPortraitMode, FcOpenedFolder, FcFolder } from "react-icons/fc";
import { BsFolderFill } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserdata } from "../store/actions/loginAction";
import { fetchCollections } from "../store/actions/collectionAction";
import SecondaryNavbar from "../components/SecondaryNavbar";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userdata: data } = useSelector((state) => state.loginReducer);
  const { isLoading, collections } = useSelector((state) => state.collectionReducer);
  const navbar = useRef(null);
  const header = useRef(null);
  const bodyHtml = useRef(null);
  const [containerHeight, setConteinerHeight] = useState(0);
  const [cardBody, setCardBody] = useState(0);

  useEffect(() => {
    setConteinerHeight(bodyHtml.current.offsetHeight - navbar.current.offsetHeight);
    setCardBody(containerHeight - header.current.offsetHeight);
    dispatch(fetchUserdata());
    dispatch(fetchCollections());
  }, []);

  return (
    <Flex ref={bodyHtml} h="100vh" flexDir="column" overflow="hidden">
      <Flex ref={navbar} bgColor="gray.700" borderRadius="0 0 20px 20px">
        <SecondaryNavbar userData={data} />
      </Flex>
      <Flex h={containerHeight} bgColor="gray.800" alignItems="center" width="100vw" py={2} px={1}>
        {/* Left container */}
        <Flex width="50%" height={containerHeight} py={2} px={1}>
          {/* <Flex width="100%" height="100%" alignItems="flex-start"> */}
          <Flex bgColor="gray.700" minWidth="100%" flexDirection="column" borderRadius={8} p={6}>
            {/* headers */}
            <Flex width="100%" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200" paddingBottom={5} marginBottom={5}>
              <Icon as={FcPortraitMode} boxSize={6} marginRight={2} />
              <Text color="gray.200" fontSize="xl">
                Profile
              </Text>
            </Flex>
            {/* content profile */}
            <Flex width="100%" paddingX={8}>
              {/* Avatar */}
              <Flex>
                <SkeletonCircle display={!data.username ? "flex" : "none"} boxSize="10em" speed=".468" startColor="gray.600" endColor="gray.700" isLoaded={data.username ? true : false} />
                <Avatar display={!data.username ? "none" : "flex"} boxSize="10em" src="https://bit.ly/broken-link" />
              </Flex>
              {/* Detail */}
              <VStack divider={<StackDivider borderColor={!data.username ? "transparent" : "gray.600"} />} width="100%" marginLeft={10} justifyContent="center" spacing={5}>
                <Box width="100%">
                  <Skeleton startColor="gray.600" endColor="gray.700" isLoaded={data.username ? true : false}>
                    <HStack justifyContent="flex-start" width="100%">
                      <Text width="35%" color="gray.200" fontSize="lg" fontWeight="bold">
                        Username
                      </Text>
                      <Text color="gray.300" fontFamily="calibri" fontWeight="light" fontSize="md">
                        {data.username}
                      </Text>
                    </HStack>
                  </Skeleton>
                </Box>
                <Box width="100%">
                  <Skeleton startColor="gray.600" endColor="gray.700" isLoaded={data.email ? true : false}>
                    <HStack justifyContent="flex-start" width="100%">
                      <Text width="35%" color="gray.200" fontSize="lg" fontWeight="bold">
                        Email
                      </Text>
                      <Text color="gray.300" fontFamily="calibri" fontWeight="light" fontSize="md">
                        {data.email}
                      </Text>
                    </HStack>
                  </Skeleton>
                </Box>
                <Box width="100%">
                  <Skeleton startColor="gray.600" endColor="gray.700" isLoaded={data.firstName ? true : false}>
                    <HStack justifyContent="flex-start" width="100%">
                      <Text width="35%" color="gray.200" fontSize="lg" fontWeight="bold">
                        Name
                      </Text>
                      <Text color="gray.300" fontFamily="calibri" fontWeight="light" fontSize="md">
                        {data.firstName} {data.lastName}
                      </Text>
                    </HStack>
                  </Skeleton>
                </Box>
              </VStack>
            </Flex>
          </Flex>
          {/* </Flex> */}
        </Flex>

        {/* Right container */}
        <Flex width="50%" height={containerHeight} py={2} px={1}>
          {/* <CollectionInProfile container={containerHeight} /> */}
          <Flex bgColor="gray.700" width="100%" borderRadius={8} p={6} flexDirection="column">
            {/* headers */}
            <Flex alignSelf="flex-start" width="100%" ref={header} justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200" paddingBottom={5} marginBottom={5}>
              <Icon as={FcFolder} boxSize={6} marginRight={2} />
              <Text color="gray.200" fontSize="xl">
                Collections
              </Text>
            </Flex>
            {/* Collection list */}
            <Flex paddingX={2} wrap="wrap" height={containerHeight - 130} justifyContent="flex-start">
              {isLoading ? (
                <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
                  <Spinner size="xl" color="#f56e56" emptyColor="white" thickness="3px" />
                </Flex>
              ) : (
                <Grid w="100%" overflow="auto" height="100%" alignItems="start" templateColumns="repeat(7, 3fr)">
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                  {collections.map((collection) => (
                    <Box overflow="hidden" alignItems="center" justifyContent="center" display="flex" flexDirection="column" margin={3}>
                      <Icon as={BsFolderFill} color="teal.400" boxSize={8} />
                      <Text w="100%" whiteSpace="break-spaces" noOfLines={2} textAlign="center" color="gray.200" fontFamily="calibri" marginTop={2}>
                        {collection.name}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
