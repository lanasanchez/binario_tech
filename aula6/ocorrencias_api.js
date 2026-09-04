const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

// Funcao Auxiliar: Ler Arquivo JSON
async function lerOcorrencias() {
    try {
        const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
            return [];
        }
        throw erro;
    }
}

// Funcao Auxiliar: Salvar no Arquivo JSON
async function salvarOcorrencias(ocorrencias) {
    await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

// ROTA 1: Listar todas as ocorrencias 
app.get('/api/v1/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await lerOcorrencias();
        res.status(200).json(ocorrencias);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
    }
});

// ROTA 2: Listar ocorrencias filtradas por montadora (NOVA ROTA)
app.get('/api/v1/ocorrencias/montadora/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const ocorrencias = await lerOcorrencias();

        // Filtra ignorando maiúsculas e minúsculas
        const filtradas = ocorrencias.filter(
            (item) => item.montadora && item.montadora.toLowerCase() === nome.toLowerCase()
        );

        res.status(200).json(filtradas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar ocorrencias por montadora." });
    }
});

// ROTA 3: Cadastrar nova ocorrencia na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
    try {
        const { montadora, placa, descricao, gravidade } = req.body;

        if (!montadora || !placa || !descricao) {
            return res.status(400).json({ erro: "Montadora, placa e descricao sao obrigatorias." });
        }

        const ocorrencias = await lerOcorrencias();
        const novaOcorrencia = {
            id: Date.now(),
            montadora,
            placa,
            descricao,
            gravidade: gravidade || "MEDIA",
            data_registro: new Date().toISOString()
        };

        ocorrencias.push(novaOcorrencia);
        await salvarOcorrencias(ocorrencias);

        res.status(201).json(novaOcorrencia);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao salvar ocorrencia em disco." });
    }
});

// ROTA 3: Remover ocorrencia pelo ID
app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
        try {
                const { id } = req.params;
                const ocorrencias = await lerOcorrencias();
                const indice = ocorrencias.findIndex(o => String(o.id) === String(id));

                if (indice === -1) {
                        return res.status(404).json({ erro: "Ocorrência não encontrada." });
                }

                const [removida] = ocorrencias.splice(indice, 1);
                await salvarOcorrencias(ocorrencias);
                res.status(200).json({ mensagem: "Ocorrência removida com sucesso.", ocorrencia: removida });
        } catch (erro) {
                res.status(500).json({ erro: "Erro ao remover ocorrência." });
        }
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] API de Ocorrencias ativa na porta ${PORT}`);
});
