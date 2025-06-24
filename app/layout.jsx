import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/Components/NavbarComponent";
import { AuthProvider } from "@/Components/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Loading...",
  icons: {
    icon: "/favicon.ico", // You can also use PNG or other image formats
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            data-purpose="Layout StyleSheet"
            title="Web Awesome"
            href="/css/app-wa-fba26eda6a3fd6b4d0ce0def1e2ba1d7.css?vsn=d"
          />

          <link
            rel="stylesheet"
            href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css"
          />

          <link
            rel="stylesheet"
            href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-thin.css"
          />

          <link
            rel="stylesheet"
            href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-solid.css"
          />

          <link
            rel="stylesheet"
            href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-regular.css"
          />

          <link
            rel="stylesheet"
            href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavbarComponent />
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
