#!/bin/bash

trap 'echo -e "\nMonitorização encerrada."; exit 0' INT

echo "A iniciar monitorização unificada de logs (API + Redis)..."
echo "A pressionar Ctrl+C pode sair a qualquer momento."
echo "----------------------------------------------------"

docker compose logs -f --tail=20
