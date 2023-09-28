chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "alterarBackground") {
    const elementos = document.querySelectorAll("._21Ahp")
    elementos.forEach(function (elemento) {
      if (elemento.textContent.includes("Forma de entrega:")) {
        if (!elemento.querySelector("button")) {
          function removerFormatoHora(texto) {
            // Use uma expressão regular para encontrar e remover o formato de hora (hh:mm)
            return texto.replace(/(\d{2}:\d{2}|Imprimir|Abrir)/g, "")
          }

          const botao = document.createElement("button")
          botao.style.backgroundColor = "#e3a62b"
          botao.style.color = "black"
          botao.style.border = "none"
          botao.style.padding = "10px 10px"
          botao.style.cursor = "pointer"
          botao.style.width = "120px"
          botao.style.marginTop = "25px"
          botao.style.marginLeft = "5px"
          botao.style.borderRadius = "5px"

          botao.textContent = "Abrir"

          const quebraDeLinha = document.createElement("br")

          elemento.appendChild(quebraDeLinha)
          elemento.appendChild(quebraDeLinha)

          elemento.appendChild(botao)

          // Obtém o valor associado ao botão
          const pedido = removerFormatoHora(elemento.textContent)

          // Armazena o valor associado ao botão em um atributo personalizado
          botao.setAttribute("data-pedido", pedido)

          botao.addEventListener("click", function () {
            // Obtém o valor associado ao botão clicado
            const valorPedido = this.getAttribute("data-pedido")

            // Configurações do pop-up (largura, altura, título, etc.)
            const config = "width=450,height=650,scrollbars=yes" // Ajuste a altura conforme necessário

            // Título do pop-up
            const titulo = "Imprimir Pedido"

            // Abre o pop-up com o título
            const janelaPopup = window.open("", "MeuPopUp", config)
            janelaPopup.document.title = titulo // Define o título da janela do pop-up

            // Verifica se o pop-up foi bloqueado pelo navegador
            if (
              !janelaPopup ||
              janelaPopup.closed ||
              typeof janelaPopup.closed == "undefined"
            ) {
              alert(
                "O pop-up foi bloqueado pelo navegador. Por favor, habilite os pop-ups."
              )
            } else {
              // Cria uma div para centralizar os elementos
              const container = document.createElement("div")
              container.style.display = "flex"
              container.style.flexDirection = "column"
              container.style.alignItems = "center"
              container.style.justifyContent = "center"
              container.style.height = "100%"

              // Cria um textarea com 45 linhas e 55 colunas
              const textarea = document.createElement("textarea")
              textarea.setAttribute("id", "meuTextarea")
              textarea.setAttribute("rows", "45")
              textarea.setAttribute("cols", "50")

              // Obtém o valor da variável
              const valorVariavel = pedido

              // Define o valor do textarea como o valor da variável
              textarea.value = valorVariavel

              // Cria um botão
              const botao2 = document.createElement("button")
              botao2.textContent = "Imprimir"

              botao2.style.backgroundColor = "#e3a62b"
              botao2.style.color = "black"
              botao2.style.border = "none"
              botao2.style.padding = "10px 10px"
              botao2.style.cursor = "pointer"
              botao2.style.width = "120px"
              botao2.style.marginTop = "25px"
              botao2.style.marginLeft = "5px"
              botao2.style.borderRadius = "5px"
              botao2.style.marginBottom = "5px"

              // Adiciona a div de container à janela do pop-up
              janelaPopup.document.body.appendChild(container)

              // Adiciona o textarea e o botão à div de container
              container.appendChild(textarea)
              container.appendChild(botao2)

              // Adiciona um evento de clique ao botão "Imprimir"
              botao2.addEventListener("click", function () {
                var valorTextarea =
                  janelaPopup.document.getElementById("meuTextarea").value

                valorTextarea = JSON.stringify(valorTextarea)

                fetch("http://localhost:3000/receber-dados", {
                  method: "POST",
                  body: JSON.stringify({ dados: valorTextarea }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then(function (response) {
                  valorTextarea = ""

                  janelaPopup.close()

                  if (!response.ok) {
                    throw new Error("Erro na requisição: " + response.status)
                  }
                  return response.json()
                })
              })
            }
          })
        }
      }
    })
  }
})
