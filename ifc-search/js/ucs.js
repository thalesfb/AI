// ucs.js

function ucs(graph, startName, goalName) {
  const startNode = getNodeByName(startName);
  const goalNode = getNodeByName(goalName);

  const frontier = new PriorityQueue();
  frontier.enqueue(startNode, 0);
  const cameFrom = {};
  const costSoFar = {};
  cameFrom[startNode.name] = null;
  costSoFar[startNode.name] = 0;

  while (!frontier.isEmpty()) {
    const current = frontier.dequeue();

    if (current.name === goalNode.name) {
      return reconstructPath(cameFrom, startNode.name, goalNode.name);
    }

    for (const neighborInfo of current.neighbors) {
      const neighborNode = getNodeByName(neighborInfo.node);
      const newCost = costSoFar[current.name] + neighborInfo.distance;
      if (!(neighborNode.name in costSoFar) || newCost < costSoFar[neighborNode.name]) {
        costSoFar[neighborNode.name] = newCost;
        frontier.enqueue(neighborNode, newCost);
        cameFrom[neighborNode.name] = current.name;
      }
    }
  }
  return null; // Caminho não encontrado
}

// Implementação de uma fila de prioridade simples
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(item, priority) {
    this.elements.push({ item, priority });
  }

  dequeue() {
    this.elements.sort((a, b) => a.priority - b.priority);
    return this.elements.shift().item;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}