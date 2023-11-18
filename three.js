import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

// Convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const toComeCanvas = document.querySelector("#to-come-canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#F4EAD7");

// FOV, aspect ratio
const camera = new THREE.PerspectiveCamera(
  75,
  toComeCanvas.clientWidth / toComeCanvas.clientHeight
);
camera.position.set(0, 0, 3.3);

// Lights
const directLight = new THREE.DirectionalLight(0xfdf5e8, 10);
directLight.position.set(-3, 2, 2);
scene.add(directLight);

const pointLight = new THREE.PointLight(0xfdf5e8, 20);
pointLight.position.set(3, -2, 2);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(toComeCanvas.clientWidth, toComeCanvas.clientHeight);
toComeCanvas.appendChild(renderer.domElement);

// Key chain
let keyChain;

const loader = new GLTFLoader();
loader.load("/Keychain.gltf", (gltf) => {
  keyChain = gltf.scene.children[0];
  keyChain.scale.set(0.7, 0.7, 0.7);

  keyChain.position.y = -1;
  scene.add(gltf.scene);

  animate();
});

let isMouseDown = false;
let prevDirectionY = 0;
let prevDirectionX = 0;
const damping = 0.03;
const speed = 0.5;

const onPointerDown = (ev) => {
  ev.preventDefault();
  isMouseDown = true;

  //  Client x & y for mouse and touch
  const { clientX, clientY } = ev.touches ? ev.touches[0] : ev;

  prevDirectionX = clientX;
  prevDirectionY = clientY;
};

const onPointerUp = (ev) => {
  ev.preventDefault();
  isMouseDown = false;
};

const onPointerMove = (ev) => {
  if (!isMouseDown) return;
  ev.preventDefault();

  //  Client x & y for mouse and touch
  const { clientX, clientY } = ev.touches ? ev.touches[0] : ev;

  if (prevDirectionX < clientY) {
    keyChain.rotation.x += speed * damping;
  } else {
    keyChain.rotation.x -= speed * damping;
  }

  if (prevDirectionY < clientX) {
    keyChain.rotation.y += speed * damping;
  } else {
    keyChain.rotation.y -= speed * damping;
  }

  prevDirectionY = clientX;
  prevDirectionX = clientY;
};

function animate() {
  requestAnimationFrame(animate);

  //   Reset key chain rotation x & y
  if (!isMouseDown) {
    if (Math.abs(keyChain.rotation.y) > toRadians(0.1)) {
      keyChain.rotation.y -= keyChain.rotation.y * damping;
    } else {
      keyChain.rotation.y = 0;
    }

    if (Math.abs(keyChain.rotation.x) > toRadians(0.1)) {
      keyChain.rotation.x -= keyChain.rotation.x * damping;
    } else {
      keyChain.rotation.x = 0;
    }
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = toComeCanvas.clientWidth / toComeCanvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(toComeCanvas.clientWidth, toComeCanvas.clientHeight);
});

toComeCanvas.addEventListener("mousedown", onPointerDown);
window.addEventListener("mouseup", onPointerUp);
window.addEventListener("mousemove", onPointerMove);

toComeCanvas.addEventListener("touchstart", onPointerDown), { passive: false };
toComeCanvas.addEventListener("touchend", onPointerUp, { passive: false });
window.addEventListener("touchmove", onPointerMove, { passive: false });
