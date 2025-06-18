// Botão de voltar ao topo
function ativarBotaoTopo() {
    const topoBtn = document.getElementById('topo-btn');
    if (!topoBtn) return;
    window.addEventListener('scroll', () => {
        topoBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
    });
    topoBtn.onclick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
}




function verificarFormulario() {
    
    const nome = document.getElementById("fname").value.trim();
    const email = document.getElementById("femail").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const checkboxes = document.querySelectorAll('input[name="metodo"]:checked');

    
    if (nome !== "" && email !== "" && mensagem !== "" && checkboxes.length > 0) {
        
        alert("Obrigado pela sua resposta!");
        document.getElementById("fname").value = "";
        document.getElementById("femail").value = "";
        document.getElementById("mensagem").value = "";
        document.getElementById("contador").textContent = "0 / 200 palavras";
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

    } else {
        
        alert("Por favor preencha todos os campos!");
    }
}


function contarpalavras() {
    
    const mensagem = document.getElementById("mensagem");
    const contador = document.getElementById("contador");

    // Adiciona um evento que reage sempre que o utilizador escreve na caixa de mensagem
    mensagem.addEventListener("input", () => {
        // Divide o texto em palavras, ignorando espaços vazios
        const palavras = mensagem.value.trim().split(/\s+/).filter(p => p.length > 0);

        // Se ultrapassar 200 palavras → corta o texto para as primeiras 200 palavras
        if (palavras.length > 200) {
            mensagem.value = palavras.slice(0, 200).join(' ');
        }

        // Atualiza o texto do contador (mostra número actual de palavras / 200 máximo)
        contador.textContent = `${Math.min(palavras.length, 200)} / 200 palavras`;
    });
}
function carregarMetodosXML() {
    // faz um pedido http para carregar o XML
    fetch('../xml/MetodosEstudo.xml')
    // ele aqui transforma o conteudo do XML em texto
        .then(response => response.text())
        // então ele depois transforma o texto em um documento XML
        .then(xmlText => {
            // depois disso ele cria uma estruturaDom para se puder navegar no documento XML
            // e depois ele procura os elementos <Metodo> dentro do XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            const metodos = xmlDoc.getElementsByTagName("Metodo");
            const lista = document.getElementById("lista-metodos");

            if (lista) {

                for (let metodo of metodos) {
                    // aqui ele obtém os atributos e elementos de cada <Metodo>
                    const nome = metodo.getAttribute("nome");
                    const descricao = metodo.getElementsByTagName("Descricao")[0]?.textContent || "";
                    const vantagens = metodo.getElementsByTagName("Vantagens")[0]?.textContent || "";
                    const desvantagens = metodo.getElementsByTagName("Desvantagens")[0]?.textContent || "";
                    const idealPara = metodo.getElementsByTagName("IdealPara")[0]?.textContent || "";
                    
                    // e depois cria um item de lista para cada método

                    const item = document.createElement("li");
                    // aqui ele adiciona a classe "metodo-card" ao item de lista
                    item.classList.add("metodo-card");
                    // e aqui ele adiciona o conteúdo HTML ao item de lista
                    item.innerHTML = `
                        <h3> ${nome}</h3>
                        <p><strong>Descrição:</strong> ${descricao}</p>
                        <p><strong>Vantagens:</strong> ${vantagens}</p>
                        <p><strong>Desvantagens:</strong> ${desvantagens}</p>
                        <p><strong>Ideal Para:</strong> ${idealPara}</p>
                    `;

                    lista.appendChild(item);
                }
            }
        })
        .catch(error => console.error("Erro ao carregar XML:", error));
}
