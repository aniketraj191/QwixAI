import { assets } from "../assets/assets";

const Testimonial = () => {
  const dummyTestimonialData = [
  {
    image:
      "https://images.unsplash.com/photo-1723990720514-65968a7d517b?q=80&w=779&auto=format&fit=crop",
    name: "Jignesh Patel",
    title: "Marketing Director, TechCorp",
    content:
      "QwixAI has completely streamlined our marketing campaigns. We now generate engaging blog posts and ad copies in minutes instead of hours.",
    rating: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Suraj Mehta",
    title: "Content Creator, TechCorp",
    content:
      "As a creator, speed matters a lot. QwixAI helps me brainstorm ideas, write scripts, and polish content without creative burnout.",
    rating: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1758518729459-235dcaadc611?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sarah Lee",
    title: "Content Writer, TechCorp",
    content:
      "What I love most is the consistency. QwixAI maintains tone, improves clarity, and helps me meet tight deadlines with confidence.",
    rating: 4,
  },
];

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Loved by Creators
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center">
        {dummyTestimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer"
          >
            {/* ⭐ Stars */}
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < testimonial.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    className="w-4 h-4"
                    alt="star"
                  />
                ))}
            </div>

            {/* 💬 Content */}
            <p className="text-gray-500 text-sm my-5">
              "{testimonial.content}"
            </p>

            <hr className="mb-5 border-gray-300" />

            {/* 👤 Profile */}
            <div className="flex items-center gap-4">
              {/* ✅ FIXED IMAGE SIZE */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={testimonial.image}
                  className="w-full h-full object-cover"
                  alt={testimonial.name}
                />
              </div>

              <div className="text-sm text-gray-600">
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-xs text-gray-500">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;