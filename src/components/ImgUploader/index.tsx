import AWS from "aws-sdk";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useSession } from "../../hooks/session";

interface IProps {
  multiple: boolean;
  url: string | string[];
  setUrl: Dispatch<SetStateAction<any>>;
  label: string;
}

export const ImgUploader = ({ multiple, url, setUrl, label }: IProps) => {
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
        if (!multiple) {
          setUrl(res.Location);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Label htmlFor="file">{label}</Label>
      <Input
        id="file"
        type="file"
        onChange={handleFileInput}
        multiple={multiple}
      />
    </>
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
  overflow: hidden;
  border: 1px solid black;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
