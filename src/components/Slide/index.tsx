import { SlideProps } from '@/@types/Slides'
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './styles.module.scss'
import { Navigation, Pagination } from 'swiper'
import { theme } from '@/styles/theme'
import Link from 'next/link'

export default function Slide({ slides }: SlideProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        className={styles.container}
      >
        <Swiper
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
          style={{ width: '100%', height: isWideVersion ? '450px' : '250px' }}
          pagination={{
            clickable: true,
            renderBullet: function (_, className) {
              return `<span class="${className} ${styles.paginationBullet}"></span>`
            },
          }}
          scrollbar={{ draggable: true }}
          parallax={true}
        >
          <Box
            className="swiper-button-next"
            color={theme.colors.yellow['700']}
          ></Box>
          <Box
            className="swiper-button-prev"
            color={theme.colors.yellow['700']}
          ></Box>
          {slides.map(({ continentId, title, image, description }) => {
            return (
              <SwiperSlide key={title} className={styles.swiperSlide}>
                <Link
                  style={{ width: '100%' }}
                  href={{
                    pathname: `/continent/${continentId}`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    objectFit="cover"
                    display="block"
                    w="100%"
                    h="100%"
                  />
                </Link>
                <Box position="absolute">
                  <Heading
                    color="gray.50"
                    fontWeight={700}
                    fontSize={['24px', '48px']}
                  >
                    {title}
                  </Heading>
                  <Text
                    color="gray.50"
                    fontWeight={700}
                    fontSize={['14px', '24px']}
                    mt={4}
                  >
                    {description}
                  </Text>
                </Box>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Flex>
    </>
  )
}
