import { Image, Stack } from "@chakra-ui/react";
import NextImage from "next/image";

export default function Home() {
  return (
    <Stack>
      <Image asChild >
        <NextImage
          src="/img/Moffitt.jpg"
          alt="Moffit national cancer hospital."
        />
      </Image>
    </Stack>
  );
}
