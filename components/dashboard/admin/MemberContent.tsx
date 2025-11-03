import { Database } from "@/lib/supabase/types";
import { Card, CardBody, CardHeader } from "@chakra-ui/react";

import VideoUploader from "./VideoUploader";

export const MemberContent = ({
  videos,
}: {
  videos?: Database["public"]["Tables"]["videos"]["Row"][];
}) => {
  return (
    <>
      <div className="my-5">
        <h5 className="text-center">
          You can watch past conference recordings below
        </h5>
        {/* <Select
                label="Select a year"
                // label={currYear !== "" ? currYear : "Select a year"}
                className="max-w-xs flex"
                variant="bordered"
                selectedKeys={[currYear]}
                onChange={handleSelectionChange}
              >
                {ConfYears.map((conf) => (
                  <SelectItem key={`${conf.year}`}>{`${conf.year}`}</SelectItem>
                ))}
              </Select> */}
      </div>
      <div className="container flex flex-row flex-wrap gap-5 mx-auto justify-center">
        {videos
          ? videos.map((vid) => (
              <Card key={vid.id} className="max-w-md">
                <CardHeader className="block text-center">
                  <h6>{vid.title ?? undefined}</h6>
                  <p>
                    {/* {`${formatter.format(new Date(vid.date))} ` ||
                              undefined} */}
                    {vid.date.substring(0, vid.date.indexOf("T"))}
                  </p>
                </CardHeader>
                <CardBody>
                  <iframe
                    className="mx-auto"
                    src={vid.path}
                    width={300}
                    allow="autoplay"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </CardBody>
              </Card>
            ))
          : undefined}
      </div>
    </>
  );
};

export default VideoUploader;
