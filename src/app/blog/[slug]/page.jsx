import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Calendar,
    Search,
  
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter
} from "react-icons/fa6";

import { blogPosts } from "@/data/blogPosts";

export default async function BlogPost({ params }) {

    const { slug } = await params;

    const post = blogPosts.find(
        (p) => p.slug === slug
    );

    if (!post) return notFound();

    const recentPosts = blogPosts
        .filter((item) => item.slug !== slug)
        .slice(0, 4);

    return (

        <main className="bg-[#f8f5f1]">

            {/* HERO */}

            <section className="relative h-[95vh]   overflow-visible">

                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                {/* FLOATING CARD */}

                <div className="
          absolute
          bottom-[-80px]
          left-1/2
          -translate-x-1/2
          w-full
          max-w-5xl
          px-6
        ">

                    <div className="
            bg-[#f8f5f1]
            p-10
            
          ">

                        <p className="
              uppercase
              tracking-[4px]
              text-xs
              text-[#572649]
              mb-5
            ">
                            {post.category}
                        </p>

                        <h1 className="
              font-serif
              text-4xl
              md:text-7xl
              leading-tight
              text-[#232323]
              
            ">
                            {post.title}
                        </h1>

                        <div className="
              flex
              items-center
              gap-3
              text-[#777]
            ">
                            <Calendar size={18} />
                            {post.date}
                        </div>

                    </div>

                </div>

            </section>

            {/* CONTENT */}

            <section className="pt-40 pb-24">

                <div className="
          max-w-[1450px]
          mx-auto
          px-6
        ">

                    <div className="
            grid
            lg:grid-cols-[2fr_420px]
            gap-20
          ">

                        {/* ARTICLE */}

                        <article>

                            {/* DROP CAP INTRO */}

                            <div className="mb-16">

                                {post.introduction?.map(
                                    (paragraph, index) => (
                                        <p
                                            key={index}
                                            className="
                        text-xl
                        leading-[2.2]
                        text-[#444]
                        mb-8
                        ml-4
                      "
                                        >

                                            {index === 0 && (

                                                <span className="
                          float-left
                          text-7xl
                          leading-none
                          mr-4
                          font-serif
                          text-[#572649]
                        ">
                                                    {paragraph.charAt(0)}
                                                </span>

                                            )}

                                            {index === 0
                                                ? paragraph.slice(1)
                                                : paragraph}

                                        </p>
                                    )
                                )}

                            </div>

                            {/* INLINE IMAGE */}

                            <div className="
                relative
                h-[550px]
                mb-20
                overflow-hidden
              ">

                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            {/* SECTIONS */}

                            <div className="space-y-20">

                                {post.sections?.map(
                                    (section, index) => (

                                        <div key={index}>

                                            <h2 className="
                        font-serif
                        text-4xl
                        md:text-5xl
                        mb-8
                        text-[#232323]
                      ">
                                                {section.heading}
                                            </h2>

                                            {section.content.map(
                                                (paragraph, i) => (

                                                    <p
                                                        key={i}
                                                        className="
                              text-lg
                              leading-[2.1]
                              text-[#444]
                              mb-8
                            "
                                                    >
                                                        {paragraph}
                                                    </p>

                                                )
                                            )}

                                        </div>

                                    )
                                )}

                            </div>

                            {/* QUOTE */}

                            <div className="
                my-24
                border-l-4
                border-[#572649]
                pl-10
              ">

                                <p className="
                  font-serif
                  italic
                  text-3xl
                  leading-relaxed
                  text-[#232323]
                ">
                                    Exceptional events are not
                                    remembered for perfection
                                    alone — they are remembered
                                    for emotion, atmosphere,
                                    and unforgettable experience.
                                </p>

                            </div>

                            {/* SHARE */}

                            <div className="
                border-t
                border-b
                py-10
                flex
                flex-wrap
                justify-between
                gap-8
                my-20
              ">

                                <div className="flex gap-3">

                                    <span className="
                    bg-[#ede7e2]
                    px-4
                    py-2
                  ">
                                        Event Planning
                                    </span>

                                    <span className="
                    bg-[#ede7e2]
                    px-4
                    py-2
                  ">
                                        Luxury Events
                                    </span>

                                </div>

                                <div className="flex gap-5">

                                    <FaFacebookF
                                        className="
      text-lg
      cursor-pointer
      hover:text-[#572649]
      transition
    "
                                    />

                                    <FaXTwitter
                                        className="
      text-lg
      cursor-pointer
      hover:text-[#572649]
      transition
    "
                                    />

                                    <FaInstagram
                                        className="
      text-lg
      cursor-pointer
      hover:text-[#572649]
      transition
    "
                                    />

                                </div>



                            </div>



                            {/* COMMENTS SECTION */}

                            <div className="mt-28">

                                <h2 className="
    font-serif
    text-4xl
    text-[#232323]
    mb-12
  ">
                                    Comments (2)
                                </h2>

                                {/* COMMENT 1 */}

                                <div className="
    flex
    gap-6
    border-b
    border-[#e7dfd8]
    pb-10
    mb-10
  ">

                                    <div className="
      w-20
      h-20
      rounded-full
      overflow-hidden
      relative
      shrink-0
    ">

                                        <Image
                                            src="/avatar1.png"
                                            alt="comment"
                                            fill
                                            className="object-cover"
                                        />

                                    </div>

                                    <div>

                                        <div className="
        flex
        flex-wrap
        gap-4
        items-center
        mb-4
      ">

                                            <h4 className="
          font-semibold
          text-lg
          text-[#232323]
        ">
                                                Sarah Williams
                                            </h4>

                                            <span className="
          text-sm
          text-[#777]
        ">
                                                June 02, 2026
                                            </span>

                                        </div>

                                        <p className="
        text-[#555]
        leading-9
        mb-5
      ">
                                            This article was incredibly insightful.
                                            The luxury event styling concepts
                                            and experiential approach were
                                            beautifully explained.
                                        </p>

                                        <button className="
        uppercase
        tracking-[3px]
        text-xs
        text-[#572649]
        hover:opacity-70
        transition
      ">
                                            Reply
                                        </button>

                                    </div>

                                </div>

                                {/* COMMENT 2 */}

                                <div className="
    flex
    gap-6
    pb-10
  ">

                                    <div className="
      w-20
      h-20
      rounded-full
      overflow-hidden
      relative
      shrink-0
    ">

                                        <Image
                                            src="/avatar2.png"
                                            alt="comment"
                                            fill
                                            className="object-cover"
                                        />

                                    </div>

                                    <div>

                                        <div className="
        flex
        flex-wrap
        gap-4
        items-center
        mb-4
      ">

                                            <h4 className="
          font-semibold
          text-lg
          text-[#232323]
        ">
                                                David James
                                            </h4>

                                            <span className="
          text-sm
          text-[#777]
        ">
                                                June 05, 2026
                                            </span>

                                        </div>

                                        <p className="
        text-[#555]
        leading-9
        mb-5
      ">
                                            I love the editorial presentation.
                                            Premium event experiences truly
                                            require this level of intentional
                                            planning and storytelling.
                                        </p>

                                        <button className="
        uppercase
        tracking-[3px]
        text-xs
        text-[#572649]
        hover:opacity-70
        transition
      ">
                                            Reply
                                        </button>

                                    </div>

                                </div>

                            </div>

                            {/* COMMENT FORM */}

                            <div className="mt-24">

                                <h2 className="
    font-serif
    text-4xl
    text-[#232323]
    mb-6
  ">
                                    Leave A Comment
                                </h2>

                                <p className="
    text-[#777]
    mb-12
  ">
                                    Your email address will not be published.
                                </p>

                                <form className="space-y-8">

                                    <div className="
      grid
      md:grid-cols-2
      gap-8
    ">

                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="
          w-full
          bg-white
          border
          border-[#e4ddd6]
          p-5
          outline-none
          focus:border-[#572649]
          transition
        "
                                        />

                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="
          w-full
          bg-white
          border
          border-[#e4ddd6]
          p-5
          outline-none
          focus:border-[#572649]
          transition
        "
                                        />

                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Website"
                                        className="
        w-full
        bg-white
        border
        border-[#e4ddd6]
        p-5
        outline-none
        focus:border-[#572649]
      "
                                    />

                                    <textarea
                                        rows={8}
                                        placeholder="Write your comment..."
                                        className="
        w-full
        bg-white
        border
        border-[#e4ddd6]
        p-5
        resize-none
        outline-none
        focus:border-[#572649]
      "
                                    />

                                    <button
                                        className="
        bg-[#232323]
        text-white
        px-10
        py-5

        uppercase
        tracking-[3px]
        text-sm

        hover:bg-[#572649]
        transition-all
        duration-500
      "
                                    >
                                        Post Comment
                                    </button>

                                </form>

                            </div>

                         

                        </article>



                        {/* SIDEBAR */}

                        <aside className="
              space-y-10
              lg:sticky
              lg:top-10
              h-fit
            ">

                            {/* SEARCH */}

                            <div className="
                bg-white
                p-8
                shadow-sm
              ">

                                <h3 className="
                  font-serif
                  text-2xl
                  mb-6
                ">
                                    Search
                                </h3>

                                <div className="relative">

                                    <input
                                        placeholder="Search..."
                                        className="
                      w-full
                      border
                      border-gray-200
                      p-4
                      pr-12
                      outline-none
                    "
                                    />

                                    <Search
                                        size={18}
                                        className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                    "
                                    />

                                </div>

                            </div>

                            {/* RECENT POSTS */}

                            <div className="
                bg-white
                p-8
              ">

                                <h3 className="
                  font-serif
                  text-2xl
                  mb-8
                ">
                                    Recent Posts
                                </h3>

                                <div className="space-y-8">

                                    {recentPosts.map((item) => (

                                        <Link
                                            key={item.slug}
                                            href={`/blog/${item.slug}`}
                                            className="
                        flex
                        gap-5
                        group
                      "
                                        >

                                            <div className="
                        relative
                        w-24
                        h-24
                        overflow-hidden
                      ">

                                                <Image
                                                    src={item.image}
                                                    alt=""
                                                    fill
                                                    className="
                            object-cover
                            group-hover:scale-110
                            duration-500
                          "
                                                />

                                            </div>

                                            <div>

                                                <p className="
                          text-sm
                          text-[#777]
                          mb-2
                        ">
                                                    {item.date}
                                                </p>

                                                <h4 className="
                          leading-snug
                          group-hover:text-[#572649]
                          duration-300
                        ">
                                                    {item.title}
                                                </h4>

                                            </div>

                                        </Link>

                                    ))}

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

        </main>

    );
}