import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/app-layout/header";
import Footer from "@/components/app-layout/footer";
import "./globals.css";
import Chatbot from "@/components/chatbot/chatbot";
import ClientWrapper from "@/components/shared/clientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <div className="min-h-screen min-w-full bg-primary flex flex-col justify-between items-start w-full overflow-x-hidden">
                <div className="absolute top-0 left-0 w-full z-50 ">
                  <Header />
                </div>
                <div className="flex justify-center mb-6 items-start w-full">
                  <main className="flex w-full flex-col justify-center items-center gap-y-6">
                    {children}
                  </main>
                </div>
                <Footer/>
            </div>
            <Chatbot/>
        </ClientWrapper>
      </body>
    </html>
  );
}
