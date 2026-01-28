import { memberRegistrationFetcher, registrationFetcher } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import { toaster } from "@/components/ui/toaster";
import {
  Spinner,
  Table,
} from "@chakra-ui/react";
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
    <div>
      <div className="flex flex-col gap-5 mx-auto mt-8">
        <Table.ScrollArea maxH="lg" overflowY="auto">
          {(currentMembers ? membersLoading : isLoading) ? (
            <Spinner />
          ) : (
            <Table.Root variant="outline" striped>
              <Table.Caption>
                A view into all{" "}
                {currentMembers ? "authenticated" : "unauthenticated"}{" "}
                conference registrations.
              </Table.Caption>
              <Table.Header>
                <Table.Row>
                  {(currentMembers ? memberColumns : columns).map((header) => (
                    <Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {!currentMembers &&
                  data &&
                  data.map((user, idx) => (
                    <Table.Row key={user.lname + " " + user.institution}>
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        {user.fname} {user.lname}
                      </Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>{user.institution}</Table.Cell>
                    </Table.Row>
                  ))}
                {currentMembers &&
                  memberData &&
                  memberData.map((user, idx) => (
                    <Table.Row key={user.lname + " " + user.institution}>
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>
                        {user.fname} {user.lname}
                      </Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>{user.institution}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          )}
        </Table.ScrollArea>
      </div>
    </div>
  );
};

const memberColumns = ["#", "Name", "Type", "Institution"];
const columns = ["#", "Email", "Name", "Type", "Institution"];

export default Registrations;
