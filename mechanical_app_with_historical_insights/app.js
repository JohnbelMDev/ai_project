$(document).ready(function() {
  // Initial Three.js setup as before
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(600, 400);
  document.getElementById('viewer').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Basic functions for adding additional functionality
  $('#rotate').click(function() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });

  // Historical Tooltip
  function showHistoricalTooltip(element, info) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = info;
    document.body.appendChild(tooltip);

    element.addEventListener('mouseover', () => { tooltip.style.display = 'block'; });
    element.addEventListener('mouseout', () => { tooltip.style.display = 'none'; });
  }
  showHistoricalTooltip(document.getElementById('viewer'), 
    'Stress analysis was first developed for bridges. It plays a critical role in mechanical engineering.');

  // 1. Rigid Body Physics Simulation
  function applyPhysics(object, deltaTime) {
    const gravity = -9.81;
    object.position.y += object.velocityY * deltaTime;
    object.velocityY += gravity * deltaTime;
    if (object.position.y <= 0) {
      object.position.y = 0;
      object.velocityY *= -0.5;
    }
  }
  cube.velocityY = 0;
  setInterval(() => applyPhysics(cube, 0.016), 16);

  // 2. Genetic Algorithm for Optimization
  function geneticOptimization() {
    let population = [generateRandomSolution()];
    for (let generation = 0; generation < 10; generation++) {
      population = population.map(mutate);
      population = selectFittest(population);
    }
    return population[0];
  }
  function generateRandomSolution() { return { value: Math.random() }; }
  function mutate(solution) { solution.value *= Math.random(); return solution; }
  function selectFittest(population) { return population.sort((a, b) => b.value - a.value).slice(0, 1); }

  // 3. Finite Element Analysis (Simplified)
  function stressAnalysis(object, force) {
    const stress = force / (object.geometry.parameters.width * object.geometry.parameters.height);
    return stress;
  }
  console.log('Stress:', stressAnalysis(cube, 50));

  // 4. Thermal Simulation (Simple Heat Diffusion)
  let temperature = Array(100).fill(20);
  function heatDiffusion() {
    for (let i = 1; i < temperature.length - 1; i++) {
      temperature[i] += 0.1 * (temperature[i - 1] + temperature[i + 1] - 2 * temperature[i]);
    }
  }
  setInterval(heatDiffusion, 100);

  // 5. A* Pathfinding Algorithm (Simple Grid Implementation)
  function aStarPathfinding(start, goal) {
    let openSet = [start];
    let cameFrom = {};
    while (openSet.length) {
      let current = openSet.pop();
      if (current === goal) return reconstructPath(cameFrom, current);
      for (let neighbor of getNeighbors(current)) {
        if (!cameFrom[neighbor]) openSet.push(neighbor);
        cameFrom[neighbor] = current;
      }
    }
  }
  function reconstructPath(cameFrom, current) {
    let path = [current];
    while (current in cameFrom) { current = cameFrom[current]; path.push(current); }
    return path.reverse();
  }
  function getNeighbors(pos) { return [pos - 1, pos + 1]; }

  // 6. Predictive Maintenance (Basic Failure Prediction)
  function failurePrediction(usage) {
    const failureProbability = 1 - Math.exp(-usage / 1000);
    return failureProbability > 0.5 ? "High risk" : "Low risk";
  }
  console.log('Failure Risk:', failurePrediction(500));

  // 7. Dynamic System Analysis (Basic Oscillation)
  function oscillationSimulation() {
    const frequency = 1;
    cube.position.y = Math.sin(Date.now() * 0.001 * frequency);
  }
  setInterval(oscillationSimulation, 16);
  
  // Display Results
  $('#calculate-torque').click(function() {
    const stressResult = stressAnalysis(cube, 50);
    $('#torque-result').text(`Stress: ${stressResult.toFixed(2)}`);
  });

  $('#check-traffic-time').click(function() {
    const startTime = performance.now();
    $.get('https://jsonplaceholder.typicode.com/todos/1', function() {
      const endTime = performance.now();
      $('#time-result').text((endTime - startTime).toFixed(2) + ' ms');
    });
  });
});