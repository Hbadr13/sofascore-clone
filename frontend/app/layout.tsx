import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/homePage/Navbar";
import Footer from "@/components/homePage/Footer";
import PlayerStatisticCard, { } from '@/utils/playerStatisticCard'
import { PlayersStatisticCardsProvider } from "@/context/playersStatisticCardsContext";
import { WindowAttributesProvider } from "@/context/windowAttributes";
export const metadata: Metadata = {
  title: "Sofascore"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <body className="bg-[#edf1f6]">
        <WindowAttributesProvider>
          <PlayersStatisticCardsProvider>
            <PlayerStatisticCard />
            <Navbar />
            ==={process.env.NEXT_PUBLIC_BACKEND_URL}===
            {children}
            <Footer />
          </PlayersStatisticCardsProvider>
        </WindowAttributesProvider>
      </body>
    </html>
  );
}
