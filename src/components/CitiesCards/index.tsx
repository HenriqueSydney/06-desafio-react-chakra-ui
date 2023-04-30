import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'

type CitiesInfo = {
  city: string
  country: string
  cityImage: string
  flagImage: string
}

interface CitiesCardsProps {
  sectionHeading: string
  citiesInfo: CitiesInfo[]
}

export default function CitiesCards({
  sectionHeading,
  citiesInfo,
}: CitiesCardsProps) {
  return (
    <Stack alignItems="flex-start" justify="flex-start" mb="10">
      <Heading mb="10">{sectionHeading}</Heading>
      <Stack px={['10', '0']} mt="40">
        <SimpleGrid columns={[1, 1, 2, 2, 3, 4]} spacing="45px">
          {citiesInfo.map(
            ({ city, country, cityImage, flagImage }: CitiesInfo) => (
              <Flex minW="256px" key={city}>
                <Box w="100%" h="100%">
                  <Image
                    src={cityImage}
                    alt={city}
                    h="173px"
                    w="100%"
                    objectFit="cover"
                    borderRadius="4px 4px 0 0"
                  />
                  <Box
                    borderColor="yellow.700"
                    borderWidth="0 1px 1px 1px"
                    borderRadius="0 0 4px 4px"
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      mx="6"
                    >
                      <Box my="18px">
                        <Heading
                          fontWeight="600"
                          fontSize="20px"
                          lineHeight="25px"
                        >
                          {city}
                        </Heading>
                        <Text mt="4" color="gray.300" noOfLines={1}>
                          {country}
                        </Text>
                      </Box>
                      <Avatar src={flagImage} name={city} size="xs" />
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ),
          )}
        </SimpleGrid>
      </Stack>
    </Stack>
  )
}
