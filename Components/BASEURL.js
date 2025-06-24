const BASEURL = [
  'https://tinted-phantom-closet.glitch.me',
  'https://zenith-mysterious-shark.glitch.me',
  'https://mellow-fate-sandpaper.glitch.me',
  'https://capable-chrome-banjo.glitch.me',
  'https://materialistic-ginger-technician.glitch.me'
];

const ServerURL = BASEURL[Math.floor(Math.random() * BASEURL.length)];
const WebsiteURL = 'https://play2win.vercel.app';

export { ServerURL, WebsiteURL };
