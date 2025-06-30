import Script from "next/script";

export default function Head() {
  return (
    <>
      <meta name="google-adsense-account" content="ca-pub-4969686146359420" />
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4969686146359420"
        crossOrigin="anonymous"
      />
    </>
  );
}