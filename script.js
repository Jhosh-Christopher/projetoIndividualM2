//  Obtendo referências dos elementos do formulário HTML
const form = document.getElementById("conversorForm");

const valorInput = document.getElementById("valor");

const categoriaSelect = document.getElementById("categoria");

const unidadeOrigemSelect = document.getElementById("unidadeOrigem");

const unidadeDestinoSelect = document.getElementById("unidadeDestino");

const resultadoDiv = document.getElementById("resultado");

const unidadesPorCategoria = {
    comprimento: ["metros", "centímetros", "polegadas"],
    peso: ["quilogramas", "gramas", "libras"],
    temperatura: ["Celsius", "Fahrenheit", "Kelvin"],
};

function atualizarUnidadesOrigem() {
    const categoriaSelecionada = categoriaSelect.value;
    const unidadeOrigem = unidadesPorCategoria[categoriaSelecionada];
  // Limpar as opções de seleção de unidades de origem
    unidadeOrigemSelect.innerHTML = "";

  // Adicionar as opções de seleção de unidades de origem
    unidadeOrigem.forEach((unidade) => {
    const option = document.createElement("option");
    option.value = unidade;
    option.textContent = unidade;
    unidadeOrigemSelect.appendChild(option);
});
}
  // Função para atualizar as opções de seleção de unidades de destino
    function atualizarUnidadesDestino() {
    const categoriaSelecionada = categoriaSelect.value;
    const unidadesDestino = unidadesPorCategoria[categoriaSelecionada];

  // Limpar as opções de seleção de unidades de destino
    unidadeDestinoSelect.innerHTML = "";

  // Adicionar as opções de seleção de unidades de destino
    unidadesDestino.forEach((unidade) => {
    const option = document.createElement("option");
    option.value = unidade;
    option.textContent = unidade;
    unidadeDestinoSelect.appendChild(option);
});
}

 // Adicionar o evento "change" aos campos de seleção
categoriaSelect.addEventListener("change", atualizarUnidadesOrigem);

categoriaSelect.addEventListener("change", atualizarUnidadesDestino);
unidadeOrigemSelect.addEventListener("change", atualizarUnidadesDestino);

 // Função para converter unidades de comprimento
function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
    switch (unidadeOrigem) {
    case "metros":
    switch (unidadeDestino) {
        case "metros":
            return alert("inválido, faça outra conversão");
        case "centímetros":
            return valor * 100;
        case "polegadas":
            return valor * 39.3701;
    }
    break;
    case "centímetros":
    switch (unidadeDestino) {
        case "metros":
            return valor / 100;
        case "centímetros":
            return alert("inválido, faça outra conversão");
        case "polegadas":
          return valor * 0.393701;
    }
        break;
    case "polegadas":
        switch (unidadeDestino) {
        case "metros":
            return valor / 39.3701;
        case "centímetros":
            return valor / 0.393701;
        case "polegadas":
            return alert("inválido, faça outra conversão");
}
        break;
}}

 // Função para converter unidades de peso
function converterPeso(valor, unidadeOrigem, unidadeDestino) {
    switch (unidadeOrigem) {
    case "quilogramas":
    switch (unidadeDestino) {
        case "quilogramas":
            return alert("inválido, faça outra conversão");
        case "gramas":
            return valor * 1000;
        case "libras":
            return valor * 2.20462;
}
    break;
    case "gramas":
        switch (unidadeDestino) {
        case "quilogramas":
            return valor / 1000;
        case "gramas":
            return alert("inválido, faça outra conversão");
        case "libras":
            return valor * 0.00220462;
}
        break;
    case "libras":
    switch (unidadeDestino) {
        case "quilogramas":
            return valor / 2.20462;
        case "gramas":
            return valor / 0.00220462;
        case "libras":
            return alert("inválido, faça outra conversão");
}
    break;
}}

 // Função para converter unidades de temperatura
function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
    switch (unidadeOrigem) {
    case "Celsius":
        switch (unidadeDestino) {
        case "Celsius":
            return alert("inválido, faça outra conversão");
        case "Fahrenheit":
            return (valor * 9) / 5 + 32;
        case "Kelvin":
            return valor + 273.15;
}
        break;
    case "Fahrenheit":
        switch (unidadeDestino) {
        case "Celsius":
            return ((valor - 32) * 5) / 9;
        case "Fahrenheit":
            return alert("inválido, faça outra conversão");
        case "Kelvin":
            return ((valor + 459.67) * 5) / 9;
}
        break;
    case "Kelvin":
        switch (unidadeDestino) {
        case "Celsius":
            return valor - 273.15;
        case "Fahrenheit":
            return (valor * 9) / 5 - 459.67;
        case "Kelvin":
            return alert("inválido, faça outra conversão");
}
        break;
}}

 // Função para exibir a mensagem de erro
    function exibirErro(mensagem) {
    resultadoDiv.textContent = mensagem;
}
 // Função para lidar com o envio do formulário
    function envioForm(event) {
    event.preventDefault();
  // Verificar se todos os campos estão preenchidos
    if (
    !valorInput.value ||
    !categoriaSelect.value ||
    !unidadeOrigemSelect.value ||
    !unidadeDestinoSelect.value){
    exibirErro("Por favor, preencha todos os campos.");
    return;
}

  // Obter os valores dos campos do formulário
    const valor = parseFloat(valorInput.value);
    const categoria = categoriaSelect.value;
    const unidadeOrigem = unidadeOrigemSelect.value;
    const unidadeDestino = unidadeDestinoSelect.value;

    let resultado;

  // Chamar a função correspondente à categoria selecionada
    switch (categoria) {
    case "comprimento":
    resultado = converterComprimento(valor, unidadeOrigem, unidadeDestino);
    break;
    case "peso":
    resultado = converterPeso(valor, unidadeOrigem, unidadeDestino);
    break;
    case "temperatura":
    resultado = converterTemperatura(valor, unidadeOrigem, unidadeDestino);
    break;
    default:
    exibirErro("Categoria inválida.");
    return;
}
//   Exibir o resultado da conversão
    resultadoDiv.innerHTML = `${valor} ${unidadeOrigem} equivale a: ${resultado} ${unidadeDestino}.`;

}
// Adicionar o evento "submit" ao formulário
form.addEventListener("submit", envioForm);