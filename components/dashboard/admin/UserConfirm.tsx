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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const tiers = [
  { key: "student", label: "Student" },
  { key: "postdoctorial", label: "Postdoctorial" },
  { key: "professional", label: "Professional" },
  { key: "admin", label: "Admin" },
];

const columns = [
  { name: "REQUEST ID" },
  { name: "MEMBER" },
  { name: "ACTIONS" },
];

type UserRequest = {
  id: number;
  user_id: string;
  fees_paid_at: string | null;
  fname: string | null;
  lname: string | null;
  role: Database["public"]["Enums"]["user_role"];
};

export const UserConfirm = ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserRequest[]>([]);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    client
      .from("confirm_request")
      .select(`id, user_id, ...member(*)`)
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
          // @ts-expect-error dw bout it
          setUsers(data);
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id === "") {
      client
        .from("confirm_request")
        .select(`id, user_id, ...member(*)`)
        .then(({ data, error, statusText }) => {
          if (error) {
            toast({
              title: "Something went wrong collecting user info",
              description: statusText,
              duration: 5000,
              status: "error",
            });
            console.error(error);
          } else {
            // @ts-expect-error dw bout it
            setUsers(data);
          }
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderCell = useCallback((user: UserRequest, columnKey: Key) => {
    // @ts-expect-error Type mismatch because inputs are goofy
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
      <RetroactiveRegistration />
      <ConfirmModal
        client={client}
        id={id}
        open={open}
        setId={setId}
        setOpen={setOpen}
      />
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

function saveRegistration(sessionId: string) {
  return fetch(`/api/checkout?session_id=${sessionId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
}

const RetroactiveRegistration = () => {
  const [sessionId, setSessionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!sessionId.trim()) {
      toast({
        title: "Session ID required",
        description: "Please enter a Stripe session ID",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveRegistration(sessionId.trim());
      if (result.error) {
        toast({
          title: "Registration failed",
          description: result.error,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Registration confirmed",
          description: "User registration has been processed successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSessionId("");
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          err instanceof Error ? err.message : "Failed to process registration",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8 p-4 max-w-md border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Retroactive Registration</h3>
      <p className="text-sm text-gray-600 mb-4">
        Use this to confirm user registrations retroactively if there was a
        service or database outage. Pressing submit will fetch the transaction
        and re-save the user's form fields.
      </p>
      <FormControl>
        <FormLabel>Stripe Session ID</FormLabel>
        <div className="flex gap-2">
          <Input
            placeholder="cs_live_..."
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            disabled={isSubmitting}
          />
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Processing"
          >
            Submit
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

const ConfirmModal = ({
  client,
  id,
  open,
  setOpen,
  setId,
}: {
  client: SupabaseClient<Database>;
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
}) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [role, setRole] = useState<
    "student" | "postdoctorial" | "professional" | "admin" | undefined
  >();
  const [updateLoading, setUpdateLoading] = useState(false);
  const toast = useToast();

  const handleUpdate = async (
    uid: string,
    date: Date | null,
    role: "student" | "postdoctorial" | "professional" | "admin",
  ) => {
    setUpdateLoading(true);
    if (!role) {
      setUpdateLoading(false);
      throw Error("Invalid role");
    }

    // Add reference to video in db
    const { data, error } = await client
      .from("member")
      .update({
        role,
        fees_paid_at: date?.toISOString(),
        org_id: process.env.NEXT_PUBLIC_ORG_ID,
      })
      .eq("user_id", uid)
      .select()
      .single();

    if (error) {
      toast({
        status: "error",
        duration: 6000,
        isClosable: true,
        description:
          "Something went wrong while we were updating this user's membership - " +
          error.message,
      });
      console.error(error);
    } else {
      toast({
        status: "success",
        duration: 6000,
        isClosable: true,
        title: "Mission Accomplished",
        description: `Successfully updated membership for ${
          data.fname + " " + data.lname
        } with the following role: ${data.role}`,
      });
    }
  };
  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setId("");
        setOpen(false);
      }}
      closeOnOverlayClick
      blockScrollOnMount
      autoFocus
      onOverlayClick={() => {
        setId("");
        setOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Confirm User Properties
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            variant="outline"
            icon={<ChevronDownIcon />}
            onChange={(e) => {
              // @ts-expect-error Type mismatch because inputs are nullable
              setRole(e.target.value || undefined);
            }}
            placeholder="Select a Membership"
          >
            {tiers.map((tier) => (
              <option key={tier.key} value={tier.label.toLowerCase()}>
                {tier.label}
              </option>
            ))}
          </Select>
          <DatePicker
            aria-label="Paid On"
            className="mt-4"
            selected={date}
            maxDate={new Date()}
            onChange={setDate}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant={
              role === undefined || date === undefined ? "ghost" : "solid"
            }
            // @ts-expect-error Ignore sumn
            isDisabled={role === undefined || role === "" || date === undefined}
            onClick={() =>
              handleUpdate(id, date, role!)
                .then(() => {
                  setId("");
                  setOpen(false);
                })
                .finally(() => setUpdateLoading(false))
            }
          >
            {updateLoading ? <Spinner /> : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserConfirm;
