const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verifica se os campos foram enviados
        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Email e senha são obrigatórios'
            });
        }

        // Verifica o tamanho mínimo da senha
        if (senha.length < 6) {
            return res.status(400).json({
                mensagem: 'A senha deve ter no mínimo 6 caracteres'
            });
        }

        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: 'Email já cadastrado'
            });
        }

        // Gera o hash da senha usando salt 10
        const senhaHash = await bcrypt.hash(senha, 10);

        // Salva o usuário no banco
        const usuario = await Usuario.create({
            email,
            senha: senhaHash
        });

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso',
            usuario: {
                id: usuario._id,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: 'Erro interno do servidor'
        });
    }
});

module.exports = router;

