import AWS from "aws-sdk";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
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
  const length = useRef(0);

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = (e: any) => {
    const arr: string[] = typeof url === "object" ? [...url] : [];
    length.current = e.target.files.length;
    for (let i = 0; i < length.current; i++) {
      const file = e.target.files[i];
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: bucket,
          Key:
            user?.name +
            "/" +
            file.name +
            "/" +
            (url.length > 0 ? url.length : "") +
            i,
          Body: file,
        },
      });

      const promise = upload.promise();
      promise
        .then((res) => {
          if (!multiple) {
            setUrl(res.Location);
          } else if (multiple && typeof url === "object") {
            arr.push(res.Location);
            if (
              length.current === arr.length ||
              arr.length === length.current + url.length
            ) {
              arr.sort((a, b) => {
                const arrA = a.split("/");
                const arrB = b.split("/");
                return (
                  Number(arrA[arrA.length - 1]) - Number(arrB[arrB.length - 1])
                );
              });
              setUrl(arr);
            }
          }
        })
        .catch((err) => console.log(err));
    }
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
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
