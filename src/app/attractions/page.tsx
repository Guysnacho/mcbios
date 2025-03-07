"use client";

import { FocusCard } from "@/components/FocusCard";
import ImageCard from "@/components/ImageCard";
import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
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
              p={4}
              py={6}
              bgColor={"blackAlpha.500"}
            >
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["3xl", null, null, "4xl"]}
              >
                Local Attractions
              </Text>
            </Stack>
          </VStack>
        </Flex>

        {/* Attractions */}

        <Box bgColor="blue.800" position={"relative"} w="full">
          <Stack
            color={"blue.100"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 50 }}
            gap={10}
          >
            <Box w={["90%", "80%", "75%", "70%"]} mx="auto">
              <Heading color={"white"} fontSize={{ base: "3xl", md: "5xl" }}>
                Salt Lake Ski Resorts
              </Heading>

              <FocusCard
                my={5}
                blurb="Welcome to MCBIOS 2025, where academic inquiry meets the stunning backdrop of Salt Lake City. Beyond engaging discussions and research exchange, explore world-class ski resorts, historic landmarks, and a vibrant cultural scene.||Make the most of your time—learn, connect, and experience all this unique city has to offer."
              />
            </Box>

            <Divider w={["90%"]} mx="auto" />

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              w="90%"
              mx="auto"
            >
              <Heading
                color={"white"}
                m="auto"
                fontSize={{ base: "3xl", md: "5xl" }}
                textAlign={["center", "start"]}
              >
                Salt Lake Ski Resorts
              </Heading>
              {skiResorts.map(({ img, name, url }) => (
                <ImageCard
                  key={name}
                  src={img}
                  url={url}
                  title={name}
                  w={["95%", "80%"]}
                  mx="auto"
                />
              ))}
            </SimpleGrid>

            <Heading color={"white"} fontSize={{ base: "3xl", md: "5xl" }}>
              Utah Parks and Recreation
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {skiResorts.map((resort) => (
                <ImageCard key={resort} />
              ))}
            </SimpleGrid>

            <Heading color={"white"} fontSize={{ base: "3xl", md: "5xl" }}>
              Ski/Snowboard/Clothing Gear Rental
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {skiResorts.map((resort) => (
                <ImageCard key={resort} />
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      </Box>
    </VStack>
  );
}

const skiResorts = [
  {
    name: "Alta Ski Area",
    url: "https://www.alta.com",
    img: "https://www.powderhounds.com/site/DefaultSite/filesystem/images/USA/Alta/Overview/05.jpg",
  },
  {
    name: "Snowbird Ski Resort",
    url: "https://www.snowbird.com",
    img: "https://www.snowbird.com/_gatsby/image/7b91db17456d0e6e59af50c83dca1571/5f72ce901816c01c908ea9974b65e77f/2.11.24.Otto-21_homepage_gallery_cliff_lodge_1000x667.webp?u=https%3A%2F%2Fcms.snowbird.com%2Fsites%2Fdefault%2Ffiles%2F2024-06%2F2.11.24.Otto-21_homepage_gallery_cliff_lodge_1000x667.jpg&a=w%3D960%26h%3D640%26fm%3Dwebp%26q%3D90&cd=f5ef9cffa5ce96400290ac134e11d00d",
  },
  {
    name: "Brighton Ski Resort",
    url: "https://www.brightonresort.com",
    img: "https://www.skiutah.com/blog/authors/lexi/ski-utah-resort-histories-brighton/pictures/Ski%20Utah%20Article%20Image%20-%20Night%20Skiing.png/inline-display",
  },
  {
    name: "Solitude Ski Resort",
    url: "https://www.solitudemountain.com/",
    img: "https://amc-p-001.sitecorecontenthub.cloud/api/public/content/c949bde5b3bc4265b3894fabe8911a86?v=ce02a0f3",
  },
  {
    name: "Park City Mountain Resort",
    url: "https://www.parkcitymountain.com",
    img: "https://scene7.vailresorts.com/is/image/vailresorts/20241209_PC_Digital_LiftLodging_FCE-Still_855x480:Featured-Content-AND-Sliding-Cards-AND-Container-Long-Amount?resMode=sharp2&w=855&h=480",
  },
  {
    name: "Deer Valley",
    url: "https://www.deervalley.com",
    img: "https://www.deervalley.com/-/media/deer-valley/skiing/powder-skiing/man-skiing-powder-at-deer-valley.jpg?rev=87f8a62034524cde840176c7a3c3b530?h=1350&w=2400&hash=BB62110AC66AD27C623305B6A591D4D2",
  },
];

const parks = [
  {
    name: "Little Cottonwood Canyon",
    url: "https://cottonwoodcanyons.udot.utah.gov/canyon-road-information/",
    img: "https://cdn.ksltv.com/ksltv/wp-content/uploads/2023/10/inbound4007593257931531225-900x506.jpg",
  },
  {
    name: "Big Cottonwood Canyon",
    url: "https://www.visitsaltlake.com/listing/big-cottonwood-canyon/55175",
    img: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/saltlake/VisitSaltLake-FallColors-HiRezAustenDiamondPhotography-9_B94A3D4B-DBF5-A3EB-509C100D60E94C08-b94a3087d16f2fe_b94a476d-f7e1-6ce0-6d2ca7afad38f772.jpg",
  },
  {
    name: "Woodward Park City",
    url: "https://www.woodwardparkcity.com",
    img: "https://static01.nyt.com/images/2019/12/19/travel/19update-woodward/19update-woodward-jumbo-v2.jpg?quality=75&auto=webp",
  },
];

const skiShops = [
  {
    name: "Salt Lake City Ski & Bike Shop - Sports Den",
    url: "https://www.sportsden.com",
    img: "https://cdn.shoplightspeed.com/shops/618368/files/65492207/1920x670x1/image.jpg",
  },
  {
    name: "REI Rental Gear: Tents, Bikes, SUPs & More | REI Co-op",
    url: "https://www.rei.com/stores/rentals",
    img: "https://www.rei.com/dam/stores/19.jpeg",
  },
  {
    name: "Wasatch Ski & Snowboard Rentals | SLC's Local Ski Shop",
    url: "https://wasatchskiandsnowboardrental.com",
    img: "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/474536465_925300276466861_4326504044057390642_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=cEeArc0sKRUQ7kNvgErlvgp&_nc_oc=AdhjB-3Hw1peqC7uy3OVm7bus7KzGKvxiSZA7SEssdSoq56QY2y5IZeU8oSrgSCPqoo&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=AVFND4oaugyPpEWk5v2NnGu&oh=00_AYHKBq55QSx4VbcdtHKe7qs_SaYTihivO17rGziy9d4rJA&oe=67D0AA91",
  },
  {
    name: "The Lifthouse Ski Shop",
    url: "https://thelifthouse.com",
    img: "https://static.where-e.com/United_States/Utah/Salt_Lake_County/The-Lifthouse_ac624b5fd696ee37f007842db6f15565.jpg",
  },
];

/*

*/
