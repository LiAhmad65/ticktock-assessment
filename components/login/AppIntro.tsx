"use client";

import { useEffect, useState } from "react";

const AppIntro = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-primary-600 w-full h-full flex items-center justify-center p-8">
      <div className={`w-full max-w-md transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-[-30px]'
      }`}>
        <h2 className={`text-white font-semibold text-[40px] mb-6 transition-all duration-700 delay-200 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-[-20px]'
        }`}>
          ticktock
        </h2>
        <p className={`text-gray-200 text-base font-normal leading-relaxed transition-all duration-700 delay-400 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-[20px]'
        }`}>
          Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
        </p>
      </div>
    </div>
  );
};

export default AppIntro;
