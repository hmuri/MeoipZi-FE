// useAuth.ts
import { useMutation } from "react-query";
import { googleLogin, login, reissueTokens, signup } from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface ApiTokenResponse {
  token: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<
    ApiTokenResponse,
    Error,
    { username: string; password: string }
  >(
    ({ username, password }: { username: string; password: string }) =>
      login({ username, password }),
    {
      onSuccess: (data) => {
        if (data) {
          Cookies.set("accessToken", data.token, {
            secure: true,
            sameSite: "Strict",
          });
          alert("Logged in successfully");
          navigate("/home");
        }
      },
    }
  );
};

export const useReissueTokens = () => {
  return useMutation(reissueTokens, {
    onSuccess: (data) => {
      if (data.inSuccess && data.result) {
        Cookies.set("accessToken", data.result.accessToken, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refreshToken", data.result.refreshToken, {
          secure: true,
          sameSite: "Strict",
        });
      }
    },
  });
};

export const useSignup = () => {
  return useMutation<
    ApiTokenResponse,
    Error,
    { username: string; password: string }
  >(
    ({ username, password }: { username: string; password: string }) =>
      signup({ username, password }),
    {
      onSuccess: (data) => {
        console.log("Signup successful", data);
      },
      onError: (error) => {
        // 회원가입 실패 시의 로직
        console.error("Signup failed", error);
        // 여기에 필요한 로직 추가
      },
    }
  );
};
