// a_star.js

function aStar(graph, startName, goalName) {
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
        const priority = newCost + heuristic(neighborNode, goalNode);
        frontier.enqueue(neighborNode, priority);
        cameFrom[neighborNode.name] = current.name;
      }
    }
  }
  return null; // Caminho não encontrado
}

// Heurística: distância Euclidiana entre os nós
function heuristic(a, b) {
  return Math.hypot(a.coord.x - b.coord.x, a.coord.y - b.coord.y);
}