import { Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

export default function HomePage () {
  // Buat itung container
  const navbar = useRef(null)
  const body = useRef(null)
  const [containerHeight, setConteinerHeight] = useState(0)
  
  useEffect(() => {
    // letakkan pertama kali
    setConteinerHeight(body.current.offsetHeight - navbar.current.offsetHeight)
  }, [])

  return (
    <Flex ref={body} bgColor='gray.800' minHeight='100vh' width='100vw' flexDirection='column'>
      <Flex bgColor='gray.700' ref={navbar}>
        {/* Ganti element di bawah ini dengan navbar */}
        <Flex height='100px' />
      </Flex>
      <Flex bgColor='gray.800' flex={1}>
        {/* Kirin + pengaturan tinggi*/}
        <Flex flex={1} p={3} maxHeight={containerHeight}>
          <Flex width='100%' bgColor='red.500'>
            {/* <Flex height='2000px' width='90%' bgColor='yellow.600'>
                ganti dengan component
            </Flex> */}
          </Flex>
        </Flex>
        {/* Tengah + pengaturan tinggi*/}
        <Flex flex={1} p={3} maxHeight={containerHeight}>
          <Flex width='100%' bgColor='green.500' flexDirection='column'>
            {/* Tengah atas */}
            <Flex height='50%' width='100%' bgColor='purple'>

            </Flex>
            {/* Tengah bawah */}
            <Flex height='50%' width='100%' bgColor='teal'>

            </Flex>
          </Flex>
        </Flex>
        {/* Kanan + pengaturan tinggi*/}
        <Flex flex={1} p={3} maxHeight={containerHeight}>
          <Flex width='100%' bgColor='yellow.500'>

          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}