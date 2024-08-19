import { Database } from "@/lib/utils/supabase/types";
import { CheckIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Select as ChakraSelect } from "@chakra-ui/react";
import { getLocalTimeZone, now, today } from "@internationalized/date";
import {
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const tiers = [
  { key: "student", label: "Student" },
  { key: "postdoctorial", label: "Postdoctorial" },
  { key: "professional", label: "Professional" },
  { key: "admin", label: "Admin" },
];

const columns = [
  { name: "CONFIRM REQUEST", uid: "id" },
  { name: "MEMBER", uid: "member" },
  { name: "ACTIONS", uid: "actions" },
];

type UserRequest = {
  id: number;
  user_id: string;
  dues_paid_at: string | null;
  fname: string | null;
  lname: string | null;
  role: Database["public"]["Enums"]["user_role"];
};

export const UserConfirm = (props: { client: SupabaseClient<Database> }) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [users, setUsers] = useState<UserRequest[]>([]);

  useEffect(() => {
    setLoading(true);
    props.client
      .from("confirm_request")
      .select(`id, user_id, ...member(*)`)
      .then(({ data, error, statusText }) => {
        if (error) {
          alert(
            "Something went wrong while we were updating this user's membership - " +
              statusText
          );
          console.error(error);
        } else {
          setUsers(data);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id === "") {
      props.client
        .from("confirm_request")
        .select(`id, user_id, ...member(*)`)
        .then(({ data, error, statusText }) => {
          if (error) {
            alert(
              "Something went wrong while we were updating this user's membership - " +
                statusText
            );
            console.error(error);
          } else {
            setUsers(data);
          }
          setLoading(false);
        });
    }
  }, [id]);

  const renderCell = useCallback((user: UserRequest, columnKey: Key) => {
    // @ts-expect-error Type mismatch because inputs are goofy
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "member":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            name={user.fname + " " + user.lname}
          />
        );
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
      <ConfirmModal
        client={props.client}
        id={id}
        open={open}
        setId={setId}
        setOpen={setOpen}
      />
      <h5 className="text-center">Confirm User Registration</h5>
      <div className="flex flex-col gap-5 mx-auto">
        <Table
          aria-label="Confirm Request Table"
          title="Confirm Request"
          className="mt-10"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align="center" width={400}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={loading ? <Spinner /> : "No rows to display."}
            items={users || []}
          >
            {users.map((item) => (
              <TableRow key={item.id}>
                {(columnKey) =>
                  updateLoading ? (
                    <TableCell>
                      <Spinner />
                    </TableCell>
                  ) : (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ConfirmModal = (props: {
  client: SupabaseClient<Database>;
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
}) => {
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [role, setRole] = useState<
    "student" | "postdoctorial" | "professional" | "admin" | undefined
  >();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (
    uid: string,
    date: string,
    role: "student" | "postdoctorial" | "professional" | "admin"
  ) => {
    setUpdateLoading(true);
    if (!role) {
      setUpdateLoading(false);
      throw Error("Invalid role");
    }

    // Add reference to video in db
    const { data, error } = await props.client
      .from("member")
      .update({
        role,
        dues_paid_at: date.toString(),
      })
      .eq("user_id", uid)
      .select()
      .single();
    console.log(data);

    if (data) {
      alert(
        `Successfully updated membership for ${
          data.fname + " " + data.lname
        } with the following role: ${data.role}`
      );
    } else if (error) {
      throw Error(
        "Something went wrong while we were updating this user's membership - " +
          error.message
      );
    }
  };
  return (
    <Modal
      isOpen={props.open}
      onClose={() => {
        props.setId("");
        setMessage("");
        props.setOpen(false);
      }}
      onOpenChange={(event) => {
        props.setId("");
        setMessage("");
        props.setOpen(false);
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Confirm User Properties
        </ModalHeader>
        <ModalBody>
          <ChakraSelect
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
          </ChakraSelect>
          <DatePicker
            label="Dues Paid On"
            aria-label="Dues Paid On"
            variant="underlined"
            className="mt-4"
            value={date}
            maxValue={now(getLocalTimeZone())}
            onChange={(e) => {
              console.debug(e);
              setDate(e);
            }}
          />
          <blockquote className="text-center">{message}</blockquote>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant={
              role === undefined || date === undefined ? "ghost" : "solid"
            }
            // @ts-expect-error Ignore sumn
            disabled={role === undefined || role === "" || date === undefined}
            onClick={() =>
              handleUpdate(props.id, date.toString(), role!)
                .then(() => {
                  props.setId("");
                  props.setOpen(false);
                })
                .catch((err: Error) => {
                  setMessage(err.message);
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
