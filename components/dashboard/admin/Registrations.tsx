import { toaster } from "@/components/ui/toaster";
import { memberRegistrationFetcher } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import { Box, Flex, Spinner, Table } from "@chakra-ui/react";
import useSWR from "swr";

/**
 * Everyone registered for this year's conference. Registrants (paid guests and
 * signed-in members alike) are `member` rows with this year in `attended`.
 */
export const Registrations = () => {
  const client = createClient();

  const { data, isLoading } = useSWR(
    "/admin/registration/member",
    () => memberRegistrationFetcher(client),
    {
      onError(err) {
        toaster.error({
          title: "Issue fetching registrations",
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
        {isLoading ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="lg" color="purple.500" />
          </Flex>
        ) : (
          <Table.Root variant="outline" striped size="sm">
            <Table.Caption color={{ base: "slate.600", _dark: "gray.400" }}>
              A view into all conference registrations.
            </Table.Caption>
            <Table.Header>
              <Table.Row bg={{ base: "gray.50", _dark: "gray.800" }}>
                {columns.map((header) => (
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
              {data?.map((user, idx) => (
                <Table.Row key={user.user_id}>
                  <Table.Cell fontSize="sm" color={{ base: "slate.700", _dark: "gray.300" }}>
                    {idx + 1}
                  </Table.Cell>
                  <Table.Cell fontSize="sm" color={{ base: "slate.700", _dark: "gray.300" }}>
                    {user.fname} {user.lname}
                  </Table.Cell>
                  <Table.Cell fontSize="sm" color={{ base: "slate.700", _dark: "gray.300" }}>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell fontSize="sm" color={{ base: "slate.700", _dark: "gray.300" }}>
                    {user.role}
                  </Table.Cell>
                  <Table.Cell fontSize="sm" color={{ base: "slate.700", _dark: "gray.300" }}>
                    {user.institution}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Table.ScrollArea>
    </Box>
  );
};

const columns = ["#", "Name", "Email", "Type", "Institution"];

export default Registrations;
