"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Api from "@/api/api";
import CardComponent from "@/components/Card";
import ButtonComponent from "@/components/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const { setFavoriteMovies, setWatchListMovies } = Api();

export function BtnList({ genres }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#18171c",
          display: "flex",
          justifyContent: { xs: "start", lg: "center" },
          paddingY: "30px",
          paddingX: "15px",
          borderWidth: "thin",
          borderColor: "#1c1b20",
          columnGap: "15px",
          overflow: { xs: "auto", lg: "visible" },
          whiteSpace: "nowrap",
        }}
      >
        {genres.map((genre) => (
          <ButtonComponent
            data={genre}
            text={genre}
            hover={"red"}
            padding={"30px"}
            transform={"none"}
            minWidth={"120px"}
          />
        ))}
      </Box>
    </>
  );
}

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

export function MovieList({ mov, watchMov, favMov }) {
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
  }, []);

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
      {mov.slice(0, 19).map((movie) => (
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
