#!/bin/bash
echo "=== AUDITORIA DE PROCESSOS NODE.JS - $(date) ===" > processos.log
ps aux | grep node | grep -v grep >> processos.log
echo "Relatório gerado com sucesso em processos.log"
