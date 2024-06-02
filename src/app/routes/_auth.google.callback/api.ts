import axiosInstance from "@/axiosSetting";
import { AxiosError } from "axios";

export async function googleLogin(code: string) {
  try {
    const response = await axiosInstance.get("auth/google-callback", {
      params: { code },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.status === 401) {
      return null;
    }

    // 401以外はErrorBoundaryに任せる
    throw err;
  }
}
