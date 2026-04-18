import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Giraffe CRM — Knock, Quote, Close." },
      {
        name: "description",
        content:
          "Field sales CRM built for door-to-door window cleaning. A conversion engine, not enterprise bloat. Every door counts.",
      },
      { property: "og:title", content: "Giraffe CRM — Knock, Quote, Close." },
      {
        property: "og:description",
        content: "Field sales CRM for door-to-door window cleaning crews.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const APP_URL = "https://app.holygiraffe.com/login";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="w-4 h-4 inline-block"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <HeatmapSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b-2 border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Wordmark />
        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            className="hidden sm:inline-flex t-label text-foreground hover:text-primary"
          >
            Sign in
          </a>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 bg-foreground text-background border-2 border-foreground px-3 py-2 sm:px-4 t-label hover:bg-primary hover:border-primary transition-colors whitespace-nowrap"
          >
            Start knocking <Arrow />
          </a>
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2 min-w-0">
      <img src="/logo.png" alt="Giraffe CRM" width={32} height={32} className="w-7 h-7 sm:w-9 sm:h-9 shrink-0" />
      <span className="font-display text-xl sm:text-3xl text-brand truncate">Giraffe!</span>
    </Link>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="border-b-4 border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 t-label">
              <span className="w-2 h-2 bg-primary" />
              Field CRM · Door-to-door sales teams
            </div>
            <h1 className="t-hero">
              Knock.<br />
              Quote.<br />
              <span className="text-primary">Close.</span>
            </h1>
            <p className="t-body max-w-md text-muted-foreground [overflow-wrap:anywhere]">
              The field sales CRM for door-to-door teams.
              Map the route, quote on the porch, close before you walk away.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground border-2 border-foreground px-6 py-4 t-label hover:bg-foreground hover:text-background transition-colors"
              >
                Start knocking <Arrow />
              </a>
              <a
                href={APP_URL}
                className="inline-flex items-center gap-3 bg-background text-foreground border-2 border-foreground px-6 py-4 t-label hover:bg-foreground hover:text-background transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hidden sm:block">
              <ContributionGrid />
            </div>
            <div className="sm:hidden">
              <MobileContributionGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mobile Contribution Grid (12 weeks) ---------- */
/* ---------- Mobile month-grid building blocks ---------- */
const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Returns the last `count` months in chronological order (oldest → newest),
// each with: name, year, daysInMonth, leadingBlanks (Mon-start week offset).
function getRecentMonths(count: number, refDate = new Date()) {
  const months: { name: string; year: number; daysInMonth: number; leadingBlanks: number; monthIndex: number }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(refDate.getFullYear(), refDate.getMonth() - i, 1);
    const monthIndex = d.getMonth();
    const year = d.getFullYear();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    // Convert Sun=0..Sat=6 → Mon=0..Sun=6
    const jsDay = new Date(year, monthIndex, 1).getDay();
    const leadingBlanks = (jsDay + 6) % 7;
    months.push({ name: MONTH_NAMES[monthIndex], year, daysInMonth, leadingBlanks, monthIndex });
  }
  return months;
}

function MonthCalendar({
  month,
  values,
  cellSizeClass = "aspect-square",
}: {
  month: { name: string; year: number; daysInMonth: number; leadingBlanks: number };
  values: number[];
  cellSizeClass?: string;
}) {
  const totalCells = month.leadingBlanks + month.daysInMonth;
  const trailingBlanks = (7 - (totalCells % 7)) % 7;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <div className="font-display text-xl leading-none">{month.name}</div>
        <div className="t-label text-muted-foreground">{month.year}</div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAY_LABELS.map((d, i) => (
          <div key={i} className="t-label text-muted-foreground text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: month.leadingBlanks }).map((_, i) => (
          <div key={`lb-${i}`} className={cellSizeClass} />
        ))}
        {Array.from({ length: month.daysInMonth }).map((_, i) => (
          <div
            key={`d-${i}`}
            className={`${cellSizeClass} border-2 border-foreground/20 rounded-md`}
            style={{ backgroundColor: `var(--heat-${values[i] ?? 0})` }}
          />
        ))}
        {Array.from({ length: trailingBlanks }).map((_, i) => (
          <div key={`tb-${i}`} className={cellSizeClass} />
        ))}
      </div>
    </div>
  );
}

