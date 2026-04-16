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
            className="hidden sm:inline-flex label-mono text-xs text-foreground hover:text-primary"
          >
            Sign in
          </a>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 bg-foreground text-background border-2 border-foreground px-3 py-2 sm:px-4 label-mono text-[10px] sm:text-xs hover:bg-primary hover:border-primary transition-colors whitespace-nowrap"
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
              Field CRM · Window Cleaning
            </div>
            <h1 className="t-hero">
              Knock.<br />
              Quote.<br />
              <span className="text-primary">Close.</span>
            </h1>
            <p className="t-body max-w-md text-muted-foreground [overflow-wrap:anywhere]">
              The field sales CRM for door-to-door window cleaning crews.
              Map the route, quote on the porch, close before you walk away.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground border-2 border-foreground px-6 py-4 label-mono text-xs hover:bg-foreground hover:text-background transition-colors"
              >
                Start knocking <Arrow />
              </a>
              <a
                href={APP_URL}
                className="inline-flex items-center gap-3 bg-background text-foreground border-2 border-foreground px-6 py-4 label-mono text-xs hover:bg-foreground hover:text-background transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContributionGrid />
          </div>
        </div>
      </div>
    </section>
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
        <div className="label-mono text-xs">Last 365 days</div>
        <div className="label-mono text-xs text-muted-foreground">Sample</div>
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
          <span className="label-mono text-[10px] sm:text-xs text-muted-foreground mr-1">Less</span>
          {[0, 1, 2, 3, 4, 5].map((lvl) => (
            <span
              key={lvl}
              className="w-3 h-3 border border-foreground/15"
              style={{ backgroundColor: `var(--heat-${lvl})` }}
            />
          ))}
          <span className="label-mono text-[10px] sm:text-xs text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-mono font-bold text-3xl">{n}</div>
      <div className="label-mono text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------- Problem (DARK section) ---------- */
function Problem() {
  return (
    <section className="dark bg-background text-foreground border-b-4 border-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
        <div className="label-mono text-xs text-primary mb-6 sm:mb-8">The problem</div>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-[6rem] leading-[1.1] sm:leading-[0.95] lg:leading-[0.9] tracking-tight max-w-5xl">
          Your CRM wasn't built<br />
          for the <span className="text-primary">doorstep.</span>
        </h2>
        <div className="mt-10 sm:mt-16 grid md:grid-cols-3 gap-px bg-foreground/20">
          {[
            { k: "Spreadsheets", v: "Lose half your leads to a notes app you'll never re-open." },
            { k: "Enterprise CRM", v: "47 fields per contact. You needed 3. The deal walked." },
            { k: "Pen & paper", v: "Rain. Wind. Memory. The quote you wrote yesterday is gone." },
          ].map((p) => (
            <div key={p.k} className="bg-background p-6 sm:p-8">
              <div className="label-mono text-xs text-primary mb-3">{p.k}</div>
              <p className="font-display text-2xl sm:text-3xl leading-[1.25] sm:leading-tight [overflow-wrap:anywhere]">{p.v}</p>
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
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
        <div className="label-mono text-xs mb-6 sm:mb-8">How it works</div>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-[6rem] leading-[1.1] sm:leading-[0.95] lg:leading-[0.9] tracking-tight max-w-4xl mb-10 sm:mb-16">
          Three taps. <span className="text-primary">One sale.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-foreground border-2 border-foreground">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-6 sm:p-8 lg:p-10">
              <div className="font-mono font-bold text-5xl sm:text-6xl text-primary leading-none mb-6 sm:mb-8">
                {s.n}
              </div>
              <div className="font-display text-5xl sm:text-6xl leading-[1.05] sm:leading-none mb-4 sm:mb-6">{s.t}.</div>
              <p className="text-sm sm:text-base text-muted-foreground leading-[1.7] sm:leading-relaxed [overflow-wrap:anywhere]">{s.b}</p>
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
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32 space-y-10 sm:space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="label-mono text-xs text-primary mb-6 sm:mb-8">The Heatmap</div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-[7rem] leading-[1.05] sm:leading-[0.95] lg:leading-[0.88] tracking-tight">
              See your year.<br />
              Every knock<br />
              <span className="text-primary">counted.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-muted-foreground leading-[1.7] sm:leading-relaxed border-l-4 border-foreground pl-5 [overflow-wrap:anywhere]">
              Cold doors fade. Warm leads glow. Closes burn bright. Walk into
              tomorrow knowing exactly where the money lives — and which streets
              are still cold.
            </p>
          </div>
        </div>

        <BigContributionGrid />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground border-2 border-foreground">
          {[
            { n: "2,847", l: "Doors knocked" },
            { n: "612", l: "Quotes given" },
            { n: "238", l: "Deals closed" },
            { n: "$84,210", l: "Revenue booked" },
          ].map((s) => (
            <div key={s.l} className="bg-background p-4 sm:p-6">
              <div className="font-mono font-bold text-3xl sm:text-5xl lg:text-6xl tabular-nums whitespace-nowrap">{s.n}</div>
              <div className="label-mono text-[10px] sm:text-xs text-muted-foreground mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32 text-center">
        <div className="label-mono text-xs mb-6 sm:mb-8">Ready?</div>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-[9rem] leading-[1.05] sm:leading-[0.95] lg:leading-[0.85] tracking-tight">
          Start knocking.
        </h2>
        <p className="mt-6 sm:mt-8 text-sm sm:text-base max-w-md mx-auto opacity-90 leading-[1.7] [overflow-wrap:anywhere]">
          14-day free trial. No credit card. Knock today, close tomorrow.
        </p>
        <a
          href={APP_URL}
          className="mt-10 sm:mt-12 inline-flex items-center gap-3 bg-foreground text-background border-2 border-foreground px-6 py-4 sm:px-8 sm:py-5 label-mono text-xs hover:bg-background hover:text-foreground transition-colors"
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
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" width={28} height={28} className="w-7 h-7" />
          <span className="font-display text-3xl text-brand leading-none">Giraffe!</span>
          <span className="label-mono text-xs text-muted-foreground ml-3">
            © {new Date().getFullYear()}
          </span>
        </div>
        <a
          href={APP_URL}
          className="label-mono text-xs hover:text-primary transition-colors"
        >
          app.holygiraffe.com <Arrow />
        </a>
      </div>
    </footer>
  );
}

