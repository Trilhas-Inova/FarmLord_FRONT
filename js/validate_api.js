//===VALIDAÇÃO de FORMULÁRIOS 
const form = document.querySelector("#form");
const campos = document.querySelectorAll(".input_cadastro");
const formSpan = document.querySelectorAll(".form-span");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//==ouvindo o submit
form.addEventListener("submit",async (event)=>{
 //Previne o comportamento padrão do formulário
 event.preventDefault();
 // Captura os dados do formulário
  const name = campos[0].value;
  const email= campos[1].value;
  const birthData= campos[2].value;
  const password=campos[3].value;
  
  //== Dados do formulário
  const dados ={
    nome:name,
    email:email,
    birthData: birthData,
    password:password
  };

  //== Funções de validação separadas
  if (nameValidate() || emailValidate() || mainPasswordValidate() || validateDate()) {
    alert('Por favor, corrija os erros no formulário.');
    return;
}

  // if(!valid){
  //   alert('Por favor, corrija os erros no formulário.');
  //       return;
  // }
  //===Envia os dados para a API
  // http://api.farmlord.com.br/register
  try {
   
   const result = await fetch('http://api.farmlord.com.br/register', {
    method: 'POST',
   
    body: JSON.stringify(dados)

});
  
   // Verifica a resposta da API
   if (result.ok) {
    const jsonResult = await result.json();
    console.log('Sucesso:', jsonResult);
    alert('Formulário enviado com sucesso!');
} else {
    console.error('Erro:', result.statusText);
    alert('Erro ao enviar formulário.');
}
} catch (erro) {
console.error('Erro:', erro);
alert('Erro ao enviar formulário.');
}

});

//==Exibir  de erro na tela
function setErro(index) {
  
  campos[index].style.outline = "3px solid #e74c3c";
  formSpan[index].style.visibility = "visible";
}
function removeErro(index) {
  campos[index].style.outline = "none";
  formSpan[index].style.display = "none";
}
//==Funções de inputs
function nameValidate() {
  if (campos[0].value.length < 3) {
    setErro(0);
    return false;
  } else {
    removeErro(0);
    return true;
  }
}
function emailValidate() {
  if (!emailRegex.test(campos[1].value)) {
    setErro(1);
    return false;
  } else {
    removeErro(1);
    return true;
  }
}
function mainPasswordValidate() {
  if (campos[3].value.length < 6) {
    setErro(3);
    return false;
  } else {
    removeErro(3);
    return true;
  }
}
function validateDate() {
  const birthData = campos[2].value;
  if (!birthData) {
    setErro(2);
  } else {
    removeErro(2);
  }
  // usamos a sintaxe de desestruturação [year, month, day]
  const [year, month, day]= birthData.split("-").map(Number);
  const today = new Date();
  const age = today.getFullYear() - year;
  const monthDiff = new Date(today.getFullYear(),+1 - month);


  if(age > 18 || (monthDiff === 0 && dayDiff < 0)){

    //  age--;
  }else{
    setErro(2);
    console.error('Menor de idade');
    return false;
  }


}
