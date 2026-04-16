import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Giraffe CRM — Knock, Quote, Close." },
      {
        name: "description",
        content:
          "Field sales CRM built for door-to-door window cleaning crews. A conversion engine, not enterprise bloat. Every door counts.",
      },
      { property: "og:title", content: "Giraffe CRM — Knock, Quote, Close." },
      {
        property: "og:description",
        content:
          "The field sales CRM for door-to-door window cleaning. Quote on the porch, close before you leave.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <Features />
      <Heatmap />
      <Workflow />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b-2 border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Wordmark />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#workflow" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#login" className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </a>
          <a
            href="#start"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start free
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        src="/logo.png"
        alt="Giraffe CRM logo"
        width={36}
        height={36}
        className="w-9 h-9 group-hover:rotate-[-6deg] transition-transform"
      />
      <span className="font-display text-2xl font-bold tracking-tight">
        <span className="text-brand">Giraffe!</span>
      </span>
    </Link>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-brand" />
            Built for window cleaning crews
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            Knock.<br />
            Quote.<br />
            <span className="text-brand">Close.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Giraffe is the field sales CRM for door-to-door window cleaners. Map your route,
            quote on the porch, and close the deal before you walk to the next house.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#start"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-6 py-3.5 text-base font-semibold hover:translate-y-[-2px] transition-transform"
            >
              Start free — 14 days
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground/80 hover:text-foreground"
            >
              See it in action
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <Stat n="38%" label="Higher close rate" />
            <div className="w-px h-8 bg-border-2" />
            <Stat n="2.4x" label="More quotes/day" />
            <div className="w-px h-8 bg-border-2" />
            <Stat n="$0" label="Setup fee" />
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-6 spot-pattern ] rotate-2 opacity-90" />
          <div className="relative ] overflow-hidden border-4 border-foreground">
            <img
              src={heroImg}
              alt="Window cleaner quoting a homeowner on the porch"
              width={1600}
              height={1200}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating quote card */}
          <div className="absolute -bottom-6 -left-6 bg-card border-2 border-border p-4 max-w-[260px] hidden sm:block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground label-mono">
                Quote sent
              </span>
              <span className="text-xs text-brand-deep font-bold">Closed ✓</span>
            </div>
            <div className="font-mono text-2xl font-bold">$340.00</div>
            <div className="text-xs text-muted-foreground mt-1">
              14 windows · biweekly · 712 Maple St.
            </div>
          </div>

          {/* Floating route pin */}
          <div className="absolute -top-4 -right-2 bg-foreground text-background px-4 py-3 hidden sm:flex items-center gap-3">
            <div className="w-2 h-2 bg-brand animate-pulse" />
            <div>
              <div className="text-xs opacity-70">Today's route</div>
              <div className="font-bold">42 doors left</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-bold text-foreground">{n}</div>
      <div className="text-xs label-mono">{label}</div>
    </div>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
    "Knock smarter",
    "Quote in 30s",
    "Mobile-first",
    "Built for crews",
    "Route optimizer",
    "One-tap close",
  ];
  return (
    <div className="border-y-2 border-border bg-foreground text-background overflow-hidden">
      <div className="flex gap-12 py-4 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-xl flex items-center gap-12">
            {t}
            <span className="text-brand">●</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ---------- Features ---------- */
function Features() {
  const features = [
    {
      icon: <MapPin />,
      title: "Door-by-door map",
      body: "Drop pins as you walk. See who said no, who said maybe, who's a callback. Never re-knock the same door.",
    },
    {
      icon: <Bolt />,
      title: "30-second quotes",
      body: "Tap window count, frequency, add-ons. Get a price the homeowner trusts — printed receipt or text-to-sign on the spot.",
    },
    {
      icon: <Calendar />,
      title: "Auto-scheduling",
      body: "Closed deals drop straight into your calendar with route-optimized job blocks. Recurring jobs handled automatically.",
    },
    {
      icon: <Wallet />,
      title: "Get paid same-day",
      body: "Card, ACH, or cash. Tip-enabled. Money in your account before you finish the squeegee stroke.",
    },
    {
      icon: <Chart />,
      title: "Crew leaderboard",
      body: "Track knocks, quotes, closes, and revenue per rep. Healthy competition. Clear who's bringing the wins.",
    },
    {
      icon: <Bell />,
      title: "Smart follow-up",
      body: "Automated text & email cadences for maybes and past quotes. Nothing leaks. Every door counts.",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-sm text-brand-deep mb-4 label-mono">
            Built for the porch, not the boardroom
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
            Everything you need on a phone.{" "}
            <span className="italic text-muted-foreground">Nothing you don't.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-card border-2 border-border p-7 hover:border-foreground transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand text-brand-foreground flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <h3 className="font-display text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Heatmap ---------- */
function Heatmap() {
  // Deterministic pseudo-random 24x10 grid of heat levels (0-5)
  const cols = 24;
  const rows = 10;
  const cells: number[] = [];
  let seed = 7;
  for (let i = 0; i < cols * rows; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    // Skew toward lower values, occasional fire
    const v = r < 0.35 ? 0 : r < 0.55 ? 1 : r < 0.75 ? 2 : r < 0.88 ? 3 : r < 0.97 ? 4 : 5;
    cells.push(v);
  }
  const heatVar = (lvl: number) => `var(--heat-${lvl})`;
  const totals = [0, 0, 0, 0, 0, 0];
  cells.forEach((v) => totals[v]++);
  const knocks = cells.length;
  const closes = totals[4] + totals[5];
  const hot = totals[3] + totals[4] + totals[5];

  return (
    <section className="py-24 lg:py-32 bg-secondary/60 border-y-2 border-border/60">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-sm label-mono"
               style={{ color: "var(--heat-4)" }}>
            The Door Heatmap
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
            See your neighborhood{" "}
            <span style={{
              backgroundImage: "var(--gradient-heat)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}>
              light up
            </span>
            .
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every knock leaves a trace. Cold doors fade. Warm leads glow.
            Closes burn bright. Walk into tomorrow knowing exactly where the money lives.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-muted-foreground mr-2">Cold</span>
            {[0, 1, 2, 3, 4, 5].map((lvl) => (
              <span
                key={lvl}
                className="w-6 h-6 border-2"
                style={{
                  backgroundColor: heatVar(lvl),
                  borderColor: "color-mix(in oklab, var(--foreground) 15%, transparent)",
                }}
                aria-label={`Heat level ${lvl}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">Fire</span>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 max-w-sm">
            <HeatStat n={knocks} label="Knocks" />
            <HeatStat n={hot} label="Warm+" accent />
            <HeatStat n={closes} label="Closed" fire />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-card border-2 border-border p-5 lg:p-7">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-muted-foreground label-mono">
                Maple Grove · Tuesday
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-2 h-2 animate-pulse"
                      style={{ backgroundColor: "var(--heat-5)" }} />
                Live
              </div>
            </div>
            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {cells.map((v, i) => (
                <div
                  key={i}
                  className="aspect-square ] transition-transform hover:scale-125 hover:z-10"
                  style={{
                    backgroundColor: heatVar(v),
                    animation: `heatPulse 4s ease-in-out ${(i % 12) * 0.15}s infinite`,
                    opacity: v === 0 ? 0.6 : 1,
                  }}
                />
              ))}
            </div>
            <style>{`@keyframes heatPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.04); }
            }`}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeatStat({ n, label, accent, fire }: { n: number; label: string; accent?: boolean; fire?: boolean }) {
  const color = fire ? "var(--heat-5)" : accent ? "var(--heat-3)" : "var(--foreground)";
  return (
    <div className="border-l-2 pl-3" style={{ borderColor: color }}>
      <div className="font-mono text-3xl font-bold" style={{ color }}>{n}</div>
      <div className="text-xs text-muted-foreground label-mono">{label}</div>
    </div>
  );
}

/* ---------- Workflow ---------- */
function Workflow() {
  const steps = [
    { n: "01", t: "Knock", b: "Drop a pin. Log the answer in one tap. Move on." },
    { n: "02", t: "Quote", b: "Window count + frequency = price. Show it on screen, send it as text." },
    { n: "03", t: "Close", b: "Sign with a finger. Card on file. Job booked. Next door." },
  ];
  return (
    <section id="workflow" className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
           style={{ backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="max-w-2xl mb-16">
          <div className="text-sm text-brand mb-4 label-mono">
            The Giraffe loop
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
            Three taps from <span className="text-brand">"hello"</span> to <span className="italic">"booked."</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-background/10 overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-foreground p-8 lg:p-10">
              <div className="font-mono text-7xl font-bold text-brand mb-6">{s.n}</div>
              <div className="font-display text-2xl mb-3">{s.t}</div>
              <p className="text-background/70 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-sm text-brand-deep mb-4 label-mono">
            Simple pricing
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
            One plan. Pays for itself by Tuesday.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 relative bg-card border-2 border-foreground p-8 lg:p-12">
            <div className="absolute -top-3 left-8 bg-brand text-brand-foreground text-xs px-3 py-1 label-mono">
              Crew
            </div>
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <div className="font-mono text-6xl font-bold mb-2 tracking-tight">
                  $39
                  <span className="text-lg text-muted-foreground font-sans font-normal">/rep/mo</span>
                </div>
                <p className="text-muted-foreground">Everything. No tiers. No surprise add-ons.</p>
                <a
                  href="#start"
                  className="mt-6 inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90"
                >
                  Start 14-day free trial
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  "Unlimited doors, quotes, jobs",
                  "Same-day payouts (card + ACH)",
                  "Route optimizer & live map",
                  "Crew leaderboard & reports",
                  "Automated follow-up cadences",
                  "Priority support from real humans",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="w-5 h-5 text-brand-deep shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-secondary p-8 flex flex-col justify-between">
            <div>
              <div className="font-display text-2xl mb-3">Solo crew?</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                One person, one truck. Use Giraffe free forever — capped at 50 doors per day.
                Upgrade when you hire your second pair of hands.
              </p>
            </div>
            <a
              href="#start"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand-deep"
            >
              Get the free plan
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="start" className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative spot-pattern ] p-12 lg:p-20 text-center overflow-hidden border-4 border-foreground">
          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-4xl lg:text-6xl text-foreground tracking-tight">
              Every door counts.
            </h2>
            <p className="mt-4 text-foreground/80 text-lg">
              Stop losing quotes to paper, texts, and memory. Start closing more, faster.
            </p>
            <a
              href="#signup"
              className="mt-8 inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 text-base font-semibold hover:translate-y-[-2px] transition-transform"
            >
              Start your free trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-4 text-sm text-foreground/70">
              No credit card. Knock today, close tomorrow.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t-2 border-border py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" width={28} height={28} className="w-7 h-7" />
          <span className="font-display text-lg font-bold text-brand">Giraffe!</span>
          <span className="text-sm text-muted-foreground ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Knock. Quote. Close.
        </div>
      </div>
    </footer>
  );
}

/* ---------- Icons (inline SVG) ---------- */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function MapPin() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function Bolt() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>;
}
function Calendar() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
}
function Wallet() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v12a2 2 0 0 0 2 2h15v-6"/><path d="M16 13h5v4h-5a2 2 0 0 1 0-4z"/></svg>;
}
function Chart() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/></svg>;
}
function Bell() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
}
