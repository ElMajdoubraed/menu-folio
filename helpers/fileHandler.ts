import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

export const uploadFile = async (file: any, fileName: string) => {
  await s3
    .putObject({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Body: file.buffer,
      Key: fileName,
    })
    .promise();

  return fileName;
};

export const deleteFile = async (fileName: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Key: fileName,
    })
    .promise();
};

export const getFile = async (fileName: string) => {
  const file = await s3
    .getObject({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Key: fileName,
    })
    .promise();

  return file.Body;
};
