#!/bin/bash

# Configurações do ambiente
BASE_URL="http://localhost:3333/api/v1/prova"
EMAIL="aluno_teste_$(date +%s)@binariotech.com"
SENHA="senhaSegura123"

echo "=================================================="
echo "          INICIANDO TESTES DA PROVA"
echo "=================================================="
echo ""

# 1. Cadastro de Usuário (POST /register)
echo "[1/3] Cadastrando novo usuário ($EMAIL)..."
RESPONSE_REG=$(curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}")

echo "Resposta do Cadastro:"
echo "$RESPONSE_REG" | jq .
echo ""

# 2. Login (POST /login)
echo "[2/3] Efetuando login para obter o Token JWT..."
RESPONSE_LOGIN=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}")

# Extrai e armazena o token JWT na variável utilizando jq
TOKEN=$(echo "$RESPONSE_LOGIN" | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "Erro: Não foi possível obter o token JWT."
  echo "$RESPONSE_LOGIN" | jq .
  exit 1
fi

echo "Token obtido com sucesso!"
echo "JWT Token: ${TOKEN:0:30}..."
echo ""

# 3. Acesso à Rota Protegida (GET /relatorio)
echo "[3/3] Acessando a rota protegida GET /relatorio..."
RESPONSE_RELATORIO=$(curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN")

echo "Resposta do Relatório (Formatada via jq):"
echo "$RESPONSE_RELATORIO" | jq .

echo ""
echo "=================================================="
echo "          TESTES CONCLUÍDOS COM SUCESSO!"
echo "=================================================="
