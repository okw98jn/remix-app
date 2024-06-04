import axiosInstance from "@/axiosSetting";
import { AxiosError } from "axios";

export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });

    return response.data.access_token;
  } catch (error) {
    const err = error as AxiosError;

    if (err.status === 401) {
      return null;
    }

    // 401以外はErrorBoundaryに任せる
    throw err;
  }
}
