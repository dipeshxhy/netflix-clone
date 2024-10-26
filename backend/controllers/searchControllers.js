import asyncHandler from "express-async-handler";
import { fetchfromTMDB } from "../service/tmdb.service.js";
import User from "../models/userModels.js";
const searchPerson = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const response = await fetchfromTMDB(`
        https://api.themoviedb.org/3/search/person?query=${query} &include_adult=false&language=en-US&page=1
        `);
  if (response.results.length === 0) {
    res.status(404);
    throw new Error("No person found");
    res.send(null);
  }
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].profile_path,
        title: response.results[0].name,
        searchType: "person",
        createdAt: new Date(),
      },
    },
  });
  res.status(200).json({ content: response.results });
});

const searchMovie = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const response = await fetchfromTMDB(`
        https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1
        `);
  if (response.results.length === 0) {
    res.status(404);
    throw new Error("No Movie found");
    res.send(null);
  }
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].poster_path,
        title: response.results[0].title,
        searchType: "movie",
        createdAt: new Date(),
      },
    },
  });
  res.status(200).json({ content: response.results });
});

const searchTv = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const response = await fetchfromTMDB(`
        https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1
        `);
  if (response.results.length === 0) {
    res.status(404);
    throw new Error("No Movie found");
    res.send(null);
  }
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].poster_path,
        title: response.results[0].name,
        searchType: "tv",
        createdAt: new Date(),
      },
    },
  });
  res.status(200).json({ content: response.results });
});

const getSearchHistory = asyncHandler(async (req, res) => {
  res.status(200).json({ content: req.user.searchHistory });
});
const removeItemFromHistory = asyncHandler(async (req, res) => {
  let { id } = req.params;
  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      searchHistory: {
        id: parseInt(id),
      },
    },
  });
  res.status(200).json({message:"Item has been removed" });
});
export {
  searchPerson,
  searchMovie,
  searchTv,
  getSearchHistory,
  removeItemFromHistory,
};
