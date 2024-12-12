import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CenterProps,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PiHouse } from "react-icons/pi";

type ImageCardProps = {
  src: string;
  title: string;
  blurb?: string;
  url?: string;
};

export default function ImageCard(props: ImageCardProps & CenterProps) {
  return (
    <Center {...props} py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${props.src})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={[200, 230]}
            width={[242, 282]}
            objectFit={"cover"}
            src={props.src}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {props.title}
          </Heading>
          {props.blurb && (
            <Box>
              <Text>{props.blurb}</Text>
            </Box>
          )}
          {props.url && (
            <ButtonGroup spacing="2" mx="auto">
              <Button
                as="a"
                href={props.url}
                target="_blank"
                color={"white"}
                rounded={"full"}
                alignItems="center"
                leftIcon={<PiHouse />}
                bg={"blue.600"}
              >
                Book Today
              </Button>
            </ButtonGroup>
          )}
        </Stack>
      </Box>
    </Center>
  );
}
