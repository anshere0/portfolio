"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

type TopologyMode = "manifold" | "monogram" | "torus";

export default function SystemsParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topology, setTopology] = useState<TopologyMode>("manifold");
  const [fps, setFps] = useState<number>(60);
  const [particleCount] = useState<number>(18000);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    geometry: THREE.BufferGeometry;
    points: THREE.Points;
    targetPositions: Float32Array;
    currentPositions: Float32Array;
    baseColors: Float32Array;
    velocities: Float32Array;
    clock: THREE.Clock;
    frameId: number;
    mouse: { x: number; y: number; targetX: number; targetY: number };
    scrollProgress: number;
  } | null>(null);

  // Generate target point configurations
  const generateTopologyPositions = useCallback(
    (mode: TopologyMode, count: number): Float32Array => {
      const positions = new Float32Array(count * 3);

      if (mode === "manifold") {
        // High-dimensional vector embedding manifold (rippling landscape)
        const gridSize = Math.floor(Math.sqrt(count));
        const spacing = 140 / gridSize;
        let idx = 0;
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            if (idx >= count) break;
            const x = (i - gridSize / 2) * spacing;
            const z = (j - gridSize / 2) * spacing;
            // 3D topological sine-cosine ripples
            const dist = Math.sqrt(x * x + z * z);
            const y = Math.sin(dist * 0.12) * 12 + Math.cos(x * 0.1) * Math.sin(z * 0.1) * 8;
            positions[idx * 3] = x;
            positions[idx * 3 + 1] = y;
            positions[idx * 3 + 2] = z;
            idx++;
          }
        }
      } else if (mode === "monogram") {
        // 3D Architectural Double-A "AA" Monogram
        let idx = 0;
        const ptsPerLetter = Math.floor(count / 2);

        // Function to sample points along letter A
        const sampleLetterA = (offsetX: number) => {
          for (let i = 0; i < ptsPerLetter; i++) {
            if (idx >= count) break;
            const t = Math.random();
            let x = 0, y = 0, z = (Math.random() - 0.5) * 12;
            const leg = Math.random();

            if (leg < 0.42) {
              // Left diagonal leg
              x = offsetX - 28 + t * 28;
              y = -35 + t * 70;
            } else if (leg < 0.84) {
              // Right diagonal leg
              x = offsetX + t * 28;
              y = 35 - t * 70;
            } else {
              // Crossbar
              x = offsetX - 14 + t * 28;
              y = -5 + (Math.random() - 0.5) * 4;
            }

            // Add subtle volumetric jitter
            positions[idx * 3] = x + (Math.random() - 0.5) * 3;
            positions[idx * 3 + 1] = y + (Math.random() - 0.5) * 3;
            positions[idx * 3 + 2] = z;
            idx++;
          }
        };

        sampleLetterA(-36); // First 'A'
        sampleLetterA(36);  // Second 'A'

        // Fill remaining particles in ambient halo
        while (idx < count) {
          const theta = Math.random() * Math.PI * 2;
          const radius = 55 + Math.random() * 25;
          positions[idx * 3] = Math.cos(theta) * radius;
          positions[idx * 3 + 1] = (Math.random() - 0.5) * 60;
          positions[idx * 3 + 2] = Math.sin(theta) * radius;
          idx++;
        }
      } else if (mode === "torus") {
        // Parametric Quantum Torus Knot (p=3, q=5)
        const p = 3;
        const q = 5;
        const R = 38;
        const r = 16;

        for (let i = 0; i < count; i++) {
          const u = (i / count) * Math.PI * 2 * p + (Math.random() * 0.05);
          const rCur = r + (Math.random() - 0.5) * 8;
          const x = (R + rCur * Math.cos(q * u / p)) * Math.cos(u);
          const y = (R + rCur * Math.cos(q * u / p)) * Math.sin(u);
          const z = rCur * Math.sin(q * u / p) * 1.6;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
      }

      return positions;
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL Renderer with High-DPI support
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 45, 115);
    camera.lookAt(0, 0, 0);

    // Initial Positions and Colors
    const initialPositions = generateTopologyPositions("manifold", particleCount);
    const currentPositions = new Float32Array(initialPositions);
    const targetPositions = new Float32Array(initialPositions);
    const velocities = new Float32Array(particleCount * 3);
    const baseColors = new Float32Array(particleCount * 3);

    // Warm Systems Notebook Palette:
    // Core Deep Carbon #18181B, Signal Vermilion #C8260E, and Golden Amber #D97706
    const colorInk = new THREE.Color("#201e1b");
    const colorVermilion = new THREE.Color("#C8260E");
    const colorAmber = new THREE.Color("#D97706");
    const colorSilver = new THREE.Color("#8E877A");

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let chosenColor: THREE.Color;

      if (rand < 0.16) {
        chosenColor = colorVermilion; // 16% Vermilion highlights
      } else if (rand < 0.32) {
        chosenColor = colorAmber; // 16% Amber accents
      } else if (rand < 0.65) {
        chosenColor = colorInk; // Carbon ink structure
      } else {
        chosenColor = colorSilver; // Hairline structural dust
      }

      baseColors[i * 3] = chosenColor.r;
      baseColors[i * 3 + 1] = chosenColor.g;
      baseColors[i * 3 + 2] = chosenColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(currentPositions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(baseColors, 3));

    // Custom circular sprite texture for sharp, crisp points
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;

    sceneRef.current = {
      renderer,
      scene,
      camera,
      geometry,
      points,
      targetPositions,
      currentPositions,
      baseColors,
      velocities,
      clock,
      frameId: 0,
      mouse,
      scrollProgress,
    };

    // Mouse Tracking for Raycasting/Deflection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = normX * 45;
      mouse.targetY = normY * 30;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      scrollProgress = Math.min(scrollY / height, 2.5);
      if (sceneRef.current) {
        sceneRef.current.scrollProgress = scrollProgress;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("mousemove", handleMouseMove);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // FPS Counter variables
    let frameCount = 0;
    let lastTime = performance.now();

    // Main 60FPS Render & Physics Loop
    const animate = () => {
      const id = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.frameId = id;

      const elapsed = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Scroll-driven camera fly-through
      // Camera zooms in along Z and tilts down through particle manifold
      const targetCamZ = 115 - scrollProgress * 48;
      const targetCamY = 45 - scrollProgress * 25;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.x = mouse.x * 0.35;
      camera.lookAt(0, 0, 0);

      // Rotate points cluster subtly
      points.rotation.y = elapsed * 0.06;
      points.rotation.x = Math.sin(elapsed * 0.04) * 0.08;

      // Physics update: spring interpolation to target configuration
      const posAttr = geometry.attributes.position;
      const pArray = posAttr.array as Float32Array;

      // Harmonic oscillation parameter for dynamic breathing
      const breath = Math.sin(elapsed * 1.5) * 1.8;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const tx = targetPositions[i3];
        let ty = targetPositions[i3 + 1];
        const tz = targetPositions[i3 + 2];

        // Apply topological wave modulation for manifold
        if (topology === "manifold") {
          ty += Math.sin(tx * 0.1 + elapsed * 1.8) * 3 + Math.cos(tz * 0.1 + elapsed * 1.2) * 2;
        } else if (topology === "monogram") {
          ty += breath * 0.2;
        }

        // Distance from cursor in 3D projection
        const dx = pArray[i3] - mouse.x;
        const dy = pArray[i3 + 1] - mouse.y;
        const dz = pArray[i3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        // Mouse repulsion force
        if (distSq < 900) {
          const force = (1 - Math.sqrt(distSq) / 30) * 14;
          velocities[i3] += (dx / Math.sqrt(distSq)) * force * 0.15;
          velocities[i3 + 1] += (dy / Math.sqrt(distSq)) * force * 0.15;
        }

        // Spring restoration force
        velocities[i3] += (tx - pArray[i3]) * 0.035;
        velocities[i3 + 1] += (ty - pArray[i3 + 1]) * 0.035;
        velocities[i3 + 2] += (tz - pArray[i3 + 2]) * 0.035;

        // Velocity damping
        velocities[i3] *= 0.88;
        velocities[i3 + 1] *= 0.88;
        velocities[i3 + 2] *= 0.88;

        // Integrate positions
        pArray[i3] += velocities[i3];
        pArray[i3 + 1] += velocities[i3 + 1];
        pArray[i3 + 2] += velocities[i3 + 2];
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(sceneRef.current?.frameId || 0);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [generateTopologyPositions, particleCount, topology]);

  // Handle topology toggle
  const switchTopology = (mode: TopologyMode) => {
    setTopology(mode);
    if (!sceneRef.current) return;
    const newPositions = generateTopologyPositions(mode, particleCount);
    sceneRef.current.targetPositions.set(newPositions);
  };

  return (
    <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] bg-[var(--bg-paper-subtle)] hairline-border overflow-hidden select-none">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={containerRef} className="w-full h-full cursor-crosshair" />

      {/* Interactive HUD Header Overlay */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-paper)]/90 backdrop-blur-xs hairline-border pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[var(--signal-emerald)] animate-pulse" />
          <span className="font-mono text-[11px] font-bold text-[var(--ink-primary)] uppercase tracking-wider">
            3D VECTOR FIELD // {particleCount.toLocaleString()} PARTICLES
          </span>
        </div>

        {/* Real-time Telemetry Readout */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--ink-secondary)] bg-[var(--bg-paper)]/90 backdrop-blur-xs px-2.5 py-1 hairline-border pointer-events-auto">
          <span>FPS: <strong className="text-[var(--ink-primary)]">{fps}</strong></span>
          <span className="text-[var(--hairline-strong)]">|</span>
          <span>DAMPING: <strong className="text-[var(--ink-primary)]">0.88</strong></span>
          <span className="text-[var(--hairline-strong)]">|</span>
          <span className="hidden sm:inline">WARP ON SCROLL: <strong className="text-[var(--signal-vermilion)]">ACTIVE</strong></span>
        </div>
      </div>

      {/* Interactive Topology Shape Switcher Buttons */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-paper)]/95 backdrop-blur-xs hairline-border">
          <span className="font-mono text-[10px] uppercase text-[var(--ink-tertiary)] px-2 font-semibold">
            TOPOLOGY:
          </span>
          {(
            [
              { id: "manifold", label: "NEURAL MANIFOLD" },
              { id: "monogram", label: "MONOGRAM AA" },
              { id: "torus", label: "VECTOR TORUS" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => switchTopology(item.id)}
              className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-all duration-150 ${
                topology === item.id
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)] shadow-xs"
                  : "bg-transparent text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-paper-darker)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Interactive Interaction Hint */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-[var(--ink-tertiary)] bg-[var(--bg-paper)]/90 px-2.5 py-1 hairline-border">
          <span className="text-[var(--signal-vermilion)] font-bold">✦</span>
          <span>MOVE CURSOR TO DISPERSE · SCROLL TO FLY-THROUGH</span>
        </div>
      </div>
    </div>
  );
}
