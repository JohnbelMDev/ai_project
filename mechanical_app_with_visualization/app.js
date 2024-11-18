$(document).ready(function() {
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

  // Real-Time Torque Plot
  const torqueData = { labels: [], datasets: [{ label: "Torque (Nm)", data: [] }] };
  const torqueCtx = document.getElementById('torqueGraph').getContext('2d');
  const torqueChart = new Chart(torqueCtx, {
    type: 'line',
    data: torqueData,
    options: { scales: { x: { type: 'linear', position: 'bottom' } } }
  });

  function updateTorqueGraph(force) {
    const torque = force * 2; // Sample calculation
    const time = new Date().getTime() / 1000;
    torqueData.labels.push(time);
    torqueData.datasets[0].data.push(torque);
    if (torqueData.labels.length > 50) torqueData.labels.shift();
    if (torqueData.datasets[0].data.length > 50) torqueData.datasets[0].data.shift();
    torqueChart.update();
  }

  $('#rotate').click(function() { cube.rotation.x += 0.1; cube.rotation.y += 0.1; });
  $('#force-slider').on('input', function() { updateTorqueGraph(this.value); });

  // Interactive Heat Map
  const heatData = Array(100).fill(20); 
  const heatCtx = document.getElementById('heatMap').getContext('2d');
  function updateHeatMap() {
    heatCtx.clearRect(0, 0, heatCtx.canvas.width, heatCtx.canvas.height);
    for (let i = 0; i < heatData.length; i++) {
      const intensity = (heatData[i] - 20) / 80;
      heatCtx.fillStyle = `rgba(255, ${255 - intensity * 255}, 0, ${intensity})`;
      heatCtx.fillRect((i % 10) * 40, Math.floor(i / 10) * 40, 40, 40);
    }
  }
  setInterval(() => {
    heatData[Math.floor(Math.random() * heatData.length)] += Math.random() * 2 - 1;
    updateHeatMap();
  }, 500);

  $('#temperature-slider').on('input', function() {
    const temperature = this.value;
    for (let i = 0; i < heatData.length; i++) {
      heatData[i] = temperature;
    }
    updateHeatMap();
  });

  function showForceVisualization(force) {
    const forceArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0), cube.position, force / 10, 0xff0000
    );
    scene.add(forceArrow);
    setTimeout(() => scene.remove(forceArrow), 1000);
  }
  $('#force-slider').on('input', function() { showForceVisualization(this.value); });
});
