import axiosInstance from "@/axiosSetting";

export async function login(email: string, password: string): Promise<string> {
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
    throw new Error("ログインに失敗しました");
  }
}
