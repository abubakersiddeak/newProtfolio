import "./globals.css";
import AuthSessionProvider from "./components/AuthSessionProvider";

export const metadata = {
  metadataBase: new URL("https://new-protfolio-one.vercel.app/"), // NOTE: Update this to your custom domain when you get one!

  title: {
    default: "DevZisan | Full Stack Web Developer",
    template: "%s | DevZisan", // If you add other pages, their titles will look like "About | DevZisan"
  },

  description:
    "Elevate your web presence with DevZisan. A Full Stack Developer specializing in Next.js, React, Node.js, and modern UI/UX. Building fast, SEO-friendly, and responsive websites.",

  applicationName: "DevZisan Portfolio",

  keywords: [
    "DevZisan",
    "Full Stack Developer",
    "MERN Stack Developer", // Added
    "Next.js Expert", // Stronger wording
    "React.js",
    "Node.js",
    "Tailwind CSS",
    "Web Development Services", // Intent-based keyword
    "Bangladesh", // OPTIONAL: Add your location if you want local clients
    "Freelance Web Developer", // Intent-based keyword
  ],

  authors: [{ name: "DevZisan", url: "https://new-protfolio-one.vercel.app/" }],
  creator: "DevZisan",
  publisher: "DevZisan",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "DevZisan | Full Stack Web Developer",
    description:
      "Looking for a modern website? I build high-performance, SEO-optimized web applications using Next.js, React, and Node.js. Let's build something amazing together.",
    url: "https://new-protfolio-one.vercel.app/",
    siteName: "DevZisan Portfolio",
    images: [
      {
        url: "/me1.webp", // Ensure this image is 1200x630px for best results
        width: 1200,
        height: 630,
        alt: "DevZisan - Full Stack Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevZisan | Full Stack Web Developer",
    description:
      "Professional web development services with Next.js, React, and Node.js.",
    creator: "@yourtwitterhandle", // REPLACE THIS with your actual Twitter handle
    images: ["/me1.webp"],
  },

  icons: {
    icon: "/zisanlogo2.ico",
    shortcut: "/zisanlogo2.ico",
    apple: "/zisanlogo2.ico",
  },

  // Verification for Google Search Console (Highly Recommended)
  verification: {
    google: "your-google-verification-code-here",
    // yandex: "yandex-verification-code",
  },

  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
