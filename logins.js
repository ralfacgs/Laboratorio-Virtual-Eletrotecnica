// Arquivo: logins.js
// Módulo de Autenticação Centralizado do Lab AC Pro

const AuthProfessor = {
    // 1. Função que ofusca o que foi digitado (Base64 + Inversão)
    codificar: function(texto) {
        return btoa(encodeURIComponent(texto)).split('').reverse().join('');
    },

    // 2. Banco de dados de usuários autorizados
    usuarios: [
        {
            // Prof. Rafael (rafael.silva / ifrnjc)
            user: "hZHbpNnLsVWYmFmc", 
            pass: "jpmbyZWa"       
        }
    ],

    // 3. Função antiga (mantida para não quebrar as outras ferramentas)
    validar: function(usuarioDigitado, senhaDigitada) {
        return this.validarDetalhado(usuarioDigitado, senhaDigitada).sucesso;
    },

    // 4. Nova função com mensagens de erro específicas
    validarDetalhado: function(usuarioDigitado, senhaDigitada) {
        const userOfuscado = this.codificar(usuarioDigitado);
        const passOfuscada = this.codificar(senhaDigitada);
        
        // Procura se o usuário existe no banco
        const usuarioEncontrado = this.usuarios.find(c => c.user === userOfuscado);
        
        if (!usuarioEncontrado) {
            return { sucesso: false, erro: "Usuário não encontrado no banco de dados." };
        }
        
        if (usuarioEncontrado.pass !== passOfuscada) {
            return { sucesso: false, erro: "Senha incorreta." };
        }
        
        return { sucesso: true, erro: "" };
    }
};