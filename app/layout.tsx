import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/homePage/Navbar";
import Footer from "@/components/homePage/Footer";
import PlayerStatisticCard, { } from '@/utils/playerStatisticCard'
import { PlayersStatisticCardsProvider } from "@/context/playersStatisticCardsContext";
import { WindowAttributesProvider } from "@/context/windowAttributes";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Sofa",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className="bg-[#edf1f6]">
        <WindowAttributesProvider>
          <PlayersStatisticCardsProvider>
            <PlayerStatisticCard />
            <Navbar />
            {children}
            <Footer />
          </PlayersStatisticCardsProvider>
        </WindowAttributesProvider>
      </body>
    </html>
  );
}
