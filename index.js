import{a as L,S as v,i as l}from"./assets/vendor-DSl0TciY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const $="52921065-da1fe04bba5d9d2706b6c1990",S="https://pixabay.com/api/";async function y(o,t=1,e=15){try{return(await L.get(S,{params:{key:$,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:e}})).data}catch(s){throw console.error("Error fetching images:",s),s}}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=new v(".gallery a",{captionsData:"alt",captionDelay:250});function q(o){const t=o.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes: ${e.likes}</p>
        <p>Views: ${e.views}</p>
        <p>Comments: ${e.comments}</p>
        <p>Downloads: ${e.downloads}</p>
      </div>
    </li>
  `).join("");f.innerHTML=t,h.refresh()}function E(o){const t=o.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes: ${e.likes}</p>
        <p>Views: ${e.views}</p>
        <p>Comments: ${e.comments}</p>
        <p>Downloads: ${e.downloads}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",t),h.refresh()}function R(){f.innerHTML=""}function g(){m.hidden=!1}function b(){m.hidden=!0}const w=document.querySelector(".form"),P=w.querySelector('input[name="search-text"]'),n=document.querySelector(".button-pagin");let p="",i=1;const d=15;let c=0;n.style.display="none";w.addEventListener("submit",async o=>{o.preventDefault();const t=P.value.trim();if(!t){l.warning({title:"Warning",message:"Enter a search term!"});return}p=t,i=1,c=0,R(),n.style.display="none",g();try{const e=await y(p,i,d);if(c=e.totalHits,!e.hits.length){l.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"});return}q(e.hits),i*d<c&&(n.style.display="block")}catch{l.error({title:"Error",message:"Failed to fetch images."})}finally{b()}});n.addEventListener("click",async()=>{var o;i+=1,g(),n.style.display="none";try{const t=await y(p,i,d);E(t.hits),i*d<c?n.style.display="block":l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});const e=((o=document.querySelector(".gallery-item"))==null?void 0:o.getBoundingClientRect().height)||0;e&&window.scrollBy({top:e*2,behavior:"smooth"})}catch{l.error({title:"Error",message:"Failed to fetch more images."})}finally{b()}});
//# sourceMappingURL=index.js.map
