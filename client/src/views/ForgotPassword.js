import { Flex, Text, InputGroup, Input, InputLeftElement, Button, Link } from '@chakra-ui/react'
import { WarningIcon, EmailIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import vaildator from 'email-validator'

export default function ForgotPassword () {
  const validate = (val) => {
    let error
    if (!val) {
      error = 'Email is required!'
    }
    return error
  }
  return (
    <Flex bgColor='gray.800' height='100vh' justifyContent='center' alignItems='center'>
      <Flex borderRadius={15} bgColor='gray.100' p={5} width='20%' justifyContent='center' alignItems='center' flexDirection='column'>
        <WarningIcon color='orange.500' marginBottom={4} boxSize={16}/>
        <Text marginBottom={2} color='gray.800' fontSize='xl'>Forgot Password</Text>
        <Text marginBottom={2} fontWeight='light' fontFamily='calibri' fontSize='md' color='gray.600' textAlign='center'>Enter your email and we'll send you a link to reset your password</Text>
        {/* form */}
        <form style={{ width: '100%' }}>
          <InputGroup marginTop={2} marginBottom={3}>
            <InputLeftElement children={<EmailIcon/>}/>
            <Input fontFamily='calibri' fontWeight='md' type='email' placeholder='Your email address...' _placeholder={{
              color: 'gray.300',
              fontFamily: 'calibri',
              fontSize: 'md'
            }}
            name='email'
            required/>
          </InputGroup>
          <Button type='submit' width='100%' fontFamily='calibri' fontWeight='light' colorScheme='teal'>SUBMIT</Button>
        </form>
        <Flex marginTop={3}>
          <Link as={RouterLink} to='/login' fontFamily='calibri' fontWeight='light' color='gray.500' _hover={{ textDecoration: 'none' }}>
            Back to login page
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}