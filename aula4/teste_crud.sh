#!/bin/bash

# Arquivo de log
LOG_FILE="crud_result.log"

# Limpa o arquivo de log anterior, se existir
> "$LOG_FILE"

echo "==========================================" | tee -a "$LOG_FILE"
echo " INICIANDO TESTES AUTOMATIZADOS DA API    " | tee -a "$LOG_FILE"
echo " Data/Hora: $(date)" | tee -a "$LOG_FILE"
echo "==========================================" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# 1. CADASTRAR VEÍCULO 1 (Scania R450)
echo "[1/4] Cadastrando Veículo 1 (Scania R450)..." | tee -a "$LOG_FILE"
curl -s -X POST "http://localhost:3000/api/v1/veiculos" \
  -H "Content-Type: application/json" \
  -d '{"placa": "ABC-1234", "montadora": "Scania", "modelo": "R450", "status": "DISPONIVEL"}' | tee -a "$LOG_FILE"
echo -e "\n" | tee -a "$LOG_FILE"

# 2. CADASTRAR VEÍCULO 2 (Volvo FH 540)
echo "[2/4] Cadastrando Veículo 2 (Volvo FH 540)..." | tee -a "$LOG_FILE"
curl -s -X POST "http://localhost:3000/api/v1/veiculos" \
  -H "Content-Type: application/json" \
  -d '{"placa": "XYZ-5678", "montadora": "Volvo", "modelo": "FH 540", "status": "MANUTENCAO"}' | tee -a "$LOG_FILE"
echo -e "\n" | tee -a "$LOG_FILE"

# 3. ATUALIZAR VEÍCULO 1 (Via PUT)
echo "[3/4] Atualizando Veículo ID 1 (Volvo FH 540 / DISPONIVEL)..." | tee -a "$LOG_FILE"
curl -s -X PUT "http://localhost:3000/api/v1/veiculos/1" \
  -H "Content-Type: application/json" \
  -d '{"placa": "XYZ-9999", "montadora": "Volvo", "modelo": "FH 540", "status": "DISPONIVEL"}' | tee -a "$LOG_FILE"
echo -e "\n" | tee -a "$LOG_FILE"

# 4. DELETAR VEÍCULO 2
echo "[4/4] Deletando Veículo ID 2..." | tee -a "$LOG_FILE"
curl -s -X DELETE "http://localhost:3000/api/v1/veiculos/2" | tee -a "$LOG_FILE"
echo -e "\n" | tee -a "$LOG_FILE"

echo "==========================================" | tee -a "$LOG_FILE"
echo " TESTES CONCLUÍDOS! Logs salvos em $LOG_FILE" | tee -a "$LOG_FILE"
echo "==========================================" | tee -a "$LOG_FILE"/
