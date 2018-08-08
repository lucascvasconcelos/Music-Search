const baseURL = "https://www.vagalume.com.br";
const baseApiURL = "https://api.vagalume.com.br";
export function getLyrics(items) {
  return items.lyrics.item.map(function(item){
    return `<li class="collection-item avatar">
       <a href="${baseURL}${item.url}" target="_blank"><i class="material-icons circle red">play_arrow</i></a>
       <span class="title">Title</span>
       <p>${item.desc}</p>
    </li>`;
  });

}

export function getRank(url) {
  return fetch(baseApiURL + '/' + url)
}
