export const pingAuth = async (): Promise<{ email?: string }> => {
  const response = await fetch("https://localhost:4000/pingauth", {
    method: "GET",
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Invalid response format from server");
  }

  return await response.json();
};
