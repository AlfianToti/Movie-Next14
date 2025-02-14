"use client";

import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardComponent from "./Card";

export default function Detail({ prodCom, detailMov }) {
  const ProductionCompaniesList = () => {
    return prodCom?.map((company) => {
      return (
        <CardComponent
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
          }}
          data={company}
        />
      );
    });
  };

  return (
    <>
      <div
        className="w-full flex flex-row justify-between bg-center bg-cover px-56 pt-10 pb-24"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detailMov?.backdrop_path})`,
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="flex flex-col py-5 bg-opacity-40 rounded-2xl">
          <Typography
            align="left"
            sx={{
              color: "#b32a73",
              fontSize: "40px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            {detailMov?.title}
          </Typography>
          <Typography variant="h6" width={500} align="left" fontWeight={600}>
            "{detailMov?.tagline}"
          </Typography>
          <Typography
            variant="subtitle2"
            width={500}
            align="left"
            marginTop={2}
          >
            {detailMov?.overview}
          </Typography>
          <div className="flex flex-row space-x-5 mt-5">
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CalendarMonthIcon sx={{ color: "blue" }} />:{" "}
              {detailMov?.release_date}
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <StarBorderIcon sx={{ color: "yellow" }} />:{" "}
              {detailMov?.vote_average}
            </Typography>
            <Typography
              variant="body1"
              marginTop={2}
              align="left"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AccessTimeIcon sx={{ color: "teal" }} />: {detailMov?.runtime}{" "}
              minutes
            </Typography>
          </div>
        </div>
        <div className="flex flex-wrap">
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
              image={`https://image.tmdb.org/t/p/w500/${detailMov?.poster_path}`}
              alt="Poster"
              sx={{
                display: "flex",
                objectFit: "cover",
              }}
            />
          </Card>
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
