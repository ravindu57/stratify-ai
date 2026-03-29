'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  ChevronDown,
  Database,
  Globe,
  LayoutDashboard,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageSquareMore,
  Network,
  Phone,
  Radar,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { Button } from '@/app/components/ui';
import { Card, CardContent } from '@/app/components/ui';
import { Input } from '@/app/components/ui';
import { Textarea } from '@/app/components/ui';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'company', label: 'Company Profile' },
  { id: 'services', label: 'Services', dropdown: true },
  { id: 'products', label: 'Products', dropdown: true },
  { id: 'contact', label: 'Contact' },
];

const services = [
  {
    slug: 'business-data-audit',
    title: 'Business & Data Audit',
    icon: BarChart3,
    short: 'Identify where profit is leaking across operations, pricing, sales, and cost structures.',
    detail:
      'A consulting-led diagnostic engagement focused on uncovering margin compression, reporting blind spots, data fragmentation, pricing inefficiencies, and operational decision bottlenecks.',
    businessValue: [
      'Identify inefficiencies before they compound into larger financial problems.',
      'Create visibility into weak points across pricing, cost, workflow, and reporting.',
      'Support more focused business improvement decisions.',
    ],
    realValue: [
      'Expose hidden profit leakage across pricing, cost structures, and process inefficiencies.',
      'Quantify where money is being lost and which problem areas matter most.',
      'Establish a financial and operational baseline for optimization work.',
    ],
  },
  {
    slug: 'business-intelligence-dashboards',
    title: 'Business Intelligence & Dashboards',
    icon: LayoutDashboard,
    short: 'Build management dashboards that convert raw business data into clear executive visibility.',
    detail:
      'We design decision-grade dashboard environments that integrate operational, financial, and commercial metrics so leaders can move faster with confidence.',
    businessValue: [
      'Improve management visibility across revenue, costs, operations, and KPIs.',
      'Reduce reporting delays and make performance easier to understand.',
      'Help leadership act with more confidence and alignment.',
    ],
    realValue: [
      'Unify fragmented data into a single decision environment.',
      'Standardize KPI definitions across departments and business units.',
      'Eliminate reporting inconsistency and reduce time lost to manual analysis.',
    ],
  },
  {
    slug: 'automation-optimization-systems',
    title: 'Automation & Optimization Systems',
    icon: Workflow,
    short: 'Reduce manual inefficiency with trigger-based workflows, alerts, and operational automation.',
    detail:
      'From reporting pipelines to event-driven actions, we build systems that remove repetitive work, reduce lag, and improve consistency across business functions.',
    businessValue: [
      'Speed up operational workflows and reduce execution delays.',
      'Lower dependency on manual follow-up and repeated coordination.',
      'Create a smoother, more reliable operating environment.',
    ],
    realValue: [
      'Remove operational bottlenecks and manual dependencies from critical workflows.',
      'Ensure key actions are triggered consistently without human intervention.',
      'Reduce execution errors, lag, and process variance across teams.',
    ],
  },
  {
    slug: 'ai-strategy-decision-support',
    title: 'AI Strategy & Decision Support',
    icon: BrainCircuit,
    short: 'Use AI to explain performance changes, recommend actions, and support faster decisions.',
    detail:
      'We deploy intelligent decision layers that translate business data into plain-language recommendations for owners, managers, and operators.',
    businessValue: [
      'Help decision-makers move faster with clearer recommendations.',
      'Turn complex performance changes into understandable business guidance.',
      'Improve management confidence in day-to-day and strategic decisions.',
    ],
    realValue: [
      'Translate raw business data into decision logic rather than passive reporting.',
      'Surface cause-and-effect relationships behind performance movement.',
      'Provide structured management recommendations based on actual business signals.',
    ],
  },
  {
    slug: 'forecasting-predictive-analytics',
    title: 'Forecasting & Predictive Analytics',
    icon: Radar,
    short: 'Forecast sales, demand, and performance trends using practical business-focused models.',
    detail:
      'Our predictive analytics solutions focus on commercial relevance: demand projection, anomaly detection, stock planning, and proactive performance management.',
    businessValue: [
      'Improve planning around demand, revenue, and operational performance.',
      'Reduce surprises by identifying likely changes earlier.',
      'Enable more proactive commercial and operational decision-making.',
    ],
    realValue: [
      'Reduce uncertainty in revenue, demand, and resource planning.',
      'Anticipate performance risks before they affect margin and growth.',
      'Shift management from reactive decisions to proactive planning.',
    ],
  },
  {
    slug: 'custom-api-development',
    title: 'Custom API Development',
    icon: Settings2,
    short: 'Turn business logic into live APIs for KPI calculations, profit tracking, and decision workflows.',
    detail:
      'We create custom API layers that expose calculations, business rules, reporting endpoints, and AI-ready intelligence infrastructure.',
    businessValue: [
      'Connect systems more efficiently and enable live data movement.',
      'Make key calculations and logic reusable across tools and teams.',
      'Create a stronger technical foundation for future automation and AI use.',
    ],
    realValue: [
      'Turn business logic into reusable and scalable infrastructure.',
      'Enable real-time data flow between dashboards, automations, and AI systems.',
      'Create the foundation required for reliable system integration and deployment.',
    ],
  },
];

