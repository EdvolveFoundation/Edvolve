import { getPublishedBlogs } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

const staticRoutes = [
  "",
  "/aboutPage",
  "/historyPage",
  "/visionMission",
  "/ourApproach",
  "/managementTeamPage",
  "/ReportsPublications",
  "/educationEmpowerment",
  "/agrodev",
  "/entrepreneurshipSkills",
  "/ruralEducational",
  "/MSMEDevelopment",
  "/ImpactPage",
  "/blog",
  "/ContactPage",
  "/RegisterPage",
];

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const pages = staticRoutes.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = (await getPublishedBlogs()).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
