import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import RfcLayout from "../components/RfcLayout";

const answer = "HORSE";
const max = 6;

type TileState = "empty" | "tbd" | "absent" | "present" | "correct";
type GameState = "playing" | "won" | "lost";

const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
] as const;

function evaluateGuess(guess: string): TileState[] {
  const result: TileState[] = Array(5).fill("absent");
  const remaining = answer.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === remaining[i]) {
      result[i] = "correct";
      remaining[i] = "";
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = "present";
      remaining[idx] = "";
    }
  }

  return result;
}

function tileColor(state: TileState) {
  switch (state) {
    case "correct":
      return "bg-green-600 text-white border-green-600";
    case "present":
      return "bg-yellow-500 text-white border-yellow-500";
    case "absent":
      return "bg-stone-500 text-white border-stone-500";
    default:
      return "bg-white text-stone-900 border-stone-300";
  }
}

function keyColor(state: TileState) {
  switch (state) {
    case "correct":
      return "bg-green-600 text-white";
    case "present":
      return "bg-yellow-500 text-white";
    case "absent":
      return "bg-stone-400 text-white";
    default:
      return "bg-stone-200 text-stone-900";
  }
}

function Wordle() {
  const [guess, setGuess] = createSignal("");
  const [guesses, setGuesses] = createSignal<string[]>([]);
  const [evaluations, setEvaluations] = createSignal<TileState[][]>([]);
  const [gameState, setGameState] = createSignal<GameState>("playing");
  const [keyStates, setKeyStates] = createSignal<Record<string, TileState>>({});

  function submitGuess() {
    if (guess().length !== 5) return;
    if (gameState() !== "playing") return;

    const evalResult = evaluateGuess(guess());
    setEvaluations([...evaluations(), evalResult]);
    setGuesses([...guesses(), guess()]);

    const nextKeyStates = { ...keyStates() };
    const best = (a: TileState, b: TileState) => {
      const rank: Record<TileState, number> = {
        correct: 3,
        present: 2,
        absent: 1,
        tbd: 0,
        empty: 0,
      };

      return rank[a] > rank[b] ? a : b;
    };

    guess()
      .split("")
      .forEach((c, i) => {
        nextKeyStates[c] = best(nextKeyStates[c] ?? "empty", evalResult[i]);
      });

    setKeyStates(nextKeyStates);

    if (guess() === answer) {
      setGameState("won");
    } else if (guesses().length >= max) {
      setGameState("lost");
    }

    setGuess("");
  }

  function handleKey(key: string) {
    if (gameState() !== "playing") return;

    if (key === "Enter") {
      submitGuess();
    } else if (key === "Backspace") {
      setGuess(guess().slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && guess().length < 5) {
      setGuess(guess() + key.toUpperCase());
    }
  }

  function reset() {
    setGuess("");
    setGuesses([]);
    setEvaluations([]);
    setGameState("playing");
    setKeyStates({});
  }

  function grid() {
    const result: { letter: string; state: TileState }[] = [];

    for (let i = 0; i < max; i++) {
      for (let j = 0; j < 5; j++) {
        if (i < guesses().length) {
          result.push({ letter: guesses()[i][j], state: evaluations()[i][j] });
        } else if (i === guesses().length) {
          result.push({ letter: guess()[j] ?? "", state: "tbd" });
        } else {
          result.push({ letter: "", state: "empty" });
        }
      }
    }

    return result;
  }

  createEffect(() => {
    const handler = (e: KeyboardEvent) => {
      handleKey(e.key);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div class="flex flex-col items-center gap-6">
      <h1 class="text-xl font-bold">Wordle</h1>
      <div class="grid grid-cols-5 gap-1.5">
        <For each={grid()}>
          {(cell) => (
            <div
              class={`w-12 h-12 flex items-center justify-center text-lg font-bold border-1 rounded-sm transition-colors duration-300 ${tileColor(cell.state)}`}
            >
              {cell.letter}
            </div>
          )}
        </For>
      </div>

      <div class="flex flex-col gap-1.5 items-center">
        <For each={keyboard}>
          {(row) => (
            <div class="flex gap-1">
              <For each={row}>
                {(key) => (
                  <button
                    type="button"
                    onClick={() => handleKey(key)}
                    class={`px-3 py-3 text-xs font-bold rounded cursor-pointer select-none uppercase ${keyColor(keyStates()[key] ?? "empty")}`}
                  >
                    {key === "Backspace" ? "\u2190" : key}
                  </button>
                )}
              </For>
            </div>
          )}
        </For>
      </div>

      <Show when={gameState() !== "playing"}>
        <div class="text-center">
          <p class="text-lg font-bold">
            {gameState() === "won" ? "You got it!" : `The word was ${answer}`}
          </p>
          <button
            type="button"
            onClick={reset}
            class="mt-4 px-4 py-2 bg-stone-800 text-stone-100 rounded text-sm font-bold cursor-pointer"
          >
            Play again
          </button>
        </div>
      </Show>
    </div>
  );
}

function WordlePage() {
  return (
    <RfcLayout>
      <A
        href="/"
        class="inline-block text-xs text-stone-500 hover:underline mb-6"
      >
        &larr; Back to index
      </A>
      <Wordle />
    </RfcLayout>
  );
}

export default WordlePage;
