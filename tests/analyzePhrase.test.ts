import { analyzePhrase } from '../src/cli';

describe('Hierarchy Analysis Tests', () => {

  test('Uma correspondência - Tecnologia', () => {
    const phrase = "Eu amo computadores";
    const depth = 2;
    const verbose = false;

    const result = analyzePhrase(phrase, depth, verbose);

    expect(result).toEqual({ computadores: 1 });
  });

  test('Duas correspondências - Front-end e Back-end', () => {
    const phrase = "Eu vi JavaScript e Python";
    const depth = 3;
    const verbose = false;

    const result = analyzePhrase(phrase, depth, verbose);

    expect(result).toEqual({ "javascript": 1, "python": 1 });
  });

  test('Nenhuma correspondência', () => {
    const phrase = "Eu tenho preferencia por animais carnivoros";
    const depth = 5;
    const verbose = false;

    const result = analyzePhrase(phrase, depth, verbose);

    expect(result).toEqual({});
  });

  test('Contagem correta - Futebol e Python', () => {
    const phrase = "Futebol Python";
    const depth = 3;
    const verbose = false;

    const result = analyzePhrase(phrase, depth, verbose);

    expect(result).toEqual({ futebol: 1, python: 1 });
  });

  test('Contagem correta com múltiplos esportes compostos', () => {
    const phrase = "Eu gosto de natacao e polo aquatico";
    const depth = 3;
    const verbose = false;

    const result = analyzePhrase(phrase, depth, verbose);

    expect(result).toEqual({ natacao: 1, "polo aquatico": 1 });
  });

  test('Análise de texto com mais de 5000 caracteres', () => {
    // Gera uma string com palavras relacionadas à hierarquia
    const longText = (
      'JavaScript é uma linguagem de programação. ' +
      'Python é amplamente utilizado para desenvolvimento backend. ' +
      'Futebol é um esporte muito popular no mundo inteiro. ' +
      'Natacao é um esporte aquático. ' +
      'Eu gosto de estudar JavaScript, Python, redes e linguagens de programação. ' +
      'O futebol é muito praticado em vários países. ' +
      'Tecnologia avança todos os dias com linguagens como JavaScript e Python. ' +
      'Futebol é o esporte favorito de muitos. '
    ).repeat(100);

    const depth = 3;
    const verbose = false;

    const result = analyzePhrase(longText, depth, verbose);

    // Esperamos que várias palavras da hierarquia sejam detectadas
    expect(result).toHaveProperty("javascript");
    expect(result).toHaveProperty("python");
    expect(result).toHaveProperty("futebol");
    expect(result).toHaveProperty("natacao");
  });
});
