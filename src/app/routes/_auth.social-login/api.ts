import axiosInstance from "@/axiosSetting";
import { SocialLoginProvider } from "@/routes/_auth.social-login/type";

export async function getSocialLoginUrl(provider: SocialLoginProvider) {
  const response = await axiosInstance.get(`auth/${provider}-url`);
  return response.data;
}
