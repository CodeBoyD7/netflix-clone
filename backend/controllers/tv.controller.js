import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US&include_adult=true"
    );
    if (data.results && data.results.length) {
      const randomTv =
        data.results[Math.floor(Math.random() * data.results.length)];
      return res.json({ success: true, content: randomTv });
    }
    return res
      .status(404)
      .json({ success: false, message: "No trending TV shows found" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&include_adult=true`
    );
    if (data.results) {
      return res.json({ success: true, trailers: data.results });
    }
    return res
      .status(404)
      .json({ success: false, message: "No trailers found" });
  } catch (error) {
    console.error(error); // Log error for debugging
    if (error.response && error.response.status === 404) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&include_adult=true`
    );
    return res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error(error); // Log error for debugging
    if (error.response && error.response.status === 404) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTvs(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1&include_adult=true`
    );
    if (data.results) {
      return res.status(200).json({ success: true, similar: data.results });
    }
    return res
      .status(404)
      .json({ success: false, message: "No similar TV shows found" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvsByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1&include_adult=true`
    );
    if (data.results) {
      return res.status(200).json({ success: true, content: data.results });
    }
    return res
      .status(404)
      .json({ success: false, message: "No TV shows found for this category" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
