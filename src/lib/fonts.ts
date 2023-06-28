import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Poppins as PoppinsSerif,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontSerif = PoppinsSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
