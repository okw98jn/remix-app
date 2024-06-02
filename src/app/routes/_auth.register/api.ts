import axiosInstance from "@/axiosSetting";

export async function register(email: string, password: string) {
  // FastApiの都合でFormDataを使用
  // emailのキー名がusernameになっているのも同様
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const response = await axiosInstance.post("auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.access_token;
}
