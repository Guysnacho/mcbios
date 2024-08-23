import { createClient } from "@/lib/utils/supabase/component";
import { Database } from "@/lib/utils/supabase/types";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const VideoUploader = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [dateError, setDateError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [video, setVideo] = useState("");
  const [videoError, setVideoError] = useState("");
  const [vidList, setVidList] =
    useState<Database["public"]["Tables"]["videos"]["Row"][]>();
  const [loading, setLoading] = useState(false);

  const client = createClient();

  useEffect(() => {
    console.debug("Video Selected");
    console.debug(video);
  }, [video]);

  function isValidUpload() {
    setDateError("");
    setTitleError("");
    setVideoError("");
    setLoading(true);
    if (!date) setDateError("Invalid date");
    if (!title) setTitleError("Invalid title");
    if (!video || video.length === 0) {
      setVideoError("Invalid video");
    }
    console.debug(dateError);
    console.debug(titleError);
    console.debug(videoError);
    return dateError === "" && titleError === "" && videoError === "";
  }

  const handleSubmit = async () => {
    const isValid = isValidUpload();
    console.debug(isValid);
    if (!isValid) {
      setLoading(false);
      throw new Error("Bad Request");
    }
    // Insert entry into video table
    // TODO make a trigger and function for this, needs to be scopped down to content table though

    // Add reference to video in db
    const { data, error } = await client
      .from("videos")
      .insert({
        title,
        date: date!.toISOString(),
        path: video,
      })
      .select()
      .single();
    console.log(data);

    if (data) {
      setVidList(vidList?.concat(data));
    }
    if (error) {
      alert(
        "Something went wrong while we were saving a reference to the video - " +
          error.message
      );
      setLoading(false);
      return;
    } else {
      alert("Mission accomplished");
    }
    setLoading(false);
  };

  return (
    <div className="w-[300px] sm:w-1/3">
      <h5 className="text-center">Upload Content</h5>
      <div className="space-y-5">
        <Stack gap={2}>
          <Text mt={3} mb={-5}>
            Conference Date
          </Text>
          <DatePicker
            className="max-w-[284px] mt-4"
            selected={date}
            maxDate={new Date()}
            onChange={setDate}
          />
          <Text>{dateError}</Text>
        </Stack>

        <div>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            name="Title"
            id="title"
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Speaker Series II"
            disabled={loading}
          />
          <Text>{titleError}</Text>
        </div>

        <div>
          <label htmlFor="video">Content Url</label>
          <Input
            type="text"
            name="Content Url"
            id="content"
            onChange={(e) => {
              setVideo(e.target.value);
            }}
            placeholder="drive.google.com/file/d/asdf1234/preview"
            disabled={loading}
          />
          <Text>{videoError}</Text>
        </div>

        <Flex justify="center">
          <Button
            colorScheme={
              dateError || titleError || videoError ? "red" : "green"
            }
            onClick={() => handleSubmit().catch((err) => console.error(err))}
          >
            Submit
          </Button>
        </Flex>
      </div>

      {/* <Table aria-label="Content Table" title="Saved Videos" className="mt-10 min-w-96">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>PATH</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {vidList
            ? vidList.map((vid, idx) => (
                <TableRow key={idx}>
                  <TableCell>{vid.title}</TableCell>
                  <TableCell>{vid.date}</TableCell>
                  <TableCell>{vid.path}</TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table> */}
    </div>
  );
};

export default VideoUploader;
