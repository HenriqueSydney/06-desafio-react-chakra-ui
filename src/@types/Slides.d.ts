import { ImageProps } from './Image'

export type SlideContent = {
  continentId: string
  image: ImageProps
  title: string
  description: string
}

export interface SlideProps {
  slides: SlideContent[]
}
