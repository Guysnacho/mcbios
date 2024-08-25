import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
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
  overview,
}: {
  name?: string;
  avatar?: string;
  plans?: string[];
  overview?: {
    heading: string;
    content: string;
  }[];
}) {
  return (
    <Card maxW="2xl">
      <CardBody>
        {avatar ? (
          <Image src={avatar} alt={name + " photo"} borderRadius="lg" />
        ) : undefined}
        <Stack mt="6" spacing="3">
          {name ? <Heading size="md">{name}</Heading> : undefined}
          <Text color="blue.600" fontSize="lg">
            Brief overview of candidate for President-Elect:
          </Text>
          {overview?.map(({ content, heading }) => (
            <>
              <Text>
                {heading}: <Text>{content}</Text>
              </Text>
            </>
          ))}
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
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
