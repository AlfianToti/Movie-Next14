"use client";

import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Menu, Close } from "@mui/icons-material";

const pages = [
  { title: "Home", url: "/" },
  { title: "TV Shows", url: "/tv-shows" },
  { title: "Movies", url: "/movies" },
  { title: "Watchlist", url: "/watchlist" },
  { title: "Favorite", url: "/favorite" },
];

export default function Header() {
  const [expandSearch, setExpandSearch] = useState(false);
  const path = usePathname();

  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="pt-2 pb-2 px-10 w-full border-b border-gray-800 bg-transparent flex justify-between items-center">
      <Link href="/">
        <Image src={"/img/logo.png"} width={130} height={80} alt="logo" />
      </Link>
      <div className="hidden lg:flex gap-8 items-center">
        {pages.map((page) => {
          const isActive = path === page.url;
          return (
            <Typography
              component={"a"}
              href={page.url}
              key={page}
              sx={{
                textAlign: "center",
                mx: "20px",
                color: isActive ? "white" : "lightgray",
                fontWeight: isActive ? "bold" : "normal",
                textDecorationLine: isActive ? "underline" : "none",
                textUnderlineOffset: isActive ? "20px" : "6px",
                textDecorationColor: isActive ? "red" : "transparent",
                "&:hover": {
                  fontWeight: "bold",
                  color: "white",
                  textDecorationLine: "underline",
                  textUnderlineOffset: "20px",
                  textDecorationColor: "red",
                },
              }}
            >
              {page.title}
            </Typography>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-64 bg-inherit h-full shadow-lg p-5">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <Close className="w-8 h-8" sx={{ color: "white" }} />
            </button>
            <div className="flex flex-col space-y-4 mt-10 gap-y-5">
              {pages.map((page) => {
                const isActive = path === page.url;
                return (
                  <Typography
                    component={"a"}
                    href={page.url}
                    key={page}
                    sx={{
                      textAlign: "center",
                      mx: "20px",
                      color: isActive ? "white" : "lightgray",
                      fontWeight: isActive ? "bold" : "normal",
                      textDecorationLine: isActive ? "underline" : "none",
                      textUnderlineOffset: isActive ? "20px" : "6px",
                      textDecorationColor: isActive ? "red" : "transparent",
                      "&:hover": {
                        fontWeight: "bold",
                        color: "white",
                        textDecorationLine: "underline",
                        textUnderlineOffset: "20px",
                        textDecorationColor: "red",
                      },
                    }}
                  >
                    {page.title}
                  </Typography>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-8">
        {expandSearch ? (
          <TextField
            variant="outlined"
            sx={{
              input: { color: "white" },
            }}
            label="Search movie"
            autoFocus
            onBlur={() => setExpandSearch(false)}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        ) : (
          <IconButton onClick={() => setExpandSearch(true)}>
            <SearchIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        )}

        <button className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu className="w-8 h-8" />
        </button>
        <Avatar alt="avatar" src="/img/Toti.jpg" />
      </div>
    </div>
  );
}
