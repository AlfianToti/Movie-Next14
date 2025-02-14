"use client";

import { useState, useEffect } from "react";
import Api from "@/api/api";
import CardComponent from "./Card";

const { setFavoriteMovies } = Api();

export default function FavoriteList({ favoriteMov }) {
  const [favor, setFavor] = useState({});

  const fetchData = async () => {
    try {
      const favList = favoriteMov;

      const favoriteData = {};
      favList.forEach((movie) => {
        favoriteData[movie.id] = true;
      });

      setFavor(favoriteData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFavClick = async (mediaId) => {
    const favoriteStatus = !favor[mediaId];
    try {
      const result = await setFavoriteMovies(mediaId, favoriteStatus);
      if (result.status === 201 || result.status === 200) {
        setFavor((prev) => ({
          ...prev,
          [mediaId]: favoriteStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating watchlist", error);
    }
  };

  const FL = () => {
    return favoriteMov.map((favmovie) => {
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
          data={favmovie}
          handleFavClick={handleFavClick}
          fav={favor}
          movie={true}
        />
      );
    });
  };

  return (
    <>
      <h1 className="text-white py-6 text-center font-semibold text-2xl md:text-3xl">
        Favorite Movies
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
        <FL />
      </div>
    </>
  );
}
