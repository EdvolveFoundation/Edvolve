"use client";

export default function DashboardStats({
  stats = {
    blogs: 0,
    staffs: 0,
    messages: 0,
    events: 0,
    registrations: 0,
  },
}) {

 const cards = [
  { title: "Blogs", value: stats.blogs ?? 0 },
  { title: "Staffs", value: stats.staffs ?? 0 },
  { title: "Messages", value: stats.messages ?? 0 },
  { title: "Events", value: stats.events ?? 0 },
  { title: "Registrations", value: stats.registrations ?? 0 },
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#353535] text-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-sm opacity-80">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
