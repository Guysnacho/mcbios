import { createClient } from "@/lib/utils/supabase/component";
import { Database } from "@/lib/utils/supabase/types";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const VideoUploader = () => {
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
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
    if (!video) {
      setVideoError("Invalid video");
    }
    return !dateError && !titleError && !videoError;
  }

  const handleSubmit = async () => {
    if (!isValidUpload()) {
      setLoading(false);
      return;
    }
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
      .from("videos")
      .insert({
        title,
        date: date.toDate(getLocalTimeZone()).toDateString(),
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
    <div>
      <h5 className="text-center">Upload Content</h5>
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

        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            name="Title"
            id="title"
            isClearable
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Speaker Series II"
            disabled={loading}
            errorMessage={titleError}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="video">Content Url</label>
          <Input
            type="text"
            name="Content Url"
            id="content"
            onChange={(e) => {
              setVideo(e.target.value);
            }}
            disabled={loading}
            errorMessage={videoError}
          />
        </div>

        <Button
          color={dateError || titleError || videoError ? "warning" : "success"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
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
