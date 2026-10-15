#!/bin/bash

LOG_FILE="crud_result.log"

executar_testes() {
  echo "=================================================="
  echo "       TESTE AUTOMATIZADO DA API DE FROTAS        "
  echo " Executado em: $(date)"
  echo "=================================================="
  echo ""

  URL="http://localhost:3400/api/v1/veiculos"

  echo "--- 1. Cadastrando 2 novos veículos (POST) ---"
  echo "Cadastrando Volvo FH 540..."
  curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d '{"placa":"VOL-1010","montadora":"Volvo","modelo":"FH 540"}'
  echo -e "\n"

  echo "Cadastrando Scania R 450..."
  curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d '{"placa":"SCA-2020","montadora":"Scania","modelo":"R 450"}'
  echo -e "\n"

  echo "--- 2. Consultando veículos com status DISPONIVEL (GET) ---"
  curl -s "$URL?status=DISPONIVEL"
  echo -e "\n"

  echo "--- 3. Atualizando apenas o status do veículo ID 1 (PATCH) ---"
  curl -s -X PATCH "$URL/1/status" \
    -H "Content-Type: application/json" \
    -d '{"status":"EM_MANUTENCAO"}'
  echo -e "\n"

  echo "--- 4. Substituição completa do veículo ID 2 (PUT) ---"
  curl -s -X PUT "$URL/2" \
    -H "Content-Type: application/json" \
    -d '{"placa":"MNO-1122","montadora":"Scania","modelo":"R 500","status":"EM_ROTA"}'
  echo -e "\n"

  echo "--- 5. Removendo o veículo ID 3 (DELETE) ---"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$URL/3")
  echo "Status HTTP da remoção: $HTTP_CODE"
  echo ""

  echo "--- 6. Listagem final de veículos após operações ---"
  curl -s "$URL"
  echo -e "\n"
  echo "=================================================="
  echo "           TESTES CONCLUÍDOS COM SUCESSO          "
  echo "=================================================="
}

executar_testes 2>&1 | tee "$LOG_FILE"
