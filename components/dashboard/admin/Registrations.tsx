import { toaster } from "@/components/ui/toaster";
import { memberRegistrationFetcher, registrationFetcher } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import { Box, Flex, Spinner, Table, Text } from "@chakra-ui/react";
import useSWR from "swr";

export const Registrations = ({
  currentMembers = false,
}: {
  currentMembers?: boolean;
}) => {
  const client = createClient();

  const { data, isLoading } = useSWR(
    "/admin/registration/raw",
    () => registrationFetcher(client),
    {
      onError(err) {
        toaster.error({
          title: "Issue fetching registrations",
          description: err.message,
        });
      },
    },
  );

  const { data: memberData, isLoading: membersLoading } = useSWR(
    "/admin/registration/member",
    () => memberRegistrationFetcher(client),
    {
      onError(err) {
        toaster.error({
          title: "Issue fetching member registrations",
          description: err.message,
        });
      },
    },
  );

  return (
    <Box>
      <Table.ScrollArea
        maxH="500px"
        overflowY="auto"
        borderWidth="1px"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
        rounded="lg"
      >
        {(currentMembers ? membersLoading : isLoading) ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="lg" color="purple.500" />
          </Flex>
        ) : (
          <Table.Root variant="outline" striped size="sm">
            <Table.Caption color={{ base: "slate.600", _dark: "gray.400" }}>
              A view into all{" "}
              {currentMembers ? "authenticated" : "unauthenticated"} conference
              registrations.
            </Table.Caption>
            <Table.Header>
              <Table.Row bg={{ base: "gray.50", _dark: "gray.800" }}>
                {(currentMembers ? memberColumns : columns).map((header) => (
                  <Table.ColumnHeader
                    key={header}
                    color={{ base: "slate.900", _dark: "white" }}
                    fontWeight="bold"
                    fontSize="xs"
                    textTransform="uppercase"
                    py="3"
                  >
                    {header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {!currentMembers &&
                data &&
                data.map((user, idx) => (
                  <Table.Row key={user.lname + " " + user.institution + idx}>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {idx + 1}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.email}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.fname} {user.lname}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.role}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.institution}
                    </Table.Cell>
                  </Table.Row>
                ))}
              {currentMembers &&
                memberData &&
                memberData.map((user, idx) => (
                  <Table.Row key={user.lname + " " + user.institution + idx}>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {idx + 1}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.fname} {user.lname}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.role}
                    </Table.Cell>
                    <Table.Cell
                      fontSize="sm"
                      color={{ base: "slate.700", _dark: "gray.300" }}
                    >
                      {user.institution}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        )}
      </Table.ScrollArea>
      {currentMembers && !membersLoading && memberData && (
        <SummaryBox data={memberData} />
      )}
      {!currentMembers && !isLoading && data && <SummaryBox data={data} />}
    </Box>
  );
};

function SummaryBox({
  data,
}: {
  data: {
    role: "professional" | "student" | "admin" | "postdoctorial";
  }[];
}) {
  const professionalCount = data.filter(
    (item) => item.role === "professional",
  ).length;
  const studentCount = data.filter((item) => item.role === "student").length;
  const postdocCount = data.filter(
    (item) => item.role === "postdoctorial",
  ).length;
  return (
    <Text
      textAlign="center"
      mt={1}
      color={{ base: "slate.600", _dark: "gray.400" }}
    >
      There are {professionalCount} professionals, {studentCount} students,
      {" and "}
      {postdocCount} postdoctorial registrations.
    </Text>
  );
}

const memberColumns = ["#", "Name", "Type", "Institution"];
const columns = ["#", "Email", "Name", "Type", "Institution"];

export default Registrations;
