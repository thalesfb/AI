// bfs.js

function bfs(graph, startName, goalName) {
  const startNode = getNodeByName(startName);
  const goalNode = getNodeByName(goalName);

  const queue = [startNode];
  const visited = new Set();
  const cameFrom = {};

  visited.add(startNode.name);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.name === goalNode.name) {
      return reconstructPath(cameFrom, startNode.name, goalNode.name);
    }

    for (const neighborInfo of current.neighbors) {
      const neighborNode = getNodeByName(neighborInfo.node);
      if (!visited.has(neighborNode.name)) {
        visited.add(neighborNode.name);
        cameFrom[neighborNode.name] = current.name;
        queue.push(neighborNode);
      }
    }
  }
  return null; // Caminho não encontrado
}

function reconstructPath(cameFrom, startName, goalName) {
  let path = [goalName];
  let current = goalName;
  while (current !== startName) {
    current = cameFrom[current];
    path.unshift(current);
  }
  return path;
}