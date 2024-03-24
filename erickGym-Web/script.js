const cx_nome = document.getElementBypk('cx-nome')
const cx_descricao = document.getElementBypk('cx-descricao')
const btn_cadastro = document.getElementBypk('btn-cadastro')
const list_exercicios = document.getElementBypk('list-exercicios')
const table_exercicios = document.getElementBypk('table-exercicios')
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



async function apagarExercicio(pk) {

    let config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }


    await fetch(`${API_URL}/deletar/${pk}`, config).then(response => {
        console.log(response.status)
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


async function iniciarModificarExercicio(pk) {
    let response = await fetch(`${API_URL}/obter/${pk}`)
    if (response.status === 200) {
        const exercicio = await response.json()
        const nome = exercicio.nome
        const descricao = exercicio.descricao

        cx_nome.value = nome
        cx_descricao.value = descricao
        btn_cadastro.innerText = 'Atualizar'
        btn_cadastro.setAttribute('onclick', `modificarExercicio(${pk})`)
        console.log('onclick atribupko')
    }
    else {
        alert(`Erro ${response.status}`)
    }
}





async function modificarExercicio(pk) {
    console.log('onclick funcionando')
    const novo_nome = cx_nome.value
    const nova_descricao = cx_descricao.value

    const dados = { novo_nome, nova_descricao }

    const config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }

    console.log(novo_nome, nova_descricao, pk)


    await fetch(`${API_URL}/modificar/${pk}`, config).then(response => {
        if (response.status >= 200 && response.status < 300){
            window.location.href = 'index.html'
            console.log('Exercicio modificado com sucesso.')
            btn_cadastro.innerText = 'Cadastro'
            btn_cadastro.setAttribute('onclick', 'carregarExerciciosAPI()')
        }
        else{
            console.log(response.status)
        }
    })
        .catch(error => console.log)



    // let response = await fetch(`${API_URL}/modificar/${pk}`, config)


    // if (response.status === 200) {
    //     window.location.href = 'index.html'
    //     console.log('Exercicio modificado com sucesso.')
    //     btn_cadastro.innerText = 'Cadastro'
    //     btn_cadastro.setAttribute('onclick', 'carregarExerciciosAPI()')
    // }
    // else {
    //     console.log(response.status)
    // }
}





function adicionarItemNaLista(exercicio) {
    const item_nome = document.createElement('td')
    const item_descricao = document.createElement('td')
    const modificar = document.createElement('td')
    const deletar = document.createElement('td')
    const linha = document.createElement('tr')

    item_nome.innerText = `${exercicio.nome}`
    item_descricao.innerText = `${exercicio.descricao}`
    modificar.innerHTML = `<button onclick="iniciarModificarExercicio(${exercicio.pk})"><i class="fa-solpk fa-pen-to-square"></i></button>`
    deletar.innerHTML = `<button onclick="apagarExercicio(${exercicio.pk})"><i class="fa-solpk fa-trash"></i></button>`
    console.log(exercicio.pk)


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