import { User } from "@/components/User";
import { Database } from "@/lib/supabase/types";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type Registration = {
    fname: string;
    lname: string;
    role: "professional" | "student" | "admin" | "postdoctorial";
    email: string;
    institution: string;
}

export const RawRegistrations = ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    client
      .from("raw_registration")
      .select(`fname, lname, role, email, institution`)
      .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
      .then(({ data, error, statusText }) => {
        if (error) {
          toast({
            title: "Something went wrong collecting confirmation requests",
            description: statusText,
            duration: 5000,
            status: "error",
          });
          console.error(error);
        } else {
          setRegistrations(data);
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCell = useCallback((user: Registration, columnKey: Key) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "member":
        return <User fname={user.fname} lname={user.lname} role={user.role} />;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip color="success" content="Confirm">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CheckIcon
                  color="green"
                  onClick={() => {
                    setId(user.user_id);
                    setOpen(true);
                  }}
                />
              </span>
            </Tooltip>
            {/* <Tooltip color="danger" content="Reject user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip> */}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 mx-auto mt-8">
        <TableContainer>
          <Table variant="striped">
            <TableCaption>
              {users.length
                ? users.length + " members pending admin confirmation"
                : "No users pending admin confirmation"}
            </TableCaption>
            <Thead>
              <Tr>
                {columns.map(({ name }) => (
                  <Th key={name}>{name}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{renderCell(user, "id")}</Td>
                  <Td>{renderCell(user, "member")}</Td>
                  <Td>{renderCell(user, "actions")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RawRegistrations;
