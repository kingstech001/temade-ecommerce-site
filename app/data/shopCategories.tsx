export type CategoryImage = {
  src: string;
  alt: string;
  name: string;
};

export const baseCategoryImages: Record<string, CategoryImage[]> = {
  Dresses: [
    { src: "/Rectangle.jpg", alt: "Dress 1", name: "Floral Dress" },
    { src: "/Rectangle-2.jpg", alt: "Dress 2", name: "Casual Maxi" },
    { src: "/Rectangle-3.jpg", alt: "Skirt 1", name: "Pleated Skirt" },
  ],
  Skirts: [
    { src: "/Rectangle.jpg", alt: "Dress 1", name: "Floral Dress" },
    { src: "/Rectangle-2.jpg", alt: "Dress 2", name: "Casual Maxi" },
    { src: "/Rectangle-3.jpg", alt: "Skirt 1", name: "Pleated Skirt" },
  ],
  Tops: [
    { src: "/Rectangle.jpg", alt: "Dress 1", name: "Floral Dress" },
    { src: "/Rectangle-2.jpg", alt: "Dress 2", name: "Casual Maxi" },
    { src: "/Rectangle-3.jpg", alt: "Skirt 1", name: "Pleated Skirt" },
  ],
  Pants: [
    { src: "/Rectangle.jpg", alt: "Dress 1", name: "Floral Dress" },
    { src: "/Rectangle-2.jpg", alt: "Dress 2", name: "Casual Maxi" },
    { src: "/Rectangle-3.jpg", alt: "Skirt 1", name: "Pleated Skirt" },
  ],
  "The Wholeness Collection": [
    { src: "/Rectangle.jpg", alt: "Dress 1", name: "Floral Dress" },
    { src: "/Rectangle-2.jpg", alt: "Dress 2", name: "Casual Maxi" },
    { src: "/Rectangle-3.jpg", alt: "Skirt 1", name: "Pleated Skirt" },
  ],
};

// Flatten for "All" category
export const categoryImages: Record<string, CategoryImage[]> = {
  All: Object.values(baseCategoryImages).flat(),
  ...baseCategoryImages,
};

// List of categories for navigation/buttons
export const categories: string[] = Object.keys(categoryImages);
