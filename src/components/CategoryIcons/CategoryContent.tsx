import { Text, Flex, Image } from '@chakra-ui/react'

type imageProp = {
  src: string
  alt: string
}

interface CategoryContentProps {
  image: imageProp
  children: string
}

export function CategoryContent({
  image,
  children,
  ...rest
}: CategoryContentProps) {
  return (
    <Flex direction="column" justify="center" align="center" {...rest}>
      <Image src={image.src} alt={image.alt} />
      <Text fontWeight="600" fontSize="24px" mt="6">
        {children}
      </Text>
    </Flex>
  )
}
