
async function carregarClientes(){

    const response = await fetch("http://localhost:5226/api/Cliente")
    const clientes = await response.json()
    const select = document.getElementById("cliente-select")

    select.innerHTML = `
        <option value="">Selecione uma opção</option>
    `

    clientes.forEach(cliente => {

        const option = document.createElement("option")

        option.value = cliente.idcliente

        option.textContent = cliente.nome

        select.appendChild(option)
    })
}


async function carregarPedidos(){

    const response = await fetch("http://localhost:5226/api/Pedido/listarPedidos")

    const pedidos = await response.json()

    const lista = document.getElementById("lista-pedidos")

    lista.innerHTML = ""

    pedidos.forEach(pedido => {
        const li = document.createElement("li")
        li.innerHTML = `
        Descrição: ${pedido.descricao}
        |
        Valor: R$ ${pedido.valor}
        |
        Cliente: ${pedido.nomeCliente}

        <button onclick="prepararEdicao(${pedido.idpedido},'${pedido.descricao}',${pedido.valor},
            ${pedido.idcliente}
        )">
            Editar
        </button>

        <button onclick="deletarPedido(${pedido.idpedido})">
            Excluir
        </button> `

        lista.appendChild(li)

    })

}



async function cadastrarPedido(){

    const descricao = document.getElementById("descricao-pedido").value
    const valor = document.getElementById("valor-pedido").value
    const idcliente = document.getElementById("cliente-select").value
    const response = await fetch("http://localhost:5226/api/Pedido", {

        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            descricao: descricao,
            valor: parseFloat(valor),
            idcliente: parseInt(idcliente)

        })

    })

    if(response.ok){

        alert("Pedido cadastrado com sucesso")

        limparCampos()

        carregarPedidos()

    }else{

        alert("Erro ao cadastrar pedido")

        console.log(await response.text())

    }

}


let pedidoEditando = null

function prepararEdicao(id, descricao, valor, idcliente){

    document.getElementById("descricao-pedido").value = descricao

    document.getElementById("valor-pedido").value = valor

    document.getElementById("cliente-select").value = idcliente

    pedidoEditando = id

}

async function atualizarPedido(){

    if(!pedidoEditando){

        alert("Clique em editar primeiro")

        return
    }

    const descricao = document.getElementById("descricao-pedido").value

    const valor = document.getElementById("valor-pedido").value

    const idcliente = document.getElementById("cliente-select").value

    const response = await fetch(`http://localhost:5226/api/Pedido/${pedidoEditando}`, {

        method: "PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            idpedido: pedidoEditando,

            descricao: descricao,

            valor: parseFloat(valor),

            idcliente: parseInt(idcliente)

        })

    })

    if(response.ok){

        alert("Pedido atualizado com sucesso")

        limparCampos()

        carregarPedidos()

    }else{

        alert("Erro ao atualizar pedido")

        console.log(await response.text())
    }
}
async function deletarPedido(id){

    const confirmar = confirm("Deseja excluir este pedido?")

    if(!confirmar){
        return
    }
    const response = await fetch(`http://localhost:5226/api/Pedido/${id}`, {
        method: "DELETE"
    })
    if(response.ok){

        alert("Pedido excluído com sucesso")

        carregarPedidos()

    }else{

        alert("Erro ao excluir pedido")

        console.log(await response.text())

    }

}




function limparCampos(){

    document.getElementById("descricao-pedido").value = ""

    document.getElementById("valor-pedido").value = ""

    document.getElementById("cliente-select").value = ""

    pedidoEditando = null

}


carregarClientes()

carregarPedidos()