"use server";

import { FetchData } from "../../libs/fetchData";
import TvShow from "@/components/TvShows";
import Header from "@/components/Header";

export default async function Page() {
  const tvs = await FetchData({ uri: "trending/tv/day" });
  return (
    <>
      <Header />
      <TvShow tvs={tvs?.results} />
    </>
  );
}
