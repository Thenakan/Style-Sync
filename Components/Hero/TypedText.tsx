'use client';

import React, { useEffect, useRef } from "react";
import Typed, { TypedOptions } from "typed.js";

const TypedText = () => {
  const typedElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const options: TypedOptions = {
      strings: ["Best Fit!", "Every Time.."],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    };

    if (typedElement.current) {
      const typed = new Typed(typedElement.current, options);

      // Cleanup function to destroy Typed instance on component unmount
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return <span ref={typedElement}></span>;
};

export default TypedText;
