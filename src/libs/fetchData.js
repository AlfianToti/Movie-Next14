export async function FetchData({ uri }) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_BEARER_KEY,
      },
      cache: "no-store",
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("err", error.message);
  }
}
