"use server";

import React from "react";
import Header from "@/components/Header";
import Watchlist from "@/components/Watchlist";
import { FetchData } from "@/libs/fetchData";

async function Page() {
  const watchlist = await FetchData({
    uri: "account/21793102/watchlist/movies",
  });

  return (
    <div>
      <Header />
      <Watchlist watchMov={watchlist.results} />
    </div>
  );
}

export default Page;
