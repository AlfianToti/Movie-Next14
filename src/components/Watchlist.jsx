"use client";

import Api from "@/api/api";
import React from "react";
import CardComponent from "@/components/Card";
import { useState, useEffect } from "react";
const { setWatchListMovies } = Api();

function Watchlist({ watchMov }) {
  const [watchlist, setWatchlist] = useState({});

  const fetchData = async () => {
    try {
      const wlList = watchMov;

      const watchlistData = {};
      wlList.forEach((movie) => {
        watchlistData[movie.id] = true;
      });

      setWatchlist(watchlistData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleWLClick = async (mediaId) => {
    const watchlistStatus = !watchlist[mediaId];
    try {
      const result = await setWatchListMovies(mediaId, watchlistStatus);
      if (result.status === 201 || result.status === 200) {
        setWatchlist((prev) => ({
          ...prev,
          [mediaId]: watchlistStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating watchlist", error);
    }
  };

  const WatchlistList = () => {
    return watchMov.map((wlmovie) => {
      return (
        <CardComponent
          sxMedia={{}}
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
          data={wlmovie}
          handleWLClick={handleWLClick}
          wl={watchlist}
          movie={true}
        />
      );
    });
  };
  return (
    <div>
      <h1 className="text-white text-center font-semibold py-6 text-2xl md:text-3xl">
        WatchList Movies
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
        <WatchlistList />
      </div>
    </div>
  );
}

export default Watchlist;
