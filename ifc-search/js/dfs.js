// dfs.js

function dfs(graph, startName, goalName) {
  const startNode = getNodeByName(startName);
  const goalNode = getNodeByName(goalName);

  const stack = [startNode];
  const visited = new Set();
  const cameFrom = {};

  visited.add(startNode.name);

  while (stack.length > 0) {
    const current = stack.pop();

    if (current.name === goalNode.name) {
      return reconstructPath(cameFrom, startNode.name, goalNode.name);
    }

    for (const neighborInfo of current.neighbors) {
      const neighborNode = getNodeByName(neighborInfo.node);
      if (!visited.has(neighborNode.name)) {
        visited.add(neighborNode.name);
        cameFrom[neighborNode.name] = current.name;
        stack.push(neighborNode);
      }
    }
  }
  return null; // Caminho não encontrado
}
