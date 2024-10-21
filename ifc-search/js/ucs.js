// Função autoexecutável que encapsula a implementação do algoritmo de Custo Uniforme (UCS)
// para evitar a poluição do escopo global.
(function () {

  // Função principal que implementa o algoritmo UCS
  function ucs(graph, startName, goalName) {
    // Obtém os nós inicial e objetivo pelo nome fornecido
    const startNode = getNodeByName(graph, startName);
    const goalNode = getNodeByName(graph, goalName);

    // Inicializa a fila de prioridade (fronteira) que mantém os nós a serem explorados, ordenados por custo
    const frontier = new PriorityQueue();
    frontier.enqueue(startNode, 0);

    // Mapas para armazenar de onde cada nó foi alcançado e o custo total até cada nó
    const cameFrom = {};
    const costSoFar = {};

    // O nó inicial não tem um nó de onde veio e o custo até ele é zero
    cameFrom[startNode.name] = null;
    costSoFar[startNode.name] = 0;

    // Enquanto houver nós na fronteira (fila de prioridade)
    while (!frontier.isEmpty()) {
      // Retira o nó com menor custo da fronteira
      const current = frontier.dequeue();

      // Se o nó atual for o objetivo, reconstruímos o caminho e o retornamos
      if (current.name === goalNode.name) {
        return reconstructPath(cameFrom, startNode.name, goalNode.name);
      }

      // Para cada vizinho do nó atual
      for (const neighborInfo of current.neighbors) {
        const neighborNode = getNodeByName(graph, neighborInfo.node);

        // Calcula o custo até o nó vizinho
        const newCost = costSoFar[current.name] + neighborInfo.distance;

        // Se o nó vizinho não foi visitado antes ou encontramos um caminho mais barato
        if (!(neighborNode.name in costSoFar) || newCost < costSoFar[neighborNode.name]) {
          costSoFar[neighborNode.name] = newCost;  // Atualiza o custo até o vizinho
          frontier.enqueue(neighborNode, newCost); // Adiciona o vizinho à fronteira com a nova prioridade (menor custo)
          cameFrom[neighborNode.name] = current.name; // Registra de onde o vizinho foi alcançado
        }
      }
    }

    // Se a fronteira estiver vazia e o objetivo não foi alcançado
    return null; // Retorna null indicando que nenhum caminho foi encontrado
  }

  // Implementação de uma fila de prioridade simples
  // A fila de prioridade é utilizada para garantir que os nós sejam explorados na ordem do menor custo.
  class PriorityQueue {
    constructor() {
      this.elements = [];
    }

    // Adiciona um item à fila com uma determinada prioridade
    enqueue(item, priority) {
      this.elements.push({ item, priority });
    }

    // Remove e retorna o item com a menor prioridade (menor custo)
    dequeue() {
      // Ordena os elementos pela prioridade antes de remover o primeiro (de menor custo)
      this.elements.sort((a, b) => a.priority - b.priority);
      return this.elements.shift().item;
    }

    // Verifica se a fila está vazia
    isEmpty() {
      return this.elements.length === 0;
    }
  }

  // Função para obter um nó pelo nome
  // Procura e retorna um nó no grafo pelo nome.
  function getNodeByName(graph, name) {
    return graph.find(node => node.name === name);
  }

  // Função para reconstruir o caminho do nó inicial até o objetivo, utilizando o mapa 'cameFrom'
  function reconstructPath(cameFrom, startName, goalName) {
    let path = [goalName]; // Inicializa o caminho com o nó objetivo
    let current = goalName;

    // Retrocede no mapa 'cameFrom' até atingir o nó inicial
    while (current !== startName) {
      current = cameFrom[current]; // Atualiza o nó atual para o nó de onde ele veio
      path.unshift(current); // Adiciona o nó ao início do caminho
    }

    return path; // Retorna o caminho completo
  }

  // Disponibiliza a função 'ucs' globalmente para que possa ser usada por outros scripts
  window.ucs = ucs;

})();