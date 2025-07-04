import HeroSection from "@/components/section/hero";
import AppSection from "@/components/section/app";
import ProfileSection from "@/components/section/profile";
import ArticleSection from "@/components/section/article";
import Tour from "@/components/section/tour";
import Infografis from "@/components/section/infografis";

export async function generateMetadata() {
 return {
    description: "Website profile terintegrasi Kabupaten Muara Enim",
  }
}

export default function Home() {
  return (
      <>
        <HeroSection/>
        <AppSection/>
        <ProfileSection/>
        <ArticleSection/>
        <Infografis/>
        <Tour/>
      </>
  );
}
