const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Email e senha são obrigatórios'
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                mensagem: 'A senha deve ter no mínimo 6 caracteres'
            });
        }

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: 'Email já cadastrado'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({
            email: email,
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

