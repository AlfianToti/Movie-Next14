"use server";

import { FetchData } from "@/libs/fetchData";
import Movies from "@/components/Movies";
import Header from "@/components/Header";

export default async function Page() {
  const movies = await FetchData({ uri: "trending/movie/day" });
  return (
    <>
      <Header />
      <Movies movies={movies?.results} />
    </>
  );
}
