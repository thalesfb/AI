// Dimensões originais da imagem do mapa do campus
const originalImageWidth = 3509;
const originalImageHeight = 2481;

// Função para normalizar as coordenadas dos nós
// Esta função converte as coordenadas absolutas dos nós para um formato normalizado (entre 0 e 1),
// baseado nas dimensões originais da imagem. Isso permite um redimensionamento fácil em diferentes tamanhos de tela.
function normalizeCoordinates(x, y) {
  return {
    x: x / originalImageWidth,
    y: y / originalImageHeight,
  };
}

// Função para desnormalizar as coordenadas dos nós
// Esta função converte coordenadas normalizadas de volta para coordenadas absolutas,
// com base nas dimensões atuais do container (que pode variar conforme a tela).
function denormalizeCoordinates(x, y, width, height) {
  return {
    x: x * width,
    y: y * height,
  };
}

// Definição do grafo que representa os pontos do campus e suas conexões
// Cada nó representa um ponto no campus, com suas coordenadas e nós vizinhos.
const graph = [
  {
    name: "LabD03",  // Nome do ponto
    coord: normalizeCoordinates(1200, 1110),  // Coordenadas normalizadas do ponto
    neighbors: [  // Vizinhos diretos e suas distâncias
      { node: "LabD04", distance: 10 },
      { node: "Corredor 1", distance: 30 },
    ],
  },
  {
    name: "LabD04",
    coord: normalizeCoordinates(1150, 1110),
    neighbors: [
      { node: "LabD03", distance: 10 },
      { node: "LabD05", distance: 15 },
    ],
  },
  {
    name: "LabD05",
    coord: normalizeCoordinates(1100, 1110),
    neighbors: [
      { node: "LabD04", distance: 0.002 },
      { node: "LabD06", distance: 0.003 },
    ],
  },
  {
    name: "LabD06",
    coord: normalizeCoordinates(1050, 1110),
    neighbors: [
      { node: "LabD05", distance: 20 },
      { node: "LabD07", distance: 10 },
    ],
  },
  {
    name: "LabD07",
    coord: normalizeCoordinates(1000, 1110),
    neighbors: [
      { node: "LabD06", distance: 10 },
      { node: "Corredor 1", distance: 25 },
    ],
  },
  {
    name: "Corredor 1",
    coord: normalizeCoordinates(1300, 1110),
    neighbors: [
      { node: "LabD03", distance: 30 },
      { node: "LabD07", distance: 25 },
      { node: "Entrada Principal", distance: 50 },
    ],
  },
  {
    name: "Entrada Principal",
    coord: normalizeCoordinates(400, 520),
    neighbors: [
      { node: "Corredor 1", distance: 50 },
      { node: "Refeitório", distance: 20 },
    ],
  },
  {
    name: "Refeitório",
    coord: normalizeCoordinates(450, 540),
    neighbors: [
      { node: "Entrada Principal", distance: 20 },
      { node: "Guarita", distance: 40 },
    ],
  },
  {
    name: "Guarita",
    coord: normalizeCoordinates(1845, 810),
    neighbors: [
      { node: "Refeitório", distance: 40 },
      { node: "Ginásio", distance: 70 },
      { node: "Estacionamento", distance: 100 },
      { node: "Auditório", distance: 100 },
      { node: "Academia", distance: 100 },
    ],
  },
  {
    name: "Ginásio",
    coord: { x: 2710, y: 1355 },
    neighbors: [
      { node: "Guarita", distance: 70 },
      { node: "Academia", distance: 30 },
    ],
  },
  {
    name: "Academia",
    coord: normalizeCoordinates(600, 570),
    neighbors: [
      { node: "Ginásio", distance: 30 },
      { node: "Biblioteca", distance: 100 },
    ],
  },
  {
    name: "Biblioteca",
    coord: normalizeCoordinates(650, 580),
    neighbors: [
      { node: "Academia", distance: 100 },
      { node: "Administração", distance: 80 },
    ],
  },
  {
    name: "Administração",
    coord: normalizeCoordinates(700, 600),
    neighbors: [
      { node: "Biblioteca", distance: 80 },
      { node: "Auditório", distance: 60 },
    ],
  },
  {
    name: "Auditório",
    coord: normalizeCoordinates(750, 620),
    // coord: { x: 0.3185, y: 0.6225 },
    neighbors: [
      { node: "Administração", distance: 60 },
      { node: "Cantinha", distance: 50 },
    ],
  },
  {
    name: "Cantinha",
    coord: normalizeCoordinates(800, 640),
    neighbors: [
      { node: "Auditório", distance: 50 },
      { node: "Estacionamento", distance: 90 },
    ],
  },
  {
    name: "Estacionamento",
    coord: normalizeCoordinates(850, 650),
    neighbors: [
      { node: "Cantinha", distance: 90 },
      { node: "Lago", distance: 120 },
    ],
  },
  {
    name: "Lago",
    coord: { x: 2082, y: 1883 },
    neighbors: [
      { node: "Estacionamento", distance: 120 },
      { node: "gabinetes dos professores", distance: 110 },
    ],
  },
  {
    name: "gabinetes dos professores",
    coord: normalizeCoordinates(950, 670),
    neighbors: [
      { node: "Lago", distance: 110 },
      { node: "SalaF01", distance: 40 },
    ],
  },
  {
    name: "SalaF01",
    coord: normalizeCoordinates(1000, 680),
    neighbors: [
      { node: "gabinetes dos professores", distance: 40 },
      { node: "SalaF05", distance: 30 },
    ],
  },
  {
    name: "SalaF05",
    coord: normalizeCoordinates(1050, 690),
    neighbors: [
      { node: "SalaF01", distance: 30 },
      { node: "SalaF06", distance: 20 },
    ],
  },
  {
    name: "SalaF06",
    coord: normalizeCoordinates(1100, 700),
    neighbors: [
      { node: "SalaF05", distance: 20 },
      { node: "SalaF08", distance: 25 },
    ],
  },
  {
    name: "SalaF08",
    coord: normalizeCoordinates(1150, 710),
    neighbors: [{ node: "SalaF06", distance: 25 }],
  },
];

