// Função autoexecutável que encapsula a implementação do algoritmo A* 
// para evitar poluição do escopo global.
(function () {

  // Função para obter um nó pelo nome
  // Esta função procura e retorna o nó correspondente ao 'name' dentro do grafo.
  function getNodeByName(graph, name) {
    return graph.find(node => node.name === name);
  }

  // Implementação do algoritmo A* para encontrar o caminho mais curto em um grafo
  // O A* combina as características de Dijkstra e a Busca Gulosa, usando uma heurística para guiar a busca.
  function aStar(graph, startName, goalName) {
    // Encontra os nós inicial e objetivo pelo nome
    const startNode = getNodeByName(graph, startName);
    const goalNode = getNodeByName(graph, goalName);

    // Verifica se os nós inicial e objetivo existem no grafo
    if (!startNode || !goalNode) {
      throw new Error('Nó inicial ou nó objetivo não encontrado no grafo.');
    }

    // Conjunto aberto (open set) contém os nós a serem explorados.
    // Inicialmente, contém apenas o nó de partida.
    const openSet = new Set([startNode]);

    // Mapa para manter o caminho de onde cada nó foi alcançado
    const cameFrom = new Map();

    // gScore mantém o custo acumulado do caminho desde o início até cada nó.
    // Inicialmente, todos os nós têm custo infinito, exceto o nó inicial que tem custo zero.
    const gScore = new Map(graph.map(node => [node, Infinity]));
    gScore.set(startNode, 0);

    // fScore mantém uma estimativa do custo total do caminho do início até o objetivo passando pelo nó.
    // Inicialmente, todos os nós têm custo infinito, exceto o nó inicial que é igual ao valor da heurística.
    const fScore = new Map(graph.map(node => [node, Infinity]));
    fScore.set(startNode, heuristic(startNode, goalNode));

    // Loop principal que continua até que o conjunto aberto esteja vazio
    while (openSet.size > 0) {
      // Seleciona o nó com o menor valor de fScore do conjunto aberto
      let current = [...openSet].reduce((a, b) => (fScore.get(a) < fScore.get(b) ? a : b));

      // Se o nó atual for o objetivo, reconstruir e retornar o caminho encontrado
      if (current === goalNode) {
        return reconstructPath(cameFrom, current);
      }

      // Remove o nó atual do conjunto aberto, pois agora ele está sendo processado
      openSet.delete(current);

      // Para cada vizinho do nó atual
      for (let neighbor of current.neighbors) {
        // Obtém o objeto do nó vizinho pelo nome
        const neighborNode = getNodeByName(graph, neighbor.node);

        // Calcula o custo gScore tentativo para chegar ao vizinho pelo nó atual
        const tentativeGScore = gScore.get(current) + neighbor.distance;

        // Se o custo tentativo for menor que o gScore do vizinho, então este é o caminho melhor até o vizinho
        if (tentativeGScore < gScore.get(neighborNode)) {
          // Registra que o vizinho foi alcançado a partir do nó atual
          cameFrom.set(neighborNode, current);

          // Atualiza o gScore do vizinho
          gScore.set(neighborNode, tentativeGScore);

          // Atualiza o fScore do vizinho, usando o gScore e a heurística até o objetivo
          fScore.set(neighborNode, gScore.get(neighborNode) + heuristic(neighborNode, goalNode));

          // Se o vizinho ainda não estiver no conjunto aberto, adiciona-o
          if (!openSet.has(neighborNode)) {
            openSet.add(neighborNode);
          }
        }
      }
    }

    // Se o conjunto aberto esvaziou e o objetivo não foi alcançado, retorna null (caminho não encontrado)
    return null;
  }

  // Função heurística usada para estimar o custo de um nó até o objetivo
  // Neste caso, é usada a distância Euclidiana, que calcula a distância direta em linha reta
  function heuristic(nodeA, nodeB) {
    const dx = nodeA.coord.x - nodeB.coord.x;
    const dy = nodeA.coord.y - nodeB.coord.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Função para reconstruir o caminho a partir do mapa 'cameFrom'
  // Essa função percorre de trás para frente desde o objetivo até o início, formando o caminho completo.
  function reconstructPath(cameFrom, current) {
    const totalPath = [current.name]; // Inicializa o caminho com o nó objetivo
    while (cameFrom.has(current)) {
      current = cameFrom.get(current); // Retrocede ao nó anterior
      totalPath.unshift(current.name); // Adiciona o nó ao início do caminho
    }
    return totalPath; // Retorna o caminho completo, do início ao objetivo
  }

  // Disponibiliza a função 'aStar' globalmente para que possa ser usada por outros scripts
  window.aStar = aStar;

})();