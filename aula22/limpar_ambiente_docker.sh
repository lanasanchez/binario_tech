#!/bin/bash

# Script: limpar_ambiente_docker.sh
# Descrição: Para/remove containers inativos e remove imagens pendentes (dangling).

echo "=== Iniciando limpeza do ambiente Docker ==="

# 1. Remover containers inativos (status exited, dead, created)
echo "--> Removendo containers inativos..."
containers_inativos=$(docker ps -a --filter "status=exited" --filter "status=dead" --filter "status=created" -q)

if [ -n "$containers_inativos" ]; then
    docker rm $containers_inativos
    echo "Containers inativos removidos com sucesso."
else
    echo "Nenhum container inativo encontrado."
fi

# 2. Remover imagens pendentes/órfãs (dangling images: <none>:<none>)
echo "--> Removendo imagens pendentes (dangling images)..."
imagens_dangling=$(docker images --filter "dangling=true" -q)

if [ -n "$imagens_dangling" ]; then
    docker rmi $imagens_dangling
    echo "Imagens pendentes removidas com sucesso."
else
    echo "Nenhuma imagem pendente encontrada."
fi

echo "=== Limpeza concluída ==="
