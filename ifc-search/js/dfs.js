// Função autoexecutável que encapsula a implementação do algoritmo de Busca em Profundidade (DFS)
// para evitar a poluição do escopo global.
(function () {

  // Função principal que implementa o algoritmo DFS para encontrar um caminho em um grafo
  function dfs(graph, startName, goalName) {
    // Obtém os nós inicial e objetivo pelo nome
    const startNode = getNodeByName(graph, startName);
    const goalNode = getNodeByName(graph, goalName);

    // Verifica se os nós inicial e objetivo existem no grafo
    if (!startNode || !goalNode) {
      console.error('Nó inicial ou nó objetivo não encontrado no grafo.');
      return null;
    }

    // Pilha usada para rastrear os nós a serem explorados
    const stack = [startNode];

    // Conjunto que armazena os nós já visitados para evitar revisitas
    const visited = new Set();
    visited.add(startNode.name);

    // Mapa que registra de onde cada nó foi alcançado, necessário para reconstruir o caminho
    const cameFrom = {};

    // Enquanto houver nós a serem explorados na pilha
    while (stack.length > 0) {
      // Remove o nó do topo da pilha (LIFO)
      const current = stack.pop();

      // Verifica se o nó atual é o nó objetivo
      if (current.name === goalNode.name) {
        console.log("Destino encontrado:", current.name);
        // Reconstrói o caminho e retorna o resultado
        return reconstructPath(cameFrom, startNode.name, goalNode.name);
      }

      // Percorre todos os vizinhos do nó atual
      for (const neighborInfo of current.neighbors) {
        // Encontra o nó vizinho no grafo pelo nome
        const neighborNode = getNodeByName(graph, neighborInfo.node);

        // Verifica se o nó vizinho foi encontrado
        if (!neighborNode) {
          console.error(`Vizinho não encontrado no grafo: ${neighborInfo.node}`);
          continue; // Pula para o próximo vizinho se o atual não for encontrado
        }

        // Se o nó vizinho ainda não foi visitado
        if (!visited.has(neighborNode.name)) {
          // Marca o nó vizinho como visitado e o adiciona à pilha para ser explorado
          visited.add(neighborNode.name);
          stack.push(neighborNode);

          // Registra que o nó vizinho foi alcançado a partir do nó atual
          cameFrom[neighborNode.name] = current.name;
          console.log(`Visitando nó: ${neighborNode.name}`);
        }
      }
    }

    // Se a pilha esvaziar e o objetivo não foi alcançado
    console.warn("Caminho não encontrado.");
    return null; // Retorna null indicando que nenhum caminho foi encontrado
  }

  // Função para obter um nó pelo nome
  // Esta função procura e retorna um nó do grafo pelo nome.
  function getNodeByName(graph, name) {
    return graph.find(node => node.name === name);
  }

  // Função para reconstruir o caminho a partir do mapa 'cameFrom'
  // Esta função percorre de trás para frente, desde o nó objetivo até o nó inicial, formando o caminho completo.
  function reconstructPath(cameFrom, startName, goalName) {
    let path = [goalName]; // Inicializa o caminho com o nó objetivo
    let current = goalName;

    // Retrocede pelo mapa 'cameFrom' até atingir o nó inicial
    while (current !== startName) {
      current = cameFrom[current]; // Atualiza o nó atual para o nó de onde ele veio
      path.unshift(current); // Adiciona o nó ao início do caminho
    }

    return path; // Retorna o caminho completo, do início ao objetivo
  }

  // Disponibiliza a função 'dfs' globalmente para que possa ser usada por outros scripts
  window.dfs = dfs;

})();
