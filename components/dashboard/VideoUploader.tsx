import { createClient } from "@/lib/utils/supabase/component";
import { uploadFile } from "@/lib/utils/supabase/upload";
import { getLocalTimeZone, now, parseDate } from "@internationalized/date";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import { useEffect, useState } from "react";

export const VideoUploader = () => {
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [dateError, setDateError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [video, setVideo] = useState<File | null>();
  const [videoError, setVideoError] = useState("");
  const [loading, setLoading] = useState(false);

  const client = createClient();

  let formatter = useDateFormatter({ dateStyle: "full" });

  useEffect(() => {
    console.debug("Video Selected");
    console.debug(video);
  }, [video]);

  useEffect(() => {
    console.debug("Date Updated");
    console.debug(formatter.format(date.toDate(getLocalTimeZone())));
  }, [date]);

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
    const { data: urlData, error: urlErr } = await client.storage
      .from("content")
      .createSignedUploadUrl(`video/${date.year}/${title}`);

    if (urlErr) {
      alert("Something went wrong while making the url - " + urlErr?.message);
      setLoading(false);
      return;
    }
    // Upload video
    // const { data: uploadData, error: uploadErr } = await client.storage
    //   .from("content")
    //   .uploadToSignedUrl(urlData?.path, urlData?.token, video!, {
    //     duplex: "half",
    //   });
    const { data: uploadData, error: uploadErr } = await uploadFile(
      "content",
      urlData?.path,
      video!,
      client
    );

    // Insert entry into video table
    // TODO make a trigger and function for this, needs to be scopped down to content table though
    if (uploadErr) {
      alert("Error during upload - " + uploadErr.message);
      setLoading(false);
      return;
    }

    // Add reference to video in db
    const { error } = await client.from("videos").insert({
      title,
      date: date.toDate(getLocalTimeZone()).toDateString(),
      path: uploadData.fullPath,
    });

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
          <label htmlFor="video">Video</label>
          <Input
            type="file"
            name="Content"
            id="content"
            onChange={(e) => {
              setVideo(e.target.files![0]);
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
    </div>
  );
};

export default VideoUploader;
