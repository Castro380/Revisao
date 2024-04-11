const { json } = require("express")
const Aluno = require("../models/Aluno")

const AlunoController = {

    getAll: async (req, res) => {
        try {
            const alunos = await Aluno.find();

            // Calcula a média das notas para cada aluno
            const alunosComMedia = alunos.map(aluno => {
                const notas = aluno.notas;
                const totalNotas = notas.length;
                const somaNotas = notas.reduce((acc, nota) => acc + nota, 0);
                const media = totalNotas > 0 ?  somaNotas / totalNotas :0;

                return {
                    _id: aluno._id,
                    nome: aluno.nome,
                    turma: aluno.turma,
                    notas: aluno.notas,
                    media: media // Adiciona a média ao objeto do aluno
                };
            });

            res.json(alunosComMedia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const Aluno = await Aluno.findById(req.params.id);
            if (!Aluno) {
                res.status(404).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(Aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    create: async (req, res) => {
        try {
            const aluno = await Aluno.create(req.body);
            if (!aluno) {
                res.status(400).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    update: async (req, res) => {
        try {
            const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body);
            if (!aluno) {
                res.status(404).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(Aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const aluno = await Aluno.findByIdAndDelete(req.params.id);
            if (!aluno) {
                res.status(404).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    Reprovados: async (req, res) => {
        try {
            const alunosReprovados = await Aluno.find({ notas: { $lt: 3 } });
            res.json(alunosReprovados);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar alunos reprovados' });
        }
    },
    Recuperacao: async (req, res) => {
        try {
            const alunosRecuperacao = await Aluno.find({ notas: { $gte: 3, $lt: 5 } });
            res.json(alunosRecuperacao);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar alunos em recuperação' });
        }
    },


    Aprovados: async (req, res) => {
        try {
            const alunosAprovados = await Aluno.find({ notas: { $gte: 5 } });
            res.json(alunosAprovados);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar alunos aprovados' });
        }
    },

    migrar: async (req, res) => {
        try {
            const alunosTurmaE = await Aluno.find({ turma: 'E' });


            alunosTurmaE.forEach(async aluno => {
                await Aluno.findByIdAndUpdate(aluno._id, { turma: 'B' });
            });

            res.json({ message: 'Alunos da turma E migrados para a turma B com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao migrar alunos da turma E para a turma B' });
        }
    },
    excluirAlunos: async (req, res) => {
        try {
            await Aluno.deleteMany({ nome: { $in: ['Teste', 'teste', 'pedro', 'orion', 'Pedro'] } });
            res.json({ message: 'Alunos com o nome "Teste" excluídos com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir alunos com o nome "Teste"' });
        }
    }

};


module.exports = AlunoController