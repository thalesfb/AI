// Definição do grafo

const graph = [
  {
    name: 'Entrada Principal',
    coord: { x: 100, y: 500 },
    neighbors: [
      { node: 'Biblioteca', distance: 50 },
      { node: 'Laboratório de Informática', distance: 100 },
    ],
  },
  {
    name: 'Biblioteca',
    coord: { x: 200, y: 450 },
    neighbors: [
      { node: 'Entrada Principal', distance: 50 },
      { node: 'Auditório', distance: 70 },
    ],
  },
  {
    name: 'Laboratório de Informática',
    coord: { x: 150, y: 600 },
    neighbors: [
      { node: 'Entrada Principal', distance: 100 },
      { node: 'Administração', distance: 80 },
    ],
  },
  {
    name: 'Auditório',
    coord: { x: 300, y: 400 },
    neighbors: [
      { node: 'Biblioteca', distance: 70 },
      { node: 'Administração', distance: 60 },
    ],
  },
  {
    name: 'Administração',
    coord: { x: 250, y: 550 },
    neighbors: [
      { node: 'Laboratório de Informática', distance: 80 },
      { node: 'Auditório', distance: 60 },
    ],
  },
  // Adicione mais nós conforme necessário
];

// Função para obter um nó pelo nome
function getNodeByName(name) {
  return graph.find(node => node.name === name);
}

// Função para obter um nó pelas coordenadas mais próximas
function getNodeByCoord(coord) {
  return graph.reduce((closest, node) => {
    const distance = Math.hypot(node.coord.x - coord.x, node.coord.y - coord.y);
    if (!closest || distance < closest.distance) {
      return { node, distance };
    }
    return closest;
  }, null).node;
}