# Projeto: Mapeamento do Campus IFC Videira com Algoritmos de Busca

## Índice
1. [Modelagem do Campus como um Grafo](#modelagem-do-campus-como-um-grafo)
2. [Implementação do Grafo em JavaScript](#implementacao-do-grafo-em-javascript)
3. [Algoritmos de Busca](#algoritmos-de-busca)
   - [Busca em Largura (BFS)](#busca-em-largura-bfs)
   - [Busca em Profundidade (DFS)](#busca-em-profundidade-dfs)
   - [Busca de Custo Uniforme (UCS)](#busca-de-custo-uniforme-ucs)
   - [Algoritmo A*](#algoritmo-a)
4. [Interface do Usuário](#interface-do-usuario)
5. [Documentação](#documentacao)
6. [Possíveis Melhorias Futuras](#possiveis-melhorias-futuras)
7. [Conclusão](#conclusao)

## Descrição
Este projeto mapeia os ambientes do campus IFC Videira em um grafo e implementa algoritmos de busca para encontrar o caminho entre dois pontos definidos pelo usuário. Os algoritmos implementados são a Busca em Largura (BFS), Busca em Profundidade (DFS), Busca de Custo Uniforme (UCS) e o Algoritmo A*.

## Funcionalidades
- **Seleção de Partida e Chegada**: O usuário pode clicar no mapa para selecionar o ponto de partida e o ponto de destino.
- **Busca com Algoritmos Diferentes**: Possui suporte para BFS, DFS, UCS e A*, permitindo que o usuário escolha o melhor método para encontrar um caminho.
- **Exibição Visual do Caminho**: Os pontos selecionados e o caminho encontrado são exibidos graficamente na interface.

## Como Executar
**Pré-requisitos**: Um navegador web moderno.

**Execução**:
1. Abra o arquivo `index.html` no navegador.
2. Clique nos pontos do mapa para selecionar a partida e o destino.
3. Escolha um algoritmo de busca clicando em "Buscar com BFS", "Buscar com DFS", "Buscar com UCS" ou "Buscar com A*".
4. O resultado será exibido na interface, com os pontos marcados visualmente no mapa.

## Estrutura do Projeto

```plaintext
ifc-search/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── a_star.js
│   ├── bfs.js
│   ├── dfs.js
│   ├── grafo.js
│   ├── script.js
│   └── ucs.js
└── README.md
```

- **index.html**: Contém a estrutura HTML e os elementos da interface do usuário.
- **css/styles.css**: Estilos para a interface do usuário.
- **js/grafo.js**: Definição do grafo que representa o campus.
- **js/bfs.js**: Implementação do algoritmo de Busca em Largura.
- **js/dfs.js**: Implementação do algoritmo de Busca em Profundidade.
- **js/ucs.js**: Implementação do algoritmo de Busca de Custo Uniforme.
- **js/a_star.js**: Implementação do algoritmo A*.
- **js/script.js**: Lógica principal que interage com a interface e lida com a seleção de pontos.

## Algoritmos Implementados

### Busca em Largura (BFS)
A Busca em Largura explora os nós vizinhos em ordem de descoberta, garantindo que o primeiro caminho encontrado seja o de menor número de passos entre dois pontos. É particularmente útil quando o objetivo é minimizar o número de saltos ou etapas para alcançar o destino.

### Busca em Profundidade (DFS)
A Busca em Profundidade explora o caminho até o ponto mais distante antes de voltar e explorar alternativas. Pode ser útil para explorar caminhos longos, mas não garante encontrar o menor caminho em termos de distância ou passos.

### Busca de Custo Uniforme (UCS)
A Busca de Custo Uniforme explora os nós com o menor custo acumulado, garantindo que o caminho encontrado seja o de menor custo total. É ideal para situações em que os caminhos possuem custos diferentes.

### Algoritmo A*
O Algoritmo A* utiliza uma heurística para guiar a busca, combinando o custo do caminho já percorrido com uma estimativa do custo até o destino. Neste projeto, a heurística utilizada é a distância Euclidiana entre os pontos, o que permite que o A* encontre o caminho mais curto de forma eficiente.

## Heurística Utilizada no A*
A heurística usada no Algoritmo A* é baseada na estimativa da distância em linha reta até o objetivo. Em um cenário real, essa heurística pode ser obtida através das coordenadas geográficas dos pontos, garantindo uma estimativa razoável da distância restante.

## Interface do Usuário
A interface permite que o usuário interaja diretamente com o mapa do campus para definir os pontos de partida e destino. Após selecionar os pontos, o usuário pode escolher qual algoritmo deseja usar para encontrar o caminho. Os pontos são exibidos no mapa, e o resultado da busca é mostrado na interface.

**Elementos da Interface**:
- **Mapa Interativo**: Permite a seleção dos pontos de interesse no campus.
- **Botões de Controle**: Botões para iniciar a busca com diferentes algoritmos e redefinir a seleção de pontos.
- **Exibição dos Resultados**: Mostra as coordenadas dos pontos selecionados e o caminho encontrado.

## Possíveis Melhorias Futuras
- **Visualização Gráfica Avançada**: Implementar uma visualização mais detalhada do caminho encontrado, desenhando uma linha ligando os pontos diretamente no mapa.
- **Dados Reais do Campus**: Utilizar coordenadas reais dos ambientes do campus para calcular distâncias e heurísticas de forma mais precisa.
- **Outros Algoritmos de Busca**: Implementar outros algoritmos de busca, como Dijkstra ou Busca Gulosa, para oferecer mais opções ao usuário.
- **Melhorias na Interface**: Adicionar elementos gráficos adicionais e tornar a experiência do usuário mais intuitiva e agradável.
- **Zoom e Pan**: Implementar uma funcionalidade de zoom e pan no mapa sem a dependência do Panzoom, tornando a experiência mais fluida.

## Conclusão
Este projeto aplica conceitos de grafos e algoritmos de busca em um cenário prático: encontrar caminhos entre diferentes ambientes do campus IFC Videira. A implementação permite que o usuário entenda melhor os diferentes algoritmos de busca e suas aplicações práticas, oferecendo uma interface intuitiva para explorar esses conceitos. Com melhorias futuras, o projeto pode se tornar ainda mais útil e abrangente, contribuindo tanto para a comunidade acadêmica quanto para facilitar a navegação no campus.