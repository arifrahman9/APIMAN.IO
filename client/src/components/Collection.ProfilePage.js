import { Flex, Box, Icon, Text, Spinner, Grid } from "@chakra-ui/react";
import { FcOpenedFolder } from "react-icons/fc";
import { BsFolderFill } from "react-icons/bs";
import { fetchCollections } from "../store/actions/collectionAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Collection() {
  const { isLoading, collections } = useSelector((state) => state.collectionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);
  console.log(collections);
  return (
    <Flex bgColor="gray.700" width="100%" borderRadius={8} p={6} flexDirection="column">
      {/* headers */}
      <Flex alignSelf="flex-start" width="100%" justifyContent="center" alignItems="center" borderBottom="2px solid" borderColor="gray.200" paddingBottom={5} marginBottom={5}>
        <Icon as={FcOpenedFolder} boxSize={6} marginRight={2} />
        <Text color="gray.200" fontSize="xl">
          Collections
        </Text>
      </Flex>
      {/* Collection list */}
      <Flex paddingX={2} wrap="wrap" justifyContent="flex-start">
        {isLoading ? (
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="#f56e56" emptyColor="white" thickness="3px" />
          </Flex>
        ) : (
          <Grid w="100%" alignItems="start" templateColumns="repeat(7, 1fr)">
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
  );
}
