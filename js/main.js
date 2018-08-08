import './bootstrap';
import { getLyrics, getRank } from './vagalume.js'

const btn_busca = document.querySelector(".barra-busca button")
const input_busca = document.querySelector(".barra-busca input")
let input_email = document.querySelector("#contact_mail")
const div_email = document.querySelector("#email")
const urlDefault = 'https://api.vagalume.com.br/rank.php?type=art&period=month&periodVal=201807&scope=translations&limit=8&apikey=';
let rankSection = document.querySelector("#rank");
const span_email = document.querySelector("#span_email")
const span_phone = document.querySelector("#span_phone")
const input_phone = document.querySelector("#icon_telephone")
const modal = document.querySelector("#modal1")

input_email.addEventListener("keyup", function(){
    var EmailRegex =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
   if(EmailRegex.test(input_email.value)){
    console.log(input_email.value)
   span_email.innerHTML = ""
   }
    else
    span_email.innerHTML = "Por favor insira um Endereço de E-mail válido!"
})

input_phone.addEventListener("keyup", function(){
    var phoneRegex = /^(?:[12][1-9]9[2-9]|[3-9][1-9][5-9])[0-9]{7}$/
    if(phoneRegex.test(input_phone.value)){
        span_phone.innerHTML = ""
    }
    else
        span_phone.innerHTML = "Número inválido"
})



function validar_email(email){

}

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
                    </div>
                    <div class="pull-right">
                      <h6>Músicas mais escutadas</h6>
                      <ul class="collection">`+ getLyrics(json.artist) +`</ul>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>`;
            rankSection.innerHTML =  html
            modal.innerHTML = modalContent

        })

    })
})


// fetch(urlDefault)
//     .then(resp => resp.json())
//     .then(json => {
        // json.art.month.all.forEach(element => {
        //     console.log(element)
        //     let html = `<div class="col s12 m3">
        //                     <div class="card">
        //                     <div class="card-image">
        //                         <img src="${element.pic_medium}">
        //                         <span class="card-title">${element.name}</span>
        //                         <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        //                     </div>
        //                     <div class="card-content">
        //                         <p></p>
        //                     </div>
        //                     </div>
        //                 </div>`;
        //   console.log(rankSection);
        //   rankSection.insertAdjacentHTML("beforeend", html)
        // });
//
//     })
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
