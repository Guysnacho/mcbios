import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import { useEffect, useState } from "react";

export const VideoUploader = () => {
  const [date, setDate] = useState<DateValue>(parseDate("2024-04-04"));
  const [dateError, setDateError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [video, setVideo] = useState("");
  const [videoError, setVideoError] = useState("");
  const [loading, setLoading] = useState(false);

  let formatter = useDateFormatter({ dateStyle: "full" });

//   useEffect(() => {
//     console.debug("Video Selected");
//     console.debug(video);
//   }, video);

//   useEffect(() => {
//     console.debug("Date Updated");
//     console.debug(formatter.format(date.toDate(getLocalTimeZone())));
//   }, [date]);

  return (
    <div>
      <h5 className="text-center">Manage Content</h5>
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
              console.log(e);
            }}
            disabled={loading}
            errorMessage={videoError}
          />
        </div>

        <Button
          color={dateError || titleError || videoError ? "warning" : "success"}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VideoUploader;
