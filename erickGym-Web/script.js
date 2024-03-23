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
        alert(`Erro ${response.status}`)

    }
    else {
        alert('Erro ao cadastrar exercicio!')
        alert(`Erro ${response.status}`)

    }


}




async function apagarExercicio(id) {

    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`${API_URL}/deletar/${id}`, options).then(response => {
        console.log(response.status)
        if (response.status >= 200 && response.status < 300){
            alert('Excluído!')
        }
        else{
            alert('Falha ao tentar excluir.')
        }
    })
    .catch(error => console.log)
}


// async function modificarExercicio(id) {
    
// }





function adicionarItemNaLista(exercicio) {
    const item_nome = document.createElement('td')
    const item_descricao = document.createElement('td')
    const modificar = document.createElement('td')
    const deletar = document.createElement('td')
    const linha = document.createElement('tr')

    item_nome.innerText = `${exercicio.nome}`
    item_descricao.innerText = `${exercicio.descricao}`
    modificar.innerHTML = `<button onclick="modificarExercicio(${exercicio.id})"><i class="fa-solid fa-pen-to-square"></i></button>`
    deletar.innerHTML = `<button onclick="apagarExercicio(${exercicio.id})"><i class="fa-solid fa-trash"></i></button>`


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