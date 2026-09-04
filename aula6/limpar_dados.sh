#!/bin/bash

echo "=========================================="
echo "    RESETANDO AMBIENTE DE TESTES...       "
echo "=========================================="

# 1. Encerra qualquer processo Node.js associado (ou na porta 3000)
echo "[1/2] Encerrando processos Node.js..."
pkill -f node 2>/dev/null || true
npx kill-port 3000 2>/dev/null || true

# 2. Exclui o arquivo de dados JSON se existir
echo "[2/2] Removendo arquivo ocorrencias.json..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "✓ Arquivo 'ocorrencias.json' removido com sucesso."
else
    echo "ℹ Arquivo 'ocorrencias.json' não encontrado. Já estava limpo."
fi

echo "=========================================="
echo "✔ Ambiente resetado com sucesso!"
echo "=========================================="
