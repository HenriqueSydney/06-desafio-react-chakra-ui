import {
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CategoryContent } from './CategoryContent'
import { CategoryIconsProps } from '@/@types/CategoryIcons'
import { VscCircleFilled } from 'react-icons/vsc'

export function CategoryIcons({ categories }: CategoryIconsProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  if (isWideVersion) {
    return (
      <Stack direction={['column', 'column', 'row']}>
        <SimpleGrid columns={[3, 3, 3, 4, 5]} spacing="120px">
          {categories.map((category) => (
            <CategoryContent key={category.title} image={category.image}>
              {category.title}
            </CategoryContent>
          ))}
        </SimpleGrid>
      </Stack>
    )
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <SimpleGrid columns={[2, 4]} spacing="30px">
        {categories.map((category) => (
          <HStack key={category.title} alignItems="center">
            <Icon as={VscCircleFilled} fontSize="16px" color="yellow.700" />
            <Text fontSize="18px" fontWeight="500">
              {category.title}
            </Text>
          </HStack>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
