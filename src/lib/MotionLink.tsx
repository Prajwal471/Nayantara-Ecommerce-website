"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type AnimatedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const fadeOutWrapper = () => {
  const element = document.querySelector("body") as HTMLElement;

  if (!element) {
    console.warn("Wrapper element not found for transition.");
    return Promise.resolve(true);
  }

  element.style.transition = "opacity 0.5s ease-in-out";
  element.style.opacity = "0";

  return new Promise((resolve) => {
    element.addEventListener("transitionend", () => resolve(true), { once: true });
  });
};

const MotionLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const wrapper = document.querySelector("body") as HTMLElement;

    if (wrapper) {
      wrapper.style.transition = "opacity 0.5s ease-in-out";
      wrapper.style.opacity = "1";
    }
  }, [pathname]);

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if(href === pathname) return

    await fadeOutWrapper();

    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default MotionLink;