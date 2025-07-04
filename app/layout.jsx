import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/Components/NavbarComponent";
import { AuthProvider } from "@/Components/authContext";
import { WebsiteURL } from "@/Components/BASEURL";
import { cookies, headers } from "next/headers";
import EncryptText from "@/Components/encryptText";
import { redirect } from "next/navigation";

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
async function GetStatus(status, Password, Email) {
  if (status == 'LoggedIn') {
    const response = await fetch(`${WebsiteURL}/api/GetUserPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: Email,
        Password: Password
      })
    })
    const res = await response.json()
    if (res.message == 'Correct Password') {
      return { status: 'LoggedIn', Points: res.Points };
    } else if (res.message = 'Incorrect Password') {
      return { status: 'None' };
    }
  } else {
    return { status: 'None' };
  }
}
export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const headersList = headers();
  const Username = EncryptText.get(cookieStore.get('Username')?.value || null);
  const status = EncryptText.get(cookieStore.get('status')?.value || null);
  const Email = EncryptText.get(cookieStore.get('Email')?.value || null);
  const Color = EncryptText.get(cookieStore.get('Color')?.value || null);
  const Password = EncryptText.get(cookieStore.get('Password')?.value || null)
  let Points = 0
  const getstatus = await GetStatus(status, Password, Email)
  const pathname = headersList.get('x-pathname')
  console.log(pathname);
  if (pathname !== null && getstatus.status !== 'LoggedIn') {
    redirect('/Login');
  }
  if (getstatus.status == 'LoggedIn') {
    Points = getstatus.Points
  }

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
          <NavbarComponent Status={getstatus.status} Username={Username} Email={Email} Color={Color} Points={Points} />
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