const products = [
  {
    slug: 'ai-business-copilot',
    title: 'AI Business Copilot',
    icon: Bot,
    short: 'A personalized AI assistant for owners and managers.',
    detail:
      'Ask your business questions in plain language and receive contextual answers, issue breakdowns, root-cause analysis, and action recommendations instantly.',
    businessValue: [
      'Give leadership instant access to business answers without waiting for analysts.',
      'Make performance conversations faster, clearer, and more actionable.',
      'Support smarter daily decisions through conversational intelligence.',
    ],
    realValue: [
      'Democratize access to business intelligence across decision-makers.',
      'Convert complex operational and commercial data into natural-language insight.',
      'Deliver instant root-cause analysis and action guidance at the point of need.',
    ],
  },
  {
    slug: 'profit-intelligence-api',
    title: 'Profit Intelligence API',
    icon: Database,
    short: 'A live profitability and KPI logic engine.',
    detail:
      'This API product exposes real-time metrics for margin, revenue mix, variance, pricing performance, and decision analytics across branches or units.',
    businessValue: [
      'Provide continuous access to profitability and KPI intelligence.',
      'Improve confidence in margin and revenue-related decisions.',
      'Strengthen the data layer behind dashboards, AI tools, and reporting systems.',
    ],
    realValue: [
      'Continuously calculate profitability across products, channels, and operations.',
      'Detect anomalies in revenue, margin, and cost behavior in real time.',
      'Supply structured intelligence to other systems such as dashboards and copilots.',
    ],
  },
  {
    slug: 'opsflow-automation-engine',
    title: 'OpsFlow Automation Engine',
    icon: Network,
    short: 'A modular workflow automation layer for business operations.',
    detail:
      'Connect alerts, approvals, reporting, stock signals, client notifications, and internal tasks into one streamlined automated system.',
    businessValue: [
      'Accelerate execution across recurring operational workflows.',
      'Reduce delays caused by approvals, follow-ups, and manual coordination.',
      'Improve consistency in how operational tasks are completed.',
    ],
    realValue: [
      'Orchestrate end-to-end business processes without manual intervention.',
      'Trigger actions automatically based on live business events and rules.',
      'Ensure operational consistency across teams, departments, and recurring workflows.',
    ],
  },
  {
    slug: 'executive-decision-console',
    title: 'Executive Decision Console',
    icon: ShieldCheck,
    short: 'A premium management interface for live business intelligence.',
    detail:
      'Combines dashboard metrics, AI summaries, forecast signals, and operational recommendations into a single executive control surface.',
    businessValue: [
      'Give leadership one place to monitor business performance confidently.',
      'Reduce the need to switch across multiple tools and reports.',
      'Improve strategic oversight with a cleaner management interface.',
    ],
    realValue: [
      'Provide a unified control center for strategic and operational performance.',
      'Align executive KPIs, forecasts, alerts, and recommendations in one interface.',
      'Enable leadership to monitor, interpret, and act from a single decision environment.',
    ],
  },
];

const framework = [
  ['P1', 'Probe', 'Understand the business model, decision flows, data environment, and commercial structure.'],
  ['P2', 'Pinpoint', 'Detect hidden inefficiencies, loss patterns, visibility gaps, and root performance issues.'],
  ['P3', 'Plan', 'Design the optimization strategy, KPI architecture, system blueprint, and AI use cases.'],
  ['P4', 'Produce', 'Implement dashboards, APIs, automations, and AI-powered business tools ready for use.'],
  ['P5', 'Profit', 'Track measurable impact, improve continuously, and compound value through ongoing optimization.'],
];

