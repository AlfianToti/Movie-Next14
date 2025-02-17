"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Api from "@/api/api";
import CardComponent from "@/components/Card";
import ButtonComponent from "@/components/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter, useSearchParams } from "next/navigation";

const { setFavoriteMovies, setWatchListMovies } = Api();

export function TabList({ tabs }) {
  const [tabsChange, setTabsChange] = useState(tabs[0]);

  const handleTabsClick = (id) => {
    setTabsChange((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="hidden">
        <Box
          sx={{
            marginTop: "0px",
            paddingY: "10px",
            display: "flex",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(12, 13, 15, 0.5)",
          }}
        >
          <Tabs>
            {tabs.map((text) => (
              <Tab
                key={text}
                label={text}
                sx={{
                  textTransform: "none",
                  color: tabsChange === text ? "white" : "gray",
                  textDecorationLine:
                    tabsChange === text ? "underline" : "none",
                  textUnderlineOffset: tabsChange === text ? "19px" : "",
                  textDecorationColor: tabsChange === text ? "red" : "",
                  marginX: "60px",
                  "&:hover": {
                    color: "white",
                    textDecorationLine: "underline",
                    textUnderlineOffset: "19px",
                    textDecorationColor: "red",
                  },
                }}
                onClick={() => handleTabsClick(text)}
              />
            ))}
          </Tabs>
        </Box>
      </div>
      <div className="block xl:hidden"></div>
    </>
  );
}

export function BtnList({ genres }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get("genre");

  const handleGenreClick = (genreId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentGenre === String(genreId)) {
      params.delete("genre");
    } else {
      params.set("genre", genreId);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#18171c",
          display: "flex",
          justifyContent: "start",
          paddingY: "30px",
          paddingX: "15px",
          borderWidth: "thin",
          borderColor: "#1c1b20",
          columnGap: "15px",
          overflow: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
          "&::webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },
          "&::webkit-scrollbar-thumb": {
            background: "transparent",
          },
          "&::webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        {genres?.map((genre) => {
          const isActive = currentGenre === String(genre.id);
          return (
            <ButtonComponent
              data={genre?.id}
              text={genre?.name}
              hover={"red"}
              padding={"30px"}
              transform={"none"}
              minWidth={"120px"}
              isActive={isActive}
              handleClick={handleGenreClick}
            />
          );
        })}
      </Box>
    </>
  );
}

export function MovieList({ selectedGenre, mov, watchMov, favMov }) {
  const [watchlist, setWatchlist] = useState({});
  const [fav, setFav] = useState({});
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie${
          selectedGenre ? `?with_genres=${selectedGenre}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_BEARER_KEY,
          },
          cache: "no-store",
        }
      );
      const response = await res.json();
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
      setMovies(response.results || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedGenre]);

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

  return (
    <Carousel
      autoPlaySpeed={3000}
      className="py-10"
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      itemClass=""
      keyBoardControl
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1280 },
          items: 7,
          slidesToSlide: 3,
        },
        tablet: {
          breakpoint: { max: 1280, min: 820 },
          items: 5,
          slidesToSlide: 5,
        },
        mobile: {
          breakpoint: { max: 820, min: 580 },
          items: 3,
          slidesToSlide: 3,
        },
        smallmobile: {
          breakpoint: { max: 580, min: 0 },
          items: 2,
          slidesToSlide: 2,
        },
      }}
      rewind={true}
      rewindWithAnimation={true}
      shouldResetAutoplay
      showDots
      slidesToSlide={1}
      swipeable
    >
      {movies?.map((movie) => (
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
          data={movie}
          handleFavClick={handleFavClick}
          handleWLClick={handleWLClick}
          fav={fav}
          wl={watchlist}
          movie={true}
        />
      ))}
    </Carousel>
  );
}
