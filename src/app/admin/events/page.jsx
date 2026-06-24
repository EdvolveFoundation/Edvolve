"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Upload } from "lucide-react";

export default function AdminEventsPage() {

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title:"",
    category:"",
    date:"",
    location:"",
    image:"",
    description:"",
  });

  function handleChange(e){

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  // IMAGE PICKER

  function handleImageUpload(e){

    const file = e.target.files[0];

    if(!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setForm({
      ...form,
      image:imageUrl,
    });

  }

  function addEvent(e){

    e.preventDefault();

    if(
      !form.title ||
      !form.category ||
      !form.image
    ) return;

    const newEvent = {
      id:Date.now(),
      ...form,
    };

    setEvents([
      newEvent,
      ...events
    ]);

    setForm({
      title:"",
      category:"",
      date:"",
      location:"",
      image:"",
      description:"",
    });

  }

  function deleteEvent(id){

    setEvents(

      events.filter(
        event => event.id !== id
      )

    );

  }

  return (

    <main className="
      bg-[#f7f4f1]
      min-h-screen
      py-20
    ">

      <div className="
        max-w-[1500px]
        mx-auto
        px-6
      ">

        <h1 className="
          font-serif
          text-5xl
          mb-16
        ">
          Event Management
        </h1>

        <div className="
          grid
          lg:grid-cols-[500px_1fr]
          gap-16
        ">

          {/* FORM */}

          <div className="
            bg-white
            p-10
            shadow-sm
          ">

            <h2 className="
              font-serif
              text-3xl
              mb-10
            ">
              Add Event
            </h2>

            <form
              onSubmit={addEvent}
              className="space-y-6"
            >

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="inputAdmin border border-gray-200 py-4 pl-3"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="inputAdmin border border-gray-200 py-4 px-3 ml-2"
              >

                <option value="">
                  Select Category
                </option>

                <option>Wedding</option>
                <option>Corporate</option>
                <option>Social</option>
                <option>Memorial</option>

              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="inputAdmin border border-gray-200 py-4 px-3"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="inputAdmin border border-gray-200 py-4 pl-3 ml-2"
              />

              {/* FILE UPLOAD */}

              <label className="
                border-2
                border-dashed
                border-[#ddd]
                p-8
                cursor-pointer
                block
                text-center
                hover:border-[#572649]
                transition
              ">

                <Upload
                  size={35}
                  className="
                    mx-auto
                    mb-4
                    text-[#572649]
                  "
                />

                <p>
                  Choose Image From Device
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden "
                />

              </label>

              {/* PREVIEW */}

              {form.image && (

                <div className="
                  relative
                  h-[220px]
                ">

                  <Image
                    src={form.image}
                    alt="preview"
                    fill
                    unoptimized
                    className="
                      object-cover
                      rounded-lg
                    "
                  />

                </div>

              )}

              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="
                  inputAdmin
                  resize-none
                  border border-gray-200 py-4 pl-3 w-full
                "
              />

              <button className="
                bg-[#aa9e31]
                text-white
                w-full
                py-5

                flex
                items-center
                justify-center
                gap-4

                hover:bg-[#572649]
                transition
              ">

                <Plus size={18} />

                Add Event

              </button>

            </form>

          </div>

          {/* EVENTS */}

          <div>

            <h2 className="
              font-serif
              text-4xl
              mb-10
            ">
              Events
            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-8
            ">

              {events.map((event)=>(

                <div
                  key={event.id}
                  className="
                    bg-white
                    shadow-sm
                    overflow-hidden
                  "
                >

                  <div className="
                    relative
                    h-[260px]
                  ">

                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                  </div>

                  <div className="p-8">

                    <h3 className="
                      font-serif
                      text-3xl
                      mb-4
                    ">
                      {event.title}
                    </h3>

                    <p className="mb-2">
                      {event.category}
                    </p>

                    <p className="mb-2">
                      {event.date}
                    </p>

                    <p className="mb-6">
                      {event.location}
                    </p>

                    <button
                      onClick={()=>
                        deleteEvent(event.id)
                      }
                      className="
                        bg-red-500
                        text-white
                        px-6
                        py-3

                        flex
                        items-center
                        gap-3

                        hover:bg-red-600
                        transition
                      "
                    >

                      <Trash2 size={18}/>

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}