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
  const name = campos[0].value.trim();
  const email= campos[1].value.trim();
  const birthData= campos[2].value.trim();
  const password=campos[3].value;
  console.log(`name: ${name}, email: ${email}, birthData: ${birthData}, password: ${password}`);
  
  //== Dados do formulário
  const dados ={
    nome:name,
    email:email,
    birthData: birthData,
    password:password
  };


  //== Funções de validação separadas

  const isNameValid = nameValidate();
  const isEmailValid = emailValidate();
  const isPasswordValid = mainPasswordValidate();
  const isDateValid = validateDate();

  console.log(`Nome válido: ${isNameValid}`);
  console.log(`Email válido: ${isEmailValid}`);
  console.log(`Senha válida: ${isPasswordValid}`);
  console.log(`Data válida: ${isDateValid}`);


    
  if (!nameValidate() || !emailValidate() || !mainPasswordValidate() || !validateDate()) {
    alert('Por favor, corrija os erros no formulário.');
    return;
}





  //===Envia os dados para a API
  
  //http://api.farmlord.com.br/register
  //https://reqres.in/api/users

  try {
   
   const result = await fetch('https://api.farmlord.com.br/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
   

});
//
   
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
   const inputName = campos[0].value;

  if (inputName.length < 3) {
   
    setErro(0);
    return false;
    
  } else {
    removeErro(0);
    return true;
  }
}
function emailValidate() {
  const inputEmail = campos[1].value;

  if (!emailRegex.test(inputEmail)) {
    setErro(1);
    return false;
  } else {
    removeErro(1);
    return true;
  }
 
}
function validateDate() {
  
   const birthData = campos[2].value;
 
  if (!birthData) {
    
    setErro(2);
    return false;
  } else {
    removeErro(2);
  }

  // usamos a sintaxe de desestruturação [year, month, day]
  const [year, month, day] = birthData.split("-").map(Number);
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  console.log(`Idade calculada: ${age}`);

  if (age >= 18) {
    console.log('Idade válida');
    removeErro(2);
    return true;
  } else {
    console.log('Menor de idade');
    setErro(2);
    return false;
  }


}


function mainPasswordValidate() {
  const inputPassword = campos[3].value;
  if (inputPassword.length < 6) {
   
    setErro(3);
    return false;
     
  } else {
    removeErro(3);
    return true;
  }
}


