import axios from "axios";

const API_KEY = "52921065-da1fe04bba5d9d2706b6c1990";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page = 1, per_page = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
