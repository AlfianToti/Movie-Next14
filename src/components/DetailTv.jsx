"use client";

import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TvIcon from "@mui/icons-material/Tv";
import CardComponent from "./Card";

export default function DetailTv({ prodCom, detailTv }) {
  const ProductionCompaniesList = () => {
    return prodCom?.map((company) => {
      return (
        <CardComponent
          key={company.id}
          sx={{
            width: 150,
            height: 200,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.10)",
            },
            backgroundColor: "revert",
            border: "none",
          }}
          sxMedia={{
            fontSize: "20px",
            height: 120,
            alignContent: "center",
            padding: "10px",
            display: "flex",
            objectFit: "contain",
            color: "white",
          }}
          data={company}
        />
      );
    });
  };

  return (
    <>
      <div
        className="w-fit xl:w-full flex flex-row justify-between bg-center bg-cover px-56 pt-10 pb-24"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detailTv?.backdrop_path})`,
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="hidden md:flex flex-col py-5 bg-opacity-40 rounded-2xl">
          <Typography
            align="left"
            sx={{
              color: "#b32a73",
              fontSize: "40px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            {detailTv?.name}
          </Typography>
          <Typography variant="h6" width={500} align="left" fontWeight={600}>
            &quot;{detailTv?.tagline}&quot;
          </Typography>
          <Typography
            variant="subtitle2"
            width={500}
            align="left"
            marginTop={2}
          >
            {detailTv?.overview}
          </Typography>
          <div className="flex flex-row space-x-5 mt-5">
            <Typography
              variant="body1"
              marginTop={2}
              align="center"
              sx={{
                fontSize: "15px",
                "@media (max-width: 1280px)": { fontSize: "10px" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <CalendarMonthIcon sx={{ color: "blue" }} />:{" "}
              {detailTv?.first_air_date} - {detailTv?.last_air_date}
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "15px",
                "@media (max-width: 1280px)": { fontSize: "10px" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarBorderIcon sx={{ color: "yellow" }} />:{" "}
              {detailTv?.vote_average}
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "15px",
                "@media (max-width: 1280px)": { fontSize: "10px" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <TvIcon sx={{ color: "teal" }} />: {detailTv?.number_of_episodes}{" "}
              Total Episodes
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "15px",
                "@media (max-width: 1280px)": { fontSize: "10px" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <TvIcon sx={{ color: "violet" }} />: {detailTv?.number_of_seasons}{" "}
              Total Seasons
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Typography
            align="center"
            sx={{
              "@media (min-width: 768px)": { display: "none" },
              color: "white",
              fontSize: "20px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            {detailTv?.name}
          </Typography>
          <Card
            sx={{
              width: 200,
              height: 300,
              fontSize: "28px",
              backgroundColor: "revert-layer",
              border: "none",
            }}
          >
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${detailTv?.poster_path}`}
              alt="Poster"
              sx={{
                display: "flex",
                objectFit: "cover",
              }}
            />
          </Card>
          <Typography
            variant="subtitle2"
            width={500}
            align="center"
            marginTop={2}
            sx={{
              "@media (max-width: 528px)": { width: "200px", fontSize: "12px" },
              "@media (min-width: 768px)": { display: "none" },
            }}
          >
            {detailTv?.overview}
          </Typography>
          <div className="flex flex-col sm:flex-row space-x-5 mt-5 md:hidden">
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CalendarMonthIcon sx={{ color: "blue" }} />:{" "}
              {detailTv?.first_air_date} - {detailTv?.last_air_date}
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarBorderIcon sx={{ color: "yellow" }} />:{" "}
              {detailTv?.vote_average}
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TvIcon sx={{ color: "teal" }} />: {detailTv?.number_of_episodes}{" "}
              Total Episodes
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TvIcon sx={{ color: "violet" }} />: {detailTv?.number_of_seasons}{" "}
              Total Seasons
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-9 text-center py-10 px-5 border-t-2 border-gray-500">
        <Typography variant="h4" fontWeight={600}>
          {" "}
          Production Companies{" "}
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <ProductionCompaniesList />
        </div>
      </div>
    </>
  );
}
