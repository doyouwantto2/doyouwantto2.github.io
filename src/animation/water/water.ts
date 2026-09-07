import * as THREE from "three";
import fragmentShader from "./water.glsl?raw";

export function createWater(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: {
        value: new THREE.Vector2(-10, -10),
      },
    },

    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,

    fragmentShader,
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

  scene.add(plane);

  const clock = new THREE.Clock();

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function pointermove(event: PointerEvent) {
    material.uniforms.uMouse.value.set(
      event.clientX / window.innerWidth,
      1 - event.clientY / window.innerHeight,
    );
  }

  function animate() {
    material.uniforms.uTime.value = clock.getElapsedTime();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  resize();
  animate();

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", pointermove);

  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", pointermove);

    material.dispose();
    plane.geometry.dispose();
    renderer.dispose();
  };
}
