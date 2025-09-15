export type CategoryHero = {
  key: 'dresses' | 'pants' | 'skirts';
  label: string;
  image: string; // public path
};

export const categoryHeroImages: CategoryHero[] = [
  {
    key: 'dresses',
    label: 'DRESSES',
    image: '/section2-image.png',
  },
  {
    key: 'pants',
    label: 'PANTS',
    image: '/pant-2.jpg',
  },
  {
    key: 'skirts',
    label: 'SKIRTS',
    image: '/skirt-1.jpg',
  },
];


