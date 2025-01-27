"use client";

import {
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function ScientificSessions() {
  return (
    <Box
      w="full"
      mx="auto"
      py="20"
      bgGradient="linear(to-tl, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
    >
      <Heading size="xl" mb={38} color="blue.700" textAlign="center">
        Scientific Sessions
      </Heading>
      <TableContainer
        maxH={500}
        maxW={[250, "lg", null, "xl"]}
        overflowX="auto"
        overflowY="auto"
        mx="auto"
      >
        <Table variant="simple" size="md">
          <TableCaption>{sessions.length} sessions</TableCaption>
          <Thead>
            <Tr>
              {columns.map(({ name }) => (
                <Th key={name}>{name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {sessions &&
              sessions.map((session, idx) => (
                <Tr key={idx} whiteSpace="normal">
                  <Td>{idx + 1}</Td>
                  <Td>
                    {session.speaker.map((speaker, idx2) => (
                      <Text w={["xs", "sm", "md", "lg"]} key={idx2}>
                        {speaker}
                      </Text>
                    ))}
                  </Td>
                  <Td>
                    <Text w={["xs", "sm", "md", "lg"]}>{session.topic}</Text>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const columns = [{ name: "#" }, { name: "Speaker(s)" }, { name: "Topic" }];

const sessions = [
  {
    speaker: [
      "Hao Chen, Ph.D. - University of Illinois Chicago",
      "Wei Chen, Ph.D. - University of Pittsburgh",
    ],
    topic: "AI methods and applications in single cell spatial omics",
  },
  {
    speaker: ["Inimary Toby Ogundeji, PhD- University of Dallas"],
    topic:
      "AI in Computational Sciences: Shaping the Future of Research, Education, and Biomolecular Discovery ",
  },

  {
    speaker: [
      "Elizabeth A. Worthey, Ph.D. - University of Alabama at Birmingham",
    ],
    topic: "Navigating knowledge: Leveraging LLMs for patient health",
  },
  {
    speaker: [
      "Timothy Shaw, Ph.D. - Moffitt Cancer Center",
      "Riyue Bao, Ph.D. - University of Pittsburgh, UPMC Hillman Cancer Center",
    ],
    topic: "Leveraging AI to reconcile barriers in IO Research",
  },
  {
    speaker: [
      "Jun Ding, Ph.D. - National Institute of Aging/NIH",
      "Xiaowei Zhan, Ph.D. - University Texas South Western",
    ],
    topic: "AI meets genetics and genomics",
  },
  {
    speaker: ["Zongliang Yue, Ph.D. - Auburn University"],
    topic: "From Omics to Network Pharmacology and Systems Medicine",
  },
  {
    speaker: ["Rakesh Kaundal, Ph.D. - Utah State University"],
    topic:
      "Harnessing Integrative Multi-Omics and AI to Decipher Host-Pathogen Interactions",
  },
  {
    speaker: ["Yuehua Cui, Ph.D. - Michigan State University"],
    topic:
      "Advancing Statistical and Machine Learning Models for Single-Cell and Spatial Omics",
  },
  {
    speaker: [
      "Zhaohui “Steve” Qin, Ph.D. - Emory University",
      "Chang Su, Ph.D - Emory University",
    ],
    topic:
      "Advances in statistical methods applied to genomics and biomedicine",
  },
  {
    speaker: ["Xuefeng Wang, Ph.D. - Moffitt Cancer Center"],
    topic:
      "Emerging methods in single-cell analysis and AI-driven biomarker discovery",
  },
  {
    speaker: [
      "Paul Stewart, Ph.D. - University of Utah",
      "Ann Chen, Ph.D. - University of Utah",
    ],
    topic: "Computational Mass Spec",
  },
  {
    speaker: ["Yan Sun, Ph.D. - Utah State University"],
    topic: "Recent Advances in Biostatistical Research",
  },
  {
    speaker: ["Kathy Qiao, Ph.D. - University of Utah"],
    topic: "Innovative Approaches to Orchestrating the Microbial Symphony",
  },
  {
    speaker: ["Aik Choon Tan, Ph.D. - University of Utah"],
    topic: "Oncological Data Science  ",
  },
  {
    speaker: ["Qi Zheng, Ph.D. - University of Louisville"],
    topic: "Statistical analysis for integrated biomedical data",
  },
  {
    speaker: [
      "Aik Choon Tan, Ph.D. - University of Utah",
      "Samuel Payne, Ph.D. - Brigham Young University",
    ],
    topic: "Frontiers in Computational Biology and Bioinformatics",
  },
  {
    speaker: ["Chi Wang, Ph.D. - University of Kentucky"],
    topic:
      "Recent advances in statistical and computational methods for omics data ",
  },
];
