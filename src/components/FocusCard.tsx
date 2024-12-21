import {
  Stat,
  StatLabel,
  StatNumber,
  StatProps,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

type FocusCardProps = {
  title?: string;
  blurb: string;
} & StatProps;
export const FocusCard = (props: FocusCardProps) => {
  return (
    <Stat
      {...props}
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <VStack gap={3}>
        {props.title && (
          <StatLabel
            fontSize={["md", "lg", "xl"]}
            fontWeight={"medium"}
            isTruncated
          >
            {props.title}
          </StatLabel>
        )}
        {props.blurb.split("||").map((text) => (
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
};
