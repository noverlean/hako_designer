// Сцена
const scene = new THREE.Scene();
scene.background = null;

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// Рендерер
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Установка прозрачного фона
document.getElementById('container').appendChild(renderer.domElement);

// Свет
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Направленный свет
directionalLight.position.set(-5, -2, 1).normalize();
scene.add(directionalLight);

document.addEventListener('mousemove', (e) => {
    let xPos = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2;
    let yPos = (e.clientY - window.innerHeight / 2) / window.innerWidth / 2;

    directionalLight.position.set(5 * xPos, -5 * yPos, 0.4);
});

const loader = new THREE.GLTFLoader();
loader.load(`../reference/3D_Models/${weaponConfig.list[weaponConfig.currentId].path}`, function (gltf) {
    const model = gltf.scene;       

    scene.add(model);

    model.rotation.order = 'YXZ';
    model.rotation.set(THREE.Math.degToRad(43), THREE.Math.degToRad(-90), THREE.Math.degToRad(-10));

    let weaponSetup = weaponConfig.list[weaponConfig.currentId];
    console.log(weaponSetup);
    
    model.position.set(weaponSetup.positions[0].x, weaponSetup.positions[0].y, weaponSetup.positions[0].z);
    model.scale.set(weaponSetup.scale, weaponSetup.scale, weaponSetup.scale);

    // window.addEventListener('scroll', () => {
    //     const scrollY = window.scrollY;
    //     gsap.to(model.position, { duration: 0, y: scrollY * -0.001 });
    // });

    // animate();
}, undefined, function (error) {
    console.error('An error occurred:', error);
});

// Обновление размера рендера при изменении размера окна
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();