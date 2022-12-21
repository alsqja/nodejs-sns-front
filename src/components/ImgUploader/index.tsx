import AWS from "aws-sdk";
import styled from "styled-components";

export const ImgUploader = () => {
  const region = "ap-northeast-2";
  const bucket = "node-sns-imgs";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    console.log(
      process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    );

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: "asd/" + file.name,
        Body: file,
      },
    });

    const promise = upload.promise();
    promise
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Input type="file" onChange={handleFileInput} />
    </>
  );
};

const Input = styled.input`
  grid-column: span 2;
  height: 50px;
  margin-top: 50px;
`;
