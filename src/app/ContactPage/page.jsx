"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-[#f8f5f1]">

            {/* HERO */}
            <section className="text-center py-28 px-6 bg-white">
                <p className="uppercase tracking-[4px] text-sm text-[#b58e6f] mb-4">
                    Get In Touch
                </p>

                <h1 className="text-5xl md:text-7xl font-serif text-[#231b1c] leading-tight">
                    Let’s Build Something Meaningful
                </h1>

                <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                    Reach out to us for partnerships, inquiries, collaborations,
                    or general questions. We usually respond within 24–48 hours.
                </p>
            </section>

            {/* CONTACT INFO */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

                    <div className="bg-white p-8 text-center shadow-sm border-t-4 border-[#b58e6f]">
                        <Mail className="mx-auto text-[#b58e6f]" size={30} />
                        <h3 className="mt-4 font-semibold text-xl">Email</h3>
                        <p className="text-gray-600 mt-2">Info@edvolvefoundation.org</p>
                    </div>

                    <div className="bg-white p-8 text-center shadow-sm border-t-4 border-[#b58e6f]">
                        <Phone className="mx-auto text-[#b58e6f]" size={30} />
                        <h3 className="mt-4 font-semibold text-xl">Phone</h3>
                        <p className="text-gray-600 mt-2">+2349034869902</p>
                        <p className="text-gray-600 mt-2">+2349036465479</p>
                        <p className="text-gray-600 mt-2">+2348163770808</p>
                    </div>

                    <div className="bg-white p-8 text-center shadow-sm border-t-4 border-[#b58e6f]">
                        <MapPin className="mx-auto text-[#b58e6f]" size={30} />
                        <h3 className="mt-4 font-semibold text-xl">Office</h3>
                        <p className="text-gray-600 mt-2">
                            2nd Floor, Shippers Plaza<br />
                            Wuse Zone 5, Abuja
                        </p>
                    </div>

                </div>
            </section>

            {/* MAP SECTION */}
            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-serif text-[#231b1c] mb-6 text-center">
                        Find Us Here
                    </h2>

                    <iframe
                        src="https://www.google.com/maps?q=Shippers%20Plaza%20Wuse%20Zone%205%20Abuja&output=embed"
                        width="100%"
                        height="450"
                        loading="lazy"
                        className="rounded-xl border-2 border-[#b58e6f] shadow-lg"
                    ></iframe>

                    <div className="text-center mt-8">
                        <a
                            href="https://www.google.com/maps?q=Shippers%20Plaza%20Wuse%20Zone%205%20Abuja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 bg-[#b58e6f] text-white uppercase tracking-[3px] text-sm hover:bg-[#9c764f] transition"
                        >
                            Open in Google Maps
                        </a>
                    </div>

                </div>
            </section>

            {/* CONTACT FORM */}
            <section className="pb-28 px-6">
                <div className="max-w-4xl mx-auto bg-white p-10 shadow-sm">

                    <h2 className="text-3xl font-serif text-center mb-10">
                        Send Us a Message
                    </h2>

                    <form className="space-y-6">

                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-200 p-4 focus:border-[#b58e6f] outline-none"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full border border-gray-200 p-4 focus:border-[#b58e6f] outline-none"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full border border-gray-200 p-4 focus:border-[#b58e6f] outline-none"
                        />

                        <textarea
                            rows={6}
                            placeholder="Your Message"
                            className="w-full border border-gray-200 p-4 focus:border-[#b58e6f] outline-none resize-none"
                        />

                        <button
                            className="w-full bg-[#b58e6f] text-white py-4 uppercase tracking-[3px] text-sm hover:bg-[#9c764f] transition"
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </section>

        </main>
    );
}