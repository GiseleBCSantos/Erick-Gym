const cx_nome = document.getElementById('cx-nome')
const cx_descricao = document.getElementById('cx-descricao')
const btn_cadastro = document.getElementById('btn-cadastro')
const list_exercicios = document.getElementById('list-exercicios')
const table_exercicios = document.getElementById('table-exercicios')
const API_URL = 'https://erick-gym.onrender.com/exercicios/api'




function main() {
    btn_cadastro.onclick = salvarExercicio
    carregarExerciciosAPI()

}

async function carregarExerciciosAPI() {
    const response = await fetch(API_URL)
    if (response.status === 200) {
        const exercicios = await response.json()
        for (let exercicio of exercicios) {
            adicionarItemNaLista(exercicio)
        }
    }
}


async function salvarExercicio(e) {
    e.preventDefault()
    const nome = cx_nome.value
    const descricao = cx_descricao.value

    const dados = { nome, descricao }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }

    const response = await fetch(API_URL, config)

    if (response.status === 201) {
        const exercicio = await response.json()
        adicionarItemNaLista(exercicio)
        alert('Exercicio cadastrado com sucesso!')

    }
    else {
        alert('Erro ao cadastrar exercicio!')
        console.log(response.status)

    }

}



async function apagarExercicio(id) {
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }


    await fetch(`${API_URL}/deletar/${id}`, config).then(response => {
        if (response.status >= 200 && response.status < 300) {
            alert('Excluído!')
            window.location.href = 'index.html'
        }
        else {
            alert('Falha ao tentar excluir.')
        }
    })
        .catch(error => console.log)
}

function voltarCadastro(){
    btn_cadastro.value = 'Cadastro Exercício'
    btn_cadastro.innerText = 'Cadastro'
    btn_cadastro.setAttribute('onclick', 'salvarExercicio()')
}


async function iniciarModificarExercicio(id) {
    let response = await fetch(`${API_URL}/obter/${id}`)
    if (response.status === 200) {
        const exercicio = await response.json()
        const nome = exercicio.nome
        const descricao = exercicio.descricao

        cx_nome.value = nome
        cx_descricao.value = descricao
        btn_cadastro.innerText = 'Atualizar'
        btn_cadastro.value = 'Atualizar Exercício'
        btn_cadastro.setAttribute('onclick', `modificarExercicio(${id})`)

        let btn_cancelar_att = document.createElement('button')
        btn_cancelar_att.innerHTML = '<button class="btn btn-primary" onclick="voltarCadastro()">Cancelar Atualização</button>'
    }
    else {
        alert(`Erro ${response.status}`)
    }
}


async function modificarExercicio(id) {
    const nome = cx_nome.value
    const descricao = cx_descricao.value

    const dados = { nome, descricao }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }



    await fetch(`${API_URL}/modificar/${id}`, options).then(response => {
        if (response.status >= 200 && response.status < 300){
            voltarCadastro()
            window.location.href = 'index.html'
        }
        else{
            console.log(response.status)
        }
    })
        .catch(error => console.log)
}





function adicionarItemNaLista(exercicio) {
    const item_nome = document.createElement('td')
    const item_descricao = document.createElement('td')
    const modificar = document.createElement('td')
    const deletar = document.createElement('td')
    const linha = document.createElement('tr')

    item_nome.innerText = `${exercicio.nome}`
    item_descricao.innerText = `${exercicio.descricao}`
    modificar.innerHTML = `<button class="btn btn-warning" onclick="iniciarModificarExercicio(${exercicio.id})"><i class="fa-solid fa-pen-to-square"></i></button>`
    deletar.innerHTML = `<button class="btn btn-danger" onclick="apagarExercicio(${exercicio.id})"><i class="fa-solid fa-trash"></i></button>`


    linha.appendChild(item_nome)
    linha.appendChild(item_descricao)
    linha.appendChild(modificar)
    linha.appendChild(deletar)

    table_exercicios.appendChild(linha)


    cx_nome.value = ''
    cx_descricao.value = ''
    cx_nome.focus()
}



main()