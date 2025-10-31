import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, appendGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');
const fetchPostsBtn = document.querySelector('.button-pagin');

let currentQuery = '';
let page = 1;
const limit = 15;
let totalHits = 0;

fetchPostsBtn.style.display = 'none';

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({ title: "Warning", message: "Enter a search term!" });
    return;
  }

  currentQuery = query;
  page = 1;
  totalHits = 0;

  clearGallery();
  fetchPostsBtn.style.display = 'none';
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page, limit);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({
        title: "No results",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        backgroundColor: "#ef4040",
        color: "#fafafb",
      });
      return;
    }

    createGallery(data.hits);

    // ✅ Додаємо перевірку на кінець колекції (якщо вже всі результати завантажені)
    if (page * limit >= totalHits) {
      iziToast.info({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results."
      });
      fetchPostsBtn.style.display = 'none';
    } else {
      fetchPostsBtn.style.display = 'block';
    }

  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to fetch images." });
  } finally {
    hideLoader();
  }
});

fetchPostsBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  fetchPostsBtn.style.display = 'none';

  try {
    const data = await getImagesByQuery(currentQuery, page, limit);
    appendGallery(data.hits);

    if (page * limit < totalHits) {
      fetchPostsBtn.style.display = 'block';
    } else {
      iziToast.error({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height || 0;
    if (cardHeight) {
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to fetch more images." });
  } finally {
    hideLoader();
  }
});
