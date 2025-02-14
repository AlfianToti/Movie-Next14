"use server";

import { AllHeros } from "@/components/Heros.jsx";
import { BtnList, MovieList } from "@/components/Home.jsx";
import { FetchData } from "@/libs/fetchData.js";
import Header from "@/components/Header";
import { TabList } from "@/components/Home.jsx";

export default async function Page() {
  const tabs = [
    "Trending Now",
    "Popular",
    "Netflix Original",
    "Premiers",
    "Recently Added",
  ];

  const genres = [
    "Action",
    "Adventures",
    "Anime",
    "Biography",
    "Crime",
    "Comedy",
    "Documentary",
    "Drama",
  ];
  const movies = await FetchData({ uri: "/discover/movie" });
  const favMovies = await FetchData({
    uri: "/account/21793102/favorite/movies",
  });
  const wlMovies = await FetchData({
    uri: "/account/21793102/watchlist/movies",
  });

  return (
    <div className="w-full">
      <Header />
      <AllHeros movies={movies.results} />
      <TabList tabs={tabs} />
      <BtnList genres={genres} />
      <div className="flex flex-col space-y-9 py-10 px-5">
        <div className="flex flex-wrap items-center justify-center gap-5">
          <MovieList
            mov={movies.results}
            watchMov={wlMovies.results}
            favMov={favMovies.results}
          />
        </div>
      </div>
    </div>
  );
}