// Deterministic activity values per month (0..5) using a seeded LCG.
function generateMonthValues(daysInMonth: number, seed: number, ramp: number) {
  let s = seed;
  const out: number[] = [];
  for (let i = 0; i < daysInMonth; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const x = r + ramp;
    const v =
      x < 0.4 ? 0 :
      x < 0.62 ? 1 :
      x < 0.8 ? 2 :
      x < 0.91 ? 3 :
      x < 0.97 ? 4 : 5;
    out.push(v);
  }
  return out;
}

function MobileContributionGrid() {
  // Single continuous 90-day grid — 18 cols × 5 rows. Horizontally scrollable.
  const cols = 18;
  const rows = 5;
  const total = cols * rows; // 90
  const cellSize = 28; // px — large, readable
  const gap = 6;
  const cells: number[] = [];
  let seed = 19;
  for (let i = 0; i < total; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const ramp = i / total;
    const boost = ramp * 0.4;
    const x = r + boost;
    const v =
      x < 0.4 ? 0 :
      x < 0.62 ? 1 :
      x < 0.8 ? 2 :
      x < 0.91 ? 3 :
      x < 0.97 ? 4 : 5;
    cells.push(v);
  }
  const totals = [0, 0, 0, 0, 0, 0];
  cells.forEach((v) => totals[v]++);
  const knocks = cells.length;
  const closes = totals[4] + totals[5];

  return (
    <div className="border-2 border-foreground bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="t-label">Last 90 days</div>
        <div className="t-label text-muted-foreground">Scroll →</div>
      </div>

      <div
        className="overflow-x-auto -mx-4 px-4 pb-2"
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x proximity",
          overscrollBehaviorX: "contain",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            gridAutoFlow: "row",
            gap: `${gap}px`,
            width: "max-content",
          }}
        >
          {cells.map((v, i) => (
            <div
              key={i}
              className="border border-foreground/15 rounded-[3px]"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: `var(--heat-${v})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-foreground flex items-end justify-between gap-4">
        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
          <Stat n={knocks.toLocaleString()} label="Knocks" />
          <Stat n={closes.toLocaleString()} label="Closed" />
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((lvl) => (
            <span
              key={lvl}
              className="w-3 h-3 border border-foreground/15"
              style={{ backgroundColor: `var(--heat-${lvl})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Contribution Grid (365 days) ---------- */
function ContributionGrid() {
  // 53 weeks × 7 days = 371 cells (covers a full year)
  const weeks = 53;
  const days = 7;
  const total = weeks * days;
  const cells: number[] = [];
  let seed = 11;
  for (let i = 0; i < total; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    // Skew: lots of 0/1, fewer high values; ramp upward over the year
    const ramp = i / total; // 0 → 1
    const boost = ramp * 0.35;
    const x = r + boost;
    const v =
      x < 0.45 ? 0 :
      x < 0.65 ? 1 :
      x < 0.82 ? 2 :
      x < 0.92 ? 3 :
      x < 0.98 ? 4 : 5;
    cells.push(v);
  }
  const totals = [0, 0, 0, 0, 0, 0];
  cells.forEach((v) => totals[v]++);
  const knocks = cells.length;
  const closes = totals[4] + totals[5];

  return (
    <div className="border-2 border-foreground bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="t-label">Last 365 days</div>
        <div className="t-label text-muted-foreground">Sample</div>
      </div>

      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
          gridAutoFlow: "column",
          gridTemplateRows: `repeat(${days}, 1fr)`,
        }}
      >
        {cells.map((v, i) => (
          <div
            key={i}
            className="aspect-square border border-foreground/15"
            style={{ backgroundColor: `var(--heat-${v})` }}
          />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t-2 border-foreground flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <Stat n={knocks.toLocaleString()} label="Knocks" />
          <Stat n={closes.toLocaleString()} label="Closed" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="t-label text-muted-foreground mr-1">Less</span>
          {[0, 1, 2, 3, 4, 5].map((lvl) => (
            <span
              key={lvl}
              className="w-3 h-3 border border-foreground/15"
              style={{ backgroundColor: `var(--heat-${lvl})` }}
            />
          ))}
          <span className="t-label text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="t-stat">{n}</div>
      <div className="t-label text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

/* ---------- Problem (DARK section) ---------- */
function Problem() {
  return (
    <section className="dark bg-background text-foreground border-b-4 border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="t-label text-primary mb-6 sm:mb-8">The problem</div>
        <h2 className="t-section max-w-5xl">
          Your CRM wasn't built for the{" "}
          <span className="text-primary">doorstep.</span>
        </h2>
        <div className="mt-10 sm:mt-16 grid md:grid-cols-3 gap-px bg-foreground/20">
          {[
            { k: "Spreadsheets", v: "Lose half your leads to a notes app you'll never re-open." },
            { k: "Enterprise CRM", v: "47 fields per contact. You needed 3. The deal walked." },
            { k: "Pen & paper", v: "Rain. Wind. Memory. The quote you wrote yesterday is gone." },
          ].map((p) => (
            <div key={p.k} className="bg-background p-6 sm:p-8">
              <div className="t-label text-primary mb-3">{p.k}</div>
              <p className="t-display-sm [overflow-wrap:anywhere]">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Knock", b: "Drop a pin. Log the answer in one tap. Move to the next door without breaking stride." },
    { n: "02", t: "Quote", b: "Window count, frequency, add-ons. A price the homeowner trusts, on the screen, in 30 seconds." },
    { n: "03", t: "Close", b: "Sign with a finger. Card on file. Job booked and on the calendar before you reach the truck." },
  ];
  return (
    <section className="border-b-4 border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="t-label mb-6 sm:mb-8">How it works</div>
        <h2 className="t-section max-w-4xl mb-10 sm:mb-16">
          Three taps. <span className="text-primary">One sale.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-foreground border-2 border-foreground">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-6 sm:p-8 lg:p-10">
              <div className="t-step text-primary mb-6 sm:mb-8 font-mono">
                {s.n}
              </div>
              <div className="t-step mb-4 sm:mb-6">{s.t}.</div>
              <p className="t-body text-muted-foreground [overflow-wrap:anywhere]">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- The Heatmap (signature visual) ---------- */
function HeatmapSection() {
  return (
    <section className="bg-secondary border-b-4 border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 space-y-10 sm:space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="t-label text-primary mb-6 sm:mb-8">The Heatmap</div>
            <h2 className="t-section">
              See your year.<br />
              Every knock<br />
              <span className="text-primary">counted.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="t-body text-muted-foreground border-l-4 border-foreground pl-5 [overflow-wrap:anywhere]">
              Cold doors fade. Warm leads glow. Closes burn bright. Walk into
              tomorrow knowing exactly where the money lives — and which streets
              are still cold.
            </p>
          </div>
        </div>

        <div className="hidden sm:block">
          <BigContributionGrid />
        </div>
        <div className="sm:hidden">
          <MobileHeatmap />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground border-2 border-foreground">
          {[
            { n: "2,847", l: "Doors knocked" },
            { n: "612", l: "Quotes given" },
            { n: "238", l: "Deals closed" },
            { n: "$84,210", l: "Revenue booked" },
          ].map((s) => (
            <div key={s.l} className="bg-background p-4 sm:p-6">
              <div className="t-stat whitespace-nowrap">{s.n}</div>
              <div className="t-label text-muted-foreground mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileHeatmap() {
  // Single continuous 90-day grid — 18 cols × 5 rows. Horizontally scrollable, larger cells.
  const cols = 18;
  const rows = 5;
  const total = cols * rows; // 90
  const cellSize = 36; // px — bigger for the signature section
  const gap = 8;
  const cells: number[] = [];
  let seed = 47;
  for (let i = 0; i < total; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const ramp = i / total;
    const boost = ramp * 0.45;
    const x = r + boost;
    const v =
      x < 0.38 ? 0 :
      x < 0.6 ? 1 :
      x < 0.78 ? 2 :
      x < 0.9 ? 3 :
      x < 0.97 ? 4 : 5;
    cells.push(v);
  }

  return (
    <div className="border-2 border-foreground bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="t-label">Last 90 days</div>
        <div className="t-label text-muted-foreground">Scroll →</div>
      </div>

      <div
        className="overflow-x-auto -mx-5 px-5 pb-1"
        style={{ scrollbarWidth: "thin" }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            gridAutoFlow: "row",
            gap: `${gap}px`,
            width: "max-content",
          }}
        >
          {cells.map((v, i) => (
            <div
              key={i}
              className="border border-foreground/20 rounded-[3px]"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: `var(--heat-${v})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t-2 border-foreground flex items-center justify-between gap-3">
        <div className="t-label text-muted-foreground">Activity</div>
        <div className="flex items-center gap-1.5">
          <span className="t-label text-muted-foreground mr-1">Less</span>
          {[0, 1, 2, 3, 4, 5].map((lvl) => (
            <span
              key={lvl}
              className="w-3.5 h-3.5 border border-foreground/15"
              style={{ backgroundColor: `var(--heat-${lvl})` }}
            />
          ))}
          <span className="t-label text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  );
}

function BigContributionGrid() {
  const weeks = 53;
  const days = 7;
  const total = weeks * days;
  const cells: number[] = [];
  let seed = 31;
  for (let i = 0; i < total; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const ramp = i / total;
    const boost = ramp * 0.4;
    const x = r + boost;
    const v =
      x < 0.4 ? 0 :
      x < 0.6 ? 1 :
      x < 0.8 ? 2 :
      x < 0.9 ? 3 :
      x < 0.97 ? 4 : 5;
    cells.push(v);
  }
  return (
    <div className="border-2 border-foreground bg-card p-6 lg:p-8">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
          gridAutoFlow: "column",
          gridTemplateRows: `repeat(${days}, 1fr)`,
        }}
      >
        {cells.map((v, i) => (
          <div
            key={i}
            className="aspect-square border border-foreground/15"
            style={{ backgroundColor: `var(--heat-${v})` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="bg-primary text-primary-foreground border-b-4 border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 text-center">
        <div className="t-label mb-6 sm:mb-8">Ready?</div>
        <h2 className="t-hero">
          Start knocking.
        </h2>
        <p className="mt-6 sm:mt-8 t-body max-w-md mx-auto opacity-90 [overflow-wrap:anywhere]">
          14-day free trial. No credit card. Knock today, close tomorrow.
        </p>
        <a
          href={APP_URL}
          className="mt-10 sm:mt-12 inline-flex items-center gap-3 bg-foreground text-background border-2 border-foreground px-6 py-4 sm:px-8 sm:py-5 t-label hover:bg-background hover:text-foreground transition-colors"
        >
          Open the app <Arrow />
        </a>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="/logo.png" alt="" width={28} height={28} className="w-7 h-7 shrink-0" />
          <span className="font-display text-2xl sm:text-3xl text-brand leading-none">Giraffe!</span>
          <span className="t-label text-muted-foreground ml-3 shrink-0">
            © {new Date().getFullYear()}
          </span>
        </div>
        <a
          href={APP_URL}
          className="t-label text-center [overflow-wrap:anywhere] hover:text-primary transition-colors"
        >
          app.holygiraffe.com <Arrow />
        </a>
      </div>
    </footer>
  );
}

