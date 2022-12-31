import { useCallback } from "react";
import { ICreatePost } from ".";
import { useAxios } from "./axios";

export const useCreatePost = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (data: ICreatePost) => {
      return request({
        url: "/post",
        method: "POST",
        data: data,
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useGetPosts = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (page: number, limit: number) => {
      return request({
        url: `/post?limit=${limit}&page=${page}`,
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};
