import "./globals.css";

export const metadata = {
  title: "DevZisan | Web Developer",
  description:
    "A passionate Web Developer skilled in modern web technologies like React, Next.js, Node.js, MongoDB, and Tailwind CSS. Specialize in building SEO-friendly, fully responsive, and high-performance websites and web applications.",
  keywords: [
    "DevZisan",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "MongoDB",
    "Tailwind CSS",
    "Responsive Design",
    "SEO Friendly Websites",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "DevZisan", url: "https://new-protfolio-one.vercel.app/" }],
  creator: "DevZisan",
  publisher: "DevZisan",
  robots: "index, follow",
  openGraph: {
    title: "DevZisan | Web Developer",
    description:
      "Professional web development services with modern technologies like Next.js, React, and Node.js. Build fast, secure, and SEO-optimized websites with DevZisan.",
    url: "https://new-protfolio-one.vercel.app/",
    siteName: "DevZisan",
    images: [
      {
        url: "/me1.webp",
        width: 1200,
        height: 630,
        alt: "DevZisan Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/zisanlogo2.ico",
    shortcut: "/zisanlogo2.ico",
    apple: "/zisanlogo2.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
