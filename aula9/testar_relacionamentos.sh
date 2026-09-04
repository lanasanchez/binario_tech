#!/bin/bash
echo "==================================================="
echo " AUDITORIA DE RELACIONAMENTOS (JOIN) - BINARIO TECH"
echo "==================================================="

echo -e "\n[1] Cadastrando Veiculo Scania..."
curl -s -X POST http://localhost:3000/api/v1/telemetria/veiculo-teste \
        -H "Content-Type: application/json" \
        -d '{"placa":"SCA-9990", "montadora":"Scania", "modelo":"R450"}' | jq .

echo -e "\n[2] Cadastrando Leitura de Telemetria vinculada ao Veiculo ID 1..."
curl -s -X POST http://localhost:3000/api/v1/telemetria \
        -H "Content-Type: application/json" \
        -d '{"veiculo_id":1}' | jq .
