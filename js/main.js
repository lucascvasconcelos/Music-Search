import './bootstrap';
import { getLyrics, getRank } from './vagalume.js'
import {validarEmail, validarTel} from './validacao.js'

const btn_busca = document.querySelector(".barra-busca button")
const input_busca = document.querySelector(".barra-busca input")
let input_email = document.querySelector("#contact_mail")
let rankSection = document.querySelector("#rank");
const input_phone = document.querySelector("#icon_telephone")
const modal = document.querySelector("#modal1")

validarEmail(input_email)
validarTel(input_phone)


btn_busca.addEventListener('click', function(e){
    e.preventDefault()
    fetch(`https://api.vagalume.com.br/search.art?q=${input_busca.value}&limit=5`)
    .then(res => res.json())
    .then(json => {console.log(json.response.docs[0].url)
        fetch(`https://www.vagalume.com.br${json.response.docs[0].url}index.js`)
        .then(resp => resp.json())
        .then(json =>{
            console.log(json.artist.pic_medium)
            let html = `<div class="col s12 m3">
              <div class="card">
              <div class="card-image">
                  <img src="https://www.vagalume.com.br${json.artist.pic_medium}">
                  <span class="card-title">${json.artist.desc}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1"><i class="material-icons">add</i></a>
              </div>
              <div class="card-content">
                  <p></p>
              </div>
              </div>
            </div>`;
            let modalContent = `
                <div class="modal-content">
                  <div class="row">
                    <h4>${json.artist.desc}</h4>
                    <div class="col s12 m6">
                      <img class="circle" src="https://www.vagalume.com.br${json.artist.pic_medium}">
                      <table>
                        <thead>
                        <tr>
                            <th>Posição Vagalume</th>
                            <th>Views</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>${json.artist.rank.pos}</td>
                            <td>${json.artist.rank.views}</td>
                        </tr> 
                        </tbody>
                    </table>
                      
                    </div>
                    <div class="pull-right">
                      <h6>Músicas mais escutadas</h6>
                      <ul class="collection">`+ getLyrics(json.artist) +`</ul>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Back</a>
                </div>`;
            rankSection.innerHTML =  html
            modal.innerHTML = modalContent

        })

    })
})





//cria os cards estáticos na pagina assim que a página é carregada
getRank("rank.php?type=art&period=month&periodVal=201807&scope=translations&limit=8&apikey=")
.then(resp => resp.json())
.then(json => {
  json.art.month.all.forEach(element => {
      let html = `<div class="col s12 m3">
                      <div class="card">
                      <div class="card-image">
                          <img src="${element.pic_medium}">
                          <span class="card-title">${element.name}</span>
                          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                      </div>
                      <div class="card-content">
                          <p></p>
                      </div>
                      </div>
                  </div>`;
    rankSection.insertAdjacentHTML("beforeend", html)
  });
})


$('.menu a[href^="#"]').on('click', function(e) {
	e.preventDefault();
	var id = $(this).attr('href'),
			targetOffset = $(id).offset().top;
			
	$('html, body').animate({ 
		scrollTop: targetOffset - 100
	}, 400);
});