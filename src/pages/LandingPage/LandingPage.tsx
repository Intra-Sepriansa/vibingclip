import { useNavigate } from 'react-router-dom';
import heroPreview from '../../assets/images/dashboard-preview.png';
import brandLogo1 from '../../assets/logos/brand-logo-1.png';
import brandLogo2 from '../../assets/logos/brand-logo-2.png';
import brandLogo3 from '../../assets/logos/brand-logo-3.png';
import creatorLogo1 from '../../assets/logos/creator-logo-1.png';
import creatorLogo2 from '../../assets/logos/creator-logo-2.png';
import creatorLogo3 from '../../assets/logos/creator-logo-3.png';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Icon, IconName } from '../../components/common/Icon';

const platformTags = ['YouTube', 'TikTok', 'Instagram Reels', 'Shorts', 'LinkedIn', 'Facebook'];

const highlightPills = [
  { title: 'Hook detector', description: 'AI finds the 10 best clips per video.', icon: 'sparkle' as IconName },
  { title: 'Smart captions', description: 'Bold keywords, emojis, perfect timing.', icon: 'mobile' as IconName },
  { title: 'Auto formats', description: '9:16, 1:1, 16:9 without re-editing.', icon: 'templates' as IconName },
  { title: 'Schedule-ready', description: 'Publish to every channel in one click.', icon: 'lightning' as IconName }
];

const steps = [
  {
    title: 'Drop your link',
    description: 'Upload a file or paste a YouTube / podcast URL. We transcribe instantly.',
    icon: 'lightning' as IconName
  },
  {
    title: 'Pick viral hooks',
    description: 'AI scores moments, adds captions, and suggests the best 10 shorts.',
    icon: 'scissors' as IconName
  },
  {
    title: 'Ship everywhere',
    description: 'Export in every ratio and auto-schedule to TikTok, Shorts, or Reels.',
    icon: 'mobile' as IconName
  }
];

const featureRows = [
  { title: 'Virality score per clip', description: 'Know what to post first with predictive scoring and hook highlights.' },
  { title: 'Speaker-aware captions', description: 'Keyword glow, emoji hints, and on-beat animations ready to post.' },
  { title: 'Auto B-roll + memes', description: 'Drop in stock, gifs, or motion backgrounds without fighting a timeline.' },
  { title: 'Team-ready workspace', description: 'Share projects, review clips, and lock brand styles for the whole crew.' }
];

const creatorLogos = [
  { name: 'Jon Youshaei', stat: '435K', image: creatorLogo1 },
  { name: 'Armchair Historian', stat: '2.2M', image: creatorLogo2 },
  { name: 'SaaStr', stat: '54.4K', image: creatorLogo3 },
  { name: 'Sebastien Jefferies', stat: '422K', image: creatorLogo1 },
  { name: 'Valuetainment', stat: '5.3M', image: creatorLogo2 },
  { name: 'Jubilee Media', stat: '9.7M', image: creatorLogo3 }
];

