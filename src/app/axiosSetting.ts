import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  // ここでCookieを取得できないので、Authorizationは使用箇所で設定する
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  // 成功時はそのまま返す
  (response) => {
    return response;
  },
  (error) => {
    // エラー処理はErrorBoundaryに任せるのでここではステータスコードを含めたレスポンスをスローする
    if (error.response) {
      const { status } = error.response;
      let message;

      switch (status) {
        case 401:
          if (error.response.data.is_login_failed) {
            // ログイン失敗時はErrorBoundaryに任せずにそのまま返す
            return Promise.reject(error);
          }
          message = "Unauthorized";
          break;
        case 403:
          message = "Access denied. Insufficient permissions";
          break;
        case 404:
          message = "Not Found";
          break;
        case 422:
          // クライアント側のバリデーションを突破した場合は不正なリクエストとして扱う
          message = "Bad Request";
          break;
        case 500:
          message = "Internal Server Error";
          break;
        default:
          message = "Error";
      }

      throw new Response(message, { status });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
