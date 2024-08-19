import { createClient } from "@/lib/utils/supabase/component";
import { Database } from "@/lib/utils/supabase/types";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { getLocalTimeZone, now } from "@internationalized/date";
import {
  Button,
  Chip,
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
import { useCallback, useEffect, useState } from "react";

export const tiers = [
  { key: "student", label: "Student" },
  { key: "postdoctorial", label: "Postdoctorial" },
  { key: "professional", label: "Professional" },
  { key: "admin", label: "Admin" },
];

const columns = [
  { name: "NAME", uid: "name" },
  { name: "MEMBERSHIP TYPE", uid: "role" },
  { name: "CONFIRM DATE", uid: "date" },
  { name: "ACTIONS", uid: "actions" },
];

export const UserConfirm = (props: { client: SupabaseClient<Database> }) => {
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [dateError, setDateError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState<
    {
      id: number;
      user_id: string;
      selected_role: "professional" | "student" | "admin" | "postdoctorial";
      dues_paid_at: string | null;
      fname: string | null;
      lname: string | null;
      role: Database["public"]["Enums"]["user_role"];
    }[]
  >([]);
  const [value, setValue] = useState<Set<string>>(new Set<string>([]));

  const client = createClient();

  let formatter = useDateFormatter({ dateStyle: "full" });

  useEffect(() => {
    console.debug("Date Updated");
    console.debug(formatter.format(date.toDate(getLocalTimeZone())));
  }, [date]);

  useEffect(() => {
    setUsersLoading(true);
    client
      .from("confirm_request")
      .select(`id, user_id, selected_role, ...member(*)`)
      .then(({ data, error, statusText }) => {
        if (error) {
          alert(
            "Something went wrong while we were updating this user's membership - " +
              statusText
          );
          console.error(error);
        } else {
          console.debug(data);
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
    // Create presigned url upfront
    // const { data: urlData, error: urlErr } = await client.storage
    //   .from("content")
    //   .createSignedUploadUrl(`video/${date.year}/${title}`);

    // if (urlErr) {
    //   alert("Something went wrong while making the url - " + urlErr?.message);
    //   setLoading(false);
    //   return;
    // }
    // Upload video
    // const { data: uploadData, error: uploadErr } = await client.storage
    //   .from("content")
    //   .uploadToSignedUrl(urlData?.path, urlData?.token, video!, {
    //     duplex: "half",
    //   });
    // const { data: uploadData, error: uploadErr } = await uploadFile(
    //   "content",
    //   urlData?.path,
    //   video!,
    //   client
    // );

    // Insert entry into video table
    // TODO make a trigger and function for this, needs to be scopped down to content table though
    // if (uploadErr) {
    //   alert("Error during upload - " + uploadErr.message);
    //   setLoading(false);
    //   return;
    // }

    // Add reference to video in db
    const { data, error } = await client
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

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color="secondary"
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
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
        <div>
          <DatePicker
            label="Conference Date"
            variant="underlined"
            className="max-w-[284px] mt-4"
            value={date}
            onChange={setDate}
            isRequired
            errorMessage={dateError}
          />
        </div>

        <Select
          label="Select a Membership"
          className="max-w-xs"
          variant="bordered"
          selectedKeys={value}
          // @ts-expect-error Don't feel like typing this
          onSelectionChange={setValue}
        >
          {tiers.map((tier) => (
            <SelectItem key={tier.key}>{tier.label}</SelectItem>
          ))}
        </Select>
        <Table
          aria-label="Confirm Request Table"
          title="Confirm Request"
          className="mt-10 min-w-96"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
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

        <Button
          color={dateError ? "warning" : "success"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserConfirm;