const brandLogos = [brandLogo1, brandLogo2, brandLogo3, brandLogo1, brandLogo2, brandLogo3];

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[32px] border border-slate-900/80 bg-[#050607] px-6 py-14 shadow-[0_28px_120px_rgba(0,0,0,0.45)]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.16),transparent_38%),radial-gradient(circle_at_80%_8%,rgba(34,197,235,0.16),transparent_36%),radial-gradient(circle_at_50%_120%,rgba(15,23,42,0.7),transparent_46%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.02),transparent_35%),linear-gradient(60deg,rgba(255,255,255,0.02),transparent_45%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl space-y-10">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200 ring-1 ring-emerald-400/30">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              #1 AI video clipping tool
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
                1 long video, 10 viral clips.{' '}
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                  Create 10x faster.
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-slate-300">
                Vibing Clip turns your long videos into shorts and ships them to every social channel in one click.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
              <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/70 px-4 py-3 shadow-lg shadow-black/40 md:max-w-3xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-lg">🔗</span>
                <input
                  type="url"
                  inputMode="url"
                  placeholder="Drop a video link (YouTube, TikTok, podcast...)"
                  className="w-full bg-transparent text-base text-white placeholder-slate-500 outline-none"
                />
                <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:inline">Paste</span>
              </div>
              <Button variant="contrast" size="lg" className="w-full md:w-auto px-7 py-3">
                Get free clips
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full border-slate-700 bg-black/70 px-6 py-3 text-slate-100 md:w-auto"
                onClick={() => navigate('/app/projects')}
              >
                Upload files
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              {['No credit card', 'Multi-platform', 'Auto captions', 'Unlimited exports'].map((item) => (
                <span key={item} className="rounded-full border border-slate-800/80 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="relative overflow-hidden rounded-3xl border border-slate-900/70 bg-slate-900/60 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="absolute -left-16 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden />
              <div className="absolute -right-16 -bottom-24 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-black/60">
                <img src={heroPreview} alt="Clip preview" className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-black/40">
                  02:01:44
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                        <path d="M8.5 6.5 17 12l-8.5 5.5v-11Z" />
                      </svg>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Drop a long video and...</p>
                      <p className="text-sm font-semibold text-white">Get 10 viral clips with captions</p>
                    </div>
                  </div>
                  <Button variant="contrast" size="md" className="w-full sm:w-auto">
                    Get clips
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {platformTags.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-slate-800/70 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-slate-900/70 bg-slate-900/70 p-6 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Made for creators</p>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    AI autopilot
                  </span>
                </div>
                <p className="mt-3 text-xl font-semibold text-white">
                  From podcast to shorts with hooks, captions, and social scheduler built-in.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Auto-detect the best soundbites, highlight keywords, brand your captions, and push clips live without touching a timeline.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Virality score', value: '87/100' },
                    { label: 'Clips ready', value: '10 per upload' },
                    { label: 'Caption style', value: 'On-beat, bold' },
                    { label: 'Render speed', value: '1.4x faster' }
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 text-left"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
                      <p className="text-lg font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {highlightPills.map((item) => (
                  <Card key={item.title} className="relative overflow-hidden border border-slate-800/80 bg-slate-900/70">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-70" aria-hidden />
                    <div className="relative space-y-2">
                      <div className="flex items-center gap-2 text-emerald-200">
                        <Icon name={item.icon} size={18} className="text-emerald-300" />
                        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-200">AI assist</span>
                      </div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate w-screen -ml-[calc(50vw-50%)] -mr-[calc(50vw-50%)] overflow-hidden bg-[#050607] px-6 py-14 shadow-[0_22px_90px_rgba(0,0,0,0.4)]">
        <div className="mx-auto max-w-6xl space-y-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200">Trusted by creators</p>
          <h3 className="text-2xl font-semibold text-white md:text-3xl">Used by 12M+ creators and businesses</h3>
        </div>

        <div className="mt-8 space-y-5">
          <div className="logo-marquee rounded-2xl border border-slate-900/80 bg-slate-950/60 px-4 py-4">
            <div className="flex animate-logo-loop items-center gap-4 md:gap-6">
              {[...creatorLogos, ...creatorLogos].map((creator, index) => (
                <div
                  key={`${creator.name}-${index}`}
                  className="flex items-center gap-3 rounded-full bg-black/60 px-3 py-2 ring-1 ring-slate-800"
                >
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="h-10 w-10 rounded-full border border-slate-800 object-cover"
                  />
                  <div className="leading-tight text-left">
                    <p className="text-sm font-semibold text-white">{creator.name}</p>
                    <p className="text-xs text-slate-400">{creator.stat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="logo-marquee rounded-2xl border border-slate-900/80 bg-slate-950/60 px-4 py-4">
            <div className="flex animate-logo-loop items-center gap-8 md:gap-10">
              {[...brandLogos, ...brandLogos].map((logo, index) => (
                <div
                  key={`brand-${index}`}
                  className="flex h-12 items-center justify-center rounded-xl bg-slate-900/80 px-5 shadow-inner shadow-black/30 ring-1 ring-slate-800"
                >
                  <img src={logo} alt="Brand logo" className="max-h-8 w-auto opacity-90" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl space-y-4 rounded-2xl border border-slate-900/80 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
            <Icon name="sparkle" size={16} className="text-emerald-300" />
            AI editing models
          </div>
          <h3 className="text-3xl font-semibold text-white">AI that understands every pixel of your video</h3>
          <p className="text-sm text-slate-400">
            The most powerful AI clipping models that work on any video. Built for speed, accuracy, and bold storytelling.
          </p>
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-800/80 bg-slate-950/60 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm">🔗</span>
              <input
                placeholder="Drop a video link"
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
            <Button variant="contrast" size="md" className="w-full md:w-auto px-6 py-3">
              Get free clips
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">Workflow</p>
            <h2 className="text-3xl font-semibold text-white">Drop. Clip. Publish.</h2>
            <p className="max-w-3xl text-slate-300">
              A streamlined flow that mirrors the OpusClip vibe: bold, minimal, and centered on shipping shorts fast.
            </p>
          </div>
          <Button size="md" onClick={() => navigate('/app/projects')}>
            Start for free
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="relative overflow-hidden border border-slate-800/80 bg-slate-900/60 transition hover:border-emerald-400/50 hover:shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-transparent" aria-hidden />
              <div className="relative space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-emerald-200">
                  <Icon name={step.icon} />
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-200">Features</p>
          <h2 className="text-3xl font-semibold text-white">Everything you need to look pro</h2>
          <p className="max-w-3xl text-slate-300">
            Keep the polished, confident feel from the reference while leaning into Vibing Clip&apos;s neon edge.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featureRows.map((feature) => (
            <Card
              key={feature.title}
              className="relative overflow-hidden border border-slate-800/80 bg-slate-900/70 transition hover:border-emerald-400/40"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" aria-hidden />
              <div className="relative space-y-2">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 pt-6 text-sm text-slate-500">
        © 2025 Vibing Clip. Built for creators who ship bold ideas.
      </footer>
    </div>
  );
};
