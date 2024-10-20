"use client";

import { Image } from "@chakra-ui/next-js";

export const Logo = () => {
  return (
    <Image
      className="dark:invert mx-auto"
      src="https://mcbios.com/images/logo.jpg"
      alt="Next.js logo"
      width={337}
      height={187}
      priority
    />
  );
};
