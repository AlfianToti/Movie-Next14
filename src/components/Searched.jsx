"use client";
import { TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Searched({ data, searchQuery }) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery || "");

  useEffect(() => {
    setQuery(searchQuery || "");
  }, [searchQuery]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col h-full w-full py-10 px-10">
      <TextField
        variant="filled"
        label="Search your movie"
        value={decodeURIComponent(query || "")}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        sx={{
          display: "flex",
          input: { color: "white" },
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiFilledInput-root": {
            backgroundColor: "black",
            borderBottom: "2px solid white",
            "&::after": {
              borderBottomColor: "white",
            },
          },
        }}
      />
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link key={index} href={`/detail/${item.id}`}>
            <div className="flex flex-row w-full p-7 mt-8 text-white border-b border-black">
              <Image
                src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                width={100}
                height={100}
                className="object-contain"
                alt={item.title}
              />
              <div className="flex flex-col gap-2 px-4">
                <Typography className="text-2xl">
                  {item.title} {` (${item.release_date.split("-")[0]})`}
                </Typography>
                <Typography className="text-gray-400">
                  {`Rate : ${item.vote_average}`} {" | "}{" "}
                  {item.release_date.split("-")[0]}
                </Typography>
                <Typography
                  className="text-gray-500"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.overview}
                </Typography>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full mt-10 pt-9">
          <Typography variant="h4" align="center" fontWeight={700}>
            There&apos;s no movie named &quot;{searchQuery}&quot;
          </Typography>
        </div>
      )}
    </div>
  );
}
