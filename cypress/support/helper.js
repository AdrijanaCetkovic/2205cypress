module.exports = {
    getNCharactersLetters: function(n) {
        var listaSlova = "qwertyuiopasdfghjklzxcvbnm";
        var salt = "";
        while (salt.length < n) {
            var i = Math.floor(Math.random() * listaSlova.length);
            salt += listaSlova[i];
        }
        return salt;
    }
}