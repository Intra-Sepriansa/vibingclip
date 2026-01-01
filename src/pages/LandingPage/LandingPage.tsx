import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import heroPreview from '../../assets/images/dashboard-preview.png';
import defaultAvatar from '../../assets/images/avatar-default.png';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Icon, IconName } from '../../components/common/Icon';

type Locale = 'en' | 'id';
type LogoCategory = 'AI' | 'Language' | 'Social';
type Platform = 'youtube' | 'instagram';
type Creator = { name: string; stat: string; image: string; platform: Platform; url: string };
type LogoItem = { label: string; category: LogoCategory; logoUrl: string; gradient: string; url: string };

const platformTags = ['YouTube', 'TikTok', 'Instagram Reels', 'Shorts', 'LinkedIn', 'Facebook'];

const platformIcons: Record<Platform, string> = {
  youtube: 'https://cdn.simpleicons.org/youtube/ff0000',
  instagram: 'https://cdn.simpleicons.org/instagram/ed4956'
};

const withProxy = (url: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=160&h=160&fit=cover&we`;

const highlightPills: Record<Locale, { title: string; description: string; icon: IconName }[]> = {
  en: [
    { title: 'Hook detector', description: 'AI finds the 10 best clips per video.', icon: 'sparkle' },
    { title: 'Smart captions', description: 'Bold keywords, emojis, perfect timing.', icon: 'mobile' },
    { title: 'Auto formats', description: '9:16, 1:1, 16:9 without re-editing.', icon: 'templates' },
    { title: 'Schedule-ready', description: 'Publish to every channel in one click.', icon: 'lightning' }
  ],
  id: [
    { title: 'Detektor hook', description: 'AI menemukan 10 klip terbaik di tiap video.', icon: 'sparkle' },
    { title: 'Caption pintar', description: 'Kata kunci tebal, emoji, timing presisi.', icon: 'mobile' },
    { title: 'Format otomatis', description: '9:16, 1:1, 16:9 tanpa edit ulang.', icon: 'templates' },
    { title: 'Siap terjadwal', description: 'Publikasikan ke semua kanal sekali klik.', icon: 'lightning' }
  ]
};

const steps: Record<Locale, { title: string; description: string; icon: IconName }[]> = {
  en: [
    {
      title: 'Drop your link',
      description: 'Upload a file or paste a YouTube / podcast URL. We transcribe instantly.',
      icon: 'lightning'
    },
    {
      title: 'Pick viral hooks',
      description: 'AI scores moments, adds captions, and suggests the best 10 shorts.',
      icon: 'scissors'
    },
    {
      title: 'Ship everywhere',
      description: 'Export in every ratio and auto-schedule to TikTok, Shorts, or Reels.',
      icon: 'mobile'
    }
  ],
  id: [
    {
      title: 'Tempel tautan',
      description: 'Unggah file atau tempel URL YouTube/podcast. Transkripsi langsung jadi.',
      icon: 'lightning'
    },
    {
      title: 'Pilih hook viral',
      description: 'AI memberi skor momen, menambah caption, dan menyarankan 10 short terbaik.',
      icon: 'scissors'
    },
    {
      title: 'Sebar ke semua platform',
      description: 'Ekspor semua rasio dan jadwalkan otomatis ke TikTok, Shorts, atau Reels.',
      icon: 'mobile'
    }
  ]
};

const featureRows: Record<Locale, { title: string; description: string }[]> = {
  en: [
    {
      title: 'Virality score per clip',
      description: 'Know what to post first with predictive scoring and hook highlights.'
    },
    {
      title: 'Speaker-aware captions',
      description: 'Keyword glow, emoji hints, and on-beat animations ready to post.'
    },
    {
      title: 'Auto B-roll + memes',
      description: 'Drop in stock, gifs, or motion backgrounds without fighting a timeline.'
    },
    {
      title: 'Team-ready workspace',
      description: 'Share projects, review clips, and lock brand styles for the whole crew.'
    }
  ],
  id: [
    {
      title: 'Skor viral per klip',
      description: 'Tahu yang harus diunggah dulu dengan skor prediktif dan highlight hook.'
    },
    {
      title: 'Caption peka pembicara',
      description: 'Highlight kata kunci, hint emoji, dan animasi on-beat siap posting.'
    },
    {
      title: 'B-roll + meme otomatis',
      description: 'Tambahkan stok, gif, atau latar bergerak tanpa ribet timeline.'
    },
    {
      title: 'Workspace siap tim',
      description: 'Bagikan proyek, review klip, dan kunci gaya brand untuk seluruh kru.'
    }
  ]
};

const heroStats: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: 'Virality score', value: '87/100' },
    { label: 'Clips ready', value: '10 per upload' },
    { label: 'Caption style', value: 'On-beat, bold' },
    { label: 'Render speed', value: '1.4x faster' }
  ],
  id: [
    { label: 'Skor viral', value: '87/100' },
    { label: 'Klip siap', value: '10 per upload' },
    { label: 'Gaya caption', value: 'On-beat, tebal' },
    { label: 'Kecepatan render', value: '1.4x lebih cepat' }
  ]
};

const copy: Record<
  Locale,
  {
    badge: string;
    titlePrefix: string;
    titleEmphasis: string;
    subtitle: string;
    placeholder: string;
    primaryCTA: string;
    secondaryCTA: string;
    chips: string[];
    heroLead: string;
    heroHeadline: string;
    heroCTA: string;
    heroCardEyebrow: string;
    heroCardPill: string;
    heroCardTitle: string;
    heroCardDesc: string;
    heroHighlightLabel: string;
    marqueeEyebrow: string;
    marqueeHeading: string;
    aiSectionEyebrow: string;
    aiSectionTitle: string;
    aiSectionDesc: string;
    aiSectionPlaceholder: string;
    aiSectionCTA: string;
    workflowEyebrow: string;
    workflowTitle: string;
    workflowDesc: string;
    workflowCTA: string;
    featuresEyebrow: string;
    featuresTitle: string;
    featuresDesc: string;
    footer: string;
  }
> = {
  en: {
    badge: '#1 AI video clipping tool',
    titlePrefix: "One recording, a week's worth of clips.",
    titleEmphasis: 'Ship shorts 10x faster.',
    subtitle: 'Vibing Clip hunts the hooks, writes captions, and queues every channel so your videos publish themselves.',
    placeholder: 'Drop a video link (YouTube, TikTok, podcast...)',
    primaryCTA: 'Get free clips',
    secondaryCTA: 'Upload files',
    chips: ['No credit card', 'Multi-platform', 'Auto captions', 'Unlimited exports'],
    heroLead: 'Drop a long video and...',
    heroHeadline: 'Get 10 viral clips with captions',
    heroCTA: 'Get clips',
    heroCardEyebrow: 'Made for creators',
    heroCardPill: 'AI autopilot',
    heroCardTitle: 'From podcast to shorts with hooks, captions, and social scheduler built-in.',
    heroCardDesc: 'Auto-detect the best soundbites, highlight keywords, brand your captions, and push clips live without touching a timeline.',
    heroHighlightLabel: 'AI assist',
    marqueeEyebrow: 'Trusted by creators',
    marqueeHeading: 'Used by 12M+ creators and businesses',
    aiSectionEyebrow: 'AI editing models',
    aiSectionTitle: 'AI that understands every pixel of your video',
    aiSectionDesc: 'The most powerful AI clipping models that work on any video. Built for speed, accuracy, and bold storytelling.',
    aiSectionPlaceholder: 'Drop a video link',
    aiSectionCTA: 'Get free clips',
    workflowEyebrow: 'Workflow',
    workflowTitle: 'Drop. Clip. Publish.',
    workflowDesc: 'A fast lane built for Vibing Clip: bold, minimal, and tuned to cut, caption, and push shorts live.',
    workflowCTA: 'Start for free',
    featuresEyebrow: 'Features',
    featuresTitle: 'Everything you need to look pro',
    featuresDesc: "Keep the polished, confident feel from the reference while leaning into Vibing Clip's neon edge.",
    footer: '© 2025 Vibing Clip. Built for creators who ship bold ideas.'
  },
  id: {
    badge: '#1 alat pemotong video berbasis AI',
    titlePrefix: 'Satu rekaman, stok klip untuk seminggu.',
    titleEmphasis: 'Kirim short 10x lebih cepat.',
    subtitle: 'Vibing Clip mencari hook, menulis caption, dan mengantri semua kanal agar video tayang sendiri.',
    placeholder: 'Tempel tautan video (YouTube, TikTok, podcast...)',
    primaryCTA: 'Dapatkan klip gratis',
    secondaryCTA: 'Unggah file',
    chips: ['Tanpa kartu kredit', 'Multi-platform', 'Caption otomatis', 'Ekspor tanpa batas'],
    heroLead: 'Tempel video panjang lalu...',
    heroHeadline: 'Dapatkan 10 klip viral lengkap dengan caption',
    heroCTA: 'Ambil klip',
    heroCardEyebrow: 'Untuk kreator',
    heroCardPill: 'Autopilot AI',
    heroCardTitle: 'Dari podcast jadi short dengan hook, caption, dan penjadwal sosial bawaan.',
    heroCardDesc: 'AI mendeteksi soundbite terbaik, menyorot kata kunci, mengunci gaya caption, dan menjadwalkan tanpa menyentuh timeline.',
    heroHighlightLabel: 'Bantuan AI',
    marqueeEyebrow: 'Dipercaya kreator',
    marqueeHeading: 'Dipakai 12M+ kreator dan bisnis',
    aiSectionEyebrow: 'Model AI penyuntingan',
    aiSectionTitle: 'AI yang paham setiap piksel video Anda',
    aiSectionDesc: 'Model pemotongan AI yang kuat untuk video apa pun. Dibangun untuk kecepatan, akurasi, dan cerita yang berani.',
    aiSectionPlaceholder: 'Tempel tautan video',
    aiSectionCTA: 'Dapatkan klip gratis',
    workflowEyebrow: 'Alur kerja',
    workflowTitle: 'Tempel. Klip. Terbitkan.',
    workflowDesc: 'Lintasan cepat khas Vibing Clip: berani, simpel, dan siap potong, caption, lalu terbitkan short.',
    workflowCTA: 'Mulai gratis',
    featuresEyebrow: 'Fitur',
    featuresTitle: 'Semua yang Anda butuhkan agar tampak profesional',
    featuresDesc: 'Jaga rasa polished dan percaya diri ala referensi, sambil mempertahankan sentuhan neon khas Vibing Clip.',
    footer: '© 2025 Vibing Clip. Dibuat untuk kreator yang mengeksekusi ide berani.'
  }
};

const creatorLogos: Creator[] = [
  {
    name: 'Timothy Ronald',
    stat: '3.7M',
    image: 'https://yt3.googleusercontent.com/JXDNod3LRyOekT1k7d-kDxfJHXPodTRjolfNmL5aGjRxJUMBwsnL8_5ADSFMu0tJCLMHz8r0JQ=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@timotyr'
  },
  {
    name: 'Suara Berkelas',
    stat: '714K',
    image: 'https://yt3.googleusercontent.com/rQzrI0M3T2a-9r4SNXFj6tN1zU7P6DoHF-yvv1JgPBkcucpXOFBIW3UK3JQtO-cM03vb0tIH=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@berkelaspodcast'
  },
  {
    name: 'Deddy Corbuzier',
    stat: '25.1M',
    image: 'https://yt3.googleusercontent.com/7k4jFbchFagHe6tmcont-mHuOGQrUjnbyh482MwIEFrobjT-uGiMss4qbiTMV74vp8OE3SuY=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@Corbuzier'
  },
  {
    name: 'Raditya Dika',
    stat: '11.2M',
    image: 'https://yt3.googleusercontent.com/RrQTNk2go5dclKjYsS_K0P7cS_lud415kiOFKQ7C602LXKFYreXzkFyqI7j9VywfmN9d4iPsQaI=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@radityadika'
  },
  {
    name: 'Jerome Polin',
    stat: '10.7M',
    image: 'https://yt3.googleusercontent.com/D0Yrc9wetHLssU4iAV9CGUXGakdLh6zuIRxwMugpMf11aAXU33OT0H75TAY7xlGM4YlnFADiIg=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@NihongoMantappu'
  },
  {
    name: 'Raymond Chin',
    stat: '3.19M',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_ntGsTLsO00am6tqOc6VXKZ3tgemmCnTDJI6DT2_BZUhxmI=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@raymondchin'
  },
  {
    name: 'Ferry Irwandi',
    stat: '2.13M',
    image: 'https://yt3.googleusercontent.com/8wENFPJwQu662gR6Bhj3qgflntI3msuEkbaVGsKwMBzamuRhKJaYaWQgiMoxURIm0qAg3DpRWw=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@ferryirwandi'
  },
  {
    name: 'Arief Muhammad',
    stat: '3.2M',
    image: 'https://yt3.googleusercontent.com/sfnPJ626SAngaO2ZpopR-zYMV5YQ1wiwRdkHFIMLbFJ9Ur4dQqf6P4aXfqibxBWnNON143C0Mg=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@AriefMuhammadTM'
  },
  {
    name: 'Nessie Judge',
    stat: '11.6M',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mKhX_UMt80XsIzRsBUe5Ea54UU_BqdCZK7O2TeBmarBec=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@NessieJudge'
  },
  {
    name: 'Kok Bisa?',
    stat: '6.1M',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_lfe-R2-ABQAVkkPx1iXGQz-ZbDn0IlmbaqRhy3pM5DLnw=s160-c-k-c0x00ffffff-no-rj',
    platform: 'youtube',
    url: 'https://www.youtube.com/@kokbisa'
  }
];

const logoLoopItems: LogoItem[] = [
  {
    label: 'Pippit AI',
    category: 'AI',
    logoUrl: 'https://i0.wp.com/catchwordbranding.com/wp-content/uploads/2025/04/PippitFullPortfolioImage2.png?resize=512%2C512&ssl=1',
    gradient: 'from-violet-400/40 via-fuchsia-500/25 to-cyan-400/15',
    url: 'https://pippit.ai/'
  },
  {
    label: 'ChatGPT',
    category: 'AI',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg',
    gradient: 'from-emerald-400/40 via-emerald-500/20 to-emerald-400/10',
    url: 'https://chatgpt.com/'
  },
  {
    label: 'Gemini',
    category: 'AI',
    logoUrl: 'https://cdn.simpleicons.org/googlegemini?color=7DD3FC',
    gradient: 'from-sky-400/40 via-cyan-400/25 to-blue-500/10',
    url: 'https://gemini.google.com/'
  },
  {
    label: 'Claude',
    category: 'AI',
    logoUrl: 'https://cdn.simpleicons.org/anthropic?color=FBBF24',
    gradient: 'from-amber-300/50 via-orange-400/20 to-rose-400/10',
    url: 'https://www.anthropic.com/claude'
  },
  {
    label: 'Python',
    category: 'Language',
    logoUrl: 'https://cdn.simpleicons.org/python?color=3776AB',
    gradient: 'from-yellow-300/50 via-blue-400/25 to-blue-500/10',
    url: 'https://www.python.org/'
  },
  {
    label: 'TypeScript',
    category: 'Language',
    logoUrl: 'https://cdn.simpleicons.org/typescript?color=3178C6',
    gradient: 'from-blue-400/40 via-sky-400/25 to-blue-600/10',
    url: 'https://www.typescriptlang.org/'
  },
  {
    label: 'JavaScript',
    category: 'Language',
    logoUrl: 'https://cdn.simpleicons.org/javascript?color=F7DF1E',
    gradient: 'from-amber-300/50 via-yellow-300/25 to-orange-400/10',
    url: 'https://developer.mozilla.org/docs/Web/JavaScript'
  },
  {
    label: 'Rust',
    category: 'Language',
    logoUrl: 'https://cdn.simpleicons.org/rust?color=DEA584',
    gradient: 'from-orange-400/40 via-amber-400/25 to-rose-500/10',
    url: 'https://www.rust-lang.org/'
  },
  {
    label: 'Go',
    category: 'Language',
    logoUrl: 'https://cdn.simpleicons.org/go?color=00ADD8',
    gradient: 'from-cyan-300/50 via-teal-300/25 to-cyan-500/10',
    url: 'https://go.dev/'
  },
  {
    label: 'YouTube',
    category: 'Social',
    logoUrl: 'https://cdn.simpleicons.org/youtube?color=FF0000',
    gradient: 'from-rose-500/40 via-red-500/25 to-orange-500/10',
    url: 'https://www.youtube.com/'
  },
  {
    label: 'TikTok',
    category: 'Social',
    logoUrl: 'https://cdn.simpleicons.org/tiktok?color=69C9D0',
    gradient: 'from-fuchsia-500/40 via-teal-300/25 to-cyan-500/10',
    url: 'https://www.tiktok.com/'
  },
  {
    label: 'Instagram',
    category: 'Social',
    logoUrl: 'https://cdn.simpleicons.org/instagram?color=E4405F',
    gradient: 'from-pink-500/40 via-amber-300/25 to-indigo-500/10',
    url: 'https://www.instagram.com/'
  },
  {
    label: 'X',
    category: 'Social',
    logoUrl: 'https://cdn.simpleicons.org/x?color=FFFFFF',
    gradient: 'from-slate-200/60 via-slate-500/25 to-black/20',
    url: 'https://x.com/'
  },
  {
    label: 'Facebook',
    category: 'Social',
    logoUrl: 'https://cdn.simpleicons.org/facebook?color=0866FF',
    gradient: 'from-blue-500/50 via-blue-400/25 to-slate-800/10',
    url: 'https://www.facebook.com/'
  },
  {
    label: 'Twitch',
    category: 'Social',
    logoUrl: 'https://cdn.simpleicons.org/twitch?color=9146FF',
    gradient: 'from-violet-500/40 via-purple-500/25 to-indigo-500/10',
    url: 'https://www.twitch.tv/'
  }
];

const languageOptions: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Bahasa Indonesia' }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [locale, setLocale] = useState<Locale>('id');
  const text = copy[locale];
  const stepsCopy = steps[locale];
  const highlightCopy = highlightPills[locale];
  const featureCopy = featureRows[locale];
  const statsCopy = heroStats[locale];
  const creatorLoop = [...creatorLogos, ...creatorLogos];

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
              {text.badge}
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
                {text.titlePrefix}{' '}
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                  {text.titleEmphasis}
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-slate-300">
                {text.subtitle}
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
              <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/70 px-4 py-3 shadow-lg shadow-black/40 md:max-w-3xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-lg">🔗</span>
                <input
                  type="url"
                  inputMode="url"
                  placeholder={text.placeholder}
                  className="w-full bg-transparent text-base text-white placeholder-slate-500 outline-none"
                />
                <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:inline">
                  {locale === 'id' ? 'Tempel' : 'Paste'}
                </span>
              </div>
              <Button variant="contrast" size="lg" className="w-full md:w-auto px-7 py-3">
                {text.primaryCTA}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full border-slate-700 bg-black/70 px-6 py-3 text-slate-100 md:w-auto"
                onClick={() => navigate('/app/projects')}
              >
                {text.secondaryCTA}
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              {text.chips.map((item) => (
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
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{text.heroLead}</p>
                      <p className="text-sm font-semibold text-white">{text.heroHeadline}</p>
                    </div>
                  </div>
                  <Button variant="contrast" size="md" className="w-full sm:w-auto">
                    {text.heroCTA}
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
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">{text.heroCardEyebrow}</p>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {text.heroCardPill}
                  </span>
                </div>
                <p className="mt-3 text-xl font-semibold text-white">
                  {text.heroCardTitle}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {text.heroCardDesc}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {statsCopy.map((stat) => (
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
                {highlightCopy.map((item) => (
                  <Card key={item.title} className="relative overflow-hidden border border-slate-800/80 bg-slate-900/70">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-70" aria-hidden />
                    <div className="relative space-y-2">
                      <div className="flex items-center gap-2 text-emerald-200">
                        <Icon name={item.icon} size={18} className="text-emerald-300" />
                        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-200">
                          {text.heroHighlightLabel}
                        </span>
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
          <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200">{text.marqueeEyebrow}</p>
          <h3 className="text-2xl font-semibold text-white md:text-3xl">{text.marqueeHeading}</h3>
        </div>

        <div className="mt-8 space-y-5">
          <div className="logo-marquee px-2 py-2">
            <div className="flex animate-logo-loop-reverse items-center gap-8 md:gap-12">
              {creatorLoop.map((creator, index) => (
                <a
                  key={`${creator.name}-${index}`}
                  href={creator.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-[150px] flex-col items-center gap-1 px-2"
                >
                  <div className="relative h-16 w-16">
                    <img
                      src={withProxy(creator.image)}
                      alt={creator.name}
                      className="h-16 w-16 rounded-full border border-slate-800/60 object-cover"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = defaultAvatar;
                      }}
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg shadow-black/30 ring-1 ring-slate-900/70">
                      <img
                        src={platformIcons[creator.platform]}
                        alt={creator.platform}
                        className="h-3.5 w-3.5 object-contain"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">{creator.name}</p>
                  <p className="text-xs text-slate-400">{creator.stat}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="logo-marquee px-2 py-2">
            <div className="flex animate-logo-loop items-center gap-6 md:gap-8">
              {[...logoLoopItems, ...logoLoopItems].map((logo, index) => (
                <a
                  key={`brand-${index}`}
                  href={logo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex items-center justify-center px-3 py-2"
                >
                  <img
                    src={logo.logoUrl}
                    alt={logo.label}
                    className="h-9 w-9 object-contain invert brightness-0 saturate-0 contrast-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl space-y-4 rounded-2xl border border-slate-900/80 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
            <Icon name="sparkle" size={16} className="text-emerald-300" />
            {text.aiSectionEyebrow}
          </div>
          <h3 className="text-3xl font-semibold text-white">{text.aiSectionTitle}</h3>
          <p className="text-sm text-slate-400">{text.aiSectionDesc}</p>
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-800/80 bg-slate-950/60 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm">🔗</span>
              <input
                placeholder={text.aiSectionPlaceholder}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
            <Button variant="contrast" size="md" className="w-full md:w-auto px-6 py-3">
              {text.aiSectionCTA}
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">{text.workflowEyebrow}</p>
            <h2 className="text-3xl font-semibold text-white">{text.workflowTitle}</h2>
            <p className="max-w-3xl text-slate-300">{text.workflowDesc}</p>
          </div>
          <Button size="md" onClick={() => navigate('/app/projects')}>
            {text.workflowCTA}
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stepsCopy.map((step) => (
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
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-200">{text.featuresEyebrow}</p>
          <h2 className="text-3xl font-semibold text-white">{text.featuresTitle}</h2>
          <p className="max-w-3xl text-slate-300">{text.featuresDesc}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featureCopy.map((feature) => (
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
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>{text.footer}</span>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setLocale(option.code)}
                className={`rounded-full border px-3 py-1 transition ${
                  locale === option.code
                    ? 'border-emerald-400/70 bg-slate-800 text-white'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
