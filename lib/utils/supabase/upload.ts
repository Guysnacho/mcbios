import { SupabaseClient } from "@supabase/supabase-js";
import { DetailedError } from "tus-js-client";
// const tus = require("tus-js-client");
import tus from "tus-js-client";

export async function uploadFile(
  bucketName: string,
  fileName: string,
  file: File,
  client: SupabaseClient
) {
  const {
    data: { session },
  } = await client.auth.getSession();

  return new Promise<
    | {
        data: { message: string; fullPath: string };
        error?: never;
      }
    | {
        data?: never;
        error: Error | DetailedError;
      }
  >(async (resolve, reject) => {
    var uppy = new Uppy
    var upload = new tus.Upload(file, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      httpStack: {
        createRequest(method, url) {
          return fetch(url, {
            method: "PATCH",
          });
        },
        getName() {
          return "thing";
        },
      },
      overridePatchMethod: true,
      headers: {
        // authorization: `Bearer ${session.access_token}`,
        authorization: `Bearer ${session?.access_token}`,
        "x-upsert": "true", // optionally set upsert to true to overwrite existing files
        method: "patch",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
      metadata: {
        bucketName: bucketName,
        objectName: fileName,
        contentType: file.type,
        cacheControl: 3600,
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
      onError: function (error) {
        console.log("Failed because: " + error);
        resolve({ error });
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
        resolve({
          data: { message: "Mission accomplished", fullPath: fileName },
        });
      },
    });

    // Check if there are any previous uploads to continue.
    const previousUploads = await upload.findPreviousUploads();
    // Found previous uploads so we select the first one.
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    // Start the upload
    upload.start();
  });
}
