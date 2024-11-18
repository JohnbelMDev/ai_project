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

  // Laser Line Setup for Stress Path Visualization
  const laserGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(1, 0, 0)
  ]);
  const laserMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
  const laserLine = new THREE.Line(laserGeometry, laserMaterial);
  laserLine.position.set(0, 1.2, 0);
  scene.add(laserLine);

  // Neural Graph Calculation for Stress Distribution Simulation
  function calculateStress(force) {
    return Math.pow(force, 2) * 0.05; // Simplified neural simulation for stress
  }

  function updateStressGraph(force) {
    const stressValue = calculateStress(force);
    $('#stress-info').text(`Calculated Stress: ${stressValue.toFixed(2)}`);

    // Animate laser line based on calculated stress
    laserLine.scale.x = 1 + stressValue / 10;
    laserLine.scale.y = 1 + stressValue / 10;
    laserLine.scale.z = 1 + stressValue / 10;
  }

  // Force slider affects both cube color and stress graph visualization
  $('#force-slider').on('input', function() {
    const forceValue = parseFloat(this.value);
    const colorIntensity = Math.min(255, Math.floor(forceValue * 2.55));
    cube.material.color.set(`rgb(${colorIntensity}, 100, 150)`);

    updateStressGraph(forceValue);
  });

  // Display Rotation and Scaling Info
  $('#rotate').click(function() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    $('#rotation-info').text(`Rotation: X(${cube.rotation.x.toFixed(1)}) Y(${cube.rotation.y.toFixed(1)})`);
  });
});
