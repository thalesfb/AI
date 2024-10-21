// Função autoexecutável que encapsula a implementação do algoritmo de Busca em Largura (BFS)
// para evitar a poluição do escopo global.
(function () {

  // Implementação do algoritmo BFS para encontrar o caminho mais curto em um grafo
  function bfs(graph, startName, goalName) {
    // Obtém os nós inicial e objetivo pelo nome fornecido
    const startNode = getNodeByName(graph, startName);
    const goalNode = getNodeByName(graph, goalName);

    // Verifica se os nós inicial e objetivo existem no grafo
    if (!startNode || !goalNode) {
      throw new Error('Nó inicial ou nó objetivo não encontrado no grafo.');
    }

    // Fila que armazena os nós a serem explorados, começando pelo nó inicial
    const queue = [startNode];

    // Conjunto que mantém o registro dos nós já visitados para evitar revisita
    const visited = new Set();
    visited.add(startNode.name);

    // Mapa que armazena de onde cada nó foi alcançado, necessário para reconstruir o caminho
    const cameFrom = {};

    // Enquanto houver nós a serem explorados na fila
    while (queue.length > 0) {
      // Remove o nó da frente da fila (FIFO)
      const currentNode = queue.shift();

      // Verifica se o nó atual é o objetivo
      if (currentNode.name === goalNode.name) {
        console.log("Destino encontrado:", currentNode.name);

        // Reconstrói o caminho desde o objetivo até o início
        let path = [];
        let tempNode = goalNode.name;
        while (tempNode) {
          path.push(tempNode);
          tempNode = cameFrom[tempNode];
        }

        // Inverte o caminho para obter a ordem correta (do início ao objetivo)
        path.reverse();
        console.log("Caminho encontrado:", path);
        return path; // Retorna o caminho encontrado
      }

      // Para cada vizinho do nó atual, verifica se já foi visitado
      currentNode.neighbors.forEach(neighbor => {
        const neighborNode = graph.find(node => node.name === neighbor.node);

        // Caso o nó vizinho não seja encontrado no grafo (erro de definição)
        if (!neighborNode) {
          console.error(`Vizinho não encontrado no grafo: ${neighbor.node}`);
          return; // Continua para o próximo vizinho
        }

        // Se o nó vizinho ainda não foi visitado
        if (!visited.has(neighborNode.name)) {
          // Marca o vizinho como visitado e o adiciona à fila
          visited.add(neighborNode.name);
          queue.push(neighborNode);

          // Registra o nó de onde o vizinho foi alcançado
          cameFrom[neighborNode.name] = currentNode.name;

          console.log(`Visitando nó: ${neighborNode.name}`);
        }
      });
    }

    // Se não houver mais nós na fila e o objetivo não foi alcançado
    console.warn("Caminho não encontrado.");
    return null;
  }

  // Função para reconstruir o caminho a partir do mapa 'cameFrom'
  // Esta função é uma alternativa ao método usado dentro da função `bfs()`.
  // É utilizada para traçar o caminho do objetivo até o ponto de partida.
  function reconstructPath(cameFrom, startName, goalName) {
    let path = [goalName];
    let current = goalName;

    // Retrocede no mapa 'cameFrom' até atingir o nó inicial
    while (current !== startName) {
      current = cameFrom[current];
      path.unshift(current); // Insere o nó no início do caminho
    }

    return path; // Retorna o caminho completo
  }

  // Função para obter um nó pelo nome
  // Procura e retorna o nó correspondente no grafo.
  function getNodeByName(graph, name) {
    return graph.find(node => node.name === name);
  }

  // Disponibiliza a função 'bfs' globalmente para que possa ser usada por outros scripts
  window.bfs = bfs;

})();
