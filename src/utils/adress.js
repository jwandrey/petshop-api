const axios = require("axios")

const getAddress = async (cep) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
        );

        return response.data;
    } catch (error) {
      console.error(error.message);
    }
}

const formatAddress = (cepData) => {
    return `
    ${cepData.logradouro}, 
    ${cepData.bairro}, 
    ${cepData.localidade}, 
    ${cepData.uf},
    ${cepData.cep}`
  }


module.exports = {
    getAddress,
    formatAddress
}