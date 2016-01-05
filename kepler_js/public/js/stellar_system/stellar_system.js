$(function() {
  var control, camera, scene, renderer, container, intersects;

  // Set up canvas dimensions
  var width = window.innerWidth;
  var height = window.innerHeight - 45;

  // Set up planets/sun textures
  var texloader = new THREE.TextureLoader();
  var explocolor = texloader.load('../images/star.png');
  var texture = texloader.load('../images/plutomap2k.jpg');
  var bump = texloader.load('../images/plutobump2k.jpg');

  // Set up tools for hover and click events
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(), INTERSECTED;

  start();

  function start(){
    //Scene creation
    scene = new THREE.Scene();
    container = document.getElementById( 'space_container' );

    // PerspectiveCamera creation and Set up. Parameters
    // 1. FOV – We’re using 45 degrees for our field of view.
    // 2. Aspect – We’re simply dividing the browser width and height to get an aspect ratio.
    // 3. Near – This is the distance at which the camera will start rendering scene objects.
    // 4. Far – Anything beyond this distance will not be rendered. Perhaps more commonly known as the draw distance.
    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 3000);
    camera.position.set(0, - 50, 75);
    scene.add(camera);

    // Create the WebGL renderer and append it to the DOM bia the body element
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Create and add lights to the scene
    var amlight = new THREE.AmbientLight( 0x888888 )
    scene.add( amlight );
    var dirlight = new THREE.DirectionalLight( 0xcccccc, 1 )
    dirlight.position.set(10,3,5)
    scene.add( dirlight );

    // Create and add the star to the stellar system
    var geometry = new THREE.IcosahedronGeometry( 14, 5 );
    starmaterial = new THREE.ShaderMaterial({
      uniforms: {
        tExplosion: {
          type: "t",
          value: explocolor
        },
        time: { // float initialized to 0
          type: "f",
          value: 0.0
        }
      },

      vertexShader: document.getElementById( 'star-vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'star-fragmentShader' ).textContent
    });
    var star = new THREE.Mesh(geometry, starmaterial);
    scene.add(star);

    // create and add three planets to the stellar system
    geometry = new THREE.SphereGeometry(3.08, 15, 15);
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 1  });
    var planet1 = new THREE.Mesh(geometry, material);
    scene.add(planet1);
    planet1.position.set(0, 18, 0);

    geometry = new THREE.SphereGeometry(3.06, 15, 15);
    material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 1  });
    var planet2 = new THREE.Mesh(geometry, material);
    scene.add(planet2);
    planet2.position.set(0, 30, 0);

    geometry = new THREE.SphereGeometry(3.41, 15, 15);
    material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 1  });
    var planet3 = new THREE.Mesh(geometry, material);
    scene.add(planet3);
    planet3.position.set(0, 50, 0);

    var t = 0;
    var y1 = planet1.position.y;
    var y2 = planet2.position.y;
    var y3 = planet3.position.y;
    var x = planet1.position.x;

    function render() {
      var launch = Date.now();
      requestAnimationFrame(render);
      starmaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - launch );
      t += 0.01;
      star.rotation.y += 0.005;
      planet1.rotation.y += 0.03;
      planet2.rotation.y += 0.04;
      planet3.rotation.y += 0.05;

      planet1.position.y = y1 * Math.cos(t) + x * Math.sin(t);
      planet1.position.x = x * Math.cos(t) - y1 * Math.sin(t);

      planet2.position.y = y2 * Math.cos(t * 2) + x * Math.sin(t * 2);
      planet2.position.x = x * Math.cos(t * 2) - y2 * Math.sin(t * 2);

      planet3.position.y = y3 * Math.cos(t * 1.5) + x * Math.sin(t * 1.5);
      planet3.position.x = x * Math.cos(t * 1.5) - y3 * Math.sin(t * 1.5);

      var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true
      });

      var segments = 64;
      material = new THREE.LineBasicMaterial( { color: 0xF0C400 } ),

      geometry = new THREE.CircleGeometry( 18, segments );
      geometry.vertices.shift();
      var circle = new THREE.Line(geometry, material);
      scene.add(circle);

      geometry = new THREE.CircleGeometry( 30, segments );
      geometry.vertices.shift();
      var circle = new THREE.Line(geometry, material);
      scene.add(circle);

      geometry = new THREE.CircleGeometry( 50, segments );
      geometry.vertices.shift();
      var circle = new THREE.Line(geometry, material);
      scene.add(circle);

      controls = new THREE.OrbitControls( camera );

      renderer.render(scene, camera);
    }

    render();
  }

  // Make the planets clickable (for now, it alerts the coordinates)
  document.addEventListener('click', onDocumentMouseClick, false);
  function onDocumentMouseClick() {
    event.preventDefault();
    grabPlanets();

    if (intersects.length > 0) {
      alert(intersects[0].object);
    }
  }

  // Register the targeted planet with click events
  function grabPlanets() {
    var offset = {
      x: document.getElementsByTagName("canvas")[0].offsetLeft,
      y: document.getElementsByTagName("canvas")[0].offsetTop,
    }
    mouse.x = ((event.clientX - offset.x) / renderer.domElement.width) * 2 - 1;
    mouse.y = 1 - ((event.clientY - offset.y) / renderer.domElement.height) * 2;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children, true);
  };
});