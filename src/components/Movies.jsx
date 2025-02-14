"use client";

import CardComponent from "@/components/Card";

export default function Movies({ movies }) {
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
      <h1 className="text-white py-6 text-center font-semibold text-2xl md:text-3xl">
        Trending Movies
      </h1>
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
