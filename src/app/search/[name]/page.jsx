"use server";

import Header from "@/components/Header";
import Searched from "@/components/Searched";
import { FetchData } from "@/libs/fetchData";

export default async function Page({ params }) {
  const srcMov = params.name;
  const searchedMov = await FetchData({ uri: `search/movie?query=${srcMov}` });
  return (
    <div className="text-white items-center flex flex-col">
      <Header />
      <Searched data={searchedMov.results} searchQuery={srcMov} />
    </div>
  );
}
