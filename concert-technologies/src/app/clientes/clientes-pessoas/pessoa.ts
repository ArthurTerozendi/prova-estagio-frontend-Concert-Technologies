export interface Pessoa {
    id: number;
    nome: string;
    email: string;
    dataNascimento: string;
    estadoCivil: string;
    nacionalidade: string;
    linguagemProg: {
        csharp: boolean,
        java: boolean,
        javascript: boolean,
        outro: boolean,
        php: boolean,
        python: boolean
    }
}