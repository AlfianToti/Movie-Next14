"use server";

import { FetchData } from "@/libs/fetchData";
import Movies from "@/components/Movies";
import Header from "@/components/Header";

export default async function Page() {
  const [movies, genres] = await Promise.all([
    FetchData({ uri: "trending/movie/day" }),
    FetchData({ uri: "/genre/movie/list" }),
  ]);
  return (
    <>
      <Header />
      <Movies movies={movies?.results} genres={genres?.genres} />
    </>
  );
}
