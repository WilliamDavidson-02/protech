import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const toComeCanvas = document.querySelector("#to-come-canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#F4EAD7");

const camera = new THREE.PerspectiveCamera(
  75,
  toComeCanvas.clientWidth / toComeCanvas.clientHeight,
  0.1,
  1000
);
camera.position.x = 5;

const directionalLight = new THREE.DirectionalLight(0xffffff, 15);
directionalLight.position.set(0, 2, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLightBack = new THREE.DirectionalLight(0xffffff, 3);
directionalLightBack.position.set(-2, 2, 0);
directionalLightBack.castShadow = true;
scene.add(directionalLightBack);

const pointLight1 = new THREE.PointLight(0xc4c4c4, 20);
pointLight1.position.set(2, 0, -5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xc4c4c4, 20);
pointLight2.position.set(3, -2, 3);
scene.add(pointLight2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(toComeCanvas.clientWidth, toComeCanvas.clientHeight);
toComeCanvas.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load("/Keychain.gltf", (gltf) => {
  const keyChain = gltf.scene.children[0];
  keyChain.scale.set(0.8, 0.8, 0.8);
  keyChain.position.x = 1.5;
  keyChain.position.y = -1.8;

  keyChain.rotation.x = 90;

  scene.add(gltf.scene);
  animate();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 7;
controls.enablePan = false;
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2;
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
