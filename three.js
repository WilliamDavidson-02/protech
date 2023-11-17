import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

const toComeCanvas = document.querySelector("#to-come-canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#F4EAD7");

const camera = new THREE.PerspectiveCamera(
  65,
  toComeCanvas.clientWidth / toComeCanvas.clientHeight,
  0.1,
  1000
);
camera.position.x = -3;
camera.rotation.y = 180;

const ambLight = new THREE.AmbientLight(0xfdf5e8, 1);
// scene.add(ambLight);

RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight(0xfdf5e8, 6, 5, 5);
rectLight1.position.set(-3, 2, -1);
rectLight1.lookAt(0, 0, 0);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0xfdf5e8, 5, 5, 5);
rectLight2.position.set(3, 2, 1);
rectLight2.lookAt(0, 0, 0);
scene.add(rectLight2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(toComeCanvas.clientWidth, toComeCanvas.clientHeight);
toComeCanvas.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load("/Keychain.gltf", (gltf) => {
  const keyChain = gltf.scene.children[0];
  keyChain.scale.set(0.7, 0.7, 0.7);

  keyChain.rotation.set(0, 0, 0);
  keyChain.rotation.z = THREE.MathUtils.degToRad(90);
  keyChain.rotation.y = THREE.MathUtils.degToRad(-90);
  keyChain.rotation.x = THREE.MathUtils.degToRad(90);

  keyChain.position.y = -1;
  scene.add(gltf.scene);

  animate();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.enablePan = false;
controls.enableZoom = false;
controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
controls.minPolarAngle = 0;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = toComeCanvas.clientWidth / toComeCanvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(toComeCanvas.clientWidth, toComeCanvas.clientHeight);
});
