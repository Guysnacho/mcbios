import { Database } from "@/lib/utils/supabase/types";
import { CheckIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Select as ChakraSelect } from "@chakra-ui/react";
import {
  CalendarDate,
  getLocalTimeZone,
  now,
  today,
} from "@internationalized/date";
import {
  DatePicker,
  DateValue,
  Select,
  SelectItem,
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
  { name: "ID", uid: "id" },
  { name: "MEMBER", uid: "member" },
  { name: "CURRENT ROLE", uid: "current role" },
  { name: "DUES PAID ON", uid: "date" },
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
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [role, setRole] = useState<
    "student" | "postdoctorial" | "professional" | "admin" | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [users, setUsers] = useState<UserRequest[]>([]);
  const [value, setValue] = useState<Set<string>>(new Set<string>([]));

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

  const isValidUpdate = () => {
    if (!value || value.size < 1) {
      return false;
    }
  };

  const handleUpdate = async (uid: string) => {
    setUpdateLoading(true);
    if (!isValidUpdate()) {
      setUpdateLoading(false);
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
      alert(
        "Something went wrong while we were updating this user's membership - " +
          error.message
      );
    }
    setUpdateLoading(false);
  };

  const renderCell = useCallback((user: UserRequest, columnKey: Key) => {
    // @ts-expect-error Type mismatch because inputs are goofy
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "member":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            description={user.fname + " " + user.lname}
            name={cellValue}
          />
        );
      case "current role":
        return (
          <ChakraSelect
            variant="outline"
            icon={<ChevronDownIcon />}
            // @ts-expect-error Type mismatch because inputs are capitalized
            onChange={setRole}
            placeholder="Select a Membership"
          >
            {tiers.map((tier) => (
              <option key={tier.key} value={tier.label.toLowerCase()}>
                {tier.label}
              </option>
            ))}
          </ChakraSelect>
        );
      case "date":
        return <UserDate date={date} setDate={setDate} />;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip color="success" content="Confirm">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CheckIcon
                  color="green"
                  onClick={() => handleUpdate(user.user_id)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Reject user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
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
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const UserDate = (props: {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
}) => {
  return (
    <DatePicker
      aria-label="Dues Paid On"
      variant="underlined"
      className="mt-4"
      value={props.date}
      maxValue={now(getLocalTimeZone())}
      onChange={(e) => {
        console.debug(e);
        props.setDate(e);
      }}
    />
  );
};

export default UserConfirm;
