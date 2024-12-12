"use client";

import ImageCard from "@/components/ImageCard";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack
      minH="2xl"
      className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]"
    >
      <Box
        w="full"
        className="flex flex-col row-start-2 items-center sm:items-start"
      >
        {/* <Logo /> */}
        {/* Hero Section */}
        <Flex
          w={"full"}
          h={"40vh"}
          backgroundImage={"/Winter Campus View 2018-4.jpg"}
          backgroundSize={"cover"}
          backgroundPosition={"top center"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={[4, null, null, 8]}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack
              maxW={"3xl"}
              align={"flex-start"}
              spacing={4}
              textAlign="center"
              borderRadius={10}
              px={[15, null, 20]}
              py={6}
              bgColor={"blackAlpha.500"}
            >
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["3xl", null, null, "4xl"]}
              >
                Accommodations
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* block quote */}
        <HStack my={5} mx="auto" w={["80%", null, "50%", "40%"]}>
          <FocusCard
            title="Quick Notes"
            blurb="A few recommendations on nearby hotels are provided for you to use
            for the duration of the conference.||Being near the venue may ease
            time and traffic concerns so we urge you to consider distance when
            ultimately selecting your accommodations, whether they are the below
            or not."
          />
        </HStack>

        {/* Accommodations */}
        <Stack direction={["column", null, "row"]}>
          <ImageCard
            src="https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
            title="Title"
            blurb="bluuurrrb bluuurrrb bluuurrrb bluuurrrb bluuurrrb bluuurrrb"
          />
        </Stack>
      </Box>
    </VStack>
  );
}

interface FocusCardProps {
  title?: string;
  blurb: string;
}
export function FocusCard(props: FocusCardProps) {
  const { title, blurb } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <VStack gap={3}>
        {title && (
          <StatLabel
            fontSize={["md", "lg", "xl"]}
            fontWeight={"medium"}
            isTruncated
          >
            {title}
          </StatLabel>
        )}
        {blurb.split("||").map((text) => (
          <StatNumber
            key={text}
            fontSize={["sm", "md", "lg"]}
            fontWeight={"medium"}
          >
            {text}
          </StatNumber>
        ))}
      </VStack>
    </Stat>
  );
}

// function BasicFocus() {
//   return (
//     <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
//       <Heading
//         as="h1"
//         textAlign={"center"}
//         fontSize={"4xl"}
//         py={10}
//         fontWeight={"bold"}
//       >
//         What is our company doing?
//       </Heading>
//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
//         <FocusCard title="We serve" blurb="50,000 people" />
//         <FocusCard title="In" blurb="30 different countries" />
//         <FocusCard title="Who speak" blurb="100 different languages" />
//       </SimpleGrid>
//     </Box>
//   );
// }
