import { Flex, Text, Button, InputGroup, Link, Input, InputRightElement, Icon } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ViewIcon, UnlockIcon, ViewOffIcon, ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import { MdWarning } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { server } from "../apis/server";

export default function ChangePassword() {
  const params = useParams();
  const [isHidden, setIsHidden] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [pass, setPass] = useState({
    pass1: "",
    pass2: "",
  });

  const clickSubmit = (e) => {
    setIsWaiting(true);
    e.preventDefault();
    axios({
      url: server + "/reset/" + params.token,
      method: "POST",
      data: { password: pass.pass2 },
    })
      .then(({ data }) => {
        setSuccess(data.message);
      })
      .catch(({ response }) => {
        setError((state) => state.concat(response.data.message));
      })
      .finally(() => {
        setIsWaiting(false);
      });
  };

  const view = () => {
    setIsHidden((state) => !state);
  };

  return (
    <Flex bgColor="gray.800" height="100vh" justifyContent="center" alignItems="center">
      {error.length ? (
        <Flex borderRadius={15} bgColor="gray.100" p={5} width="20%" justifyContent="center" alignItems="center" flexDirection="column">
          <Icon as={MdWarning} color="red.500" marginBottom={4} boxSize={16} />
          <Text marginBottom={2} color="gray.800" fontSize="xl">
            Error occurred!
          </Text>
          <Text marginBottom={2} fontWeight="light" fontFamily="sarpanch" fontSize="md" color="gray.600" textAlign="center">
            {error.join(", ")}
          </Text>
          <Link marginTop={2} display="flex" alignItems="center" as={RouterLink} to="/forgot-password" fontFamily="sarpanch" fontWeight="light" color="gray.500" _hover={{ textDecoration: "none" }}>
            <ArrowBackIcon marginRight={1} />
            <Text fontSize={18}>Back</Text>
          </Link>
        </Flex>
      ) : !success ? (
        <Flex borderRadius={15} bgColor="gray.100" p={5} width="20%" justifyContent="center" alignItems="center" flexDirection="column">
          <UnlockIcon color="orange.500" marginBottom={4} boxSize={16} />
          <Text marginBottom={2} color="gray.800" fontSize="xl">
            Change Password
          </Text>
          {/* form */}
          <form style={{ width: "100%" }}>
            <InputGroup marginTop={2} marginBottom={3}>
              <InputRightElement onClick={view} cursor="pointer" children={isHidden ? <ViewIcon /> : <ViewOffIcon />} />
              <Input
                fontFamily="sarpanch"
                fontWeight="md"
                type={!isHidden ? "text" : "password"}
                placeholder="New password..."
                _placeholder={{
                  color: "gray.300",
                  fontFamily: "sarpanch",
                  fontSize: "md",
                }}
                _focus={{
                  borderColor: pass.pass1.length < 8 ? "red" : "blue",
                }}
                value={pass.pass1}
                onChange={(e) => setPass((s) => ({ ...s, pass1: e.target.value }))}
                name="email"
                required
              />
            </InputGroup>
            <InputGroup marginTop={2} marginBottom={5}>
              <InputRightElement onClick={view} cursor="pointer" children={isHidden ? <ViewIcon /> : <ViewOffIcon />} />
              <Input
                fontFamily="sarpanch"
                fontWeight="md"
                type={!isHidden ? "text" : "password"}
                placeholder="Confirm new password..."
                _placeholder={{
                  color: "gray.300",
                  fontFamily: "sarpanch",
                  fontSize: "md",
                }}
                _focus={{
                  borderColor: pass.pass1 !== pass.pass2 || !pass.pass2 ? "red" : "blue",
                }}
                value={pass.pass2}
                onChange={(e) => setPass((s) => ({ ...s, pass2: e.target.value }))}
                name="email"
                required
              />
            </InputGroup>
            <Button isLoading={isWaiting} disabled={pass.pass1 !== pass.pass2 || !pass.pass1 ? true : false} type="submit" width="100%" fontFamily="sarpanch" fontWeight="light" colorScheme="teal" onClick={clickSubmit}>
              SUBMIT
            </Button>
          </form>
          <Flex marginTop={3}>
            <Link as={RouterLink} to="/login" fontFamily="sarpanch" fontWeight="light" color="gray.500" _hover={{ textDecoration: "none" }}>
              Back to login page
            </Link>
          </Flex>
        </Flex>
      ) : (
        <Flex borderRadius={15} bgColor="gray.100" p={5} width="20%" justifyContent="center" alignItems="center" flexDirection="column">
          <CheckIcon color="green.500" marginBottom={4} boxSize={16} />
          <Text marginBottom={2} color="gray.800" fontSize="xl">
            Nice!
          </Text>
          <Text marginBottom={2} fontWeight="light" fontFamily="sarpanch" fontSize="lg" color="gray.600" textAlign="center">
            {success}
          </Text>
          <Link display="flex" alignItems="center" as={RouterLink} to="/login" fontFamily="sarpanch" fontWeight="light" color="gray.500" _hover={{ textDecoration: "none" }}>
            <ArrowBackIcon marginRight={1} />
            <Text fontSize={16}>Go to login page...</Text>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
