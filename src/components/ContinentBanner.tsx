import { Box, Flex, Heading } from '@chakra-ui/react'

interface ContinentBannerProps {
  image: string
  continent: string
}

export function ContinentBanner({ continent, image }: ContinentBannerProps) {
  return (
    <Box
      bgImage={image}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      height={['150px', '150px', '500px']}
    >
      <Flex
        alignItems={['center', 'center', 'flex-end']}
        justifyContent={['center', 'center', 'flex-start']}
        height={['150px', '150px', '500px']}
        ml={['0', '0', '140px']}
        pb={['0', '0', '60px']}
      >
        <Heading color="gray.50" fontSize={['28px', '36px']}>
          {continent}
        </Heading>
      </Flex>
    </Box>
  )
}
