const start = async () => {

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "targets.mind"
  });

  const {renderer, scene, camera} = mindarThree;

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  const anchor = mindarThree.addAnchor(0);

  const video = document.getElementById("video");
  const texture = new THREE.VideoTexture(video);

  const geometry = new THREE.PlaneGeometry(1, 0.6);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(geometry, material);

  anchor.group.add(plane);

  anchor.onTargetFound = () => video.play();
  anchor.onTargetLost = () => video.pause();

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

start();