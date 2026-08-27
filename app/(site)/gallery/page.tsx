import { galleryCategories, type GalleryCategory } from "@/data/gallery";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";

export const metadata = { title: "Gallery" };

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const category = (galleryCategories.includes(tag as GalleryCategory)
    ? tag
    : "All") as GalleryCategory;

  return (
    <PageContainer>
      <PageHeader
        title="Life Outside Code"
        subtitle="Original photographs — training, cars, campus, and the road."
      />
      <GalleryExplorer initialCategory={category} />
    </PageContainer>
  );
}
