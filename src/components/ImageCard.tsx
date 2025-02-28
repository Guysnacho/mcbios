import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Center,
  CenterProps,
  Heading,
  Image,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { PiHouse } from "react-icons/pi";

type ImageCardProps = {
  src: string;
  isFull?: boolean;
  title?: string;
  blurb?: string;
  url?: string;
  discount?: string;
};

export default function ImageCard(props: ImageCardProps & CenterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center {...props} py={12}>
      <Box
        role={"group"}
        p={6}
        w={"full"}
        h={"full"}
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
          height={props.isFull ? "full" : "230px"}
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
          <LinkOverlay onClick={onOpen}>
            <Image
              rounded={"lg"}
              mx="auto"
              height={props.isFull ? "full" : [200, 230]}
              width={props.isFull ? "full" : [242, 282]}
              objectFit={"contain"}
              src={props.src}
              alt={props.title || "#"}
            />
          </LinkOverlay>
        </Box>
        <Stack pt={10} align={"center"}>
          {props.title && (
            <Heading
              textAlign="center"
              fontFamily={"body"}
              fontWeight={500}
              color="blue.700" 
              size="lg"
            >
              {props.title}
            </Heading>
          )}
          {props.blurb && (
            <VStack
              my={4}
              w="95%"
              mx="auto"
              display={["none", null, "unset"]}
              className="space-y-3"
              maxH={150}
              overflowY="auto"
              px={[null, 2, 3]}
            >
              {props.blurb.split("||").map((blurb, idx) => (
                <Text key={idx}>{blurb}</Text>
              ))}
            </VStack>
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
          {props.discount && (
            <Box>
              <Alert status="info" my="3" mx="auto" borderRadius="md">
                Feel free to use the following discount code during checkout -{" "}
                {props.discount}
              </Alert>
            </Box>
          )}
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={[2]}>
          <ModalBody>
            <Image
              rounded={"lg"}
              m="auto"
              height="full"
              width="full"
              objectFit={"contain"}
              src={props.src}
              alt={props.title || "#"}
            />
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              colorScheme="green"
              variant="outline"
              as={NextLink}
              href={props.src}
            >
              Download
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
