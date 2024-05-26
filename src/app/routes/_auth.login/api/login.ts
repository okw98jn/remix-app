export async function login(email: string, password: string): Promise<string> {
  // FastApiの都合でFormDataを使用
  // emailのキー名がusernameになっているのも同様
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${process.env.API_URL}auth/login`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("ログインに失敗しました");
  }

  const data = await response.json();

  return data.access_token;
}
