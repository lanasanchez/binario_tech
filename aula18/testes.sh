#!/bin/bash

BASE_URL="http://localhost:3333/api/v1/prova"

echo "=== 1. Testando Registro de Usuário ==="
curl -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "aluno@binariotech.com", "senha": "senhaSegura123"}'
echo -e "\n"

echo "=== 2. Testando Login ==="
curl -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "aluno@binariotech.com", "senha": "senhaSegura123"}'
echo -e "\n"
