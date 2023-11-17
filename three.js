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

const camera = new THREE.PerspectiveCamera(
  65,
  toComeCanvas.clientWidth / toComeCanvas.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3.3);

RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight(0xfdf5e8, 6, 5, 5);
rectLight1.position.set(-3, 2, 2);
rectLight1.lookAt(0, 0, 0);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0xfdf5e8, 5, 5, 5);
rectLight2.position.set(3, 2, 1);
rectLight2.lookAt(0, 0, 0);
scene.add(rectLight2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(toComeCanvas.clientWidth, toComeCanvas.clientHeight);
toComeCanvas.appendChild(renderer.domElement);

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

const onPointerDown = (ev) => {
  ev.preventDefault();
  isMouseDown = true;

  // Use either mouse or touch event to get coordinates
  const { clientX, clientY } = ev.touches ? ev.touches[0] : ev;

  prevDirectionX = clientX;
  prevDirectionY = clientY;
};

const onPointerUp = (ev) => {
  ev.preventDefault();
  isMouseDown = false;
  prevDirectionX = 0;
  prevDirectionY = 0;
};

const onPointerMove = (ev) => {
  ev.preventDefault();
  if (!isMouseDown) return;

  const damping = 0.03;
  const speed = 0.5;

  // Use either mouse or touch event to get coordinates
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

  if (!isMouseDown) {
    if (Math.abs(keyChain.rotation.y) > toRadians(0.1)) {
      keyChain.rotation.y -= keyChain.rotation.y * 0.03;
    } else {
      keyChain.rotation.y = 0;
    }

    if (Math.abs(keyChain.rotation.x) > toRadians(0.1)) {
      keyChain.rotation.x -= keyChain.rotation.x * 0.03;
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

toComeCanvas.addEventListener("pointerdown", onPointerDown, { passive: false });
window.addEventListener("pointerup", onPointerUp, { passive: false });
window.addEventListener("pointermove", onPointerMove, { passive: false });
