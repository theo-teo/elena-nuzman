"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Piano3DStage({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.5, 12);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Stage Lighting (Concert Hall Spotlight)
    const ambientLight = new THREE.AmbientLight(0x151416, 0.6);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xc9b89a, 6.0);
    spotlight.position.set(0, 14, 2);
    spotlight.angle = Math.PI / 7;
    spotlight.penumbra = 0.8;
    spotlight.decay = 1.8;
    spotlight.distance = 25;
    scene.add(spotlight);

    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0, 0, 0);
    scene.add(spotTarget);
    spotlight.target = spotTarget;

    // Arena Accent Light (Crossover register)
    const arenaLight = new THREE.PointLight(0x431e2c, 0, 15);
    arenaLight.position.set(4, 2, -2);
    scene.add(arenaLight);

    // Group for the 3D Piano Stage
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Stage Ground (Dark Polished Wood)
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c0b0d,
      roughness: 0.35,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    stageGroup.add(ground);

    // Procedural Piano Keyboard (88 keys stylized in perspective)
    const keyGroup = new THREE.Group();
    const whiteKeyGeo = new THREE.BoxGeometry(0.18, 0.12, 1.2);
    const blackKeyGeo = new THREE.BoxGeometry(0.12, 0.18, 0.75);

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf3efe6,
      roughness: 0.2,
      metalness: 0.1,
    });
    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      roughness: 0.15,
      metalness: 0.4,
    });

    const keyCount = 44; // Stylized elegant span
    for (let i = 0; i < keyCount; i++) {
      const x = (i - keyCount / 2) * 0.21;
      const whiteKey = new THREE.Mesh(whiteKeyGeo, whiteMat);
      whiteKey.position.set(x, 0.06, 0);
      keyGroup.add(whiteKey);

      // Add black keys pattern (skipping B-C and E-F)
      const noteInOctave = i % 7;
      if (noteInOctave !== 2 && noteInOctave !== 6) {
        const blackKey = new THREE.Mesh(blackKeyGeo, blackMat);
        blackKey.position.set(x + 0.105, 0.15, -0.2);
        keyGroup.add(blackKey);
      }
    }
    stageGroup.add(keyGroup);

    // Steinway Lacquer Body Silhouette Curve
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-5, -0.6);
    bodyShape.lineTo(5, -0.6);
    bodyShape.quadraticCurveTo(5.2, -3, 3, -4.5);
    bodyShape.quadraticCurveTo(0, -5, -4.5, -3.5);
    bodyShape.lineTo(-5, -0.6);

    const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      roughness: 0.1,
      metalness: 0.8,
    });
    const pianoBody = new THREE.Mesh(bodyGeo, bodyMat);
    pianoBody.rotation.x = Math.PI / 2;
    pianoBody.position.set(0, 0, -0.8);
    stageGroup.add(pianoBody);

    // Floating Dust Motes (Acoustic Particle Field in the Spotlight)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 8;
      particlePositions[p + 1] = Math.random() * 8;
      particlePositions[p + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc9b89a,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Handle Scroll Choreography (Camera scrubbing like Noomo)
    let targetCameraY = 4.5;
    let targetCameraZ = 12;
    let targetCameraX = 0;
    let targetLightColor = new THREE.Color(0xc9b89a);

    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;

      // Stage I (Overture): Low distant view
      // Stage II (Art of Piano): Sweeping sideways close up along keys
      // Stage III (Crossover): Dynamic angle and arena light transformation
      // Stage IV (Finale): Elevation view of stage
      if (progress < 0.25) {
        targetCameraX = Math.sin(progress * Math.PI) * 1.5;
        targetCameraY = 4.5 - progress * 4;
        targetCameraZ = 12 - progress * 10;
        targetLightColor.set(0xc9b89a);
        arenaLight.intensity = 0;
      } else if (progress < 0.6) {
        const midP = (progress - 0.25) / 0.35;
        targetCameraX = -2.5 + midP * 5.0;
        targetCameraY = 2.2 + Math.sin(midP * Math.PI) * 0.8;
        targetCameraZ = 7.5 - midP * 2.0;
        targetLightColor.lerp(new THREE.Color(0xf3efe6), 0.1);
        arenaLight.intensity = midP * 2.5;
      } else {
        const endP = (progress - 0.6) / 0.4;
        targetCameraX = 2.5 - endP * 2.5;
        targetCameraY = 3.0 + endP * 3.5;
        targetCameraZ = 6.0 + endP * 5.0;
        targetLightColor.set(0xc9b89a);
        arenaLight.intensity = 1.0 - endP * 0.8;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.x += (targetCameraX + mouseX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - mouseY - camera.position.y) * 0.05;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;
      camera.lookAt(0, 0.8, 0);

      // Light color transition
      spotlight.color.lerp(targetLightColor, 0.05);

      // Particles gentle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.12;
        if (positions[i] < 0) positions[i] = 7;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Subtle breath on stage
      stageGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      groundGeo.dispose();
      whiteKeyGeo.dispose();
      blackKeyGeo.dispose();
      bodyGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-60 ${className}`}
      aria-hidden="true"
    />
  );
}
