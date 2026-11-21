"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import githubData from "@/content/github.json";

interface DayData {
  date: string;
  count: number;
  topRepo: string;
}

export default function CommitSkyline3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [hoveredDay, setHoveredDay] = useState<{
    day: DayData;
    screenX: number;
    screenY: number;
  } | null>(null);

  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const autoOrbitRef = useRef(true);

  // Compute stats
  const { bestDayCount, bestDayDate } = useMemo(() => {
    let max = 0;
    let date = "";
    for (const d of githubData.days) {
      if (d.count > max) {
        max = d.count;
        date = d.date;
      }
    }
    return { bestDayCount: max, bestDayDate: date };
  }, []);

  const toggleAutoOrbit = () => {
    setIsAutoOrbit((prev) => {
      const next = !prev;
      autoOrbitRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    const days: DayData[] = githubData.days;
    const totalDays = days.length;
    const weeks = Math.ceil(totalDays / 7); // ~53 weeks

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090e, 0.012);

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    let targetZoomDistance = 44;
    let currentZoomDistance = 44;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x282c44, 2.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.6);
    dirLight1.position.set(25, 35, 25);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff3366, 2.0);
    dirLight2.position.set(-25, 30, -25);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1.5, 60);
    pointLight.position.set(0, 15, 0);
    scene.add(pointLight);

    // 3. Ground Base Grid (Elongated Runway)
    const gridCols = weeks;
    const gridRows = 7;
    const spacing = 1.0;
    const offsetX = -(gridCols * spacing) / 2;
    const offsetZ = -(gridRows * spacing) / 2;

    const groundGeo = new THREE.PlaneGeometry(gridCols * spacing + 6, gridRows * spacing + 4);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x07080c,
      roughness: 0.8,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.06;
    scene.add(ground);

    // Grid wireframe lines for technical blueprint look
    const gridHelper = new THREE.GridHelper(gridCols * spacing + 6, gridCols, 0x1c2136, 0x0f121d);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // 4. Mesh array for Commit Towers & Raycasting
    const boxGeo = new THREE.BoxGeometry(0.78, 1, 0.78);
    boxGeo.translate(0, 0.5, 0); // Origin at base so scale.y extends upwards

    const interactiveMeshes: THREE.Mesh[] = [];

    // Glowing Color Palette matching Pranav's screenshot
    const colZero = new THREE.Color(0x131520);
    const colLow = new THREE.Color(0xff3366);     // Neon Coral / Pink
    const colMed = new THREE.Color(0x8b5cf6);     // Electric Violet
    const colHigh = new THREE.Color(0x00f0ff);    // Neon Cyan
    const colPeak = new THREE.Color(0xffffff);    // White hot

    const targetHeights: number[] = [];

    days.forEach((day, i) => {
      const col = Math.floor(i / 7);
      const row = i % 7;
      const count = day.count;

      const posX = offsetX + col * spacing;
      const posZ = offsetZ + row * spacing;

      let color = colZero;
      let heightVal = 0.15; // Flat tile for 0 commits

      if (count > 0) {
        if (count >= 12) {
          color = colPeak;
          heightVal = Math.min(count * 0.45 + 1.2, 7.5);
        } else if (count >= 7) {
          color = colHigh;
          heightVal = count * 0.42 + 1.0;
        } else if (count >= 4) {
          color = colMed;
          heightVal = count * 0.38 + 0.8;
        } else {
          color = colLow;
          heightVal = count * 0.35 + 0.6;
        }
      }

      targetHeights.push(heightVal);

      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.25,
        metalness: 0.65,
        emissive: count >= 4 ? color : new THREE.Color(0x000000),
        emissiveIntensity: count >= 7 ? 0.4 : count >= 4 ? 0.2 : 0.0,
      });

      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.position.set(posX, 0, posZ);
      mesh.scale.set(1, 0.01, 1); // Start flat, animate up
      mesh.userData = { day, originalColor: color, targetHeight: heightVal, index: i };

      scene.add(mesh);
      interactiveMeshes.push(mesh);
    });

    // 5. Interactive Mouse Orbit, Zoom & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    let targetRotationX = 0.15;
    let targetRotationY = -0.4;
    let currentRotationX = 0.15;
    let currentRotationY = -0.4;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;
        targetRotationX = Math.max(-0.4, Math.min(0.65, targetRotationX));
      }

      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerLeave = () => {
      isDragging = false;
      mouse.x = -999;
      mouse.y = -999;
      setHoveredDay(null);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomDistance = Math.max(20, Math.min(65, targetZoomDistance + e.deltaY * 0.04));
    };

    // Touch events for mobile interaction
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotationY += deltaX * 0.007;
        targetRotationX = Math.max(-0.4, Math.min(0.65, targetRotationX + deltaY * 0.007));
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    mount.addEventListener("mousemove", onPointerMove);
    mount.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    mount.addEventListener("mouseleave", onPointerLeave);
    mount.addEventListener("wheel", onWheel, { passive: false });
    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    mount.addEventListener("touchmove", onTouchMove, { passive: true });
    mount.addEventListener("touchend", onTouchEnd, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 6. Animation Render Loop
    let growthProgress = 0;
    let lastHoveredMesh: THREE.Mesh | null = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuous majestic ambient rotation when auto-orbit is enabled and not manually dragging
      if (autoOrbitRef.current && !isDragging) {
        targetRotationY += 0.0022;
      }

      // Growth reveal on mount
      growthProgress = Math.min(growthProgress + 0.02, 1);
      const ease = 1 - Math.pow(1 - growthProgress, 3);

      interactiveMeshes.forEach((mesh, idx) => {
        mesh.scale.y = targetHeights[idx] * ease;
      });

      // Smooth camera rotation and zoom damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentZoomDistance += (targetZoomDistance - currentZoomDistance) * 0.08;

      camera.position.x = Math.sin(currentRotationY) * currentZoomDistance;
      camera.position.z = Math.cos(currentRotationY) * currentZoomDistance;
      camera.position.y = 15 + currentRotationX * 22;
      camera.lookAt(0, 1.2, 0);

      // Raycasting hover check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (lastHoveredMesh && lastHoveredMesh !== hit) {
          (lastHoveredMesh.material as THREE.MeshStandardMaterial).color.copy(
            lastHoveredMesh.userData.originalColor
          );
          (lastHoveredMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
            hit.userData.day.count >= 7 ? 0.4 : hit.userData.day.count >= 4 ? 0.2 : 0.0;
        }

        // Highlight hit tower with bright white glow
        (hit.material as THREE.MeshStandardMaterial).color.set(0xffffff);
        (hit.material as THREE.MeshStandardMaterial).emissive.set(0x00f0ff);
        (hit.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
        lastHoveredMesh = hit;

        // Calculate 2D screen coordinate for tooltip
        const hitWorldPos = new THREE.Vector3();
        hit.getWorldPosition(hitWorldPos);
        hitWorldPos.y += hit.scale.y + 0.6;
        hitWorldPos.project(camera);

        const screenX = ((hitWorldPos.x + 1) * width) / 2;
        const screenY = ((-hitWorldPos.y + 1) * height) / 2;

        setHoveredDay({
          day: hit.userData.day,
          screenX,
          screenY,
        });
      } else {
        if (lastHoveredMesh) {
          (lastHoveredMesh.material as THREE.MeshStandardMaterial).color.copy(
            lastHoveredMesh.userData.originalColor
          );
          (lastHoveredMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
            lastHoveredMesh.userData.day.count >= 7 ? 0.4 : lastHoveredMesh.userData.day.count >= 4 ? 0.2 : 0.0;
          lastHoveredMesh = null;
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
      mount.removeEventListener("wheel", onWheel);
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-[16px] bg-[#0A0B12] hairline p-5 sm:p-8 space-y-6 overflow-hidden select-none shadow-2xl border border-[var(--line)]"
    >
      {/* Title & Interactive Callout (matching Pranav's screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-1">
            GitHub Telemetry
          </div>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            A year of commits,{" "}
            <span className="text-gradient-coral italic">built as a city.</span>
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-muted)] font-body mt-2 max-w-2xl">
            Every tower is one day on GitHub. Taller means more shipped. Hover one to read it. Drag to orbit.
          </p>
        </div>

        {/* Orbit Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleAutoOrbit}
            className={`px-3 py-1.5 rounded-full text-xs font-mono hairline transition-all cursor-pointer flex items-center gap-2 ${
              isAutoOrbit
                ? "bg-[var(--signal)]/15 text-[var(--signal)] border-[var(--signal)]/40"
                : "bg-[var(--bg-sunken)] text-[var(--text-muted)]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAutoOrbit ? "bg-[var(--signal)] animate-pulse" : "bg-zinc-600"
              }`}
            />
            <span>{isAutoOrbit ? "Auto-orbit: Active" : "Auto-orbit: Paused"}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Viewport */}
      <div className="relative w-full h-[380px] sm:h-[480px] rounded-[12px] bg-[#07080C] overflow-hidden border border-[var(--line)] cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full block" />

        {/* Floating 3D Tooltip (matching Pranav's screenshot style) */}
        {hoveredDay && (
          <div
            className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full px-4 py-2.5 rounded-[8px] bg-[#121420]/95 hairline text-xs font-mono text-white shadow-2xl backdrop-blur-md border border-[var(--signal)]/50 transition-opacity"
            style={{
              left: `${hoveredDay.screenX}px`,
              top: `${hoveredDay.screenY - 16}px`,
            }}
          >
            <div className="font-bold text-[var(--signal)] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
              <span>
                {hoveredDay.day.count}{" "}
                {hoveredDay.day.count === 1 ? "contribution" : "contributions"}
              </span>
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              {hoveredDay.day.date}
              {hoveredDay.day.topRepo && (
                <span className="text-white ml-1">· {hoveredDay.day.topRepo}</span>
              )}
            </div>
          </div>
        )}

        {/* Viewport Hints */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[var(--text-muted)] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md pointer-events-none hairline flex items-center gap-2">
          <span>Drag to orbit</span>
          <span>·</span>
          <span>Scroll to zoom</span>
          <span>·</span>
          <span>Hover to inspect</span>
        </div>
      </div>

      {/* 4 Sleek Neon Stats Cards (matching Pranav's exact layout from screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--line)]">
        <div className="p-4 sm:p-5 rounded-[12px] bg-[#121420] hairline border border-white/5 hover:border-[var(--signal)]/30 transition-colors">
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
            {githubData.stats.totalCommits.toLocaleString()}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] font-body uppercase tracking-wider mt-1.5">
            Contributions · 12 Months
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[12px] bg-[#121420] hairline border border-white/5 hover:border-[var(--accent)]/30 transition-colors">
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">
            {bestDayCount}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] font-body uppercase tracking-wider mt-1.5">
            Best Day · {bestDayDate}
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[12px] bg-[#121420] hairline border border-white/5 hover:border-[var(--signal)]/30 transition-colors">
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--signal)]">
            {githubData.stats.longestStreak}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] font-body uppercase tracking-wider mt-1.5">
            Day Longest Streak
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[12px] bg-[#121420] hairline border border-white/5 hover:border-purple-400/30 transition-colors">
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-purple-400">
            {githubData.stats.activeDays}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] font-body uppercase tracking-wider mt-1.5">
            Days with Commits
          </div>
        </div>
      </div>

      <div className="text-center font-mono text-xs text-[var(--text-muted)]">
        Real activity data from @{githubData.username} · {githubData.period}
      </div>
    </div>
  );
}
