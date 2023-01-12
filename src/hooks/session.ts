import { useCallback, useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { IUserWithToken } from ".";
import {
  hasSessionSelector,
  tokenSelector,
  userState,
} from "../stores/session";
import { useAxios } from "./axios";

export const useSession = () => {
  const user = useRecoilValue(userState);
  const hasSession = useRecoilValue(hasSessionSelector);

  const result = {
    hasSession,
    user,
  };

  return result as typeof result;
};

export interface ISignupData {
  name: string;
  password: string;
}

export const useSignup = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (data: ISignupData) => {
      return request({
        url: "/auth/signup",
        method: "POST",
        data: data,
      });
    },
    [request]
  );
  return [run, response] as [typeof run, typeof response];
};

export const useLogin = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (name: string, password: string) => {
      return request({
        url: "/auth/login",
        method: "POST",
        data: { name, password },
        withCredentials: true,
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useUpdateUserWithToken = () => {
  const [token, setToken] = useRecoilState(tokenSelector);
  const resetToken = useResetRecoilState(tokenSelector);
  const setUser = useSetRecoilState(userState);
  const [myInfo, result] = useMyInfo();

  const update = useCallback(
    (data?: string) => {
      if (data) {
        setToken(data);
      } else {
        resetToken();
      }
    },
    [resetToken, setToken]
  );

  useEffect(() => {
    if (token) {
      myInfo();
    } else {
      setUser(null);
    }
  }, [myInfo, token, setUser]);

  useEffect(() => {
    if (result.called && result.data) {
      const u = result.data?.data as IUserWithToken;
      setUser((prev) => {
        return { ...prev, ...u, accessToken: token };
      });
    }
  }, [result.called, result.data, setUser, token]);

  return update;
};

export const useLogout = () => {
  const updateUserWithToken = useUpdateUserWithToken();

  const logout = useCallback(() => {
    updateUserWithToken("");
  }, [updateUserWithToken]);

  return logout;
};

export const useMyInfo = () => {
  const [request, response] = useAxios();

  const run = useCallback(() => {
    return request({
      url: "/user/me",
      method: "GET",
    });
  }, [request]);

  return [run, response] as [typeof run, typeof response];
};

export const useUpdateUser = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (data: any) => {
      return request({
        url: "/user/me",
        method: "PUT",
        data: data,
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};
