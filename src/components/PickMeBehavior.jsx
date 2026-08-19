import * as React from "react";
import {
  ArrowLeft,
  Check,
  Flame,
  Lightbulb,
  Lock,
  Sparkles,
  X,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast";
import { categories } from "@/data/pickMeBehavior";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D"];

/**
 * Renders `backticked` fragments of a question as inline code chips so
 * markup like `<body bgcolor="chucknorris">` reads as code on the projector.
 */
function RichText({ text }) {
  return text.split(/(`[^`]+`)/g).map((chunk, index) =>
    chunk.startsWith("`") && chunk.endsWith("`") && chunk.length > 2 ? (
      <code
        key={index}
        className="rounded-lg bg-mp-hot-soft px-3 py-1 font-mono text-[0.85em] font-semibold text-mp-hot"
      >
        {chunk.slice(1, -1)}
      </code>
    ) : (
      <React.Fragment key={index}>{chunk}</React.Fragment>
    )
  );
}

const WRONG_CALLOUTS = [
  "Wrong!",
  "Nope. Try again.",
  "Not it, chief.",
  "Absolutely not.",
];

/* ------------------------------------------------------------------ */
/* View 1 — The Main Board                                            */
/* ------------------------------------------------------------------ */

function CategoryTile({ category, isCompleted, onSelect, index }) {
  return (
    <Card
      className={cn(
        "group relative flex min-h-tile flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-tile p-gutter",
        "animate-board-in transition-all duration-300 ease-stage",
        "hover:-translate-y-2 hover:border-mp-accent hover:bg-mp-ink-hover hover:shadow-tile-hover",
        isCompleted &&
          "pointer-events-none cursor-default border-mp-ink-line/60 bg-mp-ink-base opacity-40 grayscale"
      )}
      style={{ animationDelay: `${index * 70}ms` }}
      role="button"
      tabIndex={isCompleted ? -1 : 0}
      aria-disabled={isCompleted}
      aria-label={`${category.edgyTitle}${isCompleted ? " — already played" : ""}`}
      onClick={() => !isCompleted && onSelect(category.id)}
      onKeyDown={(event) => {
        if (isCompleted) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(category.id);
        }
      }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-eyebrow text-mp-hot">
          {String(index + 1).padStart(2, "0")}
        </span>
        {isCompleted ? (
          <Lock className="h-7 w-7 text-mp-ink-muted" />
        ) : (
          <Flame className="h-7 w-7 text-mp-ink-muted transition-colors duration-300 group-hover:text-mp-accent" />
        )}
      </div>

      <h2
        className={cn(
          "font-display text-display-md text-balance text-mp-paper-base transition-colors duration-300",
          !isCompleted && "group-hover:text-mp-accent"
        )}
      >
        {category.edgyTitle}
      </h2>

      <p className="text-eyebrow uppercase text-mp-ink-muted">
        {isCompleted ? "Played" : "Select to reveal"}
      </p>

      {/* accent wash on hover */}
      <span className="pointer-events-none absolute inset-0 bg-mp-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
}

function MainBoard({ completedCategories, onSelect }) {
  const [firstRow, secondRow] = [categories.slice(0, 3), categories.slice(3)];
  const remaining = categories.length - completedCategories.length;

  return (
    <div className="flex min-h-screen flex-col px-stage py-gutter-lg">
      <header className="flex flex-col items-center gap-6 pb-gutter-lg text-center">
        <span className="flex items-center gap-3 rounded-pill border border-mp-ink-line px-6 py-3 text-eyebrow uppercase text-mp-hot">
          <Sparkles className="h-4 w-4" />
          Design Team Trivia
        </span>
        <h1 className="font-display text-display-xl uppercase text-mp-paper-base">
          Pick Me <span className="text-mp-accent">Behavior</span>
        </h1>
        <p className="text-body-xl text-mp-paper-dim">
          Five categories. Zero shame.{" "}
          <span className="text-mp-paper-base">
            {remaining} {remaining === 1 ? "category" : "categories"} left.
          </span>
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center gap-gutter">
        <div className="grid gap-gutter md:grid-cols-3">
          {firstRow.map((category, index) => (
            <CategoryTile
              key={category.id}
              index={index}
              category={category}
              isCompleted={completedCategories.includes(category.id)}
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Row 2 is centred by spanning a 6-column grid: cols 2-3 and 4-5. */}
        <div className="grid gap-gutter md:grid-cols-6">
          {secondRow.map((category, index) => (
            <div
              key={category.id}
              className={cn("flex md:col-span-2", index === 0 && "md:col-start-2")}
            >
              <CategoryTile
                index={index + 3}
                category={category}
                isCompleted={completedCategories.includes(category.id)}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="pt-gutter-lg text-center text-eyebrow uppercase text-mp-ink-muted">
        Host mode — press 1–5 to open a category
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* View 2 — The Active Question                                        */
/* ------------------------------------------------------------------ */

function OptionButton({ index, option, state, onGuess }) {
  return (
    <button
      type="button"
      disabled={state === "correct" || state === "wrong"}
      onClick={() => onGuess(index)}
      aria-label={`Option ${OPTION_LETTERS[index]}: ${option}`}
      className={cn(
        "group flex min-h-answer w-full items-center gap-8 rounded-card border-2 p-gutter text-left",
        "transition-all duration-200 ease-stage animate-stage-in",
        state === "idle" &&
          "border-mp-ink-line bg-mp-ink-raised hover:-translate-y-1 hover:border-mp-accent hover:bg-mp-ink-hover hover:shadow-tile-hover",
        state === "wrong" &&
          "animate-shake cursor-not-allowed border-mp-wrong bg-mp-wrong-soft opacity-60 shadow-wrong",
        state === "correct" &&
          "animate-pop border-mp-correct bg-mp-correct-soft shadow-correct",
        state === "locked" && "cursor-not-allowed border-mp-ink-line opacity-30"
      )}
      style={{ animationDelay: state === "idle" ? `${120 + index * 60}ms` : undefined }}
    >
      <span
        className={cn(
          "flex h-16 w-16 shrink-0 items-center justify-center rounded-pill font-display text-display-md transition-colors duration-200",
          state === "idle" &&
            "bg-mp-ink-hover text-mp-paper-dim group-hover:bg-mp-accent group-hover:text-mp-ink-base",
          state === "wrong" && "bg-mp-wrong text-mp-paper-pure",
          state === "correct" && "bg-mp-correct text-mp-correct-ink",
          state === "locked" && "bg-mp-ink-hover text-mp-ink-muted"
        )}
      >
        {state === "wrong" ? (
          <X className="h-8 w-8" strokeWidth={3} />
        ) : state === "correct" ? (
          <Check className="h-8 w-8" strokeWidth={3} />
        ) : (
          OPTION_LETTERS[index]
        )}
      </span>

      <span className="text-body-xl font-medium text-balance text-mp-paper-base">
        {option}
      </span>
    </button>
  );
}

function QuestionStage({
  category,
  guesses,
  isSolved,
  onGuess,
  onBack,
}) {
  /* The fact is the payoff — make sure the room actually sees it. Waiting for
     the expand animation to finish means we measure the panel at full height
     instead of mid-collapse. */
  const revealExplanation = (event) => {
    if (event.animationName.startsWith("expand-down")) {
      event.currentTarget.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const optionState = (index) => {
    if (isSolved) {
      if (index === category.correctOptionIndex) return "correct";
      return guesses.includes(index) ? "wrong" : "locked";
    }
    return guesses.includes(index) ? "wrong" : "idle";
  };

  return (
    <div className="flex min-h-screen flex-col px-stage py-gutter-lg">
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
        <Button variant="ghost" size="lg" onClick={onBack} className="self-start">
          <ArrowLeft className="h-5 w-5" />
          Back to Board
        </Button>

        {/* Bait-and-switch reveal */}
        <div className="animate-stage-in border-b-2 border-mp-ink-line pb-gutter pt-gutter-lg">
          <div className="flex flex-wrap items-center gap-5 text-eyebrow uppercase">
            <span className="text-mp-ink-muted">Category</span>
            <span className="text-mp-paper-dim line-through decoration-mp-wrong decoration-4">
              {category.edgyTitle}
            </span>
            <span className="text-mp-hot">➔</span>
            <span
              className="rounded-pill bg-mp-accent px-6 py-3 text-mp-ink-base"
              style={{ animationDelay: "160ms" }}
            >
              {category.realSubject}
            </span>
          </div>

          <h2
            className="mt-gutter font-display text-display-lg text-balance text-mp-paper-base animate-stage-in"
            style={{ animationDelay: "80ms" }}
          >
            <RichText text={category.question} />
          </h2>
        </div>

        {/* Options */}
        <div className="grid flex-1 content-center gap-gutter py-gutter-lg md:grid-cols-2">
          {category.options.map((option, index) => (
            <OptionButton
              key={option}
              index={index}
              option={option}
              state={optionState(index)}
              onGuess={onGuess}
            />
          ))}
        </div>

        {/* Fact explanation — expands only once solved */}
        {isSolved ? (
          <Alert
            variant="success"
            onAnimationEnd={revealExplanation}
            className="animate-expand-down overflow-hidden"
          >
            <div className="flex items-start gap-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-pill bg-mp-correct text-mp-correct-ink">
                <Lightbulb className="h-8 w-8" strokeWidth={2.5} />
              </span>
              <div className="flex flex-col gap-3">
                <AlertTitle>Correct — here&apos;s the real story</AlertTitle>
                <AlertDescription>{category.factExplanation}</AlertDescription>
              </div>
            </div>
            <Button onClick={onBack} size="lg" className="mt-gutter">
              Back to Board
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Button>
          </Alert>
        ) : (
          <p className="pb-gutter text-center text-eyebrow uppercase text-mp-ink-muted">
            Host — press A–D or 1–4 to lock in the team&apos;s shout · Esc to go back
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game shell — state, keyboard hosting, feedback                      */
/* ------------------------------------------------------------------ */

function Game() {
  const { toast } = useToast();

  const [activeCategory, setActiveCategory] = React.useState(null); // category id | null
  const [selectedOptions, setSelectedOptions] = React.useState({}); // { [categoryId]: number[] }
  const [completedCategories, setCompletedCategories] = React.useState([]); // categoryId[]

  const category = React.useMemo(
    () => categories.find((item) => item.id === activeCategory) ?? null,
    [activeCategory]
  );

  const guesses = activeCategory ? selectedOptions[activeCategory] ?? [] : [];
  const isSolved = activeCategory ? completedCategories.includes(activeCategory) : false;

  const openCategory = React.useCallback(
    (categoryId) => {
      if (completedCategories.includes(categoryId)) return;
      setActiveCategory(categoryId);
    },
    [completedCategories]
  );

  const backToBoard = React.useCallback(() => setActiveCategory(null), []);

  const handleGuess = React.useCallback(
    (optionIndex) => {
      if (!category || isSolved) return;
      if ((selectedOptions[category.id] ?? []).includes(optionIndex)) return;

      const isCorrect = optionIndex === category.correctOptionIndex;

      if (isCorrect) {
        setCompletedCategories((current) =>
          current.includes(category.id) ? current : [...current, category.id]
        );
        toast({
          variant: "success",
          title: "Correct!",
          description: category.realSubject,
        });
        return;
      }

      // Wrong: record the guess so the option locks red, question stays live.
      setSelectedOptions((current) => ({
        ...current,
        [category.id]: [...(current[category.id] ?? []), optionIndex],
      }));
      toast({
        variant: "destructive",
        title: WRONG_CALLOUTS[(selectedOptions[category.id] ?? []).length % WRONG_CALLOUTS.length],
        description: "Keep guessing — the board is still live.",
      });
    },
    [category, isSolved, selectedOptions, toast]
  );

  /* Host keyboard shortcuts: no hunting for the trackpad mid-presentation. */
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();

      if (!activeCategory) {
        const boardIndex = Number(key) - 1;
        if (Number.isInteger(boardIndex) && categories[boardIndex]) {
          event.preventDefault();
          openCategory(categories[boardIndex].id);
        }
        return;
      }

      if (key === "escape" || key === "backspace") {
        event.preventDefault();
        backToBoard();
        return;
      }

      const letterIndex = OPTION_LETTERS.indexOf(key.toUpperCase());
      const numberIndex = Number(key) - 1;
      const optionIndex = letterIndex >= 0 ? letterIndex : numberIndex;

      if (Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < 4) {
        event.preventDefault();
        handleGuess(optionIndex);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCategory, backToBoard, handleGuess, openCategory]);

  return (
    <main className="min-h-screen bg-mp-ink-base grain">
      {category ? (
        <QuestionStage
          key={category.id}
          category={category}
          guesses={guesses}
          isSolved={isSolved}
          onGuess={handleGuess}
          onBack={backToBoard}
        />
      ) : (
        <MainBoard completedCategories={completedCategories} onSelect={openCategory} />
      )}
    </main>
  );
}

export default function PickMeBehavior() {
  return (
    <ToastProvider>
      <Game />
      <Toaster />
    </ToastProvider>
  );
}
