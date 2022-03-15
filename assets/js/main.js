const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefa = document.querySelector('.lista');

function criaListaTarefa (texto) {
    const li = criaLi();
    li.innerText = texto;
    tarefa.appendChild(li);
    criaBotaoApagar(li);
    salvarTarefas();
    apagarQuandoEnviar();
}

function criaBotaoApagar (li) {
    const button = document.createElement('button');
    button.innerText = 'APAGAR'
    button.setAttribute('class', 'apagar');
    li.appendChild(button);
}

function criaLi () {
    const li = document.createElement('li');
    return li;
}

function apagarQuandoEnviar () {
    inputTarefa.value = '';
    inputTarefa.focus();
}

inputTarefa.addEventListener('keypress', function(e) {
    if (!inputTarefa.value) return;
    if (e.keyCode === 13) {
        criaListaTarefa(inputTarefa.value);
    }
})

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
})

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaListaTarefa(inputTarefa.value);
})


function salvarTarefas () {
    const pegarLi = tarefa.querySelectorAll('li');
    const tarefaFormatada = [];

    for (let tarefas of pegarLi) {
        let tarefasTexto = tarefas.innerText;
        tarefasTexto = tarefasTexto.replace('APAGAR', '');
        tarefaFormatada.push(tarefasTexto);
    }

    const taresfaJSON = JSON.stringify(tarefaFormatada);
    localStorage.setItem('tarefa', taresfaJSON);
}

function adicionaTarefasSalvas () {
    const tarefas = localStorage.getItem('tarefa')
    const tarefasSalvas = JSON.parse(tarefas);

    for (let tarefa of tarefasSalvas) {
        criaListaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
