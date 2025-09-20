// data/lookbookData.ts

export interface LookbookSection {
  material: string;
  images: string[];
}

export const lookbookData: LookbookSection[] = [
  {
    material: "COTTON - ADIRE",
    images: [
      "/loop-Cotton-Adire.png",
      "/loop-Cotton-Adire2.png",
      "/step-Cotton-Adire-Blue.png",
      "/step-Cotton-Adire-Blue2.jpg",
      "/loop-Cotton-Adire.png",
      "/loop-Cotton-Adire2.png",
    ],
  },
  {
    material: "STRETCH WOVEN",
    images: [
      "/coloumn-Cotton-Adire.jpg",
      "/coloumn-Cotton-Adire2.jpg",
      "/coloumn-Cotton-Adire3.jpg",
      "/coloumn-Stretch-Woven.jpg",
      "/coloumn-Stretch-Woven2.jpg",
      "/coloumn-Stretch-Woven3.jpg",
    ],
  },
  {
    material: "COTTON/LINEN",
    images: [
      "/clarinet-Cotton-Adire.jpg",
      "/clarinet-Cotton-Adire2.jpg",
      "/clarinet-Cotton-Adire3.jpg",
      "/clarinet-Stretch-Woven.jpg",
      "/clarinet-Stretch-Woven2.jpg",
      "/clarinet-Stretch-Woven3.jpg",
    ],
  },
];
