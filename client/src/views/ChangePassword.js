import { Flex, Text, Button, InputGroup, Link, Input, InputRightElement } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ViewIcon, UnlockIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default function ChangePassword () {
  const [isHidden, setIsHidden] = useState(true)
  const [pass, setPass] = useState({
    pass1: '',
    pass2: ''
  })
  const clickSubmit = () => {

  }

    const view = () => {
    setIsHidden(state => !state)
  }

  return (
    <Flex bgColor='gray.800' height='100vh' justifyContent='center' alignItems='center'>
      <Flex borderRadius={15} bgColor='gray.100' p={5} width='20%' justifyContent='center' alignItems='center' flexDirection='column'>
        <UnlockIcon color='orange.500' marginBottom={4} boxSize={16}/>
        <Text marginBottom={2} color='gray.800' fontSize='xl'>Change Password</Text>
        {/* form */}
        <form style={{ width: '100%' }}>
          <InputGroup marginTop={2} marginBottom={3}>
            <InputRightElement onClick={view} cursor='pointer' children={isHidden ? <ViewIcon/> : <ViewOffIcon/>}/>
            <Input fontFamily='calibri' fontWeight='md' type={!isHidden? 'text' : 'password'} placeholder='New password...' _placeholder={{
              color: 'gray.300',
              fontFamily: 'calibri',
              fontSize: 'md'
            }}
            _focus={{
              borderColor: pass.pass1.length < 8 ? 'red' : 'blue'
            }}
            value={pass.pass1}
            onChange={(e) => setPass(s => ({...s, pass1: e.target.value}))}
            name='email'
            required/>
          </InputGroup>
          <InputGroup marginTop={2} marginBottom={5}>
            <InputRightElement onClick={view} cursor='pointer' children={isHidden ? <ViewIcon/> : <ViewOffIcon/>}/>
            <Input fontFamily='calibri' fontWeight='md' type={!isHidden? 'text' : 'password'} placeholder='Confirm new password...' _placeholder={{
              color: 'gray.300',
              fontFamily: 'calibri',
              fontSize: 'md'
            }}
            _focus={{
              borderColor: (pass.pass1 !== pass.pass2) || !pass.pass2 ? 'red' : 'blue'
            }}
            value={pass.pass2}
            onChange={(e) => setPass(s => ({...s, pass2: e.target.value}))}
            name='email'
            required/>
          </InputGroup>
          <Button disabled={(pass.pass1 !== pass.pass2) || !pass.pass1 ? true: false} type='submit' width='100%' fontFamily='calibri' fontWeight='light' colorScheme='teal' onClick={clickSubmit}>SUBMIT</Button>
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