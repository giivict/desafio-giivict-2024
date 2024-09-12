class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { MACACO: 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
      { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: { GAZELA: 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { LEAO: 1 } }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: 'savana', carnívoro: true },
      LEOPARDO: { tamanho: 2, bioma: 'savana', carnívoro: true },
      CROCODILO: { tamanho: 3, bioma: 'rio', carnívoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnívoro: false },
      GAZELA: { tamanho: 2, bioma: 'savana', carnívoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnívoro: false }
    };
  }

  analisaRecintos(tipo, quantidade) {
    if (!this.animais[tipo]) {
      return { erro: 'Animal inválido' };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    let recintosViaveis = [];
    let tipoAnimal = this.animais[tipo];

    for (let recinto of this.recintos) {


      if (this.verificaBioma(tipoAnimal, recinto.bioma)) {
        let tamanhoOcupado = this.calculaEspacoOcupado(recinto.animais);
        let tamanhoLivre = recinto.tamanhoTotal - tamanhoOcupado;


        let carnívorosNoRecinto = Object.keys(recinto.animais).some(a => this.animais[a].carnívoro);
        if (!tipoAnimal.carnívoro && carnívorosNoRecinto) {
          console.log('Recinto contém carnívoros, ignorando...');
          continue;
        }

        if (Object.keys(recinto.animais).length > 0 && tipoAnimal.carnívoro) {
          if (!Object.keys(recinto.animais).includes(tipo)) {
              continue;
          }
        }

        let espacoExtra = 0;
        if (Object.keys(recinto.animais).length > 0 && !tipoAnimal.carnívoro) {
          if (!Object.keys(recinto.animais).includes(tipo)) {
            espacoExtra = 1
          }
        };
        let espacoNecessario = tipoAnimal.tamanho * quantidade + espacoExtra;


        if (tamanhoLivre >= espacoNecessario) {
          recintosViaveis.push({
            numero: recinto.numero,
            espacoLivre: tamanhoLivre - espacoNecessario,
            espacoTotal: recinto.tamanhoTotal
          });
        }
      }
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    return {
      recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`)
    };
  }

  calculaEspacoOcupado(animais) {
    let totalOcupado = 0;
    for (let tipo in animais) {
      let quantidade = animais[tipo];
      if (this.animais[tipo]) {
        totalOcupado = this.animais[tipo].tamanho * quantidade;
      }
    }
    return totalOcupado;
  }

  verificaBioma(tipoAnimal, biomaRecinto) {
    if (Array.isArray(biomaRecinto)) {
      if (Array.isArray(tipoAnimal.bioma)) {
        return tipoAnimal.bioma.some(bioma => biomaRecinto.includes(bioma));
      } else {
        return biomaRecinto.includes(tipoAnimal.bioma);
      }
    } else {
      if (Array.isArray(tipoAnimal.bioma)) {
        return tipoAnimal.bioma.includes(biomaRecinto);
      } else {
        return tipoAnimal.bioma === biomaRecinto;
      }
    }
  }
  
}



export { RecintosZoo as RecintosZoo };
