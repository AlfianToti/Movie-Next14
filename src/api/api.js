import axios from "axios";

export default function Api() {
  const searchMovies = async (movie) => {
    const search = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?page=1&query=${movie}&`,
      {
        headers: {
          accept: "application/json",
          Authorization: process.env.NEXT_PUBLIC_BEARER_KEY,
        },
      }
    );
    return search.data;
  };

  const setFavoriteMovies = async (mediaId, isFavorite) => {
    try {
      const favoriteMov = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/21793102/favorite`,
        {
          media_id: mediaId,
          media_type: "movie",
          favorite: isFavorite,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_BEARER_KEY,
          },
        }
      );
      return favoriteMov;
    } catch (error) {
      console.log({ error });
    }
  };

  const setWatchListMovies = async (mediaId, isWatchlist) => {
    try {
      const watchlistMov = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/21793102/watchlist`,
        {
          media_id: mediaId,
          media_type: "movie",
          watchlist: isWatchlist,
        },
        {
          headers: {
            accept: "application",
            "content-type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_BEARER_KEY,
          },
        }
      );
      console.log({ watchlistMov });
      return watchlistMov;
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    searchMovies,
    setFavoriteMovies,
    setWatchListMovies,
  };
}
