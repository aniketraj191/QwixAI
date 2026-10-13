import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const companyLogos = [
  {
    name: "slack",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg",
  },
  {
    name: "framer",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg",
  },
  {
    name: "netflix",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg",
  },
  {
    name: "google",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg",
  },
  {
    name: "linkedin",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg",
  },
  {
    name: "instagram",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg",
  },
  {
    name: "facebook",
    src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg",
  },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen overflow-hidden">
      <div className="text-center mb-10 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold mx-auto leading-[1.15]">
          Create amazing content <br /> with{" "}
          <span className="text-[#243B6B]">AI tools</span>
        </h1>

        <p className="mt-5 max-w-lg mx-auto text-sm sm:text-base text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/ai")}
          className="bg-[#243B6B] text-white px-10 py-3 text-base rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer shadow-sm">
          Start creating now
        </button>
      </div>

      <div className="flex items-center gap-3 mt-8 mx-auto text-gray-600 text-sm">
        <img src={assets.user_group} alt="" className="h-8" />
        Trusted by 10k+ people
      </div>

      <div className="overflow-hidden w-full relative max-w-6xl mx-auto select-none mt-20">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

        <div className="marquee-inner flex will-change-transform min-w-[200%]">
          <div className="flex items-center min-w-max">
            {[...companyLogos, ...companyLogos].map((logo, index) => (
              <img
                key={index}
                alt={logo.name}
                src={logo.src}
                draggable="false"
                className="h-8 w-auto object-contain mx-8"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;