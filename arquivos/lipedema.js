

function avancarItem(carrosselClasse) {
    const carrossel = document.querySelector(`.carrossel-${carrosselClasse}`);
    const itemWidth = carrossel.offsetWidth;
    carrossel.scrollBy({
        left: itemWidth,
        behavior: 'smooth'
    });
}

function voltarItem(carrosselClasse) {
    const carrossel = document.querySelector(`.carrossel-${carrosselClasse}`);
    const itemWidth = carrossel.offsetWidth;
    carrossel.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapeia os elementos principais
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // 2. Evento para o botão "Cadastrar"
    // Adiciona a classe que move os painéis para a direita
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    // 3. Evento para o botão "Login"
    // Remove a classe para retornar à visualização de login
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Funções de Perfil (Nome, Idade, Foto) ---
    const inputNome = document.getElementById('input-nome');
    const inputIdade = document.getElementById('input-idade');
    const nomePerfil = document.getElementById('nome-perfil');
    const idadePerfil = document.getElementById('idade-perfil');
    const uploadFotoInput = document.getElementById('upload-foto');
    const previewFoto = document.getElementById('preview-foto');

    // Preenche o nome e idade na sidebar (simulado)
    function atualizarInfoPerfil() {
        nomePerfil.textContent = `Olá, ${inputNome.value || '[Seu Nome]'}!`;
        idadePerfil.textContent = inputIdade.value ? `${inputIdade.value} anos` : '[Idade]';
    }

    inputNome.addEventListener('input', atualizarInfoPerfil);
    inputIdade.addEventListener('input', atualizarInfoPerfil);
    atualizarInfoPerfil(); // Chama na carga inicial

    // Lógica para upload de foto (pré-visualização)
    uploadFotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewFoto.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});

function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    const valorIMCElem = document.getElementById('valor-imc');
    const classificacaoElem = document.getElementById('classificacao-imc');
    
    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        valorIMCElem.textContent = '---';
        classificacaoElem.textContent = 'Dados Inválidos';
        classificacaoElem.className = 'classificacao-imc';
        return;
    }

    const imc = peso / (altura * altura);
    const imcArredondado = imc.toFixed(1);

    let classificacao = '';
    let corClasse = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        corClasse = 'imc-baixo';
    } else if (imc >= 18.5 && imc < 25) {
        classificacao = 'Peso ideal';
        corClasse = 'imc-ideal';
    } else if (imc >= 25 && imc < 30) {
        classificacao = 'Sobrepeso';
        corClasse = 'imc-sobrepeso';
    } else {
        classificacao = 'Obesidade';
        corClasse = 'imc-obesidade';
    }

    valorIMCElem.textContent = imcArredondado;
    classificacaoElem.textContent = classificacao;
    classificacaoElem.className = `classificacao-imc ${corClasse}`;
}
document.addEventListener('DOMContentLoaded', () => {
    const diasCalendario = document.getElementById('dias-calendario');
    const monthYear = document.getElementById('monthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const tituloRastreio = document.getElementById('titulo-rastreio');
    const statusDia = document.getElementById('status-dia');
    const listaHabitos = document.getElementById('lista-habitos');

    let dataAtual = new Date();
    let dataSelecionada = new Date();

    // Simulação de dados de hábitos (apenas visual para o projeto)
    const dadosHabitosSimulados = {
        "2025-10-31": {
            completos: 5,
            total: 7 // Total de hábitos listados no HTML
        },
        "2025-10-25": {
            completos: 7,
            total: 7
        },
        "2025-10-15": {
            completos: 2,
            total: 7
        }
    };

    // Função para renderizar o calendário
    function renderCalendar() {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        
        // Nomes dos meses em português
        const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        
        monthYear.textContent = `${nomesMeses[mes]} ${ano}`;
        diasCalendario.innerHTML = '';

        // Determina o primeiro dia do mês (0 = domingo, 1 = segunda...)
        const primeiroDia = new Date(ano, mes, 1).getDay();
        // Determina o último dia do mês
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        
        // 1. Cria os dias vazios do início do mês
        for (let i = 0; i < primeiroDia; i++) {
            const diaVazio = document.createElement('div');
            diaVazio.classList.add('dia-calendario', 'vazio');
            diasCalendario.appendChild(diaVazio);
        }

        // 2. Cria os dias do mês
        for (let dia = 1; dia <= ultimoDia; dia++) {
            const diaElement = document.createElement('div');
            diaElement.classList.add('dia-calendario');
            diaElement.textContent = dia;
            diaElement.dataset.date = `${ano}-${mes + 1 < 10 ? '0' : ''}${mes + 1}-${dia < 10 ? '0' : ''}${dia}`;
            
            // Marca o dia de hoje
            const hoje = new Date();
            if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
                diaElement.classList.add('hoje');
            }

            // Aplica o status de hábito (Simulado)
            const habitData = dadosHabitosSimulados[diaElement.dataset.date];
            if (habitData && habitData.completos === habitData.total) {
                diaElement.classList.add('completo');
            }

            // Marca o dia selecionado (visual)
            if (dia === dataSelecionada.getDate() && mes === dataSelecionada.getMonth() && ano === dataSelecionada.getFullYear()) {
                diaElement.classList.add('selecionado');
            }

            // Evento de clique
            diaElement.addEventListener('click', (e) => {
                // Remove a classe 'selecionado' de todos os dias
                document.querySelectorAll('.dia-calendario').forEach(d => d.classList.remove('selecionado'));
                
                // Adiciona a classe ao dia clicado
                e.currentTarget.classList.add('selecionado');
                
                // Atualiza a data selecionada e a seção de rastreio
                const [y, m, d] = e.currentTarget.dataset.date.split('-').map(Number);
                dataSelecionada = new Date(y, m - 1, d);
                updateRastreioSection();
            });

            diasCalendario.appendChild(diaElement);
        }
    }

    // Função para atualizar a seção de rastreio
    function updateRastreioSection() {
        const dataFormatada = `${dataSelecionada.getDate() < 10 ? '0' : ''}${dataSelecionada.getDate()}/${dataSelecionada.getMonth() + 1 < 10 ? '0' : ''}${dataSelecionada.getMonth() + 1}/${dataSelecionada.getFullYear()}`;
        tituloRastreio.textContent = `Hábitos para: ${dataFormatada}`;
        
        // Simula o status do dia
        const dataKey = dataSelecionada.toISOString().split('T')[0];
        const dadosDia = dadosHabitosSimulados[dataKey];
        
        if (dadosDia) {
            statusDia.textContent = `${dadosDia.completos} de ${dadosDia.total} hábitos concluídos.`;
            // statusDia.style.color = dadosDia.completos === dadosDia.total ? '#28a745' : var(--rosa-texto);
        } else {
            statusDia.textContent = 'Nenhum hábito marcado ainda.';
            // statusDia.style.color = var(--rosa-texto);
        }
        
        // Em um projeto real, você carregaria o status dos checkboxes aqui.
    }


    // Eventos de Navegação do Calendário
    prevMonthBtn.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderCalendar();
    });

    // Inicia o calendário e a seção de rastreio
    renderCalendar();
    updateRastreioSection();
});