import { Flex, Text, InputGroup, Input, InputLeftElement, Button, Link, useToast, Box, Spinner } from "@chakra-ui/react";
import { WarningIcon, EmailIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import validator from 'email-validator'
import { requestForgotPassword } from '../store/actions/forgotPasswordAction'
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()

  const clickSubmit = (e) => {
    e.preventDefault()
    if (!validator.validate(email)) {
      if (!toast.isActive('danger-toast')) {
        toast({
          id: 'danger-toast',
          position: 'top',
          render: () => (
            <Box p={3} bgColor='red.500' marginTop={3} borderRadius={5} color='gray.100' textAlign='center'>
              Invalid email address!
            </Box>
          ),
          duration: 1500
        })
      }
    } else {
      setIsWaiting(true)
      dispatch(requestForgotPassword(email))
        .then(data => {
          console.log(data)
          setIsSubmitted(true)
        })
        .catch(err => {
          if (!toast.isActive('error123')) {
            toast({
              id: 'error123',
              position: 'top',
              render: () => (
                <Box p={3} bgColor='red.500' marginTop={3} borderRadius={5} color='gray.100' textAlign='center'>
                  { err?.data.message[0].toUpperCase() + err?.data.message.slice(1) + '!' }
                </Box>
              ),
              duration: 1500
            })
          }
        }).finally(() => {
          setIsWaiting(false)
        })
    }
  };

  if (!isSubmitted) {
    return (
      <Flex bgColor="gray.800" height="100vh" justifyContent="center" alignItems="center">
        <Flex borderRadius={15} bgColor="gray.100" p={5} width="20%" justifyContent="center" alignItems="center" flexDirection="column">
          <WarningIcon color="orange.500" marginBottom={4} boxSize={16} />
          <Text marginBottom={2} color="gray.800" fontSize="xl">
            Forgot Password
          </Text>
          <Text marginBottom={2} fontWeight="light" fontFamily="calibri" fontSize="md" color="gray.600" textAlign="center">
            Enter your email and we'll send you a link to reset your password
          </Text>
          {/* form */}
          <form style={{ width: "100%" }} onSubmit={clickSubmit}>
            <InputGroup marginTop={2} marginBottom={3}>
              <InputLeftElement children={<EmailIcon />} />
              <Input
                fontFamily="calibri"
                fontWeight="md"
                type="email"
                placeholder="Your email address..."
                _placeholder={{
                  color: "gray.300",
                  fontFamily: "calibri",
                  fontSize: "md",
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                required
              />
            </InputGroup>
            <Button type="submit" width="100%" fontFamily="calibri" fontWeight="light" colorScheme="teal" onClick={clickSubmit} isLoading={isWaiting} loadingText='SUBMITTING...'>
              SUBMIT
            </Button>
          </form>
          <Flex marginTop={3}>
            <Link as={RouterLink} to="/login" fontWeight="light" color="gray.500" _hover={{ textDecoration: "none" }}>
              Back to login page
            </Link>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex bgColor="gray.800" height="100vh" justifyContent="center" alignItems="center">
      <Flex borderRadius={15} bgColor="gray.100" p={5} width="20%" justifyContent="center" alignItems="center" flexDirection="column">
        <CheckCircleIcon marginBottom={4} color="green.500" boxSize={16} />
        <Text marginBottom={2} color="gray.800" fontSize="xl">
          Success!
        </Text>
        <Text marginBottom={2} fontWeight="light" fontFamily="calibri" fontSize="md" color="gray.600" textAlign="center">
          Reset link has been sent successfully, check your email inbox!
        </Text>
      </Flex>
    </Flex>
  );
}
