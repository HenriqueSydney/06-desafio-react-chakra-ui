type imageProp = {
  src: string
  alt: string
}

export type CategoryProps = {
  title: string
  image: imageProp
}

export interface CategoryIconsProps {
  categories: CategoryProps[]
}
