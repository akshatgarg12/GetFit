import Resizer from "react-image-file-resizer";

export const resizeFile = (file:any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      1920,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });