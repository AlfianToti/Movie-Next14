"use client";

import CardComponent from "@/components/Card";
import MenuComponent from "./Menu";
import { useRouter, useSearchParams } from "next/navigation";

export default function Movies({ movies, genres }) {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const currentGenre = searchParams.get("genre");

  // const handleGenreClick = (genreId) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (currentGenre === String(genreId)) {
  //     params.delete("genre");
  //   } else {
  //     params.set("genre", genreId);
  //   }
  //   router.push(`?${params.toString()}`, { scroll: false });
  // };

  const TrendingMovieList = () => {
    return movies.map((data) => {
      return (
        <CardComponent
          sxMedia={{
            display: "flex",
            objectFit: "contain",
          }}
          sx={{
            width: 150,
            height: 300,
            transition: "transform 0.3s ease-in-out",
            position: "relative",
            "&:hover": {
              transform: "scale(1.10)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            },
            fontSize: "28px",
            backgroundColor: "revert-layer",
            border: "none",
          }}
          data={data}
          movie={true}
        />
      );
    });
  };

  return (
    <>
      <div className="flex w-full py-6 px-16 justify-center">
        <h1 className="text-white text-center font-semibold text-2xl md:text-3xl">
          Trending Movies
        </h1>
        {/* <div className="">
          <MenuComponent data={genres} handleClick={handleGenreClick} />
        </div> */}
      </div>
      <div
        style={{
          padding: "40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <TrendingMovieList />
      </div>
    </>
  );
}
