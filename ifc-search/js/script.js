document.addEventListener('DOMContentLoaded', () => {
  const mapWrapper = document.getElementById('mapWrapper');
  const mapElement = document.getElementById('campusMap');
  const point1Display = document.getElementById('point1');
  const point2Display = document.getElementById('point2');

  // Variáveis para armazenar os pontos selecionados
  let point1 = null;
  let point2 = null;

  // Função para lidar com cliques no mapa e adicionar marcadores
  mapWrapper.addEventListener('click', function (e) {
    const rect = mapWrapper.getBoundingClientRect();

    // Calcula as coordenadas clicadas relativas ao elemento do mapa
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Se ponto 1 não estiver definido, define o ponto 1
    if (!point1) {
      point1 = { x, y };
      addMarker(x, y, 'point1');
      point1Display.textContent = `(${x.toFixed(2)}, ${y.toFixed(2)})`;
    } else if (!point2) {
      // Se ponto 1 já estiver definido, define o ponto 2
      point2 = { x, y };
      addMarker(x, y, 'point2');
      point2Display.textContent = `(${x.toFixed(2)}, ${y.toFixed(2)})`;
    } else {
      // Se ambos os pontos estiverem definidos, redefine o ponto 1 e remove os marcadores antigos
      const markers = document.querySelectorAll('.dynamic-marker');
      markers.forEach(marker => marker.remove());
      point1 = { x, y };
      point2 = null;
      addMarker(x, y, 'point1');
      point1Display.textContent = `(${x.toFixed(2)}, ${y.toFixed(2)})`;
      point2Display.textContent = 'Nenhum';
    }

    // Procurar o ponto mais próximo no grafo (futuramente implementado)
    // Aqui você poderia adicionar uma lógica para encontrar o ponto mais próximo no grafo
    console.log(`Ponto selecionado: (${x.toFixed(2)}, ${y.toFixed(2)})`);
  });

  // Função para adicionar um marcador visual no mapa
  function addMarker(x, y, type) {
    const marker = document.createElement('div');
    marker.classList.add('marker', 'dynamic-marker', type);
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    mapWrapper.appendChild(marker);
  }

  // Botão de redefinir pontos selecionados
  document.getElementById('reset').addEventListener('click', () => {
    // Remove todos os marcadores dinâmicos do mapa
    const markers = document.querySelectorAll('.dynamic-marker');
    markers.forEach(marker => marker.remove());
    // Redefine as variáveis de ponto
    point1 = null;
    point2 = null;
    // Atualiza o texto dos pontos na interface
    point1Display.textContent = 'Nenhum';
    point2Display.textContent = 'Nenhum';
  });
});