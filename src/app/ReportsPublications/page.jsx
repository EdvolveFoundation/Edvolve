import {
    FileText,
    Download,
    BookOpen,
    BarChart3,
    FileSearch,
} from "lucide-react";
import { getReports } from "@/lib/content";

export const dynamic = "force-dynamic";

const researchAreas = [
    "Education & Human Capital Development",
    "Youth Empowerment",
    "Entrepreneurship & MSME Development",
    "Agricultural Innovation",
    "Advocacy & Governance",
    "Climate Action & Sustainability",
    "Community Development",
    "Gender Inclusion",
];

export default async function ReportsPublicationsPage() {
    const publications = await getReports();
    const organisationProfile =
        publications.find((item) =>
            item.title.toLowerCase().includes("profile")
        ) || publications[0];

    return (
        <main className="bg-white">
            {/* HERO */}
            <section className="relative h-[75vh] ">
                <img
                    src="/report.png"
                    alt="Reports and Publications"
                   className="absolute inset-0 h-full w-full object-cover object-[center_10%]"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="max-w-4xl px-6 text-center text-white">
                        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
                            Reports & Publications
                        </h1>

                        <p className="text-lg leading-relaxed md:text-2xl">
                            Explore our research, impact reports, program
                            outcomes, and publications that advance
                            education, empowerment, and social
                            transformation.
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Knowledge That Drives Impact
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                        At Edvolve Foundation, we believe that evidence,
                        research, and transparency are essential to
                        sustainable development. Our reports and
                        publications showcase lessons learned,
                        community impact, policy insights, and
                        innovative solutions developed through our
                        programs and partnerships.
                    </p>
                </div>
            </section>

            {/* PUBLICATIONS */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14 text-center">
                        <h2 className="text-4xl font-bold">
                            Featured Publications
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Reports, research papers, policy briefs, and
                            organizational publications.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {publications.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-yellow-700">
                                        {item.category}
                                    </span>

                                    <FileText className="text-yellow-600" />
                                </div>

                                <h3 className="text-2xl font-bold">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-gray-600">
                                    {item.description}
                                </p>

                                <div className="mt-8 flex items-center justify-between">
                                    <span className="font-medium text-gray-500">
                                        {item.year}
                                    </span>

                                    <a
                                        href={item.link || "#"}
                                        target={item.link ? "_blank" : undefined}
                                        rel={item.link ? "noopener noreferrer" : undefined}
                                        className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-5 py-3 text-white transition hover:bg-gray-900"
                                    >
                                        <Download size={18} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}

                        {!publications.length && (
                            <div className="rounded-3xl bg-white p-8 text-center text-gray-500 shadow-sm md:col-span-2">
                                No reports have been published yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>

          

            {/* RESEARCH AREAS */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14 text-center">
                        <h2 className="text-4xl font-bold">
                            Research & Focus Areas
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Areas where we generate insights, evidence,
                            and practical solutions.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {researchAreas.map((area) => (
                            <div
                                key={area}
                                className="rounded-2xl border border-gray-200 p-6 transition hover:border-yellow-700 hover:shadow-lg"
                            >
                                <BookOpen className="mb-4 text-yellow-600" />

                                <h3 className="font-semibold">
                                    {area}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RESOURCE LIBRARY */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14 text-center">
                        <h2 className="text-4xl font-bold">
                            Resource Library
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <BarChart3
                                className="mb-4 text-yellow-600"
                                size={40}
                            />

                            <h3 className="mb-3 text-xl font-bold">
                                Annual Reports
                            </h3>

                            <p className="text-gray-600">
                                Transparency, accountability, and annual
                                organizational performance reports.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <FileSearch
                                className="mb-4 text-yellow-600"
                                size={40}
                            />

                            <h3 className="mb-3 text-xl font-bold">
                                Policy Briefs
                            </h3>

                            <p className="text-gray-600">
                                Research-driven recommendations and
                                governance insights.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <BookOpen
                                className="mb-4 text-yellow-600"
                                size={40}
                            />

                            <h3 className="mb-3 text-xl font-bold">
                                Program Reports
                            </h3>

                            <p className="text-gray-600">
                                Impact assessments and learning outcomes
                                from foundation initiatives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-24 text-center text-white">
                <div className="mx-auto max-w-4xl px-6">
                    <h2 className="text-4xl font-bold">
                        Learn From Our Journey
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                        Access reports, publications, and resources
                        that highlight our commitment to education,
                        innovation, advocacy, and sustainable impact.
                    </p>

                    <a
                        href={organisationProfile?.link || "#"}
                        target={organisationProfile?.link ? "_blank" : undefined}
                        rel={organisationProfile?.link ? "noopener noreferrer" : undefined}
                        className="mt-10 inline-block rounded-full bg-yellow-600 px-8 py-4 font-semibold transition hover:bg-yellow-700"
                    >
                        Download Organisation Profile
                    </a>
                </div>
            </section>
        </main>
    );
}
