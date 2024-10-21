"use client";

import { ReactElement } from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { PiChalkboardTeacher } from "react-icons/pi";

interface ConfDayProps {
  title: string;
  text: string;
  deadline?: string;
  icon: ReactElement;
}

const Date = ({ title, text, deadline, icon }: ConfDayProps) => {
  return (
    <Stack>
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
      <Text color={"gray.600"}>{text}</Text>
      {deadline && <Text color={"maroon"}>{deadline}</Text>}
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
            "If you'd like to hold a session or conduct a workshop during the conference, the deadline is - "
          }
          deadline="November 25th, 2024"
        />
        <Date
          icon={<Icon as={PiChalkboardTeacher} w={10} h={10} />}
          title={"Call for Poster Submissions"}
          text={
            "If you have reasearch and applicable development that you want to showcase, please let the team know! The deadline for submitting a poster is -"
          }
          deadline="December 15th, 2024"
        />
        <Date
          icon={<Icon as={PiChalkboardTeacher} w={10} h={10} />}
          title={"Young Scientist Excellence Award Application Deadline"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
          deadline="January 15th, 2024"
        />
        <Date
          icon={<Icon as={PiChalkboardTeacher} w={10} h={10} />}
          title={"Early Bird Registration"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
          deadline="February 1st, 2024"
        />
      </SimpleGrid>
    </Box>
  );
}
