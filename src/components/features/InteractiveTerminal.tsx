"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string | React.ReactNode;
}

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<"cli" | "snake">("cli");
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "system",
      content: "AnshOS v2.4 (x86_64-linux-gnu). Type 'help' to see available commands or 'snake' to play.",
    },
    {
      type: "output",
      content: "Welcome! Systems operational. All 4 telemetry engines online.",
    },
  ]);

  const [historyIndex, setHistoryIndex] = useState(-1);
  const commandHistoryRef = useRef<string[]>([]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Snake Game State
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5, y: 5 });
  const [dir, setDir] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("UP");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);

  // Auto-scroll terminal container (only on subsequent user commands, never on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Handle Command Execution
  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistoryRef.current.push(rawCmd);
    setHistoryIndex(-1);

    const newHistory: TerminalLine[] = [
      ...history,
      { type: "input", content: `ansh@systems:~$ ${rawCmd}` },
    ];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          content: (
            <div className="space-y-1 text-xs">
              <div>Available commands:</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1 text-[var(--signal)]">
                <span>• <b className="text-white">whoami</b> : Identity</span>
                <span>• <b className="text-white">skills</b> : Stack</span>
                <span>• <b className="text-white">projects</b> : Live builds</span>
                <span>• <b className="text-white">stats</b> : Real metrics</span>
                <span>• <b className="text-white">snake</b> : Play game</span>
                <span>• <b className="text-white">contact</b> : Reach out</span>
                <span>• <b className="text-white">clear</b> : Clear shell</span>
              </div>
            </div>
          ),
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          content:
            "Ansh Arora — B.Tech Computer Science (AI/ML) @ VIT Bhopal ('28). Software engineer focused on low-latency trading systems, real-time telemetry, and applied machine learning.",
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          content: (
            <div className="space-y-1 text-xs">
              <div><span className="text-[var(--accent)] font-bold">Languages:</span> C++, Python, TypeScript, SQL, Java</div>
              <div><span className="text-[var(--signal)] font-bold">Backend &amp; Streaming:</span> FastAPI, WebSockets, Server-Sent Events, Node.js, Docker</div>
              <div><span className="text-purple-400 font-bold">Machine Learning:</span> XGBoost, SHAP, scikit-learn, pgvector, Pandas, NumPy</div>
              <div><span className="text-emerald-400 font-bold">Frontend:</span> Next.js 16, React 19, Tailwind CSS, Three.js WebGL, GSAP</div>
            </div>
          ),
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          content: (
            <div className="space-y-1.5 text-xs">
              <div><span className="text-white font-bold">1. NSE Momentum Scanner:</span> Real-time WebSocket market scanner tracking 2,100+ stocks in &lt;50ms.</div>
              <div><span className="text-white font-bold">2. GridGuard AI:</span> Smart-meter failure predictor with 94.2% anomaly accuracy.</div>
              <div><span className="text-white font-bold">3. RAGForge:</span> Production multi-tenant vector retrieval with &lt;85ms semantic search.</div>
              <div><span className="text-white font-bold">4. Delta Options Bot:</span> Automated Black-Scholes risk engine for options trading.</div>
            </div>
          ),
        });
        break;

      case "stats":
        newHistory.push({
          type: "output",
          content: (
            <div className="space-y-1 text-xs">
              <div>• GitHub contributions (last 12 mo): <b className="text-white">357</b></div>
              <div>• Best day on GitHub: <b className="text-[var(--accent)]">26 contributions (31 Jul 2026)</b></div>
              <div>• University CGPA: <b className="text-white">7.79 / 10.0</b></div>
              <div>• NPTEL Cloud Computing: <b className="text-[var(--signal)]">92% (Top 1% Elite+Gold)</b></div>
              <div>• NPTEL IoT: <b className="text-purple-400">88% (Elite+Silver)</b></div>
            </div>
          ),
        });
        break;

      case "snake":
        setActiveTab("snake");
        setGameRunning(true);
        setGameOver(false);
        setScore(0);
        newHistory.push({
          type: "system",
          content: "Launching Snake Game... Use arrow keys or WASD to control.",
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          content: (
            <div className="space-y-1 text-xs">
              <div>Email: <a href="mailto:ansharora19102006@gmail.com" className="text-[var(--signal)] underline">ansharora19102006@gmail.com</a></div>
              <div>GitHub: <a href="https://github.com/anshere0" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">github.com/anshere0</a></div>
              <div>LinkedIn: <a href="https://linkedin.com/in/ansh-arora-098553287" target="_blank" rel="noreferrer" className="text-purple-400 underline">linkedin.com/in/ansh-arora</a></div>
            </div>
          ),
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          content: `Command not found: '${rawCmd}'. Type 'help' for a list of commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  // Snake game loop
  useEffect(() => {
    if (!gameRunning || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        // Collision with walls (20x20 grid)
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setGameOver(true);
          return prev;
        }

        // Collision with self
        for (const segment of prev) {
          if (segment.x === head.x && segment.y === head.y) {
            setGameOver(true);
            return prev;
          }
        }

        const newSnake = [head, ...prev];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [gameRunning, gameOver, dir, food]);

  // Snake controls
  useEffect(() => {
    if (activeTab !== "snake") return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        setDir((prev) => (prev !== "DOWN" ? "UP" : prev));
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        setDir((prev) => (prev !== "UP" ? "DOWN" : prev));
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        setDir((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        setDir((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeTab]);

  return (
    <div className="w-full rounded-[16px] bg-[#0E1018] hairline overflow-hidden shadow-2xl border border-white/10 font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#141724] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-[var(--text-muted)] font-medium">
            ansh@systems:~ (interactive shell)
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#0A0B10] p-1 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("cli")}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "cli"
                ? "bg-[var(--accent)] text-black font-bold"
                : "text-[var(--text-muted)] hover:text-white"
            }`}
          >
            bash
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("snake");
              setGameRunning(true);
              setGameOver(false);
            }}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "snake"
                ? "bg-[var(--signal)] text-black font-bold"
                : "text-[var(--text-muted)] hover:text-white"
            }`}
          >
            snake.sh
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      {activeTab === "cli" ? (
        <div
          ref={terminalContainerRef}
          onClick={() => inputRef.current?.focus()}
          className="p-5 h-[340px] sm:h-[380px] overflow-y-auto space-y-2 text-xs text-white/90 cursor-text select-text scroll-smooth"
        >
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === "input" && (
                <span className="text-[var(--signal)] font-semibold">{line.content}</span>
              )}
              {line.type === "output" && (
                <div className="text-white/80 pl-2">{line.content}</div>
              )}
              {line.type === "system" && (
                <span className="text-zinc-500 italic">{line.content}</span>
              )}
              {line.type === "error" && (
                <span className="text-rose-400 font-medium pl-2">{line.content}</span>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 pt-1"
          >
            <span className="text-[var(--accent)] font-bold shrink-0">ansh@systems:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-[var(--signal)]"
              placeholder="type 'help', 'skills', or 'snake'..."
            />
          </form>
        </div>
      ) : (
        /* Snake Game View */
        <div className="p-6 flex flex-col items-center justify-center space-y-4 h-[340px] sm:h-[380px] bg-[#08090E]">
          <div className="flex items-center justify-between w-full max-w-xs text-xs">
            <span className="text-white font-bold">Score: <b className="text-[var(--signal)]">{score}</b></span>
            <button
              type="button"
              onClick={() => {
                setSnake([
                  { x: 10, y: 10 },
                  { x: 10, y: 11 },
                  { x: 10, y: 12 },
                ]);
                setDir("UP");
                setScore(0);
                setGameOver(false);
                setGameRunning(true);
              }}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors"
            >
              Reset Game
            </button>
          </div>

          {/* 20x20 Grid Display */}
          <div className="relative w-[220px] h-[220px] bg-[#121420] border border-white/20 rounded-lg overflow-hidden">
            {/* Food */}
            <div
              className="absolute w-[11px] h-[11px] bg-[var(--accent)] rounded-full animate-ping"
              style={{
                left: `${food.x * 11}px`,
                top: `${food.y * 11}px`,
              }}
            />
            <div
              className="absolute w-[11px] h-[11px] bg-[var(--accent)] rounded-full"
              style={{
                left: `${food.x * 11}px`,
                top: `${food.y * 11}px`,
              }}
            />

            {/* Snake */}
            {snake.map((seg, i) => (
              <div
                key={i}
                className={`absolute w-[11px] h-[11px] rounded-sm ${
                  i === 0 ? "bg-[var(--signal)] z-10" : "bg-purple-400"
                }`}
                style={{
                  left: `${seg.x * 11}px`,
                  top: `${seg.y * 11}px`,
                }}
              />
            ))}

            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-3">
                <span className="text-rose-400 font-bold text-sm">Game Over!</span>
                <span className="text-xs text-[var(--text-muted)] mt-1">Final Score: {score}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSnake([
                      { x: 10, y: 10 },
                      { x: 10, y: 11 },
                      { x: 10, y: 12 },
                    ]);
                    setDir("UP");
                    setScore(0);
                    setGameOver(false);
                  }}
                  className="mt-3 px-3 py-1 rounded bg-[var(--accent)] text-black font-bold text-xs"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          <div className="text-[11px] text-[var(--text-muted)] text-center">
            Use <b className="text-white">Arrow Keys</b> or <b className="text-white">W A S D</b> to steer
          </div>
        </div>
      )}
    </div>
  );
}
