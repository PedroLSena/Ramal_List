const varNome = document.querySelector(".inputNome");
const varMat = document.querySelector(".inputMat");
const varSetor = document.querySelector(".inputSet");

const tarefas = document.querySelector(".tarefas");

const btn = document.querySelector(".btnFunc");

const lis = document.querySelector('.lista');

btn.addEventListener("click", function(e) {
    const nm = varNome.value;
    const mat = varMat.value;
    const st = varSetor.value;
    //console.log(typeof nm);



    if (nm === "" || mat === "" || st === "") {
        alert("Erro!!, sem dados no input");
    }
    // else if( typeof mat === String){
    //     alert("Erro, insira um numero de matricula valido");

    // }else if(typeof st === String){
        //alert("Erro, insira um numero de matricula valido");
    // }
    else{
        criaTarefa(nm, mat, st);

    }
});

function criaTarefa(nm, mat, st) {
    const li = criaLi(nm, mat, st);
    tarefas.appendChild(li);
    criaBotaoApagar(li);
    salvarTrf();
    limpaInput();
    
}

function criaLi(nm, mat, st) {
    const li = document.createElement('li');
    tarefas.setAttribute('class' , 'lista');
    li.innerText = `Nome: ${nm}, Matrícula: ${mat}, Ramal: ${st}`;
    //li.style.fontWeight = 'bolder';
    //console.log(li.innerText.length);
    return li;
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

document.addEventListener('click', function(e) {
    const el = e.target;


    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTrf();
        //this.location.reload();
        

    }
});

function limpaInput() {
    varNome.value = '';
    varMat.value = '';
    varSetor.value = '';
    varNome.focus(); 
}

function salvarTrf() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
      listaDeTarefas.push(tarefaTexto);
  }

  localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
}


function adicionaTarefasSalvas() {
  const tarefasStored = localStorage.getItem('tarefas');

  tarefas.innerHTML = '';

  if (tarefasStored) {
      const listaDeTarefas = JSON.parse(tarefasStored);
      for (let tarefaTexto of listaDeTarefas) {
          const li = document.createElement('li');
          li.innerText = tarefaTexto;
          tarefas.appendChild(li);
          criaBotaoApagar(li);
      }
  }
}




adicionaTarefasSalvas();
