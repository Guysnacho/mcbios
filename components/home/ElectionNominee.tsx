import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import EmbeddedVideo from "./EmbeddedVideo";

export type ElectionProps = {
  name?: string;
  avatar?: string;
  plans?: string[];
  isPrez?: boolean;
  recording?: string;
  overview?: {
    heading: string;
    content: string;
  }[];
};

export default function ElectionNominee({
  name,
  avatar,
  recording,
  plans,
  isPrez,
  overview,
}: ElectionProps) {
  return (
    <Card w={{ base: "90%", md: "xl", xl: "2xl" }}>
      <CardBody>
        {avatar ? (
          <Image
            src={avatar}
            alt={name + " photo"}
            mx="auto"
            borderRadius="lg"
          />
        ) : undefined}
        <Stack mt="6" spacing="3">
          {name ? <Heading size="md">{name}</Heading> : undefined}
          <Text color="blue.600" fontSize="lg">
            Brief overview of candidate for{" "}
            {isPrez ? "President" : "Student Board"}-Elect
          </Text>
          <Accordion allowMultiple>
            {overview?.map(({ content, heading }) => (
              <AccordionItem key={heading} aria-label={heading}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {heading}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>{content}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Text color="blue.600" fontSize="lg">
            If elected, how do you plan to contribute to MCBIOS as the
            president?
          </Text>
          {plans ? (
            <Accordion allowToggle>
              {plans.map((plan, idx) => (
                <AccordionItem key={idx} aria-label={"plans " + idx}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {`${plan.split(":")[0]}`}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>{plan.split(":")[1]}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : undefined}
        </Stack>
      </CardBody>
      <Divider />
      {recording ? (
        <CardFooter display="flex" flexDirection="column" alignItems="center">
          <Text align="center" color="blue.600" fontSize="lg">
            {name}&apos;s Address
          </Text>
          <EmbeddedVideo
            w={{ base: "full", md: "xl", xl: "2xl" }}
            className="max-w-md"
            mx="auto"
            src={recording!}
          />
        </CardFooter>
      ) : undefined}
    </Card>
  );
}
