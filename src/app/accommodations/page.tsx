"use client";

import { FocusCard } from "@/components/FocusCard";
import ImageCard from "@/components/ImageCard";
import { Box, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";

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
        <Stack
          direction={["column", null, "row"]}
          wrap="wrap"
          gap={5}
          mx="auto"
        >
          <ImageCard
            w={["85%", "75%", "45%", "lg"]}
            mx="auto"
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/16/16/30/caption.jpg?w=1400&h=-1&s=1"
            url="https://www.universityguesthouse.com/"
            title="The University of Utah Guest House"
            blurb="An on-campus hotel & conference center.||128 guest rooms and suites feature spectacular views of the Salt Lake Valley, Chapel Glen and the surrounding campus. Its proximity to both a TRAX train station and a campus shuttle stop allows you to explore both campus and Salt Lake City easily. Add affordable, comfortable rooms with fantastic amenities and you'll understand why visitors love the Guest House.||Complimentary hot & cold continental breakfast & parking||Walking distance to campus, sports venues and some hospitals & clinics||Adjacent to TRAX light rail stop"
          />
          <ImageCard
            w={["85%", "75%", "45%", "lg"]}
            mx="auto"
            src="https://images.squarespace-cdn.com/content/v1/5da6119c160b7b30077ebf80/1d81eb3e-86f4-480a-9d71-f062f6da7f81/022051010016.jpg?format=600w"
            url="https://ellerbeckbedandbreakfast.com/"
            title="Ellerbeck Bed & Breakfast"
            blurb="Ellerbeck Bed & Breakfast is a six room hotel in the beautiful historic mansion of Thomas & Henrietta Ellerbeck, built in 1892.||Just a five minute walk to downtown Salt Lake, and a short drive to world famous mountains and resorts, Ellerbeck Bed & Breakfast has a location that can't be beat. Ellerbeck has six suites for guests to choose from. Each room is decorated in turn-of-the-century style with attention to details from the Utah and Mormon history this house is famous for."
          />
          <ImageCard
            w={["85%", "75%", "45%", "lg"]}
            mx="auto"
            src="https://cache.marriott.com/content/dam/marriott-renditions/SLCUP/slcup-exterior-0050-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
            url="https://www.marriott.com/en-us/hotels/slcup-salt-lake-city-marriott-university-park/overview/"
            title="Salt Lake City Marriott University Park"
            blurb="Salt Lake City Marriott University Park is next to the University of Utah with stunning mountain and city views. Minutes from downtown Salt Lake City, our hotel features an updated look and an exclusive M Club. With modern amenities and an excellent location adjacent to Rice-Eccles Stadium, our hotel provides smart, stylish lodging for business and leisure travelers visiting the Salt Lake City area."
          />
        </Stack>
      </Box>
    </VStack>
  );
}
