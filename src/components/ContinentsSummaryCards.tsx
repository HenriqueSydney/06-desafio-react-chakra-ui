import { Box, Flex, Heading, Stack, Text, Tooltip } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'

type ContinentsSummaryInfo = {
  mainInfo: string
  description: string
  hint?: string
}

interface ContinentsSummaryCardsProps {
  continentsSummaryInfo: ContinentsSummaryInfo[]
}

export default function ContinentsSummaryCards({
  continentsSummaryInfo,
}: ContinentsSummaryCardsProps) {
  return (
    <Stack alignItems="space-between">
      <Stack direction="row" justifyContent="space-between" maxW={490}>
        {continentsSummaryInfo.map(({ description, mainInfo, hint }) => (
          <Flex
            direction="column"
            justify="center"
            align={['flex-start', 'flex-start', 'center']}
            minW="100px"
            key={description}
          >
            <Heading
              color="yellow.700"
              fontWeight="bold"
              fontSize={['30px', '30px', '48px']}
            >
              {mainInfo}
            </Heading>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize={['16px', '16px', '24px']}>{description}</Text>
              {hint && (
                <Box ml="1">
                  <Tooltip label={hint} color="gray.50" bg="gray.400">
                    <Box
                      as="span"
                      color="gray.300"
                      fontSize={['xs', 'xs', 'md']}
                    >
                      <FiInfo />
                    </Box>
                  </Tooltip>
                </Box>
              )}
            </Flex>
          </Flex>
        ))}
      </Stack>
    </Stack>
  )
}
