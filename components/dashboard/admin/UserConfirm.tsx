import { Database } from "@/lib/utils/supabase/types";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { getLocalTimeZone, now } from "@internationalized/date";
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
import { useDateFormatter } from "@react-aria/i18n";
import { SupabaseClient } from "@supabase/supabase-js";
import { Key, useCallback, useEffect, useState } from "react";

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
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [dateError, setDateError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState<UserRequest[]>([]);
  const [value, setValue] = useState<Set<string>>(new Set<string>([]));

  let formatter = useDateFormatter({ dateStyle: "full" });

  useEffect(() => {
    console.debug("Date Updated");
    console.debug(formatter.format(date.toDate(getLocalTimeZone())));
  }, [date]);

  useEffect(() => {
    setUsersLoading(true);
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
        setUsersLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    // if (!isValidUpload()) {
    //   setLoading(false);
    //   return;
    // }

    // Add reference to video in db
    const { data, error } = await props.client
      .from("member")
      .update({
        // role: value.values()[value.size - 1],
        dues_paid_at: formatter.format(date.toDate(getLocalTimeZone())),
      })
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
    setLoading(false);
  };

  const renderCell = useCallback((user: UserRequest, columnKey: Key) => {
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
          <Select
            label="Select a Membership"
            fullWidth
            variant="bordered"
            selectedKeys={value}
            // @ts-expect-error Don't feel like typing this
            onSelectionChange={setValue}
          >
            {tiers.map((tier) => (
              <SelectItem key={tier.key}>{tier.label}</SelectItem>
            ))}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            aria-label="Dues Paid On"
            variant="underlined"
            className="mt-4"
            value={date}
            onChange={setDate}
            isRequired
            errorMessage={dateError}
          />
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Confirm">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CheckIcon />
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
        {usersLoading ? (
          <Spinner about="users loading" color="secondary" />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default UserConfirm;
