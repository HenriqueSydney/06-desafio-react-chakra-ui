import { CategoryProps } from '@/@types/CategoryIcons'
import { SlideContent } from '@/@types/Slides'
import { Banner } from '@/components/Banner'
import { CategoryIcons } from '@/components/CategoryIcons'
import { Header } from '@/components/Header'
import Slide from '@/components/Slide'
import { api } from '@/services/api'
import {
  Divider,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { readFile } from 'fs/promises'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import path from 'path'

interface HomeProps {
  continents: SlideContent[]
}

export default function Home({ continents }: HomeProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const categories: CategoryProps[] = [
    {
      title: 'vida noturna',
      image: {
        src: '/images/cocktail.png',
        alt: 'Cocktail',
      },
    },
    {
      title: 'praia',
      image: {
        src: '/images/surf.png',
        alt: 'Surf board',
      },
    },
    {
      title: 'moderno',
      image: {
        src: '/images/building.png',
        alt: 'Building',
      },
    },
    {
      title: 'clássico',
      image: {
        src: '/images/museum.png',
        alt: 'Museum',
      },
    },
    {
      title: 'e mais...',
      image: {
        src: '/images/earth.png',
        alt: 'Earth',
      },
    },
  ]

  return (
    <>
      <Head>
        <title>Worldtrip</title>
      </Head>
      <Header />
      <Banner />
      <Flex
        direction="column"
        align="center"
        justifyContent="center"
        mt={['9', '9', '20']}
      >
        <CategoryIcons categories={categories} />
        <Divider
          mt={['9', '9', '20']}
          w="90px"
          color="gray.400"
          borderWidth="2px"
        />
        <Stack
          justifyContent="center"
          textAlign="center"
          mt={['24px', '24px', '52px']}
        >
          <Text fontSize={['20px', '20px', '36px']} fontWeight="500">
            Vamos nessa?
          </Text>
          <Text fontSize={['20px', '20px', '36px']} fontWeight="500">
            Então escolha seu continente
          </Text>
        </Stack>
        <Flex
          mt={['5', '5', '13']}
          mb={['0', '0', '10']}
          maxW={isWideVersion ? '1240px' : '100%'}
        >
          <Slide slides={continents} />
        </Flex>
      </Flex>
    </>
  )
}

interface IBack4AppResponse {
  objectId: string
  name: string
  code: string
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/Continent?limit=10')

  const filePath = path.join(process.cwd(), 'src', 'data', 'imagesUrl.json')

  const imagesData = await readFile(filePath)

  const { continentImages } = JSON.parse(imagesData.toString())

  const continents: SlideContent[] = (data.results as IBack4AppResponse[]).map(
    ({ objectId, name, code }) => {
      return {
        continentId: objectId,
        title: name,
        description: 'Lorem ipsum dolor sit amet',
        image: {
          src: continentImages[name],
          alt: name,
        },
      }
    },
  )

  return {
    props: {
      continents,
    },
    redirect: 60 * 30,
  }
}
