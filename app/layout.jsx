import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/Components/NavbarComponent";
import { AuthProvider } from "@/Components/authContext";
import { WebsiteURL } from "@/Components/BASEURL";
import { cookies } from "next/headers";
import EncryptText from "@/Components/encryptText";

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
    icon: "/favicon.ico",
  },
};
async function fetchPoints(Email) {
  const Pointsres = await fetch(`${WebsiteURL}/api/getPoints?Email=${Email}`),
    User = await Pointsres.json()
  return User
}
export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const Username = EncryptText.get(cookieStore.get('Username')?.value || null);
  const status = EncryptText.get(cookieStore.get('status')?.value || null);
  const Email = EncryptText.get(cookieStore.get('Email')?.value || null);
  const Color = EncryptText.get(cookieStore.get('Color')?.value || null);
  const Points = await fetchPoints(Email)
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
          <NavbarComponent Status={status} Username={Username} Email={Email} Color={Color} Points={Points} />
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
