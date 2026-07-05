"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Lightbulb,
  BookOpen,
  Target,
  Award,
  Sprout,
  ArrowRight,
} from "lucide-react";


const programs = [
  {
    icon: GraduationCap,
    title: "Student Development & Career Readiness",
    text:
      "We bridge the gap between academic learning and the employment market by equipping students with the knowledge, confidence, skills, and mindset required to succeed beyond the classroom.",
  },

  {
    icon: Users,
    title: "Mentorship & Talent Development",
    text:
      "We connect students, creatives, entrepreneurs, and young professionals with experienced mentors who provide guidance, direction, and support to help them make informed decisions.",
  },

  {
    icon: BookOpen,
    title: "Educational Development Reform",
    text:
      "We advocate for improved education systems and support initiatives that strengthen learning outcomes while empowering teachers through our train-the-trainers programs.",
  },

  {
    icon: Sprout,
    title: "Climate & Environmental Awareness",
    text:
      "We educate citizens about environmental responsibility, climate action, and sustainable practices that protect communities and future generations.",
  },
];



export default function educationEmpowerment(){


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

src="/edu6.jpeg"

alt="Education empowerment"

fill

className="
object-cover
"

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
w-full
">


<motion.div

initial={{
opacity:0,
y:60
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
text-yellow-700
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

Education &
<br/>
Empowerment

</h1>


<p className="
text-lg
md:text-xl
leading-9
text-gray-200
">

Building confident individuals by connecting education,
skills development, mentorship, and opportunities for
personal and societal transformation.

</p>


</motion.div>


</div>


</section>








{/* INTRODUCTION */}


<section className="
py-28
bg-white
">


<div className="
max-w-6xl
mx-auto
px-6
text-center
">


<GraduationCap

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

Preparing People For A Changing World

</h2>


<p className="
text-gray-600
text-lg
leading-9
">

The success of a student in today&apos;s competitive world requires
more than academic qualifications. It requires confidence,
practical knowledge, skills, mentorship, and the ability to
identify opportunities and create solutions.

</p>


<p className="
mt-6
text-gray-600
text-lg
leading-9
">

At Edvolve Foundation, we bridge the gap between the academic
world and the employment market by preparing individuals to
face real-life challenges beyond the school environment.

</p>


</div>


</section>








{/* MAIN CONTENT */}


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

src="/ab4.png"

alt="Students development"

fill

className="
object-cover
"

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
Our Approach
</p>


<h2 className="
text-5xl
font-serif
mb-7
">

Discovering Potential.
Developing Talent.

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

We help people discover their passion, develop their abilities,
and build the confidence required to make informed decisions
towards their ambitions.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through mentorship programs, we connect students, creatives,
and business owners with the right mentors so they do not have
to spend years navigating challenges alone.

</p>


</div>


</div>


</section>









{/* PROGRAM CARDS */}


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

Our Education Programs

</h2>


<p className="
mt-5
text-gray-600
text-lg
">

Creating pathways for learning, growth, and empowerment.

</p>


</div>





<div className="
grid
md:grid-cols-2
gap-8
">


{

programs.map((item,index)=>{


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









{/* TEACHERS SECTION */}


<section className="
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


<Award

size={45}

className="
text-yellow-700
mb-6
"

/>


<h2 className="
text-5xl
font-serif
mb-7
">

Supporting Teachers.
Strengthening Education.

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

We firmly believe every child has the right to quality
education and that education remains one of the strongest
foundations for national development.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through our teacher development programs, including our
train-the-trainers initiative, we support educators with
knowledge, tools, and approaches that improve learning
experiences.

</p>


</div>





<div className="
relative
h-[500px]
rounded-[40px]
overflow-hidden
">


<Image

src="/pic8.png"

alt="Teacher training"

fill

className="
object-cover
"

/>


</div>


</div>


</section>









{/* IMPACT */}


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
md:grid-cols-3
gap-10
text-center
">


<div>

<Target

size={45}

className="
mx-auto
mb-5
"

/>

<h3 className="
text-4xl
font-serif
mb-3
">
Empower
</h3>

<p className="
text-gray-300
">
Building confidence and self-reliance.
</p>

</div>





<div>

<Lightbulb

size={45}

className="
mx-auto
mb-5
"

/>

<h3 className="
text-4xl
font-serif
mb-3
">
Inspire
</h3>

<p className="
text-gray-300
">
Encouraging creativity and innovation.
</p>

</div>





<div>

<Users

size={45}

className="
mx-auto
mb-5
"

/>

<h3 className="
text-4xl
font-serif
mb-3
">
Transform
</h3>

<p className="
text-gray-300
">
Creating individuals who contribute to society.
</p>

</div>


</div>


</section>








{/* CTA */}


<section className="
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

Building The Next Generation Of Change Makers

</h2>


<p className="
text-gray-600
text-lg
leading-9
">

Through education, mentorship, skills development, and
community support, Edvolve Foundation continues to empower
people to discover their potential and create meaningful
impact.

</p>


<button className="
mt-10
inline-flex
items-center
gap-3
bg-yellow-700
text-white
px-8
py-4
rounded-full
">

Learn More

<ArrowRight size={18}/>

</button>


</div>


</section>



</main>

)

}
