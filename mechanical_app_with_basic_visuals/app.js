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

  // Basic Concept Visualization: Color-changing cube with rotation indicator
  function simpleConceptVisualization(force) {
    const colorIntensity = Math.min(255, Math.floor(force * 2.55));
    cube.material.color.set(`rgb(${colorIntensity}, 100, 150)`); // Changes color based on force
  }
  $('#force-slider').on('input', function() {
    simpleConceptVisualization(this.value);
  });

  $('#rotate').click(function() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    $('#rotation-info').text(`Rotation: X(${cube.rotation.x.toFixed(1)}) Y(${cube.rotation.y.toFixed(1)})`);
  });

  // Display rotation and color info
  $('#force-slider').on('input', function() {
    $('#color-info').text(`Cube Color Intensity: ${Math.min(100, Math.floor(this.value))}%`);
  });

  // Basic Interactive Animation Slider
  $('#force-slider').on('input', function() {
    const forceValue = this.value;
    const scaleValue = 1 + (forceValue / 100); // Scale cube size based on force
    cube.scale.set(scaleValue, scaleValue, scaleValue);
    $('#scale-info').text(`Cube Scale: ${scaleValue.toFixed(1)}`);
  });
});
