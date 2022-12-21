import { useCallback } from "react";
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
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

// export const useUpdateUser = () => {
//   const setUser = useSetRecoilState(userState);
//   const resetUser = useResetRecoilState(userState);

//   const update = (data: IUserWithToken) => {
//     if (data) {
//       setUser(data)
//     } else {
//       resetUser()
//     }
//   }
// }

export const useUpdateUserWithToken = () => {
  const [token, setToken] = useRecoilState(tokenSelector);
  const resetToken = useResetRecoilState(tokenSelector);

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

  return update;
};
