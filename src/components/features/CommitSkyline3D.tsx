"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import githubData from "@/content/github.json";

interface DayItem {
  week: number;
  day: number;
  date: string;
  count: number;
}

export default function CommitSkyline3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    screenX: number;
    screenY: number;
  } | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Group days into week & day index
  const daysList: DayItem[] = useMemo(() => {
    return githubData.days.map((d, i) => ({
      week: Math.floor(i / 7),
      day: i % 7,
      date: d.date,
      count: d.count,
    }));
  }, []);

  const weeksCount = useMemo(() => Math.ceil(daysList.length / 7), [daysList]);
  const maxCommitCount = useMemo(
    () => Math.max(...daysList.map((d) => d.count), 1),
    [daysList]
  );

  // Stats from real GitHub data
  const stats = githubData.stats;

  // Track scroll progress within the sticky section
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Three.js Scene Setup & Animation
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0b10, 16, 52);

    const isMobile = width / height < 1;
    const camera = new THREE.PerspectiveCamera(isMobile ? 60 : 40, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    // 2. Lights (matching Pranav's exact setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.1);
    dirLight1.position.set(6, 12, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 0.7);
    dirLight2.position.set(-8, 4, -6);
    scene.add(dirLight2);

    // 3. Ground Base Platform
    const u = ((weeksCount - 1) * 0.34) / 2;
    const groundGeo = new THREE.BoxGeometry(0.34 * weeksCount + 0.6, 0.06, 2.38 + 0.6);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x121420,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, -0.03, 0);
    scene.add(ground);

    // Subtle grid wireframe along runway
    const gridHelper = new THREE.GridHelper(0.34 * weeksCount + 0.6, weeksCount, 0x1f2438, 0x131724);
    gridHelper.position.set(0, 0.005, 0);
    scene.add(gridHelper);

    // 4. CatmullRom Curve Splines for Camera & LookAt
    // Desktop camera path
    const curveCamDesktop = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-11, 1.3, 5.5),
      new THREE.Vector3(-5, 2.2, 6.5),
      new THREE.Vector3(2, 3.4, 7.5),
      new THREE.Vector3(5, 6.5, 11),
      new THREE.Vector3(0, 10.5, 16),
    ]);

    // Mobile camera path
    const curveCamMobile = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, 1.6, 4),
      new THREE.Vector3(-11, 3.5, 7),
      new THREE.Vector3(-11, 6.5, 9.5),
      new THREE.Vector3(-12, 9.5, 11),
    ]);

    // Desktop lookAt path
    const curveLookDesktop = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 0.5, 0),
      new THREE.Vector3(-1, 0.8, 0),
      new THREE.Vector3(3, 0.8, 0),
      new THREE.Vector3(1.5, 0.3, 0),
      new THREE.Vector3(0, -0.6, 0),
    ]);

    // Mobile lookAt path
    const curveLookMobile = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 0.4, 0),
      new THREE.Vector3(-2, 0.4, 0),
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(1, -0.4, 0),
    ]);

    const lookTarget = new THREE.Vector3();

    // 5. InstancedMesh for 365 Commit Towers
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxMat = new THREE.MeshStandardMaterial({
      roughness: 0.35,
      metalness: 0.25,
    });
    const instancedMesh = new THREE.InstancedMesh(boxGeo, boxMat, daysList.length);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // Color gradient palette: [coral, rose, violet, cyan]
    const colEmpty = new THREE.Color(0x181a26);
    const colHot = new THREE.Color(0xffffff);
    const colorStops = [
      new THREE.Color(0xff5c4d), // Coral
      new THREE.Color(0xff3366), // Rose/Pink
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x00f0ff), // Cyan
    ];

    const getTowerColor = (count: number, outColor: THREE.Color) => {
      if (count === 0) return outColor.copy(colEmpty);
      const ratio = Math.sqrt(count / maxCommitCount);
      const n = ratio * (colorStops.length - 1);
      const idx = Math.min(colorStops.length - 2, Math.floor(n));
      return outColor.copy(colorStops[idx]).lerp(colorStops[idx + 1], n - idx);
    };

    // Initialize base colors
    const tempCol = new THREE.Color();
    daysList.forEach((d, i) => {
      getTowerColor(d.count, tempCol);
      instancedMesh.setColorAt(i, tempCol);
    });
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }

    // 6. Interactive Raycasting & Hover State
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredInstanceId = -1;

    // Mouse orbit drag offset
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        dragOffsetX += dx * 0.005;
        dragOffsetY = Math.max(-0.4, Math.min(0.4, dragOffsetY + dy * 0.005));
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerLeave = () => {
      isDragging = false;
      mouse.x = -999;
      mouse.y = -999;
      if (hoveredInstanceId >= 0) {
        getTowerColor(daysList[hoveredInstanceId].count, tempCol);
        instancedMesh.setColorAt(hoveredInstanceId, tempCol);
        if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
        hoveredInstanceId = -1;
      }
      setHoveredDay(null);
    };

    mount.addEventListener("mousemove", onPointerMove);
    mount.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    mount.addEventListener("mouseleave", onPointerLeave);

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevX;
        const dy = e.touches[0].clientY - prevY;
        dragOffsetX += dx * 0.006;
        dragOffsetY = Math.max(-0.4, Math.min(0.4, dragOffsetY + dy * 0.006));
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    mount.addEventListener("touchmove", onTouchMove, { passive: true });
    mount.addEventListener("touchend", onTouchEnd, { passive: true });

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.fov = w / h < 1 ? 60 : 40;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop with Scroll Progress Spline
    const dummy = new THREE.Object3D();
    let currentT = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth lerp towards scroll progress
      const targetT = containerRef.current
        ? Math.max(0, Math.min(1, (-containerRef.current.getBoundingClientRect().top) / (containerRef.current.offsetHeight - window.innerHeight)))
        : 0;

      currentT += (targetT - currentT) * 0.08;

      // Animate tower growth wave
      daysList.forEach((d, i) => {
        // Wave progress across weeks
        const wave = 1 - Math.pow(1 - Math.min(1, Math.max(0, 2.2 * currentT - (d.week / weeksCount) * 1.1)), 3);
        const height = Math.max(0.001, (d.count === 0 ? 0.03 : 0.14 + 0.32 * Math.sqrt(d.count)) * wave);

        dummy.position.set(0.34 * d.week - u, height / 2, 0.34 * d.day - 1.02);
        dummy.scale.set(0.26, height, 0.26);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Camera position along CatmullRom spline
      const camCurve = isMobile ? curveCamMobile : curveCamDesktop;
      const lookCurve = isMobile ? curveLookMobile : curveLookDesktop;
      const clampedT = Math.min(1, Math.max(0, currentT / 0.85));

      camCurve.getPoint(clampedT, camera.position);
      lookCurve.getPoint(clampedT, lookTarget);

      // Apply drag tilt
      camera.position.x += Math.sin(dragOffsetX) * 4;
      camera.position.z += Math.cos(dragOffsetX) * 2;
      camera.position.y += dragOffsetY * 5;

      camera.lookAt(lookTarget);

      // Raycaster Hover Checking
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedMesh);

      if (intersects.length > 0 && intersects[0].instanceId !== undefined) {
        const id = intersects[0].instanceId;
        if (hoveredInstanceId !== id) {
          // Restore old
          if (hoveredInstanceId >= 0) {
            getTowerColor(daysList[hoveredInstanceId].count, tempCol);
            instancedMesh.setColorAt(hoveredInstanceId, tempCol);
          }
          // Highlight new with pure white glow
          instancedMesh.setColorAt(id, colHot);
          if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
          hoveredInstanceId = id;
        }

        const dayItem = daysList[id];
        // Calculate 2D position for tooltip
        const intersectionPoint = intersects[0].point.clone();
        intersectionPoint.y += 0.4;
        intersectionPoint.project(camera);

        const screenX = ((intersectionPoint.x + 1) * mount.clientWidth) / 2;
        const screenY = ((-intersectionPoint.y + 1) * mount.clientHeight) / 2;

        setHoveredDay({
          date: dayItem.date,
          count: dayItem.count,
          screenX,
          screenY,
        });
      } else {
        if (hoveredInstanceId >= 0) {
          getTowerColor(daysList[hoveredInstanceId].count, tempCol);
          instancedMesh.setColorAt(hoveredInstanceId, tempCol);
          if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
          hoveredInstanceId = -1;
        }
        setHoveredDay(null);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", onPointerUp);
      mount.removeEventListener("mousemove", onPointerMove);
      mount.removeEventListener("mousedown", onPointerDown);
      mount.removeEventListener("mouseleave", onPointerLeave);
      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      boxGeo.dispose();
      groundGeo.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [daysList, weeksCount, maxCommitCount]);

  // Derived opacity for headline and bottom stats based on scrollProgress
  const titleOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.1) / 0.35));
  const statsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.45) / 0.3));
  const statsY = (1 - statsOpacity) * 24;

  return (
    <div
      ref={containerRef}
      id="skyline"
      className="relative h-[260vh] w-full"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0B10] select-none">
        {/* Soft Radial Ambient Aurora Glow behind the city */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="h-[45vh] w-[75vw] rounded-full bg-gradient-to-r from-violet-600/15 via-rose-500/10 to-cyan-500/15 blur-[120px]" />
        </div>

        {/* 3D WebGL Canvas Mount */}
        <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* 1. Header Overlay (matching Pranav's exact typography) */}
        <div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[10%] sm:top-[12%] z-20 px-6 text-center transition-opacity duration-300"
        >
          <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
            <span>Telemetry · Commit Skyline</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.95]">
            A year of commits,{" "}
            <br className="hidden sm:inline" />
            <span className="text-gradient-coral italic font-serif font-normal">
              built as a city.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm sm:text-base text-[var(--text-muted)] font-body leading-relaxed">
            Every tower is one day on GitHub for @{githubData.username}. Taller means more shipped. Scroll down to fly through the city.
          </p>
        </div>

        {/* 2. Floating 3D Raycast Tooltip */}
        {hoveredDay && (
          <div
            className="pointer-events-none fixed z-50 rounded-lg border border-white/20 bg-[#121420]/95 px-3 py-2 font-mono text-xs shadow-2xl backdrop-blur-xl border border-[var(--signal)]/50"
            style={{
              left: `${hoveredDay.screenX}px`,
              top: `${hoveredDay.screenY - 14}px`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="text-white font-bold">
              {hoveredDay.count === 0
                ? "No contributions"
                : `${hoveredDay.count} ${hoveredDay.count === 1 ? "contribution" : "contributions"}`}
            </span>
            <span className="text-[var(--text-muted)]"> · {hoveredDay.date}</span>
          </div>
        )}

        {/* 3. Bottom Glassmorphic Stats Card (matching Pranav's exact layout from video) */}
        <div
          style={{
            opacity: statsOpacity,
            transform: `translateY(${statsY}px)`,
          }}
          className="absolute inset-x-0 bottom-6 sm:bottom-10 z-20 flex flex-col items-center gap-3 px-4 transition-all duration-300 pointer-events-auto"
        >
          <div className="grid w-full max-w-4xl grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl">
            {/* 1. Contributions */}
            <div className="flex flex-col-reverse bg-[#0E1018]/90 px-5 py-4">
              <span className="mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                Contributions · 12 Months
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {stats.totalCommits.toLocaleString()}
              </span>
            </div>

            {/* 2. Best Day */}
            <div className="flex flex-col-reverse bg-[#0E1018]/90 px-5 py-4">
              <span className="mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                Best Day · {stats.bestDayDate}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] tracking-tight font-mono">
                {stats.bestDayCount}
              </span>
            </div>

            {/* 3. Longest Streak */}
            <div className="flex flex-col-reverse bg-[#0E1018]/90 px-5 py-4">
              <span className="mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                Day Longest Streak
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--signal)] tracking-tight font-mono">
                {stats.longestStreak}
              </span>
            </div>

            {/* 4. Days with Commits */}
            <div className="flex flex-col-reverse bg-[#0E1018]/90 px-5 py-4">
              <span className="mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                Days with Commits
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 tracking-tight font-mono">
                {stats.activeDays}
              </span>
            </div>
          </div>

          <a
            href={`https://github.com/${githubData.username}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[var(--text-muted)] underline decoration-white/20 underline-offset-4 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Real data from @{githubData.username} · {githubData.period}</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
