import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import fs from 'node:fs';
import config from '../config';

//configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = async (
  imgPath: string,
  fileName: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imgPath,
      {
        public_id: fileName.trim(),
        overwrite: false,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);

        fs.unlink(imgPath, (err) => {
          if (err) {
            // console.error(`Error removing file: ${err}`);
          } else {
            // console.log(`File ${imgPath} has been successfully removed.`);
          }
        });
      },
    );
  });
};
// export const sendImageToCloudinary = async (
//   imgPath: string,
//   fileName: string,
// ) => {
//   const uploadResult = await cloudinary.uploader
//     .upload(imgPath, {
//       public_id: fileName,
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   // Remove the file
//   fs.unlink(imgPath, (err) => {
//     if (err) {
//       console.error(`Error removing file: ${err}`);
//       return;
//     }

//     console.log(`File ${imgPath} has been successfully removed.`);
//   });
//   return uploadResult;
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
