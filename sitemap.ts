import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://melodypass.vercel.app";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: new Date(),
    },
  ];
}
