const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    turma: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        required: true
    },
    notas: {
        type: [Number],
        validate: {
            validator: function(v) {
                return v.every(nota => nota >= 0 && nota <= 10);
            },
            message: props => `${props.value} não é uma nota válida!`
        },
        required: true
    },
    media: {
        type: Number,
        required: false // Como opcional
    }

});

const Alunos = mongoose.model('Alunos', alunoSchema);

module.exports = Alunos;