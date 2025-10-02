export const revalidate = 0;
export const dynamic = "force-dynamic";
import SectionPageView from "../_SectionPage";
export default async function Page({ params }: { params: { section: string } }) {
  const section = decodeURIComponent(params.section || "");
  return <SectionPageView section={section} />;
}