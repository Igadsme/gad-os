export type GalleryCategory =
  | "All"
  | "Campus"
  | "Automotive"
  | "Travel"
  | "Training";

export type GalleryItem = {
  id: string;
  title: string;
  location?: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  alt: string;
};

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Campus",
  "Automotive",
  "Travel",
  "Training",
];

export const gallery: GalleryItem[] = [
  {
    id: "ksu-deadlift",
    title: "Training at KSU",
    location: "Kennesaw State University",
    category: "Training",
    src: "/gallery/ksu-training.jpg",
    alt: "Deadlift session in the Kennesaw State University gym",
  },
  {
    id: "track-mustang",
    title: "Weekend at the cars",
    location: "Atlanta, GA",
    category: "Automotive",
    src: "/gallery/mustang.jpg",
    alt: "Blue modified Mustang at an outdoor car meet",
  },
  {
    id: "highway-sunset",
    title: "Sunset on the road",
    location: "Georgia",
    category: "Travel",
    src: "/gallery/highway-sunset.jpg",
    alt: "Sunset viewed through a car windshield on the highway",
  },
  {
    id: "downtown-dusk",
    title: "Brick street at dusk",
    location: "Georgia",
    category: "Travel",
    src: "/gallery/downtown-dusk.jpg",
    alt: "Historic brick storefronts and street at dusk",
  },
  {
    id: "downtown-sunset",
    title: "Downtown color",
    location: "Georgia",
    category: "Travel",
    src: "/gallery/downtown-sunset.jpg",
    alt: "Downtown street under a pink and orange sunset",
  },
  {
    id: "portrait",
    title: "Portrait",
    location: "Atlanta, GA",
    category: "Campus",
    src: "/images/profile.jpg",
    alt: "Portrait of Imani Gad in a suit",
  },
];
