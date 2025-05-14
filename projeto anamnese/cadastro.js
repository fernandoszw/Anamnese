import { db } from "./firebase.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Importa jsPDF
const { jsPDF } = window.jspdf;

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {};

    form.querySelectorAll('input, textarea, select').forEach(element => {
        const name = element.name;
        const type = element.type;

        if (!name) return;

        if (type === 'radio') {
            if (element.checked) {
                data[name] = element.value;
            }
        } else if (type === 'checkbox') {
            if (!data[name]) {
                data[name] = [];
            }
            if (element.checked) {
                data[name].push(element.value);
            }
        } else {
            data[name] = element.value;
        }
    });

    // Envia para o Firebase
    push(ref(db, 'fichasAnamnese'), data)
        .then(() => {
            alert("Formulário enviado com sucesso!");

            // Gera PDF
            gerarPDF(data);

            // Limpa o formulário
            form.reset();
            document.querySelectorAll('.info, #diabetes-info, #gestante-info').forEach(div => {
                div.style.display = 'none';
            });
        })
        .catch((error) => {
            console.error("Erro ao enviar formulário: ", error);
            alert("Erro ao enviar formulário. Verifique o console.");
        });
});

const rotulosCampos = {
    nome: "Nome Completo",
    telefone: "Telefone",
    dataNascimento: "Data de Nascimento",
    rg: "RG",
    cpf: "CPF",
    ocupacao: "Ocupação",
    cep: "CEP",
    endereco: "Endereço",
    bairro: "Bairro",
    cidade: "Cidade",
    estado: "Estado",
    numCasa: "Número da Casa",
    sexo: "Sexo",
    queixa: "Queixa Principal",
    fumante: "É Fumante?",
    disturbioCirculatorio: "Distúrbio Circulatório?",
    epiletico: "É Epilético?",
    ciclo: "Ciclo Menstrual Regular?",
    funcionamentoIntestino: "Funcionamento Intestinal Regular?",
    alteracoesCardiacas: "Alterações Cardíacas?",
    disturbioHormonal: "Distúrbio Hormonal?",
    pressao: "Hipo/Hipertensão Arterial?",
    disturbioRenal: "Distúrbio Renal?",
    varizesLesoes: "Varizes ou Lesões?",
    diabetico: "É Diabético?",
    tipoDiabetes: "Tipo de Diabetes",
    controlada: "Diabetes Controlada?",
    gestante: "Está Gestante?",
    semanas: "Semanas de Gestação",
    tratamentoMedico: "Está em Tratamento Médico?",
    justificativa: "Detalhes do Tratamento Médico",
    cirurgia: "Fez Cirurgia Recente?",
    cirurgiaDetalhes: "Detalhes da Cirurgia",
    pele: "Problemas de Pele?",
    peleDetalhes: "Detalhes da Pele",
    protese: "Prótese Corporal/Facial?",
    proteseDetalhes: "Detalhes da Prótese",
    alergia: "Possui Alergia?",
    alergiaDetalhes: "Detalhes da Alergia",
    tumor: "Tumor ou Lesão Pré-Cancerosa?",
    tumorDetalhes: "Detalhes do Tumor",
    ortopedico: "Problemas Ortopédicos?",
    ortopedicoDetalhes: "Detalhes Ortopédicos",
    acidos: "Uso de Ácidos?",
    acidosDetalhes: "Detalhes dos Ácidos",
    outroProblema: "Outro Problema Importante?",
    outroProblemaDetalhes: "Detalhes do Outro Problema",
    declaracao: "Declaração de Veracidade",
    dataPreenchimento: "Data de Preenchimento",
    modalidade: "Modalidade de Massagem",
    outraModalidade: "Outra Modalidade",
    manobras: "Manobras Desejadas",
    outraManobra: "Outra Manobra",
    objetivoPrincipal: "Objetivo Principal com a Massagem",
    observacoes: "Observações",
    profissional: "Nome do Profissional",
    dataAtendimento: "Data do Atendimento"
};


function gerarPDF(data) {
    const doc = new jsPDF();
    const marginLeft = 10;
    let currentHeight = 10;

    doc.setFontSize(14);
    doc.text("Ficha de Anamnese - Massoterapia", marginLeft, currentHeight);
    currentHeight += 10;

    doc.setFontSize(10);

    Object.entries(data).forEach(([key, value]) => {
        const rotulo = rotulosCampos[key] || key;
        if (Array.isArray(value)) value = value.join(", ");
        doc.text(`${rotulo}: ${value || '-'}`, marginLeft, currentHeight);
        currentHeight += 7;

        if (currentHeight > 280) {
            doc.addPage();
            currentHeight = 10;
        }
    });

    const nomeCliente = data.nome?.replace(/\s+/g, '_') || 'cliente';
    doc.save(`ficha-anamnese-${nomeCliente}-${Date.now()}.pdf`);
}
