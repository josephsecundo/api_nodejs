const { json } = require('express');
const db = require('../database/connection');

module.exports = {
    async listarUsuarios(reequest, response) {
        try {
            return response.status(200).json({confirma: 'Listar Usuarios'});
        } catch (error){
            return response.status(500).json({confirm: 'Erro' message: error});
        
        }
    }
}
