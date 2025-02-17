import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export default function CardComponent({
  data,
  handleFavClick,
  handleWLClick,
  fav,
  wl,
  sxMedia,
  sx,
  movie,
}) {
  return (
    <Link
      key={data.id}
      href={movie ? `/detail/${data.id}` : `/detail-tv/${data.id}`}
    >
      <Card sx={sx}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${
            data.poster_path || data.logo_path
          }`}
          alt={data.name}
          sx={sxMedia}
        />
        <CardContent>
          <Typography
            variant="body2"
            title={data.title || data.name}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              color: "white",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.title || data.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#9d9b9d",
              fontWeight: 400,
            }}
          >
            {data.release_date || data.first_air_date}
          </Typography>
        </CardContent>
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            opacity: 0,
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          {handleFavClick && (
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavClick(data.id);
              }}
              sx={{
                color: fav[data.id] ? "red" : "white",
                backgroundColor: "black",
                scale: 0.7,
              }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
          {handleWLClick && (
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWLClick(data.id);
              }}
              sx={{
                color: wl[data.id] ? "blue" : "white",
                backgroundColor: "black",
                scale: 0.7,
              }}
            >
              <WatchLaterIcon />
            </IconButton>
          )}
        </Box>
      </Card>
    </Link>
  );
}
