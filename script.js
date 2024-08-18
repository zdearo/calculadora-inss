document.addEventListener('DOMContentLoaded', function() {
    const salarioInput = document.getElementById('salario');
    const inssSpan = document.getElementById('inss');
    const fgtsSpan = document.getElementById('fgts');
    const liquidoSpan = document.getElementById('liquido');

    salarioInput.addEventListener('input', function() {
        const salarioBruto = parseFloat(salarioInput.value);
        const valorINSS = calcularINSS(salarioBruto);
        const valorFGTS = calcularFGTS(salarioBruto);
        const salarioLiquido = calcularSalarioLiquido(salarioBruto, valorINSS);

        inssSpan.textContent = `R$ ${valorINSS.toFixed(2)}`;
        fgtsSpan.textContent = `R$ ${valorFGTS.toFixed(2)}`;
        liquidoSpan.textContent = `R$ ${salarioLiquido.toFixed(2)}`;
    });

    function calcularINSS(salarioBruto) {
        if (isNaN(salarioBruto) || salarioBruto <= 0) {
            return 0;
        }

        let inss = 0;

        if (salarioBruto <= 1412.00) {
            inss = salarioBruto * 0.075;
        } else if (salarioBruto <= 2666.68) {
            inss = 1412.00 * 0.075 + (salarioBruto - 1412.00) * 0.09;
        } else if (salarioBruto <= 4000.03) {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salarioBruto - 2666.68) * 0.12;
        } else if (salarioBruto <= 7786.02) {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salarioBruto - 4000.03) * 0.14;
        } else {
            inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
        }

        return inss;
    }

    function calcularFGTS(salarioBruto) {
        if (isNaN(salarioBruto) || salarioBruto <= 0) {
            return 0;
        }
        return salarioBruto * 0.08;
    }

    function calcularSalarioLiquido(salarioBruto, valorINSS) {
        if (isNaN(salarioBruto) || salarioBruto <= 0) {
            return 0;
        }
        return salarioBruto - valorINSS;
    }
});