// Função para atualizar as posições dos nós no mapa de acordo com as dimensões atuais do container do mapa
// Esta função recalcula as coordenadas de cada nó para manter a correspondência exata com a imagem do campus,
// mesmo que o container seja redimensionado.
function updateNodePositions() {
  const mapWrapper = document.getElementById('mapWrapper');
  const containerWidth = mapWrapper.offsetWidth;
  const containerHeight = mapWrapper.offsetHeight;

  // Atualiza a posição de cada nó na rede
  nodes.forEach((node) => {
    // Encontra o nó correspondente no grafo
    const graphNode = graph.find((n) => n.name === node.label);
    if (graphNode) {
      // Desnormaliza as coordenadas para o tamanho atual do container
      const { x, y } = denormalizeCoordinates(graphNode.coord.x, graphNode.coord.y, containerWidth, containerHeight);

      // Atualiza a posição do nó
      nodes.update({ id: node.id, x: x, y: -y }); // O 'y' é negativo para ajustar ao canvas do vis.js
    } else {
      console.warn(`Nó ${node.id} - ${node.label} não encontrado no grafo!`);
    }
  });

  // Redesenha a rede após a atualização das posições
  network.redraw();
}

// Mapeia nomes dos nós para seus respectivos IDs únicos
// Isso permite converter de um nome de ponto para o ID correspondente, necessário para a biblioteca vis.js.
const nodeNameToId = {};
graph.forEach((node, index) => {
  nodeNameToId[node.name] = index + 1;
});

// Cria um conjunto de nós para o vis.js
// Cada nó contém um ID único, um rótulo (nome), e características visuais como tamanho e cor.
const nodes = new vis.DataSet(
  graph.map((node, index) => ({
    id: index + 1,
    label: node.name,
    fixed: true,  // Define se o nó deve permanecer fixo na posição especificada
    shape: 'dot', // Define a forma do nó como um ponto
    size: 10,     // Define o tamanho do ponto
    // color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' }, // Cor transparente
    color: 'black',
    // color: 'lightblue', // Cor padrão do nó
    font: { color: 'black', size: 14, align: 'center' }, // Estilo da fonte do rótulo do nó
  }))
);

// Cria um conjunto de arestas para o vis.js, que conectam os nós
// Cada aresta possui um nó de origem ('from') e um nó de destino ('to'), além da distância e cor padrão.
const edges = new vis.DataSet(
  graph.flatMap(node =>
    node.neighbors.map(neighbor => ({
      from: nodeNameToId[node.name],  // ID do nó de origem
      to: nodeNameToId[neighbor.node], // ID do nó de destino
      // label: `${neighbor.distance}m`,  // Rótulo da aresta indicando a distância
      font: { align: 'middle' },       // Estilo da fonte do rótulo da aresta
      color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' },                   // Cor padrão da aresta
    }))
  )
);
