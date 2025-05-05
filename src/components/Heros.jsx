"use client";

import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState, useEffect } from "react";
import Api from "@/api/api";
import ButtonComponent from "@/components/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const { setFavoriteMovies, setWatchListMovies } = Api();

export function Heros({ mov, favMov, watchMov }) {
  const [watchlist, setWatchlist] = useState({});
  const [fav, setFav] = useState({});

  const fetchData = async () => {
    try {
      const wlList = watchMov;
      const favList = favMov;

      const watchlistData = {};
      wlList.forEach((movie) => {
        watchlistData[movie.id] = true;
      });
      const favoriteData = {};
      favList.forEach((movie) => {
        favoriteData[movie.id] = true;
      });

      setFav(favoriteData);
      setWatchlist(watchlistData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const handleFavClick = async (mediaId) => {
    const favoriteStatus = !fav[mediaId];
    try {
      const result = await setFavoriteMovies(mediaId, favoriteStatus);
      if (result.status === 201 || result.status === 200) {
        setFav((prev) => ({
          ...prev,
          [mediaId]: favoriteStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating favorite", error);
    }
  };

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

  let splitting = mov?.release_date?.split("-") || "unknown";
  let releaseYear = splitting[0];

  return (
    <>
      <div className="hidden xl:flex flex-col items-left justify-center gap-6 pl-44 pr-8 py-4 w-1/2 h-5/6 ">
        <div className="flex flex-row items-center space-x-4">
          <Typography className="flex text-white items-center">
            <StarIcon sx={{ marginRight: "5px", color: "red" }} />
            {mov?.vote_average} {"  "}
          </Typography>
          <Typography className="flex text-white items-center">
            {"   "}
            <CalendarMonthIcon sx={{ marginRight: "5px", color: "blue" }} />
            {releaseYear}
          </Typography>
        </div>
        <Typography className="text-white font-semibold text-4xl">
          {mov?.title}
        </Typography>
        <Typography className="text-white text-sm">{mov?.overview}</Typography>

        <div className="flex mt-8 items-center space-x-4">
          <ButtonComponent
            data={mov.id}
            text={"Add to Favorite"}
            handleClick={handleFavClick}
            padding={"15px"}
            bgColor="red"
            hover=""
            icon={<FavoriteIcon sx={{ marginRight: "5px" }} />}
          />

          <ButtonComponent
            data={mov.id}
            text="Add to Watchlist"
            handleClick={handleWLClick}
            padding="15px"
            bgColor="gray"
            hover=""
            transform="uppercase"
            icon={<AddCircleOutlineIcon sx={{ marginRight: "5px" }} />}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-6 pl-8 pr-8 py-4 w-full h-full xl:hidden">
        <Typography className="text-white font-semibold text-xl">
          {mov?.title}
        </Typography>

        <div className="flex flex-row items-center space-x-4">
          <Typography className="flex text-white items-center text-base">
            <StarIcon sx={{ marginRight: "5px", color: "red" }} />
            {mov?.vote_average} {"  "}
          </Typography>
          <Typography className="flex text-white items-center text-base">
            {"   "}
            <CalendarMonthIcon sx={{ marginRight: "5px", color: "blue" }} />
            {releaseYear}
          </Typography>
        </div>
        <div className="flex mt-8 items-center space-x-4">
          <ButtonComponent
            data={mov.id}
            text={"Add to Favorite"}
            handleClick={handleFavClick}
            padding={"15px"}
            bgColor="red"
            hover=""
            fontSize="10px"
            icon={<FavoriteIcon sx={{ marginRight: "5px" }} />}
          />

          <ButtonComponent
            data={mov.id}
            text="Add to Watchlist"
            handleClick={handleWLClick}
            padding="15px"
            bgColor="gray"
            hover=""
            transform="uppercase"
            fontSize="10px"
            icon={<AddCircleOutlineIcon sx={{ marginRight: "5px" }} />}
          />
        </div>
      </div>
    </>
  );
}

export function AllHeros({ movies }) {
  return (
    <div>
      <Carousel
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="w-full h-full"
        className=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="w-full h-full"
        keyBoardControl
        minimumTouchDrag={80}
        responsive={{
          desktop: {
            breakpoint: { max: 4000, min: 1536 },
            items: 1,
          },
          tablet: {
            breakpoint: { max: 1536, min: 768 },
            items: 1,
          },
          mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {movies.slice(8, 15).map((mov, index) => (
          <div
            key={index}
            className="h-[500px] w-full border-b-[1px] border-gray-800 bg-center bg-cover flex-col"
            style={{
              backgroundImage:
                movies.length > 0 &&
                `url(https://image.tmdb.org/t/p/w500/${mov.backdrop_path})`,
              boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
            }}
          >
            <Heros mov={mov} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
