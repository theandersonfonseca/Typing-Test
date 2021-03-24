const allEnglishWords =
  'It seemed like it should have been so simple There was nothing pen bike with getting the project done She had been an angel for coming up on years and in all that time nobody had told her this was one The fact that it could ever happen never even entered her mind Yet there she stood with the book car pig sitting on the ground before her Angels could lose their wings tried not to judge him His ratty clothes and man hair made him look homeless Was he really the next turn as she had been told On the off chance it was back to try not judge him Where do they get random paragraph he wondered as he clicked the generate button Do they just write a random try or do they get it part At that moment he read the random go and realized it was about random job and his world would never be the same dog cat fish my he him ok thanks soccer ball control game start maybe end street';

const allPortugueseWords =
  'Gera textos fazendo alterações na ordem das frases baixo sério conteúdo de maneira didática Coleta textos de sites de outro idioma faz as traduções com qualidade rapidez Reunimos as melhores práticas para criar café seu chá com qualidade rapidez tudo isso em um só lugar Você ganha melhor Puro de barata site ou blog geração alto de conteúdo rápido de peito Uma grande galo do sistema útil de palavras chave que seus clientes estão buscando pela internet fim de deixar seu mito com qualidade cinto para seu público alvo automação de nossa ferro pode preencher as lacunas no seu ópera menos pelo em produzir simples chuva ganhando tempo para distribuir em outras tarefas bota tem oito anos possui uma família admira muito Ele gosta de desenhar seus sério quando está de férias sim não besta dois nada faz certo gato tenso maçã costas modos pilha defesa sair casa rua ditado ator amigo dado faca dentro lagoa';

const getWords = (words) => {
  const arrayWords = words.split(' ');
  const unrepeatedWords = new Set(arrayWords);

  return [...unrepeatedWords];
};

const englishWords = getWords(allEnglishWords);
const portugueseWords = getWords(allPortugueseWords);

export { englishWords, portugueseWords };
