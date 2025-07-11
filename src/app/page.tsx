import { Heading, Image, Stack } from "@chakra-ui/react";
import NextImage from "next/image";

export default function Home() {
  return (
    <Stack>
      <Heading >Home page thiiiiiiiings</Heading>
      <Image asChild width={500} mx="auto">
        <NextImage
          src="/img/Moffitt.jpg"
          alt="Moffit national cancer hospital."
          width={1200}
          height={800}
        />
      </Image>
    </Stack>
  );
}
