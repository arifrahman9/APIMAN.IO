import { Flex, Text, Icon, Avatar, VStack, Box, HStack, StackDivider } from '@chakra-ui/react'
import { FcPortraitMode, FcOpenedFolder } from 'react-icons/fc'
import { BsFolderFill } from 'react-icons/bs'

export default function ProfilePage () {
  return (
    <Flex bgColor='gray.800' height='100vh' justifyContent='space-around' alignItems='center' width='100vw' position='relative' paddingY={10}>
      {/* Left container */}
      <Flex width='48%' minHeight='100%' position='static' top={0} left={0}>
        <Flex width='100%' alignItems='flex-start'>
          <Flex bgColor='gray.700' minWidth='100%' flexDirection='column' borderRadius={8} p={6}>
            {/* headers */}
            <Flex width='100%' justifyContent='center' alignItems='center' borderBottom='2px solid' borderColor='gray.200' paddingBottom={5} marginBottom={5}>
              <Icon as={FcPortraitMode} boxSize={6} marginRight={2}/>
              <Text color='gray.200' fontSize='xl'>Profile</Text>
            </Flex>
            {/* content profile */}
            <Flex width='100%' paddingX={8}>
              {/* Avatar */}
              <Flex>
                <Avatar boxSize='10em' src='https://bit.ly/broken-link' />
              </Flex>
              {/* Detail */}
              <VStack divider={<StackDivider borderColor='gray.600' />} width='100%' marginLeft={10} justifyContent='center' spacing={5}>
                <Box width='100%'>
                  <HStack justifyContent='flex-start' width='100%'>
                    <Text width='35%' color='gray.200' fontSize='lg' fontWeight='bold'>Username</Text>
                    <Text color='gray.300' fontFamily='calibri' fontWeight='light' fontSize='md'>JohnDoe123</Text>
                  </HStack>
                </Box>
                <Box width='100%'>
                  <HStack justifyContent='flex-start' width='100%'>
                    <Text width='35%' color='gray.200' fontSize='lg' fontWeight='bold'>Email</Text>
                    <Text color='gray.300' fontFamily='calibri' fontWeight='light' fontSize='md'>johndoe@gmail.com</Text>
                  </HStack>
                </Box>
                <Box width='100%'>
                  <HStack justifyContent='flex-start' width='100%'>
                    <Text width='35%' color='gray.200' fontSize='lg' fontWeight='bold'>Name</Text>
                    <Text color='gray.300' fontFamily='calibri' fontWeight='light' fontSize='md'>John Doe</Text>
                  </HStack>
                </Box>
              </VStack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Right container */}
      <Flex width='48%' minHeight='100%' position='static' top={0} right={0}>
        <Flex bgColor='gray.700' width='100%' borderRadius={8} p={6} flexDirection='column'>
          {/* headers */}
          <Flex alignSelf='flex-start' width='100%' justifyContent='center' alignItems='center' borderBottom='2px solid' borderColor='gray.200' paddingBottom={5} marginBottom={5}>
            <Icon as={FcOpenedFolder} boxSize={6} marginRight={2}/>
            <Text color='gray.200' fontSize='xl'>Collections</Text>
          </Flex>
          {/* Collection list */}
          <Flex paddingX={2}>
            <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column' margin={3}>
              <Icon as={BsFolderFill} color='teal.400' boxSize={8}/>
              <Text color='gray.200' fontFamily='calibri' marginTop={2}>Localhost1</Text>
            </Box>
            <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column' margin={3}>
              <Icon as={BsFolderFill} color='teal.400' boxSize={8}/>
              <Text color='gray.200' fontFamily='calibri' marginTop={2}>Localhost1</Text>
            </Box>
            <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column' margin={3}>
              <Icon as={BsFolderFill} color='teal.400' boxSize={8}/>
              <Text color='gray.200' fontFamily='calibri' marginTop={2}>Localhost1</Text>
            </Box>
            <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column' margin={3}>
              <Icon as={BsFolderFill} color='teal.400' boxSize={8}/>
              <Text color='gray.200' fontFamily='calibri' marginTop={2}>Localhost1</Text>
            </Box>
            <Box alignItems='center' justifyContent='center' display='flex' flexDirection='column' margin={3}>
              <Icon as={BsFolderFill} color='teal.400' boxSize={8}/>
              <Text color='gray.200' fontFamily='calibri' marginTop={2}>Localhost1</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}