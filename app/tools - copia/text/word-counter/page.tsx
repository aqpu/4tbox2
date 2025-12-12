"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ToolTemplate } from "@/components/tools/ToolTemplate";

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

const TEST_DURATION_MS = 60_000; // 1 minuto

export default function Page() {
  const [mode, setMode] = useState<"normal" | "test">("normal");

  // ----------------- MODO NORMAL -----------------
  const [text, setText] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const trimmed = text.trim();
  const words = trimmed === "" ? [] : trimmed.split(/\s+/);
  const wordCount = words.length;
  const charCount = text.length;
  const lineCount = text === "" ? 0 : text.split(/\r?\n/).length;

  const avgWordLength =
    wordCount === 0
      ? 0
      : words.reduce((acc, w) => acc + w.length, 0) / wordCount;

  const minutes = elapsedMs / 60000;
  const wpm = minutes > 0 ? wordCount / minutes : 0;
  const cpm = minutes > 0 ? charCount / minutes : 0;

  const handleChangeNormal = (value: string) => {
    if (!startedAt && value.trim().length > 0) {
      setStartedAt(Date.now());
      setIsRunning(true);
    }
    setText(value);
  };

  useEffect(() => {
    if (!isRunning || !startedAt) return;

    const id = setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, startedAt]);

  const resetNormal = () => {
    setText("");
    setElapsedMs(0);
    setStartedAt(null);
    setIsRunning(false);
  };

  // ----------------- MODO TEST -----------------
  const [testText, setTestText] = useState("");
  const [testStartedAt, setTestStartedAt] = useState<number | null>(null);
  const [testElapsedMs, setTestElapsedMs] = useState(0);
  const [testRunning, setTestRunning] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  const testTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const testTrimmed = testText.trim();
  const testWords = testTrimmed === "" ? [] : testTrimmed.split(/\s+/);
  const testWordCount = testWords.length;
  const testCharCount = testText.length;

  const testMinutesSpent = Math.min(testElapsedMs, TEST_DURATION_MS) / 60000;
  const testWpm = testMinutesSpent > 0 ? testWordCount / testMinutesSpent : 0;
  const testCpm = testMinutesSpent > 0 ? testCharCount / testMinutesSpent : 0;

  const remainingMs = Math.max(0, TEST_DURATION_MS - testElapsedMs);

  const handleTestTyping = (value: string) => {
    if (!testRunning && !testFinished) {
      setTestRunning(true);
      setTestStartedAt(Date.now());
      setTestElapsedMs(0);
    }
    setTestText(value);
  };

  useEffect(() => {
    if (!testRunning || !testStartedAt) return;

    const id = setInterval(() => {
      const diff = Date.now() - testStartedAt;

      if (diff >= TEST_DURATION_MS) {
        setTestElapsedMs(TEST_DURATION_MS);
        setTestRunning(false);
        setTestFinished(true);
        clearInterval(id);
      } else {
        setTestElapsedMs(diff);
      }
    }, 200);

    return () => clearInterval(id);
  }, [testRunning, testStartedAt]);

  const resetTest = () => {
    setTestText("");
    setTestStartedAt(null);
    setTestElapsedMs(0);
    setTestRunning(false);
    setTestFinished(false);
    setTimeout(() => testTextareaRef.current?.focus(), 100);
  };

  return (
    <ToolTemplate
      id="text-word-counter"
      title="Word Counter"
      description="Modo normal + test automático de 1 minuto, con métricas de escritura en tiempo real."
      category="Text tools"
    >
      {/* Toggle de modos */}
      <div className="inline-flex mb-4 rounded-md bg-gray-100 dark:bg-slate-800 p-1 text-xs">
        <button
          onClick={() => setMode("normal")}
          className={`px-3 py-1 rounded-md ${
            mode === "normal"
              ? "bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-slate-50"
              : "text-gray-500 dark:text-slate-400"
          }`}
        >
          Modo normal
        </button>
        <button
          onClick={() => {
            setMode("test");
            resetTest();
          }}
          className={`px-3 py-1 rounded-md ${
            mode === "test"
              ? "bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-slate-50"
              : "text-gray-500 dark:text-slate-400"
          }`}
        >
          Test (1 minuto)
        </button>
      </div>

      {/* ------------------- MODO NORMAL ------------------- */}
      {mode === "normal" && (
        <Card className="p-4 space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <textarea
            className="w-full h-44 p-2 border rounded-md text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            value={text}
            onChange={(e) => handleChangeNormal(e.target.value)}
            placeholder="Empieza a escribir aquí..."
          />

          <button
            onClick={resetNormal}
            className="px-3 py-1.5 rounded-md bg-gray-800 text-white text-xs hover:bg-gray-900 transition"
          >
            Reiniciar sesión
          </button>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <Metric label="Palabras" value={wordCount} />
            <Metric label="Caracteres" value={charCount} />
            <Metric label="Líneas" value={lineCount} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <MetricTime label="Tiempo" value={elapsedMs} />
            <MetricColored label="WPM" value={wpm} color="green" />
            <MetricColored label="CPM" value={cpm} color="purple" />
          </div>
        </Card>
      )}

      {/* ------------------- MODO TEST ------------------- */}
      {mode === "test" && (
        <Card className="p-4 space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                Test de escritura automático
              </div>
              <div className="text-sm text-gray-700 dark:text-slate-300">
                El test empieza al pulsar la primera tecla.
              </div>
            </div>

            <div className="px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 text-center">
              <div className="text-[10px] uppercase text-blue-700 dark:text-blue-300">
                Tiempo restante
              </div>
              <div className="font-semibold text-lg text-blue-900 dark:text-blue-100">
                {formatTime(remainingMs)}
              </div>
            </div>
          </div>

          <textarea
            ref={testTextareaRef}
            className="w-full h-40 p-2 border rounded-md text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            value={testText}
            onChange={(e) => handleTestTyping(e.target.value)}
            placeholder="Escribe para comenzar el test automáticamente..."
            disabled={testFinished}
            autoFocus
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Metric label="Palabras" value={testWordCount} />
            <Metric label="Caracteres" value={testCharCount} />
            <MetricColored label="WPM" value={testWpm} color="green" />
            <MetricColored label="CPM" value={testCpm} color="purple" />
          </div>

          <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md text-xs text-gray-700 dark:text-slate-300">
            {testFinished
              ? `Test finalizado: ${testWordCount} palabras en 1 minuto → ${testWpm.toFixed(
                  1
                )} WPM.`
              : testRunning
              ? "Escribe sin parar…"
              : "El test comenzará al presionar la primera tecla."}
          </div>

          {testFinished && (
            <button
              onClick={resetTest}
              className="px-4 py-2 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition"
            >
              Repetir test
            </button>
          )}
        </Card>
      )}
    </ToolTemplate>
  );
}

/* ---- COMPONENTES PEQUEÑOS REUSABLES ---- */

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div className="px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-md">
      <div className="text-xs text-gray-500 dark:text-slate-400">{label}</div>
      <div className="font-semibold text-lg text-slate-900 dark:text-slate-50">
        {value}
      </div>
    </div>
  );
}

function MetricColored({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "purple";
}) {
  const colors =
    color === "green"
      ? "bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 text-green-900 dark:text-green-100"
      : "bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 text-purple-900 dark:text-purple-100";

  const labelColor =
    color === "green"
      ? "text-green-700 dark:text-green-300"
      : "text-purple-700 dark:text-purple-300";

  return (
    <div className={`px-3 py-2 rounded-md ${colors}`}>
      <div className={`text-xs ${labelColor}`}>{label}</div>
      <div className="font-semibold text-lg">{value.toFixed(1)}</div>
    </div>
  );
}

function MetricTime({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-3 py-2 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-md">
      <div className="text-xs text-blue-700 dark:text-blue-300">{label}</div>
      <div className="font-semibold text-lg text-blue-900 dark:text-blue-100">
        {formatTime(value)}
      </div>
    </div>
  );
}
