import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent,
} from "react";

interface CommandItem {
  label: string;
  href: string;
  group: string;
  keywords?: string;
}

interface CommandPaletteProps {
  pages: { label: string; href: string }[];
  projects: { id: number; slug: string; title: string }[];
  articles: { id: number; title: string; href: string }[];
}

export default function CommandPalette({
  pages,
  projects,
  articles,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: CommandItem[] = [
    ...pages.map((p) => ({ label: p.label, href: p.href, group: "Pages" })),
    ...projects.map((p) => ({
      label: p.title,
      href: `/case-studies/${p.slug}`,
      group: "Case Studies",
    })),
    ...articles.map((a) => ({
      label: a.title,
      href: a.href,
      group: "Articles",
    })),
    { label: "Download Resume", href: "/resume", group: "Actions" },
  ];

  const filtered = query.trim()
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q) ||
          (item.keywords && item.keywords.toLowerCase().includes(q))
        );
      })
    : items;

  const reset = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") reset();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [reset]);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-command-palette", openHandler);
    return () =>
      window.removeEventListener("open-command-palette", openHandler);
  }, []);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      window.location.href = filtered[activeIndex].href;
      reset();
    }
  };

  const grouped = filtered.reduce<Record<string, CommandItem[]>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {},
  );

  let globalIndex = 0;

  return (
    <>
      {open && (
        <div
          className="bg-ink-950/50 fixed inset-0 z-50 flex items-start justify-center pt-[15vh] backdrop-blur-sm"
          onClick={reset}
          onKeyDown={(e) => {
            if (e.key === "Escape") reset();
          }}
          role="presentation"
        >
          <div
            className="w-full max-w-lg rounded-[20px] border border-paper-200 bg-surface shadow-card"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            tabIndex={-1}
          >
            <div className="flex items-center gap-3 border-b border-paper-200 px-5 py-4">
              <svg
                className="h-5 w-5 shrink-0 text-ink-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, case studies, articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={navigate}
                className="flex-1 bg-transparent text-base text-ink-950 outline-none placeholder:text-ink-500"
                aria-controls="command-palette-results"
              />
              <kbd className="hidden rounded-md border border-paper-200 bg-paper-50 px-2 py-0.5 text-xs text-ink-500 sm:inline-block">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              id="command-palette-results"
              className="max-h-80 overflow-y-auto p-2"
              role="listbox"
              tabIndex={-1}
              aria-activedescendant={
                filtered[activeIndex] ? `cmd-item-${activeIndex}` : undefined
              }
            >
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-ink-500">
                  No results found.
                </p>
              )}

              {Object.entries(grouped).map(([group, groupItems]) => (
                <div key={group}>
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    const currentIndex = globalIndex++;
                    return (
                      <a
                        key={`${item.group}-${item.label}`}
                        id={`cmd-item-${currentIndex}`}
                        href={item.href}
                        role="option"
                        aria-selected={currentIndex === activeIndex}
                        className={`flex items-center rounded-2xl px-4 py-3 text-sm transition ${
                          currentIndex === activeIndex
                            ? "bg-accent-100 text-accent-700"
                            : "text-ink-700 hover:bg-paper-50 hover:text-ink-950"
                        }`}
                        onClick={reset}
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
