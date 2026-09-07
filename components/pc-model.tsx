'use client';

import { useEffect, useRef } from 'react';
import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const MODEL_URL = '/pc-model.glb';
const FLOOR_Y = -0.781;

export function PCModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new three.Scene();

    const camera = new three.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(-2.6, 1.2, 2.15);

    const renderer = new three.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three.PCFShadowMap; 
    renderer.toneMapping = three.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0.1, -0.1, 0);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; 
    controls.update();

    scene.add(new three.HemisphereLight(0xcfe0ff, 0x2a1d12, 1.4));

    const key = new three.DirectionalLight(0xfff2e0, 2.6);
    key.position.set(2.5, 4.0, 2.0);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0015;
    key.shadow.normalBias = 0.02;
    Object.assign(key.shadow.camera, {
      near: 0.5,
      far: 16,
      left: -3.4,
      right: 3.4,
      top: 3.4,
      bottom: -3.4,
    });
    key.shadow.camera.updateProjectionMatrix();
    scene.add(key);

    const ground = new three.Mesh(
      new three.PlaneGeometry(24, 24),
      new three.ShadowMaterial({ opacity: 0.3 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = FLOOR_Y;
    ground.receiveShadow = true;
    scene.add(ground);

    let mixer: three.AnimationMixer | null = null;
    let frameId = 0;
    let cancelled = false;
    const timer = new three.Timer();

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (cancelled) return;

        const lampPos = new three.Vector3();
        const lamp = gltf.scene.getObjectByName('Prop_Lamp_Light');
        lamp?.getWorldPosition(lampPos);

        const strip: three.Object3D[] = [];
        gltf.scene.traverse((o) => {
          const mesh = o as three.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if ((mesh as three.SkinnedMesh).isSkinnedMesh) mesh.frustumCulled = false;
          }
          if ((o as three.Light).isLight || (o as three.Camera).isCamera) strip.push(o);
        });
        strip.forEach((o) => o.removeFromParent());

        scene.add(gltf.scene);


        if (lamp) {
          const warm = new three.PointLight(0xffd7a3, 1.4, 3.5, 2);
          warm.position.copy(lampPos);
          scene.add(warm);
        }

        const clip = gltf.animations[0]; // Tail animation 
        if (clip) {
          mixer = new three.AnimationMixer(gltf.scene);
          mixer.clipAction(clip).play();
        }
      },
      undefined,
      (err) => console.error(`Failed to load ${MODEL_URL}`, err),
    );

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      timer.update();
      mixer?.update(timer.getDelta());
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        const mesh = o as three.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const material = mesh.material;
        (Array.isArray(material) ? material : [material]).forEach((m) => m.dispose());
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', maxWidth: 640, aspectRatio: '4 / 3', display: 'block' }}
    />
  );
}
