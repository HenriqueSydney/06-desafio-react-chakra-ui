import CitiesCards from '@/components/CitiesCards'
import { ContinentBanner } from '@/components/ContinentBanner'
import ContinentsSummaryCards from '@/components/ContinentsSummaryCards'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { readFile } from 'fs/promises'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import path from 'path'
import { ParsedUrlQuery } from 'querystring'

type ContinentsInfo = {
  mainInfo: string
  description: string
  hint?: string
}

type CitiesInfo = {
  city: string
  country: string
  cityImage: string
  flagImage: string
}

interface ContinentProps {
  continent: {
    name: string
    bannerImage: string
  }
  countries: CitiesInfo[]
  continentSummary: {
    totalOfCountries: number
    totalOfLanguageSpoken: number
    totalOfMostVisitedCitiesInTop100: number
  }
}

export default function Continent({
  continent,
  countries,
  continentSummary,
}: ContinentProps) {
  const continentsInfo: ContinentsInfo[] = [
    {
      mainInfo: String(continentSummary.totalOfCountries),
      description: 'países',
    },
    {
      mainInfo: String(continentSummary.totalOfLanguageSpoken),
      description: 'línguas',
    },
    {
      mainInfo: String(continentSummary.totalOfMostVisitedCitiesInTop100),
      description: 'cidades +100',
      hint: `Possui ${String(
        continentSummary.totalOfMostVisitedCitiesInTop100,
      )} cidades das 100 mais visitadas`,
    },
  ]

  return (
    <>
      <Head>
        <title>{`Worldtrip | ${continent.name}`}</title>
      </Head>
      <Header goBackButton />
      <ContinentBanner
        image={continent.bannerImage}
        continent={continent.name}
      />
      <Flex alignItems="center" justifyContent="center">
        <Stack mx={[4, 140]} mt={['6', '20']} maxW="1440px">
          <SimpleGrid
            columns={[1, 1, 1, 2]}
            spacingX="45px"
            spacingY={['4', '4', '45px']}
            alignItems="center"
          >
            <Box maxW="600px" mr={[0, 0, 70]}>
              <Text textAlign="justify" fontSize={['14px', '24px']}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                dolorum odit libero iste maxime laborum minus, aliquam aut
                voluptas obcaecati eos ex vitae nihil ab maiores culpa cumque
                laboriosam at!
              </Text>
            </Box>
            <Box>
              <ContinentsSummaryCards continentsSummaryInfo={continentsInfo} />
            </Box>
          </SimpleGrid>

          <Stack w="100%">
            <Flex mt={['8', '20']} justifyContent="center">
              <CitiesCards
                sectionHeading="Cidades +100"
                citiesInfo={countries}
              />
            </Flex>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

interface ICountryFlag {
  iso2: string
  flag: string
}

interface ICountry {
  objectId: string
  name: string
  capital: string
  code: string
}

interface Params extends ParsedUrlQuery {
  continent: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { continent } = params as Params

  const continentResponse = await api.get(`/Continent/${continent}?keys=name`)

  const continentName = continentResponse.data.name as string

  const where = encodeURIComponent(
    JSON.stringify({
      continent: {
        __type: 'Pointer',
        className: 'Continent',
        objectId: continent,
      },
    }),
  )

  const countriesResponse = await api.get(
    `/Country?count=1&limit=200&keys=name,emoji,code,capital&where=${where}`,
  )

  const { results, count } = countriesResponse.data

  const responseFlags = await api.get(
    'https://countriesnow.space/api/v0.1/countries/flag/images',
  )

  const flags = {} as any

  responseFlags.data.data.forEach(({ iso2, flag }: ICountryFlag) => {
    flags[iso2] = flag
  })
  const citiesInfo: CitiesInfo[] = results.map(
    ({ name, capital, code }: ICountry) => {
      return {
        country: name,
        city: capital,
        cityImage:
          'https://images.unsplash.com/photo-1484345293133-c0e58db02912?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        flagImage: flags[code] ? flags[code] : null,
      }
    },
  )

  const continentSummary = {
    totalOfCountries: count,
    totalOfLanguageSpoken: Math.floor(Math.random() * 20),
    totalOfMostVisitedCitiesInTop100: citiesInfo.length,
  }

  const filePathContinentImage = path.join(
    process.cwd(),
    'src',
    'data',
    'imagesUrl.json',
  )

  const imagesData = await readFile(filePathContinentImage)

  const { continentImages } = JSON.parse(imagesData.toString())

  return {
    props: {
      continent: {
        name: continentName,
        bannerImage: continentImages[continentName],
      },
      countries: citiesInfo,
      continentSummary,
    },
    redirect: 60 * 30,
  }
}
