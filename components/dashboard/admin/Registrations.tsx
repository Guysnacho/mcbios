import { memberRegistrationFetcher, registrationFetcher } from "@/lib";
import { createClient } from "@/lib/supabase/component";
import {
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import useSWR from "swr";

export const Registrations = ({
  currentMembers = false,
}: {
  currentMembers?: boolean;
}) => {
  const toast = useToast();
  const client = createClient();

  const { data, isLoading } = useSWR(
    "/admin/registration/raw",
    () => registrationFetcher(client),
    {
      onError(err) {
        toast({
          status: "error",
          title: "Issue fetching coupons",
          description: err.message,
          variant: "subtle",
        });
      },
    },
  );

  const { data: memberData, isLoading: membersLoading } = useSWR(
    "/admin/registration/member",
    () => memberRegistrationFetcher(client),
    {
      onError(err) {
        toast({
          status: "error",
          title: "Issue fetching coupons",
          description: err.message,
          variant: "subtle",
        });
      },
    },
  );

  // const renderActionCell = useCallback((registration: Registration) => {
  //   <div className="relative flex items-center justify-center gap-2">
  //     <Tooltip color="success" content="Confirm">
  //       <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //         <CheckIcon color="green" />
  //       </span>
  //     </Tooltip>
  //     {/* <Tooltip color="danger" content="Reject user">
  //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //               <DeleteIcon />
  //             </span>
  //           </Tooltip> */}
  //   </div>;
  // }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 mx-auto mt-8">
        <TableContainer maxH="lg" overflowY="auto">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table variant="striped" size="md">
              <TableCaption>
                A view into all{" "}
                {currentMembers ? "authenticated" : "unauthenticated"}{" "}
                conference registrations.
              </TableCaption>
              <Thead>
                <Tr>
                  {(currentMembers ? memberColumns : columns).map((header) => (
                    <Th key={header}>{header}</Th>
                  ))}
                </Tr>
              </Thead>

              <Tbody>
                {!currentMembers &&
                  data &&
                  data.map((user, idx) => (
                    <Tr key={user.lname + " " + user.institution}>
                      <Td>{idx + 1}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        {user.fname} {user.lname}
                      </Td>
                      <Td>{user.role}</Td>
                      <Td>{user.institution}</Td>
                      {/* <Td>{renderActionCell(user)}</Td> */}
                    </Tr>
                  ))}
                {currentMembers &&
                  memberData &&
                  memberData.map((user, idx) => (
                    <Tr key={user.lname + " " + user.institution}>
                      <Td>{idx + 1}</Td>
                      <Td>
                        {user.fname} {user.lname}
                      </Td>
                      <Td>{user.role}</Td>
                      <Td>{user.institution}</Td>
                      {/* <Td>{renderActionCell(user)}</Td> */}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </div>
    </div>
  );
};

const memberColumns = ["#", "Name", "Type", "Institution"];
const columns = ["#", "Email", "Name", "Type", "Institution"];

export default Registrations;
