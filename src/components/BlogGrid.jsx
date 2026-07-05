import BlogCard from "./BlogCard";

export default function BlogGrid({
    posts = [],
}) {
    return (
        <section className="py-24 px-6 bg-white">


            <div className="
                flex
                flex-col
                items-center
                justify-center
                mb-20
                text-center
            ">


                <p className="
                    uppercase
                    tracking-[4px]
                    text-sm
                    text-yellow-700
                    mb-6
                    font-medium
                ">
                    KNOWLEDGE & IMPACT STORIES
                </p>



                <h1 className="
                    text-5xl
                    md:text-7xl
                  
                    text-[#1d1820]
                    max-w-5xl
                    mx-auto
                    leading-[1]
                ">
                    Insights, Research & Stories Driving Social Change
                </h1>



                <p className="
                    mt-10
                    text-lg
                    text-gray-600
                    max-w-3xl
                    mx-auto
                    leading-relaxed
                ">
                    Explore ideas, community stories, development insights and
                    impact updates from Edvolve Foundation. Discover how education,
                    entrepreneurship, agriculture and social innovation are creating
                    opportunities and transforming lives.
                </p>


            </div>





            <div className="
                max-w-[1450px]
                mx-auto
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-14
            ">

                {posts.map((post) => (

                    <BlogCard 
                        key={post.slug}
                        post={post} 
                    />

                ))}

                {!posts.length && (
                    <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
                        No blog posts have been published yet.
                    </div>
                )}

            </div>


        </section>
    );
}
