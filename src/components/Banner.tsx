import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <Box height={['163px', '200px', '330px']}>
      <Box
        bgImage="/images/Background.png"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height="90%"
      >
        <Flex
          justify="space-between"
          maxW={1440}
          mx="auto"
          px={['4', '4', '10']}
          py={['7', '7', '10']}
        >
          <Stack spacing={[2, 8]}>
            <Heading color="gray.50" fontSize={['20px', '20px', '36px']}>
              5 Continentes,
              <br />
              infinitas possibilidades.
            </Heading>
            <Text color="gray.200" fontSize={['14px', '14px', '20px']}>
              Chegou a hora de tirar do papel a viagem
              <br />
              que você sempre sonhou.
            </Text>
          </Stack>
          {isWideVersion && (
            <Image
              alt="World trip logo"
              src="/images/Airplane.png"
              transform="rotate(5deg)"
            />
          )}
        </Flex>
      </Box>
    </Box>
  )
}
