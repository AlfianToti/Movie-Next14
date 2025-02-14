"use client";

import CardComponent from "@/components/Card";
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";

export default function TvShow({ tvs }) {
  const TrendingTVList = () => {
    return tvs.map((data) => {
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
        />
      );
    });
  };

  return (
    <>
      <h1 className="text-white py-6 text-center font-semibold text-2xl md:text-3xl">
        Trending TV-Shows
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
        <TrendingTVList />
      </div>
    </>
  );
}
