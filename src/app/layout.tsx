import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/app-layout/header";
import Footer from "@/components/app-layout/footer";
import "./globals.css";
import Chatbot from "@/components/chatbot/chatbot";
import ClientWrapper from "@/components/shared/clientWrapper";
import SettingService from "@/services/controlers/setting/setting.service";
import Script from "next/script";
import FloatingWeatherButton from "@/components/weather/FloatingWeatherButton";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
   try {
    const logoResponse = await SettingService.getSetting (`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    const heroResponse = await SettingService.getSetting (`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    return {
      title: logoResponse?.data?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim",
      description: heroResponse?.data?.value?.title + heroResponse?.data?.value?.description || "Pemerintah Kabupaten Muara Enim",
      icons: {
        icon: [
          new URL(logoResponse?.data?.value?.imageUrl)
        ]
      },
    }
  } catch {
     return {
      title: process.env.NEXT_PUBLIC_VILLAGE_NAME || "Pemerintah Kabupaten Muara Enim",
      description: "Pemerintah Kabupaten Muara Enim",
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   let gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
    try {
      const villageId = process.env.NEXT_PUBLIC_VILLAGE_ID;
      const response = await SettingService.getSetting(`google-analytics-id-${villageId}`);
      if (response?.data?.value?.id) {
        gaId = response.data.value.id;
      }
    } catch (error) {
      console.error("Failed to fetch GA ID on server:", error);
    }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <GoogleAnalytics  gaId={gaId} />
          <div className="min-h-screen min-w-full bg-primary flex flex-col justify-between items-start w-full">
                <div className="absolute top-0 left-0 w-full z-50 ">
                  <Header />
                </div>
                <div className="flex justify-center mb-6 items-start w-full">
                  <div className="flex w-full flex-col justify-center items-center gap-y-6">
                    {children}
                  </div>
                </div>
                <Footer/>
            </div>
            <FloatingWeatherButton />
            <Chatbot/>
        </ClientWrapper>
        <Script
            src="https://website-widgets.pages.dev/dist/sienna.min.js"
            strategy="afterInteractive"
          />
      </body>
    </html>
  );
}
