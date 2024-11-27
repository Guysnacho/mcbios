"use client";

import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  PiBirdLight,
  PiBlueprint,
  PiChalkboardTeacher,
  PiStudent,
} from "react-icons/pi";

interface ConfDayProps {
  title: string;
  text?: string;
  deadline?: string;
  icon: ReactElement;
  isProposal?: boolean;
  isAbstract?: boolean;
  isYSEA?: boolean;
}

const Date = ({
  title,
  text,
  deadline,
  icon,
  isProposal,
  isAbstract,
  isYSEA,
  stack,
}: ConfDayProps & { stack?: StackProps }) => {
  return (
    <Stack
      border="1px"
      borderColor="gray.500"
      p={3}
      borderRadius={5}
      {...stack}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"blue.500"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      {text && <Text color={"gray.600"}>{text}</Text>}
      {deadline && <Text color={"maroon"}>{deadline}</Text>}
      <Flex justifyItems="center">
        {isProposal && (
          <Button
            as="a"
            mx="auto"
            colorScheme="blue"
            variant="ghost"
            mt="5"
            href="https://forms.gle/Ao8hxxD3KfBjrnEt7"
            target="_blank"
            rounded={"full"}
            rightIcon={<EditIcon />}
          >
            Session Proposal Form
          </Button>
        )}
        {isAbstract && (
          <Button
            as="a"
            mx="auto"
            colorScheme="blue"
            variant="ghost"
            mt="5"
            href="https://forms.gle/mkRcchVaWhN4DuRY8"
            target="_blank"
            rounded={"full"}
            rightIcon={<EditIcon />}
          >
            Abstract Submission Form
          </Button>
        )}
        {isYSEA && (
          <Button
            as="a"
            mx="auto"
            colorScheme="blue"
            variant="ghost"
            mt="5"
            href="/ysea"
            rounded={"full"}
            rightIcon={<ExternalLinkIcon />}
          >
            Learn More
          </Button>
        )}
      </Flex>
    </Stack>
  );
};

export default function KeyDates() {
  return (
    <Box p={4} mx={{ base: 3, md: 10 }}>
      <Date
        icon={<Icon as={PiBirdLight} w={10} h={10} />}
        title={"Early Bird Registration"}
        deadline="February 1st, 2025"
        stack={{ my: "5", mx: "auto", width: [null, "sm", null, "lg"] }}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Date
          icon={<Icon as={PiChalkboardTeacher} w={10} h={10} />}
          title={"Call for Session Proposals"}
          text={
            "If you'd like to hold a session or conduct a workshop during the conference, the deadline is"
          }
          deadline="December 1st, 2024"
          isProposal
        />
        <Date
          icon={<Icon as={PiBlueprint} w={10} h={10} />}
          title={"Call for Abstract Submissions"}
          text={
            "If you have reasearch and applicable development that you want to showcase, please let the team know! The deadline for submitting abstract is"
          }
          deadline="February 1st, 2025"
          isAbstract
        />
        <Date
          icon={<Icon as={PiStudent} w={10} h={10} />}
          title={"Young Scientist Excellence Award Application Deadline"}
          text={
            "This awards program recognizes students and postdoctoral fellows that exhibit scientific excellence in the field of Bioinformatics. The deadline for this award is"
          }
          deadline="January 15th, 2025"
          isYSEA
        />
      </SimpleGrid>
    </Box>
  );
}
