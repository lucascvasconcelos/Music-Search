const span_email = document.querySelector("#span_email")
const span_phone = document.querySelector("#span_phone")

export function validarEmail(email){
   email.addEventListener("keyup", function(){
        var EmailRegex =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
       if(EmailRegex.test(email.value)){
        console.log(email.value)
       span_email.innerHTML = ""
       }
        else
        span_email.innerHTML = "Por favor insira um Endereço de E-mail válido!"
    })
}

export function validarTel(tel){
    tel.addEventListener("keyup", function(){
        var phoneRegex = /^(?:[12][1-9]9[2-9]|[3-9][1-9][5-9])[0-9]{7}$/
        if(phoneRegex.test(tel.value)){
            span_phone.innerHTML = ""
        }
        else
            span_phone.innerHTML = "Número inválido"
    }) 
}

