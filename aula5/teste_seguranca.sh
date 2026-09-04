#!/bin/bash

LOG_FILE="audit_seguranca.log"

echo "=== REGISTRO DE AUDITORIA DE SEGURANÇA - $(date) ===" > "$LOG_FILE"
echo "" >> "$LOG_FILE"

URL="http://localhost:3000/api/v1/manutencoes"
# Coloque a chave/token exato configurado na sua API (se houver)
CHAVE_VALIDA="SEU_TOKEN_AQUI" 

echo "--- Iniciando 3 tentativas de acesso SEM chave válida ---" | tee -a "$LOG_FILE"

for i in {1..3}; do
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Tentativa $i (Sem chave):" >> "$LOG_FILE"
  curl -s -i -X GET "$URL" >> "$LOG_FILE"
  echo -e "\n----------------------------------------\n" >> "$LOG_FILE"
done

echo "--- Iniciando 1 tentativa de acesso COM chave válida ---" | tee -a "$LOG_FILE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Tentativa (Com chave no Authorization):" >> "$LOG_FILE"
curl -s -i -X GET "$URL" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" >> "$LOG_FILE"
echo -e "\n----------------------------------------\n" >> "$LOG_FILE"

echo "Testes concluídos! Resultados salvos em: $LOG_FILE"
