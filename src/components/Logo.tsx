"use client";

import { Image } from "@chakra-ui/next-js";
import { ImageProps } from "@chakra-ui/react";

export const Logo = (props: ImageProps) => {
  return (
    // @ts-expect-error Image props are acting up
    <Image
      {...props}
      className="dark:invert mx-auto"
      src="https://mcbios.com/images/logo.jpg"
      alt="Next.js logo"
      width={337}
      height={187}
      priority
    />
  );
};
