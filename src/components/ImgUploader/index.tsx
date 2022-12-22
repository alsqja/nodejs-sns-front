import AWS from "aws-sdk";
import styled from "styled-components";
import { useSession } from "../../hooks/session";

export const ImgUploader = () => {
  const { user } = useSession();
  const region = "ap-northeast-2";
  const bucket = "node-sns-imgs";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: user?.name + "/" + file.name,
        Body: file,
      },
    });

    const promise = upload.promise();
    promise
      .then((res) => {
        console.log(res);
        console.log(res.Location);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ gridColumn: 7, marginTop: "50px" }}>
      <Label htmlFor="file">+</Label>
      <Input id="file" type="file" onChange={handleFileInput} />
    </div>
  );
};

const Input = styled.input`
  position: absolute;
  width: 0px;
  height: 0px;
  padding: 0;
  border: 0;
  overflow: hidden;
`;

const Label = styled.label`
  display: inline-block;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
