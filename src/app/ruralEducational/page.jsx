"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  School,
  Users,
  BookOpen,
  Lightbulb,
  Globe2,
  HeartHandshake,
  Target,
  ArrowRight
} from "lucide-react";



const pillars = [

{
icon: School,
title:"Improving Learning Outcomes",
text:
"REAP supports better learning experiences by introducing innovative teaching methods, practical learning tools, and approaches that recognise that every learner has different needs and abilities."
},


{
icon: Users,
title:"Inclusive Education",
text:
"We promote inclusion and diversity within rural schools by creating learning environments where every child has the opportunity to participate, grow and succeed regardless of background."
},


{
icon: BookOpen,
title:"Reducing School Dropout Rates",
text:
"We empower learners with engaging educational experiences that make school more enjoyable, improve motivation, encourage collaboration and strengthen commitment to learning."
},


{
icon: Lightbulb,
title:"Creative & Practical Learning",
text:
"We introduce creative approaches that encourage curiosity, problem-solving, critical thinking and confidence among students."
}

];




const impact=[

{
number:"2",
title:"Schools Equipped"
},

{
number:"645",
title:"Students Reached"
},


{
number:"2",
title:"Communities Impacted"
}

];





export default function ruralEducational(){


return (

<main className="bg-[#f8f7f4] text-gray-900">



{/* HERO */}


<section className="
relative
h-[750px]
flex
items-center
overflow-hidden
">


<Image

src="/ab5.png"

alt="Rural Education"

fill

className="object-cover"

/>



<div className="
absolute
inset-0
bg-black/60
"/>



<div className="
relative
max-w-7xl
mx-auto
px-6
text-white
">


<motion.div

initial={{
opacity:0,
y:70
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.8
}}

className="max-w-4xl"

>


<p className="
uppercase
tracking-[5px]
text-sm
text-yellow-300
mb-6
">

Our Initiative

</p>



<h1 className="
text-5xl
md:text-7xl
font-serif
leading-tight
mb-8
">

Rural Educational
<br/>
Advancement Program

</h1>



<p className="
text-lg
md:text-xl
leading-9
text-gray-200
">

Transforming rural education by creating inclusive learning
systems, improving educational outcomes and empowering
children with opportunities to reach their full potential.

</p>


</motion.div>


</div>


</section>









{/* INTRODUCTION */}



<section className="
bg-white
py-28
">


<div className="
max-w-6xl
mx-auto
px-6
text-center
">


<School

size={55}

className="
mx-auto
text-yellow-700
mb-7
"

/>



<h2 className="
text-5xl
font-serif
mb-8
">

Education As A Foundation For Change

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

The Rural Educational Advancement Program (REAP) was created
to address challenges affecting education in underserved rural
communities by improving access, participation and quality of
learning.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

At Edvolve Foundation, we believe every child deserves the
opportunity to receive quality education regardless of their
location or circumstances. Through REAP, we work with schools,
teachers, communities and stakeholders to create better learning
environments.

</p>


</div>


</section>









{/* IMAGE + TEXT */}



<section className="
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-14
items-center
">



<div className="
relative
h-[550px]
rounded-[40px]
overflow-hidden
">


<Image

src="/edu6.jpeg"

alt="Rural school"

fill

className="object-cover"

/>


</div>






<div>


<p className="
uppercase
tracking-[4px]
text-sm
text-yellow-700
mb-5
">

Our Mission

</p>



<h2 className="
text-5xl
font-serif
mb-7
">

Creating Opportunities For Every Child

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Many children in rural communities face barriers that affect
their educational development. REAP works to remove these
barriers by introducing engaging learning approaches, improving
school environments and supporting communities.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

We focus on creating learning experiences that inspire students,
encourage creativity and build confidence for future success.

</p>


</div>


</div>


</section>









{/* PILLARS */}



<section className="
bg-white
py-28
">


<div className="
max-w-7xl
mx-auto
px-6
">


<div className="
text-center
mb-16
">


<h2 className="
text-5xl
font-serif
">

Our Focus Areas

</h2>


<p className="
text-gray-600
mt-5
text-lg
">

Building stronger schools and empowered learners.

</p>


</div>





<div className="
grid
md:grid-cols-2
gap-8
">


{

pillars.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={index}

whileHover={{
y:-10
}}

className="
bg-[#f8f7f4]
rounded-3xl
p-10
"

>


<Icon

size={45}

className="
text-yellow-700
mb-6
"

/>



<h3 className="
text-3xl
font-serif
mb-5
">

{item.title}

</h3>



<p className="
text-gray-600
leading-8
">

{item.text}

</p>


</motion.div>


)


})

}


</div>


</div>


</section>









{/* COMMUNITY APPROACH */}



<section className="
bg-[#07130d]
text-white
py-28
">


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-14
items-center
">



<div>


<HeartHandshake

size={50}

className="mb-6"
/>



<h2 className="
text-5xl
font-serif
mb-8
">

Working With Communities

</h2>



<p className="
text-gray-300
text-lg
leading-9
">

Our approach involves working closely with local communities,
teachers and education stakeholders to understand challenges
and develop solutions that respond to real needs.

</p>



<p className="
mt-6
text-gray-300
text-lg
leading-9
">

Through collaboration, we promote ownership, sustainability and
long-term educational improvement.

</p>


</div>






<div className="
relative
h-[450px]
rounded-[40px]
overflow-hidden
">


<Image

src="/ab6.png"

alt="Community engagement"

fill

className="object-cover"

/>


</div>


</div>


</section>









{/* IMPACT */}



<section className="
bg-yellow-700
text-white
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-3
gap-10
text-center
">


{

impact.map((item,index)=>(


<div key={index}>


<h3 className="
text-6xl
font-serif
mb-4
">

{item.number}

</h3>


<p className="
text-xl
text-green-100
">

{item.title}

</p>


</div>


))

}


</div>


</section>









{/* SOCIAL AWARENESS */}



<section className="
py-28
">


<div className="
max-w-5xl
mx-auto
px-6
text-center
">


<Target

size={50}

className="
mx-auto
text-yellow-700
mb-6
"

/>



<h2 className="
text-5xl
font-serif
mb-8
">

Building Future Generations

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

REAP goes beyond classroom learning by addressing wider issues
affecting children including environmental awareness, gender
bias, stereotypes and community inclusion. Through creative
tools and educational activities, we help learners develop the
knowledge and confidence needed to contribute positively to
society.

</p>


</div>


</section>









{/* CTA */}



<section className="
bg-white
py-24
">


<div className="
max-w-5xl
mx-auto
px-6
text-center
">


<h2 className="
text-5xl
font-serif
mb-7
">

Supporting Education. Transforming Communities.

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Together with communities and partners, Edvolve Foundation is
building a future where every child has access to quality
education and the opportunity to achieve their dreams.

</p>



<button className="
mt-10
bg-yellow-700
text-white
px-8
py-4
rounded-full
inline-flex
items-center
gap-3
">

Support REAP

<ArrowRight size={18}/>

</button>


</div>


</section>


</main>

)

}