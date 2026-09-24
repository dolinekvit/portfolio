'use client';

import { useEffect, useRef, useState } from 'react';
import * as three from 'three';
import { Box, Spinner } from '@chakra-ui/react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const MODEL_URL = '/pc-model.glb';
const FLOOR_Y = -0.781;

const TARGET = new three.Vector3(0.35, -0.18, 0);
const ORBIT_R = 6;
const ORBIT_H = 2.2;
const AZ_END = Math.PI;
const INTRO_FRAMES = 110;

const HALF_W = 0.98;
const HALF_H = 0.92;

const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 4));

export function PCModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new three.Scene();
    const camera = new three.OrthographicCamera(-1, 1, 1, -1, 0.01, 100);

    const renderer = new three.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three.PCFShadowMap;
    renderer.toneMapping = three.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const placeCamera = (az: number) => {
      camera.position.set(
        TARGET.x + ORBIT_R * Math.cos(az),
        TARGET.y + ORBIT_H,
        TARGET.z + ORBIT_R * Math.sin(az),
      );
      camera.lookAt(TARGET);
    };
    placeCamera(AZ_END);

    const controls = new OrbitControls(camera, canvas);
    controls.target.copy(TARGET);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.9;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;

    scene.add(new three.HemisphereLight(0xcfe0ff, 0x2a1d12, 1.4));

    const key = new three.DirectionalLight(0xfff2e0, 2.6);
    key.position.set(2.0, 5.6, 2.2);
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
    let frame = 0;
    let cancelled = false;
    const timer = new three.Timer();

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const aspect = w / h;
      const s = Math.max(HALF_H, HALF_W / aspect);
      camera.left = -s * aspect;
      camera.right = s * aspect;
      camera.top = s;
      camera.bottom = -s;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      timer.update();
      mixer?.update(timer.getDelta());

      if (frame <= INTRO_FRAMES) {
        const t = frame / INTRO_FRAMES;
        placeCamera(AZ_END + 4 * Math.PI * (1 - easeOutCirc(t)));
        frame += 1;
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };

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

        const clip = gltf.animations[0];
        if (clip) {
          mixer = new three.AnimationMixer(gltf.scene);
          mixer.clipAction(clip).play();
        }

        setLoading(false);
        tick();
      },
      undefined,
      (err) => console.error(`Failed to load ${MODEL_URL}`, err),
    );

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
    <Box
      position="relative"
      width="min(92vw, 300px)"
      aspectRatio="1"
      flexShrink={0}
      mt="-40px"
      mb="-40px"
    >
      {loading && (
        <Spinner position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" size="lg" />
      )}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </Box>
  );
}
