'use client';

import { useEffect, useRef } from 'react';
import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function PCModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(
      75,
      canvasRef.current?.clientWidth / canvasRef.current?.clientHeight,
      0.1,
      1000,
    );
    const renderer = new three.WebGLRenderer({ alpha: true, canvas: canvasRef.current });
    const controls = new OrbitControls(camera, canvasRef.current);
    const loader = new GLTFLoader();

    loader.load(
      '/pc-model.glb',
      (gltf) => {
        scene.add(gltf.scene);

        const render = () => {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1;
          controls.update();
          renderer.render(scene, camera);
          requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
      },
      undefined,
      console.log,
    );
    camera.position.set(3, 1.5, 1);
    controls.target.set(0, 0.2, 0);
    controls.update();
    const color = 0xffffff;
    const intensity = 1;
    const light = new three.HemisphereLight(color, intensity);
    scene.add(light);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
