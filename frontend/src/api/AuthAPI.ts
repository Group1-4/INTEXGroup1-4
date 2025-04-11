import { API_URL } from "./MoviesAPI";
export const pingAuth = async (): Promise<{ email?: string }> => {
  const response = await fetch(`${API_URL}/pingauth`, {
    method: "GET",
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Invalid response format from server");
  }

  return await response.json();
};
