"use server";

import React from "react";
import Header from "@/components/Header";
import FavoriteList from "@/components/Favorites";
import { FetchData } from "@/libs/fetchData";

async function Page() {
  const favlist = await FetchData({ uri: "account/21793102/favorite/movies" });
  return (
    <div>
      <Header />
      <FavoriteList favoriteMov={favlist?.results} />
    </div>
  );
}

export default Page;
