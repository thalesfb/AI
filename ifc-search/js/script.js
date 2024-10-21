document.addEventListener('DOMContentLoaded', () => {
  // Seleciona elementos do DOM que serão usados para mostrar o ponto de partida, ponto de chegada, etc.
  const point1Display = document.getElementById('point1');
  const point2Display = document.getElementById('point2');
  const algorithmSelect = document.getElementById('algorithmSelect');
  const searchButton = document.getElementById('searchButton');

  // Variáveis para armazenar os pontos de partida e chegada
  let point1 = null;
  let point2 = null;

  // Dimensões originais da imagem do mapa (em pixels)
  const originalImageWidth = 3509;
  const originalImageHeight = 2481;

  console.log("Script inicializado - Dimensões da imagem original:", originalImageWidth, originalImageHeight);

  // Configuração e inicialização da rede (grafo) com vis.js
  const container = document.getElementById('network');
  const data = { nodes, edges };  // 'nodes' e 'edges' são conjuntos de nós e arestas do grafo
  const options = {
    interaction: {
      dragNodes: false,  // Impede que os nós sejam arrastados
      zoomView: false,   // Desabilita o zoom na visualização do grafo
      dragView: false,   // Impede o arrasto da visualização
      selectable: true,  // Permite selecionar nós
      selectConnectedEdges: false,  // Não permite selecionar arestas conectadas automaticamente
    },
    physics: {
      enabled: false,  // Desativa as físicas do grafo para evitar movimentação automática dos nós
    },
    nodes: {
      shape: 'dot',  // Define a forma dos nós como pontos
    },
  };

  console.log("Iniciando rede Vis.js...");
  const network = new vis.Network(container, data, options);
  console.log("Rede inicializada com os seguintes nós:", nodes);
  console.log("E as seguintes arestas:", edges);

  // Atualiza as posições dos nós com base no tamanho atual do container do mapa
  function updateNodePositions() {
    const mapWrapper = document.getElementById('mapWrapper');
    const containerWidth = mapWrapper.offsetWidth;
    const containerHeight = mapWrapper.offsetHeight;

    console.log("Atualizando posições dos nós...");
    console.log("Dimensões do container:", containerWidth, containerHeight);

    // Para cada nó, recalcula a posição com base nas dimensões do container
    nodes.forEach((node) => {
      const graphNode = graph.find((n) => n.name === node.label);
      if (graphNode) {
        console.log(`Atualizando nó ${node.id} - ${node.label} com coordenadas normalizadas:`, graphNode.coord);

        const { x, y } = denormalizeCoordinates(graphNode.coord.x, graphNode.coord.y, containerWidth, containerHeight);

        // Ajuste para o sistema de coordenadas da biblioteca vis.js
        const xCanvas = x - containerWidth / 2;
        const yCanvas = -(y - containerHeight / 2);

        console.log(`Coordenadas denormalizadas para o nó ${node.id}: (x: ${x}, y: ${y})`);
        console.log(`Coordenadas ajustadas para canvas para o nó ${node.id}: (x: ${xCanvas}, y: ${yCanvas})`);

        nodes.update({ id: node.id, x: xCanvas, y: yCanvas });
      } else {
        console.warn(`Nó ${node.id} - ${node.label} não encontrado no grafo!`);
      }
    });

    network.redraw();  // Redesenha a rede após atualizar as posições
    console.log("Rede redesenhada após atualização dos nós.");
  }

  // Chama updateNodePositions inicialmente para ajustar os nós após a carga da página
  updateNodePositions();

  // Adiciona um evento de redimensionamento para atualizar a posição dos nós se o tamanho do container mudar
  window.addEventListener('resize', () => {
    console.log("Evento de redimensionamento detectado.");
    updateNodePositions();
  });

  // Lida com o evento de clique na rede para definir os pontos de partida e chegada
  network.on('click', function (params) {
    console.log("Evento de clique detectado. Parâmetros:", params);

    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const node = nodes.get(nodeId);

      if (!point1) {
        // Define o ponto de partida
        point1 = node;
        point1Display.textContent = node.label;
        highlightNode(nodeId, 'green');
        console.log(`Ponto de partida selecionado: ${node.label}`);
      } else if (!point2 && nodeId !== point1.id) {
        // Define o ponto de chegada
        point2 = node;
        point2Display.textContent = node.label;
        highlightNode(nodeId, 'red');
        console.log(`Ponto de chegada selecionado: ${node.label}`);
      } else {
        // Reseta a seleção se já existirem dois pontos
        resetSelection();
        point1 = node;
        point1Display.textContent = node.label;
        highlightNode(nodeId, 'green');
        console.log(`Pontos redefinidos. Novo ponto de partida: ${node.label}`);
      }

      const graphNode = graph[nodeId - 1];
      console.log(`Nó selecionado: ${node.label}, Coordenadas originais: (${graphNode.coord.x}, ${graphNode.coord.y})`);
    }
  });

  // Função para destacar um nó específico com uma cor definida
  function highlightNode(nodeId, color) {
    console.log(`Destacando nó ${nodeId} com a cor ${color}`);
    nodes.update({ id: nodeId, color });
  }

  // Função para resetar a seleção dos pontos de partida e chegada
  function resetSelection() {
    console.log("Resetando seleção de pontos.");
    if (point1) nodes.update({ id: point1.id, color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' } });
    if (point2) nodes.update({ id: point2.id, color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' } });
    point1 = null;
    point2 = null;
    point1Display.textContent = 'Nenhum';
    point2Display.textContent = 'Nenhum';
    document.getElementById('distance').textContent = '0';
    document.getElementById('result').textContent = '';
    clearGraphHighlight();
  }

  // Evento do botão de redefinir pontos
  document.getElementById('reset').addEventListener('click', () => {
    console.log("Botão de redefinir pontos clicado.");
    resetSelection();
  });

  // Evento do botão de busca de caminho entre os pontos selecionados
  searchButton.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    console.log(`Buscando caminho com o algoritmo: ${selectedAlgorithm}`);
    performSearch(selectedAlgorithm);
  });

  // Função que executa a busca do caminho usando o algoritmo selecionado
  function performSearch(algorithm) {
    if (point1 && point2) {
      const startNodeName = point1.label;
      const endNodeName = point2.label;
      let path;

      console.log(`Executando busca com o algoritmo ${algorithm} entre ${startNodeName} e ${endNodeName}`);

      const startTime = performance.now();  // Marca o tempo de início da execução

      // Executa o algoritmo selecionado
      switch (algorithm) {
        case 'BFS':
          path = bfs(graph, startNodeName, endNodeName);
          break;
        case 'DFS':
          path = dfs(graph, startNodeName, endNodeName);
          break;
        case 'UCS':
          path = ucs(graph, startNodeName, endNodeName);
          break;
        case 'A*':
          path = aStar(graph, startNodeName, endNodeName);
          break;
        default:
          alert('Algoritmo não reconhecido.');
          return;
      }

      const endTime = performance.now();  // Marca o tempo de fim da execução
      const executionTime = endTime - startTime;

      // Exibe o tempo de execução na página
      document.getElementById('executionTime').textContent = `${executionTime.toFixed(2)} ms`;

      if (path) {
        displayPath(path);
        highlightPath(path);
      } else {
        alert('Caminho não encontrado.');
      }
    } else {
      alert('Por favor, selecione dois pontos no mapa.');
    }
  }

  // Função para calcular a distância total do caminho encontrado
  function calculateTotalDistance(path) {
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const currentNode = graph.find(node => node.name === path[i]);
      const nextNodeName = path[i + 1];
      const neighbor = currentNode.neighbors.find(n => n.node === nextNodeName);

      if (neighbor) {
        totalDistance += neighbor.distance;
      } else {
        // Verifica se o vizinho está na direção oposta (grafo não-direcionado)
        const nextNode = graph.find(node => node.name === nextNodeName);
        const reverseNeighbor = nextNode.neighbors.find(n => n.node === currentNode.name);
        if (reverseNeighbor) {
          totalDistance += reverseNeighbor.distance;
        } else {
          console.error(`Nenhuma conexão direta entre ${currentNode.name} e ${nextNodeName}`);
        }
      }
    }

    return totalDistance;
  }

  // Função para exibir o caminho e a distância total na interface
  function displayPath(path) {
    const totalDistance = calculateTotalDistance(path);
    console.log(`Caminho encontrado: ${path.join(' -> ')} com distância total de ${totalDistance} metros`);
    document.getElementById('distance').textContent = `${totalDistance} metros`;
    document.getElementById('result').textContent = `Caminho encontrado: ${path.join(' -> ')}`;
  }

  // Função para destacar o caminho encontrado no grafo
  function highlightPath(path) {
    // Reseta as cores das arestas para o padrão
    edges.forEach(edge => {
      edges.update({ id: edge.id, color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' } });
    });

    // Percorre o caminho e destaca as arestas em vermelho
    for (let i = 0; i < path.length - 1; i++) {
      const fromId = nodeNameToId[path[i]];
      const toId = nodeNameToId[path[i + 1]];

      // Encontrar a aresta correspondente
      const edge = edges.get({
        filter: function (item) {
          return (item.from === fromId && item.to === toId) || (item.from === toId && item.to === fromId);
        }
      });

      if (edge.length > 0) {
        edges.update({ id: edge[0].id, color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' } });
      }
    }
  }

  // Função para limpar qualquer destaque atual do grafo
  function clearGraphHighlight() {
    edges.forEach(edge => {
      edges.update({ id: edge.id, color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' } });
    });
  }
});
