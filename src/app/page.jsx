"use server";

import { AllHeros } from "@/components/Heros.jsx";
import { BtnList, MovieList } from "@/components/Home.jsx";
import { FetchData } from "@/libs/fetchData.js";
import Header from "@/components/Header";
import { TabList } from "@/components/Home.jsx";

export default async function Page({ searchParams }) {
  const selectedGenres = searchParams.genre || null;

  const tabs = [
    "Trending Now",
    "Popular",
    "Netflix Original",
    "Premiers",
    "Recently Added",
  ];

  const [movies, favMovies, wlMovies, genres] = await Promise.all([
    FetchData({ uri: "/discover/movie" }),
    FetchData({ uri: "/account/21793102/favorite/movies" }),
    FetchData({ uri: "/account/21793102/watchlist/movies" }),
    FetchData({ uri: "/genre/movie/list" }),
  ]);

  return (
    <div className="w-full">
      <Header />
      <AllHeros movies={movies?.results} />
      <TabList tabs={tabs} />
      <BtnList genres={genres?.genres} />
      <div className="flex flex-wrap items-center justify-center gap-5 space-y-9 py-3 px-3">
        <MovieList
          selectedGenre={selectedGenres}
          mov={movies?.results}
          watchMov={wlMovies?.results}
          favMov={favMovies?.results}
        />
      </div>
    </div>
  );
}
