import axiosInstance from "@/axiosSetting";

export async function register(name: string, email: string, password: string) {
  const response = await axiosInstance.post("auth/register", {
    name,
    email,
    password,
  });

  return response.data.access_token;
}
