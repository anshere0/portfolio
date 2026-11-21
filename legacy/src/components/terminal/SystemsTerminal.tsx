"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, Volume2, VolumeX, Maximize2, Minimize2, CornerDownLeft, Sparkles, Play } from "lucide-react";
import { PROFILE_DATA } from "@/content/profile";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function SystemsTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSnakeRunning, setIsSnakeRunning] = useState<boolean>(false);
  const [snakeScore, setSnakeScore] = useState<number>(0);
  const [isMatrixRunning, setIsMatrixRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<CommandLog[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const snakeCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Web Audio API for tactile mechanical keyboard clicks
  const playMechanicalClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sharp mechanical transient click
      osc.type = "sine";
      osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.018);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.022);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [soundEnabled]);

  // Initial welcome message
  useEffect(() => {
    const welcomeLog: CommandLog = {
      id: "init",
      command: "boot",
      timestamp: "00:00:01",
      output: (
        <div className="space-y-1 text-xs">
          <div className="text-[var(--signal-emerald)] font-bold">
            [ OK ] AnshOS v2.8 (x86_64-wasm-linux) initialized.
          </div>
          <div className="text-[var(--ink-secondary)] dark:text-[#a09e99]">
            Systems engineering playground ready. Type <span className="text-[var(--signal-vermilion)] font-bold">help</span> to view commands, or try <span className="text-amber-500 font-bold">neofetch</span>, <span className="text-amber-500 font-bold">ragforge --simulate</span>, or <span className="text-emerald-500 font-bold">snake</span>.
          </div>
        </div>
      ),
    };
    setLogs([welcomeLog]);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs, isSnakeRunning, isMatrixRunning]);

  // Command Execution Engine
  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    playMechanicalClick();
    setHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");
    const time = new Date().toLocaleTimeString();

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[var(--signal-vermilion)] font-bold uppercase tracking-wider">
              --- AVAILABLE SYSTEM COMMANDS ---
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--ink-secondary)] dark:text-[#a09e99]">
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">neofetch</strong>: Display system specs, telemetry & ASCII monogram</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">ragforge --simulate</strong>: Live simulated RAG vector retrieval pipeline</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">projects</strong>: List verified production systems & repositories</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">skills</strong>: Output technical competency matrix & stack</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">snake</strong>: Launch playable retro terminal Snake game</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">matrix</strong>: Launch animated Systems Code Rain</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">sound</strong>: Toggle mechanical keyboard sound effects</div>
              <div><strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">clear</strong>: Clear terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "neofetch":
        outputNode = (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-mono py-2">
            <div className="md:col-span-5 text-[var(--signal-vermilion)] leading-tight whitespace-pre select-none font-bold">
{`   █████╗  █████╗ 
  ██╔══██╗██╔══██╗
  ███████║███████║
  ██╔══██║██╔══██║
  ██║  ██║██║  ██║
  ╚═╝  ╚═╝╚═╝  ╚═╝
  ANSH ARORA // LAB`}
            </div>
            <div className="md:col-span-7 space-y-1">
              <div><span className="text-[var(--signal-vermilion)] font-bold">USER:</span> ansh@ansh-systems-laptop</div>
              <div><span className="text-[var(--signal-vermilion)] font-bold">OS:</span> AnshOS v2.8 (Next.js 16 + WebGL + GSAP)</div>
              <div><span className="text-[var(--signal-vermilion)] font-bold">EDUCATION:</span> B.Tech CSE (AI/ML) · VIT Bhopal (2024–2028)</div>
              <div><span className="text-[var(--signal-vermilion)] font-bold">VERIFIED CGPA:</span> 7.51 / 10.00</div>
              <div><span className="text-[var(--signal-vermilion)] font-bold">PRIMARY STACK:</span> Python, TypeScript, C++, FastAPI, PyTorch, pgvector</div>
              <div><span className="text-[var(--signal-vermilion)] font-bold">SYSTEMS SHIPPED:</span> 07 Production Pipelines & AI Tooling</div>
              <div className="flex gap-1.5 pt-1.5">
                <span className="w-3.5 h-3.5 bg-[#C8260E] inline-block" />
                <span className="w-3.5 h-3.5 bg-[#D97706] inline-block" />
                <span className="w-3.5 h-3.5 bg-[#047857] inline-block" />
                <span className="w-3.5 h-3.5 bg-[#2563EB] inline-block" />
                <span className="w-3.5 h-3.5 bg-[#4F46E5] inline-block" />
                <span className="w-3.5 h-3.5 bg-[#121212] dark:bg-white inline-block" />
              </div>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="font-bold text-[var(--signal-vermilion)]">--- VERIFIED SYSTEMS LEDGER ---</div>
            <div className="space-y-1.5">
              {PROFILE_DATA.featuredProjects.map((p, i) => (
                <div key={p.slug} className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-black/5 dark:bg-white/5 hairline-border">
                  <div>
                    <span className="text-[var(--signal-vermilion)] font-bold mr-2">[{i + 1}]</span>
                    <strong className="text-[var(--ink-primary)] dark:text-[#f4f1ea]">{p.title}</strong>
                    <span className="text-[var(--ink-tertiary)] ml-2 text-[11px]">— {p.subtitle}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[var(--signal-emerald)]/10 text-[var(--signal-emerald)] font-bold">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "ragforge":
        if (arg.includes("--simulate") || arg.includes("-s")) {
          outputNode = (
            <div className="space-y-1.5 text-xs font-mono text-[var(--ink-secondary)] dark:text-[#a09e99]">
              <div className="text-[var(--signal-emerald)] font-bold">[ RAGFORGE SIMULATION IN PROGRESS ]</div>
              <div>[1/4] Ingesting document stream & parsing layout... <span className="text-emerald-500 font-bold">[DONE 12ms]</span></div>
              <div>[2/4] Generating 768-dim embeddings via Gemini text-embedding-004... <span className="text-emerald-500 font-bold">[DONE 34ms]</span></div>
              <div>[3/4] pgvector HNSW cosine recall (top_k=10, ef_search=40)... <span className="text-emerald-500 font-bold">[RECALL 41ms]</span></div>
              <div>[4/4] Multi-tenant cross-encoder verification & citation check... <span className="text-emerald-500 font-bold">[PASS 88ms]</span></div>
              <div className="p-2 bg-black/10 dark:bg-white/5 hairline-border mt-1 text-[var(--ink-primary)] dark:text-[#f4f1ea]">
                <strong>SYNTHESIZED GROUNDED CITATION:</strong> &ldquo;Latency budget confirmed sub-200ms end-to-end with verified tenant data isolation.&rdquo;
              </div>
            </div>
          );
        } else {
          outputNode = <div className="text-xs">Usage: <span className="text-[var(--signal-vermilion)] font-bold">ragforge --simulate</span></div>;
        }
        break;

      case "skills":
        outputNode = (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-2 bg-black/5 dark:bg-white/5 hairline-border space-y-1">
              <div className="font-bold text-[var(--signal-vermilion)]">LANGUAGES</div>
              <div>• Python (PyTorch, FastAPI)</div>
              <div>• TypeScript / JavaScript</div>
              <div>• C++ (120+ DSA Solved)</div>
              <div>• SQL (PostgreSQL, pgvector)</div>
            </div>
            <div className="p-2 bg-black/5 dark:bg-white/5 hairline-border space-y-1">
              <div className="font-bold text-[var(--signal-amber)]">SYSTEMS & ARCH</div>
              <div>• Multi-Tenant RAG Pipelines</div>
              <div>• Docker & Sandboxed CI</div>
              <div>• WebSockets & Event-Driven</div>
              <div>• Redis & Microservices</div>
            </div>
            <div className="p-2 bg-black/5 dark:bg-white/5 hairline-border space-y-1">
              <div className="font-bold text-[var(--signal-emerald)]">WEB & FRONTEND</div>
              <div>• Next.js 16 (App Router)</div>
              <div>• Three.js / WebGL / GSAP</div>
              <div>• Tailwind CSS 4 & UI Systems</div>
              <div>• Lenis Smooth Scroll Engine</div>
            </div>
          </div>
        );
        break;

      case "snake":
        setIsSnakeRunning(true);
        outputNode = <div className="text-xs text-[var(--signal-emerald)] font-bold">Initializing Snake... Use Arrow Keys or WASD to navigate!</div>;
        break;

      case "matrix":
        setIsMatrixRunning(true);
        outputNode = <div className="text-xs text-[var(--signal-emerald)] font-bold">Systems Code Rain active. Press any key or click Stop to exit.</div>;
        break;

      case "sound":
        setSoundEnabled((prev) => !prev);
        outputNode = (
          <div className="text-xs">
            Mechanical sound feedback: <strong className={!soundEnabled ? "text-[var(--signal-emerald)]" : "text-[var(--signal-vermilion)]"}>{!soundEnabled ? "ENABLED" : "DISABLED"}</strong>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        outputNode = (
          <div className="text-xs text-[var(--signal-vermilion)]">
            Command not recognized: &quot;{cmd}&quot;. Type <strong className="underline cursor-pointer" onClick={() => executeCommand("help")}>help</strong> for a list of commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: raw,
        timestamp: time,
        output: outputNode,
      },
    ]);
  };

  // Keyboard navigation & history cycling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playMechanicalClick();

    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < history.length) {
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  // Interactive Snake Game Logic inside terminal
  useEffect(() => {
    if (!isSnakeRunning || !snakeCanvasRef.current) return;
    const canvas = snakeCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 14;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);

    let snake = [
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) },
      { x: Math.floor(cols / 2) - 1, y: Math.floor(rows / 2) },
    ];
    let food = {
      x: Math.floor(Math.random() * (cols - 2)) + 1,
      y: Math.floor(Math.random() * (rows - 2)) + 1,
    };
    let dir = { x: 1, y: 0 };
    let score = 0;
    let isGameOver = false;

    const handleGameKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        if (dir.y === 0) dir = { x: 0, y: -1 };
        e.preventDefault();
      } else if (e.key === "ArrowDown" || e.key === "s") {
        if (dir.y === 0) dir = { x: 0, y: 1 };
        e.preventDefault();
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        if (dir.x === 0) dir = { x: -1, y: 0 };
        e.preventDefault();
      } else if (e.key === "ArrowRight" || e.key === "d") {
        if (dir.x === 0) dir = { x: 1, y: 0 };
        e.preventDefault();
      } else if (e.key === "Escape") {
        setIsSnakeRunning(false);
      }
    };

    window.addEventListener("keydown", handleGameKey);

    const interval = setInterval(() => {
      if (isGameOver) return;

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall collision
      if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        isGameOver = true;
      }

      // Self collision
      for (const seg of snake) {
        if (seg.x === head.x && seg.y === head.y) {
          isGameOver = true;
          break;
        }
      }

      if (isGameOver) {
        return;
      }

      snake.unshift(head);

      // Food check
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        setSnakeScore(score);
        playMechanicalClick();
        food = {
          x: Math.floor(Math.random() * (cols - 2)) + 1,
          y: Math.floor(Math.random() * (rows - 2)) + 1,
        };
      } else {
        snake.pop();
      }

      // Render
      ctx.fillStyle = "#121214";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw food
      ctx.fillStyle = "#C8260E";
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);

      // Draw snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#047857" : "#10B981";
        ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 1, gridSize - 1);
      });

      if (isGameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#C8260E";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("SYSTEM CRASH // GAME OVER", canvas.width / 2, canvas.height / 2 - 8);
        ctx.fillStyle = "#A09E99";
        ctx.font = "11px monospace";
        ctx.fillText(`SCORE: ${score} · PRESS ESCAPE TO RETURN`, canvas.width / 2, canvas.height / 2 + 14);
      }
    }, 90);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleGameKey);
    };
  }, [isSnakeRunning, playMechanicalClick]);

  // Systems Matrix Rain Logic
  useEffect(() => {
    if (!isMatrixRunning || !matrixCanvasRef.current) return;
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01アイウエオカキクケコサシスセソタチツテトRAGMLVECTORSYS";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(18, 18, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#C8260E";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isMatrixRunning]);

  return (
    <section id="terminal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 hairline-b bg-[var(--bg-paper)]">
      {/* Section Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              08 / INTERACTIVE REPL // ANSH-OS SHELL
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Systems Engineering Terminal & Playground
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => executeCommand("ragforge --simulate")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-paper-subtle)] hover:bg-[var(--bg-paper-darker)] hairline-border font-mono text-xs uppercase transition-colors"
          >
            <Play className="w-3 h-3 text-[var(--signal-vermilion)]" />
            <span>RUN RAG SIM</span>
          </button>
          <button
            onClick={() => executeCommand("neofetch")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-paper-subtle)] hover:bg-[var(--bg-paper-darker)] hairline-border font-mono text-xs uppercase transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[var(--signal-amber)]" />
            <span>NEOFETCH</span>
          </button>
        </div>
      </div>

      {/* Terminal Window Frame */}
      <div
        className={`w-full hairline-border transition-all duration-200 overflow-hidden shadow-xl ${
          isFullscreen ? "fixed inset-4 z-50 bg-[#121214] text-[#F4F1EA]" : "bg-[#141416] text-[#F4F1EA]"
        }`}
      >
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1B1B1E] hairline-b border-[#2C2C30]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E11D48] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />
            </div>
            <div className="flex items-center gap-2 ml-3 font-mono text-xs text-[#A09E99]">
              <Terminal className="w-3.5 h-3.5 text-[var(--signal-vermilion)]" />
              <span className="text-white font-semibold">ansh@systems-notebook</span>
              <span className="text-[#64625D]">·</span>
              <span className="text-[11px] text-[#A09E99]">zsh -- active</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 hover:text-white text-[#A09E99] transition-colors"
              title="Toggle Mechanical Key Clicks"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[var(--signal-emerald)]" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:text-white text-[#A09E99] transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          ref={terminalBodyRef}
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 overflow-y-auto max-h-[460px] min-h-[380px] bg-[#121214] cursor-text"
        >
          {/* Active Canvas Games / Overlays */}
          {isSnakeRunning && (
            <div className="p-3 bg-[#1B1B1E] hairline-border border-[#2C2C30] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--signal-emerald)] font-bold">ARCADE: RETRO SNAKE // SCORE: {snakeScore}</span>
                <button
                  onClick={() => setIsSnakeRunning(false)}
                  className="px-2 py-0.5 bg-[#C8260E] text-white text-[10px] uppercase font-bold"
                >
                  QUIT GAME
                </button>
              </div>
              <canvas ref={snakeCanvasRef} width={560} height={240} className="w-full bg-[#121214] block hairline-border border-[#2C2C30]" />
            </div>
          )}

          {isMatrixRunning && (
            <div className="p-3 bg-[#1B1B1E] hairline-border border-[#2C2C30] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--signal-vermilion)] font-bold">SYSTEMS CODE RAIN</span>
                <button
                  onClick={() => setIsMatrixRunning(false)}
                  className="px-2 py-0.5 bg-[#C8260E] text-white text-[10px] uppercase font-bold"
                >
                  STOP RAIN
                </button>
              </div>
              <canvas ref={matrixCanvasRef} width={560} height={200} className="w-full bg-[#121214] block hairline-border border-[#2C2C30]" />
            </div>
          )}

          {/* Historical Logs */}
          {logs.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#A09E99]">
                <span className="text-[var(--signal-vermilion)] font-bold">❯</span>
                <span className="text-white font-semibold">{log.command}</span>
                <span className="text-[10px] text-[#64625D] ml-auto">{log.timestamp}</span>
              </div>
              <div className="pl-4 text-[#D6D3CD]">{log.output}</div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[var(--signal-vermilion)] font-bold text-sm">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type help, neofetch, ragforge --simulate, or snake..."
              className="flex-1 bg-transparent border-none outline-hidden text-white font-mono text-xs sm:text-sm placeholder:text-[#58554F]"
              autoFocus
            />
            <CornerDownLeft className="w-3.5 h-3.5 text-[#58554F]" />
          </div>
        </div>

        {/* Terminal Footer Quick Buttons */}
        <div className="px-4 py-2 bg-[#18181B] hairline-t border-[#2C2C30] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#A09E99]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>QUICK DISPATCH:</span>
            {["help", "neofetch", "ragforge --simulate", "projects", "snake"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-0.5 bg-[#242428] hover:bg-[#2F2F35] text-[#D6D3CD] hover:text-white transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          <span className="text-[10px] text-[#64625D]">
            TAB COMPLETES · ↑/↓ HISTORY · SYNTHETIC AUDIO ACTIVE
          </span>
        </div>
      </div>
    </section>
  );
}
