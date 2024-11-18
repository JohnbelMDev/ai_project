$(document).ready(function() {
  // Basic Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(600, 400);
  document.getElementById('viewer').appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Create a 3D mechanical part (simple cube)
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  camera.position.z = 5;

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Rotate Part on Button Click
  $('#rotate').click(function() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });

  // Calculation for Torque
  $('#calculate-torque').click(function() {
    const force = parseFloat($('#input-force').val());
    const distance = parseFloat($('#input-distance').val());
    
    if (isNaN(force) || isNaN(distance)) {
      $('#torque-result').text('Invalid input');
      return;
    }

    const torque = force * distance; // Torque = Force x Distance
    $('#torque-result').text(torque.toFixed(2) + ' Nm');
  });

  // Web Traffic Timing Feature
  $('#check-traffic-time').click(function() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'; // Sample API endpoint

    const startTime = performance.now(); // Start timing

    $.get(url, function() {
      const endTime = performance.now(); // End timing
      const timeTaken = endTime - startTime; // Calculate time taken
      $('#time-result').text(timeTaken.toFixed(2) + ' ms'); // Display result
    }).fail(function() {
      $('#time-result').text('Error in fetching data');
    });
  });
});