const footerPages = ['Home', 'Company Profile', 'Services', 'Products', 'Case Studies', 'Contact'];
const footerServices = [
  'Business Intelligence',
  'Data Science & AI Consulting',
  'Predictive Analytics',
  'Custom APIs',
  'AI Chatbots',
  'Automation Systems',
];
const footerLinks = ['Privacy Policy', 'Terms Of Use', 'Business Brochure', 'Consultation Booking'];

function SiteShell({ children, currentPage, setCurrentPage, currentDetail, setCurrentDetail }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const goTo = (page: string, detail: any = null) => {
    setCurrentPage(page);
    setCurrentDetail(detail);
    setOpenDropdown(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_85%_8%,rgba(168,85,247,0.16),transparent_24%),radial-gradient(circle_at_50%_60%,rgba(59,130,246,0.08),transparent_34%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => goTo('home')} className="text-left">
            <div className="text-xs tracking-[0.45em] text-cyan-300">STRATIFY AI</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-white/40">Data Science • AI Systems • Profit Engineering</div>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
            <button onClick={() => goTo('home')} className="transition hover:text-white">Home</button>
            <button onClick={() => goTo('company')} className="transition hover:text-white">Company Profile</button>

            <div className="relative">
              <button onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')} className="flex items-center gap-1 transition hover:text-white">
                Services <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'services' && (
                <div className="absolute left-0 top-10 w-80 rounded-2xl border border-white/10 bg-[#0b1320] p-3 shadow-2xl">
                  <button onClick={() => goTo('services')} className="mb-2 block w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-cyan-300 transition hover:bg-white/5">All Services</button>
                  {services.map((item) => (
                    <button key={item.slug} onClick={() => goTo('service-detail', item)} className="block w-full rounded-xl px-3 py-3 text-left text-sm text-white/75 transition hover:bg-white/5 hover:text-white">
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')} className="flex items-center gap-1 transition hover:text-white">
                Products <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'products' && (
                <div className="absolute left-0 top-10 w-80 rounded-2xl border border-white/10 bg-[#0b1320] p-3 shadow-2xl">
                  <button onClick={() => goTo('products')} className="mb-2 block w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-cyan-300 transition hover:bg-white/5">All Products</button>
                  {products.map((item) => (
                    <button key={item.slug} onClick={() => goTo('product-detail', item)} className="block w-full rounded-xl px-3 py-3 text-left text-sm text-white/75 transition hover:bg-white/5 hover:text-white">
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => goTo('contact')} className="transition hover:text-white">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={() => goTo('contact')} className="hidden rounded-2xl bg-cyan-400 px-5 text-black hover:bg-cyan-300 sm:inline-flex">
              Book Consultation
            </Button>
            <button className="rounded-xl border border-white/10 bg-white/5 p-2 lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden">
            <motion.div initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ type: 'spring', damping: 24 }} className="ml-auto h-full w-[88%] max-w-sm border-l border-white/10 bg-[#0b1220] p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.45em] text-cyan-300">STRATIFY AI</div>
                <button onClick={() => setMobileOpen(false)} className="rounded-xl border border-white/10 bg-white/5 p-2"><X className="h-5 w-5" /></button>
              </div>
              <div className="mt-8 space-y-3">
                <button onClick={() => goTo('home')} className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">Home</button>
                <button onClick={() => goTo('company')} className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">Company Profile</button>
                <button onClick={() => goTo('services')} className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">Services</button>
                <button onClick={() => goTo('products')} className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">Products</button>
                <button onClick={() => goTo('contact')} className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">Contact</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>
      <Footer setCurrentPage={setCurrentPage} setCurrentDetail={setCurrentDetail} />
    </div>
  );
}

function HeroSection({ onContact }: any) {
  const questions = [
    'Why did profit fall this week?',
    'Which products are reducing margin?',
    'What should we promote today?',
    'Where are we losing money operationally?',
  ];

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
            <Sparkles className="h-4 w-4" />
            We turn data into profit.
          </div>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight md:text-7xl xl:text-[88px]">
            We build intelligent systems that help businesses
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              grow profitably.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
            Stratify AI helps businesses uncover hidden inefficiencies, improve operational visibility, and increase profit using data science, AI decision tools, business APIs, automation, and executive intelligence systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button onClick={onContact} className="rounded-2xl bg-cyan-400 px-7 py-6 text-base font-medium text-black hover:bg-cyan-300">
              Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-2xl border-white/15 bg-white/5 px-7 py-6 text-base text-white hover:bg-white/10 hover:text-white">
              Download Company Profile
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative">
          <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-violet-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-2xl">
            <div className="rounded-[28px] border border-white/10 bg-[#071019] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">AI Business Copilot</div>
                  <div className="mt-2 text-2xl font-semibold">Decision Intelligence Preview</div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Live</div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-2 text-sm text-white/45"><MessageSquareMore className="h-4 w-4" /> Executive prompts</div>
                  <div className="mt-4 space-y-3">
                    {questions.map((q) => (
                      <div key={q} className="rounded-2xl bg-white/5 p-3 text-sm text-white/80">{q}</div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <div className="flex items-center gap-2 text-sm text-cyan-200"><Bot className="h-4 w-4" /> AI response</div>
                    <p className="mt-3 text-sm leading-7 text-white/85">
                      Weekly profitability fell 14.2% due to beverage margin compression, low weekday demand, and a shift toward low-contribution products. Recommended action: reprice 6 SKUs, push 2 high-margin bundles, and trigger supplier variance review.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.25em] text-white/35">Margin Risk</div><div className="mt-2 text-3xl font-semibold">-14.2%</div><div className="mt-1 text-xs text-white/50">Detected automatically</div></div>
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.25em] text-white/35">Leak Zones</div><div className="mt-2 text-3xl font-semibold">7</div><div className="mt-1 text-xs text-white/50">Commercial + ops</div></div>
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.25em] text-white/35">Actions</div><div className="mt-2 text-3xl font-semibold">3</div><div className="mt-1 text-xs text-white/50">Recommended now</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage({ goTo }: any) {
  return (
    <>
      <HeroSection onContact={() => goTo('contact')} />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Core Offering</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Consulting, systems, and AI built around measurable business impact.</h2>
          <p className="mt-5 text-lg leading-8 text-white/65">We diagnose business problems, build intelligence systems, implement automation, and deliver performance improvements tied directly to revenue, margin, and efficiency.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Business Audit', 'Find profit leakage across operations, sales, and cost structure.'],
            ['Strategy Blueprint', 'Design KPI architecture, optimization roadmap, and system logic.'],
            ['AI Systems', 'Build copilots, APIs, automations, and decision tools tailored to your business.'],
            ['Growth Retainer', 'Track ROI, improve continuously, and scale high-performing changes.'],
          ].map(([title, text]) => (
            <Card key={title} className="rounded-[28px] border-white/10 bg-white/[0.045]"><CardContent className="p-6"><div className="text-xl font-semibold">{title}</div><p className="mt-3 text-sm leading-7 text-white/65">{text}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm uppercase tracking-[0.35em] text-violet-300">Signature Framework</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">The PROFIT-5 framework behind every engagement.</h2>
              <p className="mt-5 text-lg leading-8 text-white/65">This is the consulting engine behind how Stratify AI creates value: business diagnosis, solution design, implementation, and ROI compounding.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {framework.map(([code, title, desc], index) => (
                <motion.div key={code} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                  <Card className="h-full rounded-[28px] border-white/10 bg-white/[0.045]"><CardContent className="p-6"><div className="text-sm uppercase tracking-[0.35em] text-cyan-300">{code}</div><div className="mt-3 text-2xl font-semibold">{title}</div><p className="mt-4 text-sm leading-7 text-white/65">{desc}</p></CardContent></Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CompanyPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-4xl">
        <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Company Profile</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">A modern consulting company built to engineer better business decisions.</h1>
        <p className="mt-6 text-lg leading-8 text-white/68">Stratify AI is a business consulting company focused on performance improvement through data science, AI systems, business intelligence, custom APIs, and operational optimization. We help businesses uncover inefficiencies, increase profit, and build decision infrastructure that scales.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          ['Vision', 'To become a next-generation consulting company that combines strategy, data science, and AI into intelligent systems that improve how businesses operate.'],
          ['Mission', 'To help businesses increase revenue, reduce inefficiency, and make better decisions through measurable, technology-enabled consulting.'],
          ['Positioning', 'We do not just analyze businesses. We build systems that continuously improve how they perform.'],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[28px] border-white/10 bg-white/[0.045]"><CardContent className="p-6"><div className="text-2xl font-semibold">{title}</div><p className="mt-4 text-sm leading-7 text-white/65">{text}</p></CardContent></Card>
        ))}
      </div>
      <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="text-3xl font-semibold">What makes us different</h2>
          <div className="mt-6 space-y-4 text-white/72">
            {[
              'We focus on ROI, not just reporting.',
              'We combine consulting, analytics, automation, and AI into one delivery model.',
              'We build client-specific APIs and personalized chatbots instead of generic tools.',
              'We position data science as a business asset, not as a technical experiment.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 leading-7">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-sm uppercase tracking-[0.3em] text-violet-300">Delivery Model</div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="font-semibold">Consulting Layer</div><div className="mt-2 text-sm leading-7 text-white/65">Business diagnosis, optimization planning, strategic recommendations, and KPI design.</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="font-semibold">Intelligence Layer</div><div className="mt-2 text-sm leading-7 text-white/65">Dashboards, forecasting, anomaly detection, pricing analysis, and performance monitoring.</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="font-semibold">Execution Layer</div><div className="mt-2 text-sm leading-7 text-white/65">APIs, AI assistants, automation workflows, alerts, and business-facing interfaces.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ goTo }: any) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-4xl">
        <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Advisory and implementation services designed for growth-focused businesses.</h1>
        <p className="mt-6 text-lg leading-8 text-white/68">Our services are built to help clients move from fragmented data and uncertain decisions to structured visibility, intelligent action, and continuous optimization.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.slug} className="rounded-[28px] border-white/10 bg-white/[0.045]">
              <CardContent className="p-6">
                <div className="inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300"><Icon className="h-6 w-6" /></div>
                <div className="mt-5 text-2xl font-semibold">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/65">{item.short}</p>
                <Button onClick={() => goTo('service-detail', item)} className="mt-6 rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300">View Service</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ProductsPage({ goTo }: any) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-4xl">
        <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Products</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Technology products that turn consulting into long-term business infrastructure.</h1>
        <p className="mt-6 text-lg leading-8 text-white/68">These are the productized systems we use to give clients ongoing value beyond strategy: live intelligence, API-driven decision logic, automation, and personalized AI interaction.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {products.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.slug} className="rounded-[30px] border-white/10 bg-white/[0.045]">
              <CardContent className="p-7">
                <div className="inline-flex rounded-2xl border border-violet-400/20 bg-violet-400/10 p-3 text-violet-300"><Icon className="h-6 w-6" /></div>
                <div className="mt-5 text-2xl font-semibold">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/65">{item.short}</p>
                <Button onClick={() => goTo('product-detail', item)} className="mt-6 rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300">View Product</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function DetailPage({ item, type, goTo }: any) {
  const Icon = item?.icon || Bot;
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <button onClick={() => goTo(type === 'service' ? 'services' : 'products')} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
        Back to {type === 'service' ? 'Services' : 'Products'}
      </button>
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="inline-flex rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-300"><Icon className="h-8 w-8" /></div>
          <div className="mt-6 text-sm uppercase tracking-[0.35em] text-cyan-300">{type === 'service' ? 'Service Detail' : 'Product Detail'}</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">{item?.title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/68">{item?.detail}</p>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-sm uppercase tracking-[0.3em] text-violet-300">Business Value</div>
          <div className="mt-6 grid gap-4">
            {(item?.businessValue || []).map((value: string) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm uppercase tracking-[0.3em] text-cyan-300">Real Value</div>
          <div className="mt-6 grid gap-4">
            {(item?.realValue || []).map((value: string) => (
              <div key={value} className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-5">
                <div className="font-semibold text-cyan-100">{value}</div>
              </div>
            ))}
          </div>

          <Button onClick={() => goTo('contact')} className="mt-6 w-full rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300">Request Consultation</Button>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Let's discuss how to improve your business with data science and AI.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">Whether you need a business audit, dashboard system, API layer, automation workflow, or personalized AI assistant, we can design the right solution around your business goals.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 font-semibold"><Mail className="h-4 w-4" /> Email</div><div className="mt-2 text-white/65">hello@stratifyai.com</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 font-semibold"><Phone className="h-4 w-4" /> Phone</div><div className="mt-2 text-white/65">+94 XX XXX XXXX</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4" /> Region</div><div className="mt-2 text-white/65">Sri Lanka</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 font-semibold"><Globe className="h-4 w-4" /> Delivery Model</div><div className="mt-2 text-white/65">Remote-Ready / Global</div></div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="grid gap-4">
            <Input placeholder="Your Name" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/45" />
            <Input placeholder="Company Name" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/45" />
            <Input placeholder="Email Address" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/45" />
            <Input placeholder="Service Interested In" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/45" />
            <Textarea placeholder="Tell us about your business challenge" className="min-h-[160px] rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/45" />
            <Button className="rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300">Send Inquiry</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setCurrentPage, setCurrentDetail }: any) {
  const go = (page: string) => {
    setCurrentPage(page);
    setCurrentDetail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#081019]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.35fr_0.8fr_0.9fr_0.8fr]">
        <div>
          <button onClick={() => go('home')} className="text-left text-xs tracking-[0.45em] text-cyan-300">STRATIFY AI</button>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
            We help businesses uncover hidden inefficiencies and increase profit using data-driven systems, intelligent APIs, automation workflows, and AI-powered decision tools. Our approach blends consulting depth with product-grade execution to build systems businesses can actually use.
          </p>
          <div className="mt-8 flex items-center gap-4 text-white/70">
            <div className="rounded-full border border-white/10 bg-white/5 p-2">in</div>
            <div className="rounded-full border border-white/10 bg-white/5 p-2">ig</div>
            <div className="rounded-full border border-white/10 bg-white/5 p-2">fb</div>
            <div className="rounded-full border border-white/10 bg-white/5 p-2">x</div>
          </div>
        </div>

        <div>
          <div className="text-3xl font-semibold tracking-tight">PAGES</div>
          <div className="mt-3 h-1 w-12 bg-white/20" />
          <div className="mt-8 space-y-4 text-base text-white/78">
            {footerPages.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-3 w-3 bg-red-500" />
                <button onClick={() => go(item === 'Home' ? 'home' : item === 'Company Profile' ? 'company' : item === 'Services' ? 'services' : item === 'Products' ? 'products' : item === 'Contact' ? 'contact' : 'home')} className="text-left transition hover:text-white">{item}</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-3xl font-semibold tracking-tight">SERVICES</div>
          <div className="mt-3 h-1 w-12 bg-white/20" />
          <div className="mt-8 space-y-4 text-base text-white/78">
            {footerServices.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-3 w-3 shrink-0 bg-red-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-3xl font-semibold tracking-tight">LINKS</div>
          <div className="mt-3 h-1 w-12 bg-white/20" />
          <div className="mt-8 space-y-4 text-base text-white/78">
            {footerLinks.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-3 w-3 shrink-0 bg-red-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-6">
        <div className="flex flex-col gap-3 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Stratify AI - Privacy · Terms of Use</div>
          <div>Sri Lanka | Remote-Ready | Global Delivery</div>
        </div>
      </div>
    </footer>
  );
}

export default function StratifyAIMultiPageProductionWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentDetail, setCurrentDetail] = useState<any>(null);

  const goTo = (page: string, detail: any = null) => {
    setCurrentPage(page);
    setCurrentDetail(detail);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const page = useMemo(() => {
    switch (currentPage) {
      case 'home':
        return <HomePage goTo={goTo} />;
      case 'company':
        return <CompanyPage />;
      case 'services':
        return <ServicesPage goTo={goTo} />;
      case 'products':
        return <ProductsPage goTo={goTo} />;
      case 'service-detail':
        return <DetailPage item={currentDetail} type="service" goTo={goTo} />;
      case 'product-detail':
        return <DetailPage item={currentDetail} type="product" goTo={goTo} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage goTo={goTo} />;
    }
  }, [currentPage, currentDetail]);

  return (
    <SiteShell currentPage={currentPage} setCurrentPage={setCurrentPage} currentDetail={currentDetail} setCurrentDetail={setCurrentDetail}>
      {page}
    </SiteShell>
  );
}
