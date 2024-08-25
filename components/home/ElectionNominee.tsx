import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function ElectionNominee({
  name,
  avatar,
  plans,
  isPrez,
  overview,
}: {
  name?: string;
  avatar?: string;
  plans?: string[];
  isPrez?: boolean;
  overview?: {
    heading: string;
    content: string;
  }[];
}) {
  return (
    <Card maxW="2xl">
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
                <AccordionPanel pb={4}>{content}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Text color="blue.600" fontSize="lg">
            If elected, how do you plan to contribute to MCBIOS as the
            president?
          </Text>
          {plans ? (
            <OrderedList>
              {plans.map((plan, idx) => (
                <ListItem key={idx}>{plan}</ListItem>
              ))}
            </OrderedList>
          ) : undefined}
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
}
