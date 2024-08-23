import { Database } from "@/lib/utils/supabase/types";
import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

export const User = ({
  fname,
  lname,
  role,
}: {
  fname: string | undefined | null;
  lname: string | undefined | null;
  role:
    | Database["public"]["Tables"]["member"]["Row"]["role"]
    | undefined
    | null;
}) => {
  return (
    <Flex>
      <Avatar src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75" />
      <Box ml="3">
        <Text fontWeight="bold">
          {fname} {lname}
        </Text>
        <Text fontSize="sm">
          {role === "admin" ? "MCBIOS Admin" : "MCBIOS Member"}
        </Text>
      </Box>
    </Flex>
  );
};
