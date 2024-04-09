const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {
            // throw new Error('Eu causei o erro!');
            const sql = `SELECT
            prd_id, prd_nome, prd_valor, prd_unidade,
            ptp_id, prd_disponivel, prd_img,
            prd_destaque, prd_img_destaque, prd_descricao
            FROM produtos;`;

            const produtos = await db.query(sql);
            const nItens = produtos[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de produtos.', 
                dados: produtos[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: error.message
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
            const {prd_nome, prd_valor,
            prd_unidade, ptp_id, prd_disponivel, 
            prd_img_destaque, prd_descricao} = request.body;

            const sql = `INSERT INTO produtos
            (prd_id, prd_nome, prd_unidade, prd_disponivel, prd_descricao)
                VALUES (?,?,?,?)`;

                const values =[prd_nome, prd_unidade, prd_descricao, prd_disponivel, prd_id, prd_valor];

                const execSql = await db.query(sql, values);

                const prd_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de produto efetuado com sucesso.', 
                dados: prd_id,
                sql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async editarProdutos(request, response) {
        try {

            const {pdr_nome,  prd_valor,
                prd_unidade, ptp_id, prd_disponivel, 
                prd_img_destaque, prd_descricao} = request.body;

                const {prd_id} = request.params;

                const sql = `UPDATE produtos SET prd_nome = ?, prd_id = ?,
                prd_unidade =?, prd_descricao =?;`;

                const values = [prd_nome, prd_id, prd_unidade,
                prd_descricao];

                const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Produto ${prd_id} atualizado com sucesso.`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: error.message
            });
        }
    }, 
    async apagarProdutos(request, response) {
        try {
            const {prd_id} = request.params;

            const sql = `DELETE FROM produtos WHERE prd_id = ?`;

            const values = [prd_id];
             const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Produto ${prd_id} excluído com sucesso`, 
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: error.message
            });
        }
    }, 
}

