import axiosInstance from "@/axiosSetting";
import { AxiosError } from "axios";

export async function login(email: string, password: string) {
  // FastApiの都合でFormDataを使用
  // emailのキー名がusernameになっているのも同様
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  try {
    const response = await axiosInstance.post("auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
