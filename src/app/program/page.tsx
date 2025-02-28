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
            blurb="An on-campus hotel & conference center.||128 guest rooms and suites feature spectacular views of the Salt Lake Valley, Chapel Glen and the surrounding campus. Its proximity to both a TRAX train station and a campus shuttle stop allows you to explore both campus and Salt Lake City easily. Add affordable, comfortable rooms with fantastic amenities and you'll understand why visitors love the Guest House.||Complimentary hot & cold continental breakfast & parking.||Walking distance to campus, sports venues and some hospitals & clinics.||Adjacent to TRAX light rail stop."
          />
          <ImageCard
            w={["85%", "75%", "45%", "lg"]}
            mx="auto"
            src="https://cache.marriott.com/content/dam/marriott-renditions/SLCUP/slcup-exterior-0050-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
            url="https://www.marriott.com/en-us/hotels/slcup-salt-lake-city-marriott-university-park/overview/"
            title="Salt Lake City Marriott University Park"
            blurb="Salt Lake City Marriott University Park is next to the University of Utah with stunning mountain and city views. Minutes from downtown Salt Lake City, our hotel features an updated look and an exclusive M Club. With modern amenities and an excellent location adjacent to Rice-Eccles Stadium, our hotel provides smart, stylish lodging for business and leisure travelers visiting the Salt Lake City area."
            discount="U2U"
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
            src="https://www.hilton.com/im/en/SLCFHHX/401800/slcfhhx-ext.jpg?impolicy=crop&cw=2816&ch=1576&gravity=NorthWest&xposition=0&yposition=151&rw=768&rh=430"
            url="https://www.hilton.com/en/hotels/slcfhhx-hampton-suites-salt-lake-city-university-foothill-dr/"
            title="Hampton Inn & Suites Salt Lake City/University-Foothill Dr."
            blurb="Within 2 miles of The Living Room Trail in Wasatch Mountain State Park, this modern hotel is also 2 miles from Utah's Hogle Zoo and the Red Butte Garden and Arboretum.||Flat-screen TVs, minifridges, microwaves, coffeemakers, and both full and lap desks are offered in each room, as well as complimentary Wi-Fi and custom-designed beds. Suites add kitchenettes and sofabeds."
          />
          <ImageCard
            w={["85%", "75%", "45%", "lg"]}
            mx="auto"
            src="https://www.monaco-saltlakecity.com/images/1700-960/hs-slc-01-v2-bb9d6e72.jpg"
            url="https://www.monaco-saltlakecity.com/?&cm_mmc=WEB-_-KI-_-AMER-_-EN-_-EV-_-Google%20Business%20Profile-_-DD-_-monaco%20salt%20lake%20city"
            title="Kimpton Hotel Monaco Salt Lake City"
            blurb="Salt Lake City's Most Dynamic Hotel||We're telling a story that is as timeless and elegant as it is chic and active. Here, inspiration is used as a design element, where bold, grand, historic and textural elements accent sweeping views of the neighboring mountains and play off the natural light that floods inside your guestroom. The energy is palpable; and yet, quiet luxury is where we truly shine. Comfortable places to lounge. Thoughtfully serene accommodations. Intimate dinners at Bambara and a round of classic cocktails to unwind with in the Vault. There is no more dynamic way to take in all our region has to offer."
          />
          <ImageCard
            w={["85%", "75%", "45%", "lg"]}
            mx="auto"
            src="https://www.hilton.com/im/en/SLCEAHT/510306/exterior-1138582.tif?impolicy=crop&cw=5616&ch=3144&gravity=NorthWest&xposition=0&yposition=299&rw=768&rh=430"
            url="https://www.hilton.com/en/hotels/slceaht-home2-suites-salt-lake-city-east/?SEO_id=GMB-AMER-HT-SLCEAHT&y_source=1_MzA4OTEwMi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D"
            title="Home2 Suites by Hilton Salt Lake City-East"
            blurb="Natural beauty in Utah's capital||We're located at the mouth of Parley's Canyon, just three exits north of Big Cottonwood Canyon, putting five of Utah's major ski resorts at your fingertips. Fill up on a daily free hot breakfast before exploring the heart of Salt Lake City, four miles away. WiFi and breakfast are on us, and you'll have your own in-suite kitchen. Pets are welcome too."
          />
        </Stack>
      </Box>
    </VStack>
  );
}
