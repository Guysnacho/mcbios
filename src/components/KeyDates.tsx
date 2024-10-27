"use client";

import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  PiBirdLight,
  PiBlueprint,
  PiChalkboardTeacher,
  PiFileDoc,
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
}: ConfDayProps) => {
  return (
    <Stack border="1px" borderColor="gray.500" p={3} borderRadius={5}>
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
            href={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/assets/MCBIOS%202025%20Session%20Proposal%20Form.docx"
            }
            target="_blank"
            rounded={"full"}
            rightIcon={<PiFileDoc />}
          >
            Proposal Template
          </Button>
        )}
        {isAbstract && (
          <Button
            as="a"
            mx="auto"
            colorScheme="blue"
            variant="ghost"
            mt="5"
            href="https://forms.gle/2RmV1j4EzeUXK9pG9"
            target="_blank"
            rounded={"full"}
            rightIcon={<PiFileDoc />}
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
            rightIcon={<PiFileDoc />}
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
          title={"Call for Poster Submissions"}
          text={
            "If you have reasearch and applicable development that you want to showcase, please let the team know! The deadline for submitting a poster is"
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
        <Date
          icon={<Icon as={PiBirdLight} w={10} h={10} />}
          title={"Early Bird Registration"}
          deadline="February 1st, 2025"
        />
      </SimpleGrid>
    </Box>
  );
}
