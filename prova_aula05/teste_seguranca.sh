#!/bin/bash

API_URL="http://localhost:3100/api/v1"
SECRET_KEY="binario-tech-secret-2026"

echo "=================================================="
echo "      INICIANDO AUDITORIA DE SEGURANCA E ROTAS    "
echo "=================================================="
echo ""

echo "[TESTE 1] GET /motoristas sem header X-API-KEY (Esperado: 401)"
curl -i -s "${API_URL}/motoristas" 2>&1
echo -e "\n--------------------------------------------------\n"

echo "[TESTE 2] GET /motoristas com chave invalida (Esperado: 401)"
curl -i -s "${API_URL}/motoristas" -H "X-API-KEY: chave-errada" 2>&1
echo -e "\n--------------------------------------------------\n"

echo "[TESTE 3] POST /motoristas com CNH invalida '123' (Esperado: 400)"
curl -i -s -X POST "${API_URL}/motoristas" \
  -H "X-API-KEY: ${SECRET_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos Silva", "cnh":"123", "categoria":"E"}' 2>&1
echo -e "\n--------------------------------------------------\n"

echo "[TESTE 4] GET /clientes (Esperado: 404)"
curl -i -s "${API_URL}/clientes" -H "X-API-KEY: ${SECRET_KEY}" 2>&1
echo -e "\n--------------------------------------------------\n"

echo "[TESTE 5.1] POST /motoristas bem-sucedido (Esperado: 201)"
curl -i -s -X POST "${API_URL}/motoristas" \
  -H "X-API-KEY: ${SECRET_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos Silva", "cnh":"12345678901", "categoria":"E"}' 2>&1
echo -e "\n"

echo "[TESTE 5.2] GET /motoristas bem-sucedido (Esperado: 200)"
curl -i -s "${API_URL}/motoristas" -H "X-API-KEY: ${SECRET_KEY}" 2>&1
echo -e "\n"

echo "[TESTE 5.3] POST /manutencoes bem-sucedido (Esperado: 201)"
curl -i -s -X POST "${API_URL}/manutencoes" \
  -H "X-API-KEY: ${SECRET_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"placa":"ABC-1234", "descricao":"Troca de oleo", "valor":450.00}' 2>&1
echo -e "\n"

echo "[TESTE 5.4] GET /manutencoes bem-sucedido (Esperado: 200)"
curl -i -s "${API_URL}/manutencoes" -H "X-API-KEY: ${SECRET_KEY}" 2>&1
echo -e "\n--------------------------------------------------\n"

echo "=================================================="
echo "            AUDITORIA CONCLUIDA                   "
echo "=================================================="
