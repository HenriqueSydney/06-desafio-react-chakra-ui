import { Flex, Icon, IconButton, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { FiChevronLeft } from 'react-icons/fi'

interface HeaderProps {
  goBackButton?: boolean
}

export function Header({ goBackButton = false }: HeaderProps) {
  const router = useRouter()

  function handleGoBack() {
    router.back()
  }

  return (
    <Flex
      as="header"
      w="100%"
      h={['50px', '50px', '100px']}
      align="center"
      justifyContent="center"
    >
      {goBackButton && (
        <IconButton
          aria-label="Go back"
          icon={<Icon as={FiChevronLeft} />}
          fontSize={['16px', '16px', '32px']}
          variant="unstyled"
          onClick={() => handleGoBack()}
          position="absolute"
          left={['16px', '16px', '140px']}
          top={['8px', '8px', '34px']}
        ></IconButton>
      )}
      <Image
        src="/images/logo.png"
        alt="Worldtrip Logo"
        w={['81px', '185px']}
      />
    </Flex>
  )
}
