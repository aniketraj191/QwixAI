import React from "react";

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/gradientBackground.png')" }}
      ></div>

      <div className="absolute inset-0 bg-white/45"></div>
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-[#243B6B]">
              About Qwix.ai
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-8 text-[#243B6B]">
              Qwix.ai is a modern AI-powered SaaS platform created to simplify
              content creation, visual editing, and productivity workflows
              through powerful and easy-to-use AI tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-[#243B6B]">
                What we offer
              </h2>
              <p className="text-[#243B6B] leading-8">
                Qwix.ai provides a complete suite of AI tools in one place,
                including article generation, blog title creation, image
                generation, background removal, object removal, and resume
                analysis. Instead of switching between multiple platforms, users
                can access everything through one smooth and modern interface.
              </p>
            </div>

            <div className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-[#243B6B]">
                Our vision
              </h2>
              <p className="text-[#243B6B] leading-8">
                Our vision is to build a clean, reliable, and scalable AI SaaS
                experience that helps users work smarter, create faster, and
                achieve more with confidence. We want Qwix.ai to feel not just
                powerful, but also intuitive, professional, and genuinely useful
                in real-world workflows.
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default About;