async function carregarListar() {
    await fetch("http://localhost:5226/api/Cliente")
    .then(response => response.json())
    .then(usuarios => {
    
      const lista =   document.getElementById('lista-usuario')
    
      lista.innerHTML = ''

      usuarios.forEach(ev => {

        const li = document.createElement('li')
        
        li.innerHTML = `Nome: ${ev.nome} - E-mail: ${ev.email}
        <button onclick="prepararEdicao('${ev.idcliente}', '${ev.nome}', '${ev.email}')">
        Editar
        </button>

        <button onclick="deletarUsuario(${ev.idcliente})">Excluir</button>

        `
        lista.appendChild(li)
      })

    })
}

carregarListar()


async function cadastrarUsuario() {
    const nomeDigitado = document.getElementById('nome-usuario').value
    const emailDigitado = document.getElementById('email-usuario').value
    

    await fetch('http://localhost:5226/api/Cliente', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            nome: nomeDigitado,
            email: emailDigitado,
            
        })
    })

    .then(response => response.json())
    .then(dados => {
        alert("Usuário cadastrado com sucesso")
        console.log(dados);
        
    })

     window.location.reload()
}

let usuarioEditando = null

function prepararEdicao(id, nome, email){
    document.getElementById('nome-usuario').value = nome
    document.getElementById('email-usuario').value = email
    

    usuarioEditando = id
}

async function atualizarUsuario(){
    if(!usuarioEditando){
        alert("Clique em editar primeiro")
        return
    }

    const nome = document.getElementById('nome-usuario').value
    const email = document.getElementById('email-usuario').value
    

    await fetch(`http://localhost:5226/api/Cliente/${usuarioEditando}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            idcliente:usuarioEditando,
            nome: nome,
            email: email,
            
        })
    })

    alert("Usuário atualizado com sucesso")

    window.location.reload()
}



async function deletarUsuario(id) {
    const confirmar =  confirm("Tem certeza que deseja excluir o usuario?")

    if(!confirmar){
        return
    }

    await fetch(`http://localhost:5226/api/Cliente/${id}`, {
        method: 'DELETE',
    })

    alert("Usuario excluido com sucesso")

    window.location.reload()

}
