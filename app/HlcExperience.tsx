"use client";

import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  CirclePlay,
  Clock3,
  Instagram,
  Menu,
  MessageSquareText,
  Pause,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  Volume2,
  X,
  Youtube,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const ASK_KEYS_URL = "https://ask.19keys.com/";
const ZIION_URL = "https://ziion.io/nations/high-lvl-nation";
const STRIPE_PREORDER_URL = "https://buy.stripe.com/28E5kEaeJ6lk1Vb73U1Fe0k";
const CARD_GAME_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyZv005eu3kq1gva5lLYlD-eXpUwKuBNzQwKmnrJf8RmPVz6dFwkTw4ElMRqIibkThF/exec";
const HLC_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLXa8HXFcKT94-5I_FVD23rEzohplSf2-x";
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxZCNbD0W66scsYNBi78IwbS1Yt7WEc8PHxQUo8CKo-6e2QVpRi6lNSqsPW_G2V0SA/exec";

type Episode = {
  id: number;
  title: string;
  eyebrow: string;
  category: string;
  runtime: string;
  image: string;
  hook: string;
  accent: string;
};

type CuriosityEpisode = {
  title: string;
  guest: string;
  url: string;
  tag: string;
  note: string;
};

type CuriositySection = {
  section: string;
  episodes: CuriosityEpisode[];
};

const episodes: Episode[] = [
  {
    id: 1,
    title: "The Architecture of Ownership",
    eyebrow: "Featured conversation",
    category: "Ownership",
    runtime: "1H 14M",
    image: "/assets/episode-factory.webp",
    hook: "Why the next era belongs to people who build the rooms, systems, and culture.",
    accent: "#d81920",
  },
  {
    id: 2,
    title: "Culture Is Infrastructure",
    eyebrow: "From the archive",
    category: "Culture",
    runtime: "58M",
    image: "/assets/episode-fashion.webp",
    hook: "A conversation about turning influence into institutions that outlive the moment.",
    accent: "#2b7ce9",
  },
  {
    id: 3,
    title: "Build Before the World Catches Up",
    eyebrow: "High Lvl builders",
    category: "AI + Tech",
    runtime: "1H 06M",
    image: "/assets/guests-builders.webp",
    hook: "The mindset shift from experimenting with AI to owning what your systems produce.",
    accent: "#e4ae2a",
  },
  {
    id: 4,
    title: "The Inner Work of a Public Life",
    eyebrow: "Mind + spirit",
    category: "Supermind",
    runtime: "49M",
    image: "/assets/guests-visionaries.webp",
    hook: "What clarity, discipline, and spiritual practice make possible in the public arena.",
    accent: "#8b5dd9",
  },
  {
    id: 5,
    title: "Legacy Is a Daily Decision",
    eyebrow: "Culture makers",
    category: "Legacy",
    runtime: "1H 21M",
    image: "/assets/guests-culture.webp",
    hook: "Beyond status: building the ideas, rituals, and relationships that carry forward.",
    accent: "#d81920",
  },
];

const fallbackCuriositySections: CuriositySection[] = [
  {
    section: "AI and Technology",
    episodes: [
      {
        title: "Economics Is Warfare: How to Build Wealth, Power and Freedom",
        guest: "Dr. Boyce Watkins",
        url: "https://youtu.be/_RBftcP3Gng",
        tag: "AI, economics, power",
        note: "Systems thinking, AI investing, ownership and family infrastructure.",
      },
      {
        title: "The Programmable Future",
        guest: "Iddris Sandu",
        url: HLC_PLAYLIST_URL,
        tag: "Code, culture, ownership",
        note: "Use the HLC playlist as the source until the episode sheet is connected.",
      },
      {
        title: "Managing AI Is Just Like Managing People",
        guest: "Joey Bada$$",
        url: "https://youtu.be/2NCA2y_T26I",
        tag: "Prompting, leadership",
        note: "A practical frame for directing intelligence and environment.",
      },
    ],
  },
  {
    section: "Wealth and Power",
    episodes: [
      {
        title: "Economics Is Warfare: How to Build Wealth, Power and Freedom",
        guest: "Dr. Boyce Watkins",
        url: "https://youtu.be/_RBftcP3Gng",
        tag: "Ownership, leverage",
        note: "Community economics, investing, voting power and institutions.",
      },
      {
        title: "Black Excellence Is a Scam - Here is the Truth About Power",
        guest: "19Keys InvestFest Keynote",
        url: "https://www.iheart.com/podcast/256-19-keys-presents-high-leve-43053795/episode/black-excellence-is-a-scamheres-the-292739700/",
        tag: "Power, culture",
        note: "A keynote on cognitive warfare, AI, wealth and unity.",
      },
      {
        title: "Official HLC Playlist",
        guest: "19Keys",
        url: HLC_PLAYLIST_URL,
        tag: "Archive",
        note: "The complete viewing path for wealth and power episodes.",
      },
    ],
  },
  {
    section: "Health and Energy",
    episodes: [
      {
        title: "Secret Knowledge of Self Healing, Original Man Science and Nature's Cures",
        guest: "Dr. Yahki",
        url: "https://www.iheart.com/podcast/256-19-keys-presents-high-leve-43053795/episode/secret-knowledge-of-self-healing-original-326899236/",
        tag: "Healing, nature",
        note: "Natural rhythm, biological balance and disciplined mind-body systems.",
      },
      {
        title: "Hyperbolic Wellness: Super Healing Procedures and Bio Hacking",
        guest: "Yahki and 19Keys",
        url: "https://www.iheart.com/podcast/256-19-keys-presents-high-leve-43053795/episode/hyperbolic-wellness-super-healing-procedures-facilities-288447738/",
        tag: "Wellness, longevity",
        note: "Advanced healing, wellness centers and holistic infrastructure.",
      },
      {
        title: "The Gifted Seers and Radical Joy",
        guest: "Tabitha Brown",
        url: "https://www.youtube.com/@19KEYS",
        tag: "Joy, intuition",
        note: "Faith, purpose, joy and spiritual responsibility.",
      },
    ],
  },
  {
    section: "Culture and Legacy",
    episodes: [
      {
        title: "The Great Reprogramming: Renaissance or Revolution",
        guest: "Jaylen Brown, Vic Mensa and Tech With X",
        url: "https://www.iheart.com/podcast/256-19-keys-presents-high-leve-43053795/",
        tag: "Culture, future",
        note: "AI, cultural consciousness, cognitive warfare and community leadership.",
      },
      {
        title: "Stop Letting Corporations Own Your Influence",
        guest: "Jaylen Brown",
        url: "https://open.spotify.com/show/2Xuv0FRgrJsN4Dl2QE0a9Y",
        tag: "Influence, ownership",
        note: "Authenticity, endorsement power and building beyond contracts.",
      },
      {
        title: "High Level Conversations Official Channel",
        guest: "19Keys",
        url: "https://www.youtube.com/@19KEYS",
        tag: "Video archive",
        note: "The main channel for current and classic HLC drops.",
      },
    ],
  },
  {
    section: "Spirit and Philosophy",
    episodes: [
      {
        title: "Hidden Truth: Ancient Civilizations, Multiple Dimensions, Aliens and Time",
        guest: "Billy Carson",
        url: "https://highlvl.19keys.com/million-dollar-movement-homepage",
        tag: "Ancient wisdom",
        note: "Time, civilizations, hidden knowledge and human potential.",
      },
      {
        title: "The Algorithm Owns You",
        guest: "Blue Pill",
        url: "https://open.spotify.com/show/2Xuv0FRgrJsN4Dl2QE0a9Y",
        tag: "Attention, authenticity",
        note: "A challenge around identity, illusion and the business of truth.",
      },
      {
        title: "The Death of Meaning",
        guest: "Coffee with Keys",
        url: "https://www.iheart.com/podcast/256-19-keys-presents-high-leve-43053795/episode/the-death-of-meaning-coffee-328013262/",
        tag: "Meaning, literacy",
        note: "Reading, writing, attention and protecting the modern mind.",
      },
    ],
  },
];

const partnershipOptions = [
  "Episode Partnerships",
  "Sponsor and Product Placement",
  "Live Experiences",
  "Apply to Be a Guest",
];

const listenLinks = {
  youtube: "https://www.youtube.com/@19Keys/videos",
  spotify: "https://open.spotify.com/show/2Xuv0FRgrJsN4Dl2QE0a9Y",
  apple: "https://podcasts.apple.com/us/podcast/19-keys-presents-high-level-conversations/id1331519433",
  iheart: "https://www.iheart.com/podcast/256-19-keys-presents-high-leve-43053795/",
  podcastAddict: "https://podcastaddict.com/podcast/19-keys-presents-high-level-conversations/3879925",
};

function encodeForm(payload: Record<string, string>) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value));
  return body;
}

async function submitLead(payload: Record<string, string>) {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: encodeForm(payload),
  });
}

async function submitCardPreorder(payload: Record<string, string>) {
  await fetch(CARD_GAME_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: encodeForm(payload),
  });
}

function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith("http");
  return (
    <a className={`arrow-link ${className}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
    </a>
  );
}

function PlatformLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`platform-links ${compact ? "is-compact" : ""}`} aria-label="Listen and watch">
      <a href={listenLinks.youtube} target="_blank" rel="noreferrer" aria-label="Watch on YouTube">
        <Youtube size={18} aria-hidden="true" />
        {!compact && <span>YouTube</span>}
      </a>
      <a href={listenLinks.spotify} target="_blank" rel="noreferrer" aria-label="Listen on Spotify">
        <span className="spotify-dot" aria-hidden="true" />
        {!compact && <span>Spotify</span>}
      </a>
      <a href={listenLinks.apple} target="_blank" rel="noreferrer" aria-label="Listen on Apple Podcasts">
        <Volume2 size={17} aria-hidden="true" />
        {!compact && <span>Apple</span>}
      </a>
      {!compact && (
        <>
          <a href={listenLinks.iheart} target="_blank" rel="noreferrer" aria-label="Listen on iHeart">
            <CirclePlay size={17} aria-hidden="true" />
            <span>iHeart</span>
          </a>
          <a href={listenLinks.podcastAddict} target="_blank" rel="noreferrer" aria-label="Listen on Podcast Addict">
            <Volume2 size={17} aria-hidden="true" />
            <span>Podcast Addict</span>
          </a>
        </>
      )}
    </div>
  );
}

function TrailerModal({ episode, onClose }: { episode: Episode; onClose: () => void }) {
  const [playing, setPlaying] = useState(true);
  const [chapter, setChapter] = useState(0);
  const frames = [episode.image, "/assets/portrait-intense.webp", "/assets/portrait-mind.webp"];
  const words = ["QUESTION EVERYTHING.", "BUILD WHAT IS NEXT.", "OWN THE FUTURE."];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setChapter((value) => (value + 1) % frames.length), 1800);
    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-label={`${episode.title} trailer`}>
      <button className="modal-backdrop" onClick={onClose} aria-label="Dismiss trailer overlay" />
      <div className="trailer-modal">
        <button className="icon-button trailer-close" onClick={onClose} aria-label="Close trailer">
          <X size={20} aria-hidden="true" />
        </button>
        <div className="trailer-stage">
          {frames.map((frame, index) => (
            <img
              alt=""
              aria-hidden="true"
              className={chapter === index ? "is-active" : ""}
              key={frame}
              src={frame}
            />
          ))}
          <div className="trailer-shade" />
          <p className="trailer-word" key={chapter}>{words[chapter]}</p>
          <div className="trailer-progress" aria-hidden="true">
            {frames.map((_, index) => <span className={index <= chapter ? "is-active" : ""} key={index} />)}
          </div>
          <button className="trailer-control" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause trailer" : "Play trailer"}>
            {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
        </div>
        <div className="trailer-info">
          <div>
            <span className="kicker">Season 5 / Trailer</span>
            <h2>{episode.title}</h2>
          </div>
          <p>{episode.hook}</p>
          <PlatformLinks />
        </div>
      </div>
    </div>
  );
}

export function HlcExperience() {
  const [intro, setIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [curiositySections, setCuriositySections] = useState(fallbackCuriositySections);
  const [activeCuriosity, setActiveCuriosity] = useState(fallbackCuriositySections[0].section);
  const [trailer, setTrailer] = useState<Episode | null>(null);
  const [archiveQuery, setArchiveQuery] = useState("");
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [sponsorDone, setSponsorDone] = useState(false);
  const [sponsorStatus, setSponsorStatus] = useState("");
  const [sponsorSelection, setSponsorSelection] = useState(partnershipOptions[0]);
  const [preorderOpen, setPreorderOpen] = useState(false);
  const [preorderStatus, setPreorderStatus] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeCuriosityEpisodes = useMemo(
    () => curiositySections.find((item) => item.section === activeCuriosity)?.episodes ?? [],
    [activeCuriosity, curiositySections],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setIntro(false), reducedMotion ? 50 : 1550);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const callbackName = `hlcEpisodes${Date.now()}`;
    const script = document.createElement("script");

    window[callbackName as keyof Window] = ((payload: { sections?: CuriositySection[] }) => {
      if (payload?.sections?.length) {
        setCuriositySections(payload.sections);
        setActiveCuriosity(payload.sections[0].section);
      }
      script.remove();
      delete window[callbackName as keyof Window];
    }) as never;

    script.src = `${GOOGLE_SCRIPT_URL}?action=episodes&callback=${callbackName}`;
    script.async = true;
    script.onerror = () => {
      script.remove();
      delete window[callbackName as keyof Window];
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
      delete window[callbackName as keyof Window];
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    const nodes = document.querySelectorAll(".reveal");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submitArchive = (event: FormEvent) => {
    event.preventDefault();
    const query = archiveQuery.trim();
    const target = query ? `${ASK_KEYS_URL}?q=${encodeURIComponent(query)}` : ASK_KEYS_URL;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const openSponsorForm = (selection: string) => {
    setSponsorSelection(selection);
    setSponsorDone(false);
    setSponsorStatus("");
    setSponsorOpen(true);
  };

  const submitSponsor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSponsorStatus("Sending...");
    await submitLead({
      selection: String(data.get("selection") ?? sponsorSelection),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      business: String(data.get("business") ?? ""),
      link: String(data.get("link") ?? ""),
      notes: String(data.get("notes") ?? ""),
      source: "HLC Website",
    });
    setSponsorDone(true);
    setSponsorStatus("Received. We will follow up directly.");
  };

  const submitPreorder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPreorderStatus("Saving...");
    await submitCardPreorder({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
    });
    setPreorderStatus("Opening checkout...");
    window.location.href = STRIPE_PREORDER_URL;
  };

  return (
    <main>
      <div className={`opening-title ${intro ? "is-visible" : ""}`} aria-hidden={!intro}>
        <img src="/assets/hlc-wordmark.png" alt="High-Lvl Conversations" />
        <div className="opening-line" />
        <span>WITH 19KEYS</span>
      </div>

      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="High-Lvl Conversations home">
          <img src="/assets/19keys-key.png" alt="" />
          <span>HIGH-LVL<br />CONVERSATIONS</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#watch">Watch</a>
          <a href="#archive">Ask the Archive</a>
          <a href="#shop">Shop</a>
          <a href="#circle">Inner Circle</a>
          <button onClick={() => openSponsorForm(partnershipOptions[0])}>Sponsor</button>
        </nav>
        <div className="header-actions">
          <a className="drop-link" href={ZIION_URL} target="_blank" rel="noreferrer">Join Ziion</a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="icon-button menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        <span className="kicker">Navigate / HLC</span>
        {[["Watch", "#watch"], ["Ask the Archive", "#archive"], ["Shop", "#shop"], ["High Lvl University", "#circle"], ["About", "#about"]].map(([label, href], index) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>
        ))}
        <button className="mobile-sponsor" onClick={() => { setMenuOpen(false); openSponsorForm(partnershipOptions[0]); }}>Sponsor the show <ArrowRight /></button>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="hero-season">Season 5 / The future is in session</span>
          <h1><span className="hero-main-line"><b>HIGH-</b><b className="hero-lvl">LVL</b></span><strong>CONVERSATIONS</strong></h1>
          <p>Ideas for the people building, funding, and owning what comes next.</p>
          <div className="hero-actions">
            <a className="primary-action" href={HLC_PLAYLIST_URL} target="_blank" rel="noreferrer">
              <CirclePlay size={19} aria-hidden="true" /> Watch season trailer
            </a>
            <PlatformLinks compact />
          </div>
        </div>
        <img className="hero-portrait" src="/assets/hero-keys-circle-v3.webp" alt="19Keys, host of High-Lvl Conversations" />
        <div className="hero-index" aria-hidden="true"><span>19</span><b>05</b></div>
        <a className="scroll-cue" href="#watch"><ArrowDown size={17} /><span>Enter the conversation</span></a>
      </section>

      <div className="signal-ticker" aria-label="Show topics">
        <div className="signal-track">
          <div className="signal-sequence">
            <span>AI + FUTURE TECH</span><i />
            <span>WEALTH + OWNERSHIP</span><i />
            <span>CULTURE + MEDIA</span><i />
            <span>MIND + SPIRIT</span><i />
          </div>
          <div className="signal-sequence" aria-hidden="true">
            <span>AI + FUTURE TECH</span><i />
            <span>WEALTH + OWNERSHIP</span><i />
            <span>CULTURE + MEDIA</span><i />
            <span>MIND + SPIRIT</span><i />
          </div>
        </div>
      </div>

      <section className="featured-section" id="watch">
        <div className="section-heading reveal">
          <div><span className="kicker red">Now showing</span><h2>Enter the<br />latest conversation.</h2></div>
          <p>Long-form thinking for a short-attention world. Watch the trailer, then choose where you want to listen.</p>
        </div>

        <article className="lead-episode reveal">
          <div className="lead-visual">
            <img src={episodes[0].image} alt="19Keys in conversation on a factory floor" />
            <button className="play-orbit" onClick={() => setTrailer(episodes[0])} aria-label={`Play trailer for ${episodes[0].title}`}>
              <Play fill="currentColor" size={22} />
              <span>Play trailer</span>
            </button>
            <span className="episode-number">S05 / E01</span>
          </div>
          <div className="lead-copy">
            <span className="kicker">{episodes[0].eyebrow}</span>
            <h3>{episodes[0].title}</h3>
            <p>{episodes[0].hook}</p>
            <div className="episode-meta"><span><Clock3 size={15} /> {episodes[0].runtime}</span><span>{episodes[0].category}</span></div>
            <PlatformLinks />
          </div>
        </article>
      </section>

      <section className="archive-section">
        <div className="archive-top reveal">
          <div><span className="kicker">The archive / Sheet ready</span><h2>Follow your curiosity.</h2></div>
          <div className="topic-filters" role="tablist" aria-label="Episode sections">
            {curiositySections.map((item) => (
              <button
                className={activeCuriosity === item.section ? "is-active" : ""}
                key={item.section}
                onClick={() => setActiveCuriosity(item.section)}
                role="tab"
                type="button"
                aria-selected={activeCuriosity === item.section}
              >
                {item.section}
              </button>
            ))}
          </div>
        </div>
        <div className="episode-grid curiosity-grid">
          {activeCuriosityEpisodes.map((episode, index) => (
            <a className="episode-card reveal" href={episode.url} target="_blank" rel="noreferrer" key={`${episode.title}-${episode.url}`}>
              <span className="curiosity-index">0{index + 1}</span>
              <span className="kicker">{episode.tag}</span>
              <h3>{episode.title}</h3>
              <p>{episode.guest}</p>
              <div className="card-footer"><span>{episode.note}</span><strong>Watch <ArrowRight size={15} /></strong></div>
            </a>
          ))}
        </div>
        <ArrowLink href="#archive">Ask the full archive</ArrowLink>
      </section>

      <section className="ask-section" id="archive">
        <div className="ask-art reveal" aria-hidden="true">
          <img src="/assets/portrait-mind.webp" alt="" />
          <span className="ask-ring ring-one" />
          <span className="ask-ring ring-two" />
          <span className="ask-label">SOURCE<br />GROUNDED</span>
        </div>
        <div className="ask-copy reveal">
          <span className="kicker red"><Sparkles size={14} /> HLC Intelligence / Beta</span>
          <h2>Ask the<br /><em>Archive.</em></h2>
          <p>Ask any question. Your prompt opens directly in ASK KEYS so the answer can live in the source-grounded archive.</p>
          <form className="archive-form" onSubmit={submitArchive}>
            <label htmlFor="archive-query">What do you want to understand?</label>
            <div><Search size={19} /><input id="archive-query" value={archiveQuery} onChange={(event) => setArchiveQuery(event.target.value)} placeholder="How do I move from AI-curious to AI-owning?" /><button aria-label="Open ASK KEYS"><ArrowRight /></button></div>
          </form>
          <div className="sample-questions"><span>Try asking</span><button onClick={() => setArchiveQuery("What does ownership look like in the age of AI?")}>AI + ownership</button><button onClick={() => setArchiveQuery("How do you turn culture into infrastructure?")}>Culture + infrastructure</button></div>
        </div>
      </section>

      <section className="guest-ledger">
        <div className="guest-intro reveal"><span className="kicker">The guest ledger</span><h2>People shaping<br />the world after next.</h2><p>Builders. Artists. Thinkers. Founders. Every conversation is an invitation to see farther.</p><button className="guest-apply" onClick={() => openSponsorForm("Apply to Be a Guest")}>Apply to be on the show <ArrowRight size={15} /></button></div>
        <div className="guest-collage reveal">
          <img className="guest-a" src="/assets/guests-culture.webp" alt="19Keys with guests from High-Lvl Conversations" />
          <img className="guest-b" src="/assets/guests-builders.webp" alt="High-Lvl Conversations guest portraits" />
        </div>
      </section>

      <section className="commerce-band" id="shop">
        <div className="product-stage reveal">
          <div className="product-scene">
            <span className="product-orbit product-orbit-a" aria-hidden="true" />
            <span className="product-orbit product-orbit-b" aria-hidden="true" />
            <img
              src="/assets/hlc-card-product-hero.webp"
              alt="High-Lvl Conversations Keyism Edition box, open tray, and conversation cards"
            />
            <span className="product-edition">The Keyism Edition / 99 Cards</span>
          </div>
        </div>
        <div className="commerce-copy reveal">
          <span className="kicker">HLC Card Game / The Keyism Edition</span>
          <h2>Questions that<br />change the room.</h2>
          <p>Soft-touch matte cards, black-core edges and red foil packaging built from the visual direction of the official deck.</p>
          <div className="commerce-actions"><button className="light-action" onClick={() => setPreorderOpen(true)}><ShoppingBag size={18} /> Pre-order for $88</button><button className="inline-action" onClick={() => openSponsorForm("Live Experiences")}>Corporate orders <ArrowRight size={15} /></button></div>
        </div>
      </section>

      <section className="circle-section" id="circle">
        <img className="circle-portrait" src="/assets/portrait-still.webp" alt="19Keys in reflection" />
        <div className="circle-copy reveal">
          <span className="kicker red">High Lvl University / Ziion</span>
          <h2>Discuss the episode.<br />Build with the nation.</h2>
          <p>Join the High Lvl community on Ziion to go deeper on episodes, frameworks, resources, and live conversations between drops.</p>
          <div className="circle-benefits"><span>01 / Episode discussion rooms</span><span>02 / Community resources</span><span>03 / High Lvl University</span><span>04 / Builder network</span></div>
          <ArrowLink href={ZIION_URL}>Join the community on Ziion</ArrowLink>
        </div>
      </section>

      <section className="sponsor-section" id="sponsor">
        <div className="sponsor-top reveal"><span className="kicker">Partnerships / HLC</span><h2>Put your brand inside<br />the conversation.</h2></div>
        <div className="sponsor-grid reveal">
          <button className="sponsor-card" onClick={() => openSponsorForm("Episode Partnerships")}><b>01</b><h3>Episode partnerships</h3><p>Integrated host reads, presenting partnerships, and thoughtful placements.</p></button>
          <button className="sponsor-card" onClick={() => openSponsorForm("Sponsor and Product Placement")}><b>02</b><h3>Sponsor and product placement</h3><p>Gifting, wardrobe, on-set integration, and co-created cultural moments.</p></button>
          <button className="sponsor-card" onClick={() => openSponsorForm("Live Experiences")}><b>03</b><h3>Live experiences</h3><p>Event, series, and community partnerships across the High Lvl ecosystem.</p></button>
          <button className="sponsor-card" onClick={() => openSponsorForm("Apply to Be a Guest")}><b>04</b><h3>Apply to be a guest</h3><p>Bring a high-level story, field of expertise, or movement to the table.</p></button>
        </div>
        <button className="sponsor-cta" onClick={() => openSponsorForm(partnershipOptions[0])}>Start an inquiry <ArrowRight /></button>
      </section>

      <section className="ecosystem-section" id="about">
        <div className="ecosystem-copy reveal"><span className="kicker">One show / A living ecosystem</span><h2>Watch the idea.<br />Enter the work.</h2><p>HLC is the front door. Your next step depends on what you are ready to build.</p></div>
        <div className="path-list reveal">
          {[['01', 'LEARN', 'Free webinars + High Lvl University'], ['02', 'BUILD', 'AI Hackathons + systems rooms'], ['03', 'JOIN', 'Ziion community + resources'], ['04', 'ELEVATE', 'Vanta Black + private access'], ['05', 'EXPERIENCE', 'Live events + culture rooms']].map(([n, title, description]) => (
            <a href="#drop" key={title}><span>{n}</span><strong>{title}</strong><p>{description}</p><ChevronRight /></a>
          ))}
        </div>
      </section>

      <section className="drop-section" id="drop">
        <div className="drop-mark reveal"><img src="/assets/19keys-key.png" alt="" /><span>GET THE DROP</span></div>
        <div className="drop-copy reveal">
          <span className="kicker red">Ziion. Community. High Lvl University.</span>
          <h2>Do not just watch<br />the future happen.</h2>
          <p>Join High Lvl Nation on Ziion to discuss episodes, study the ideas, and build with the community.</p>
          <a className="drop-community-link" href={ZIION_URL} target="_blank" rel="noreferrer">Join High Lvl University <ArrowRight /></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><img src="/assets/hlc-wordmark.png" alt="High-Lvl Conversations" /><p>Ideas for the people building, funding, and owning what comes next.</p></div>
        <div className="footer-links"><div><span>Explore</span><a href="#watch">Watch</a><a href="#archive">Ask the Archive</a><a href={ASK_KEYS_URL} target="_blank" rel="noreferrer">ASK KEYS</a><a href="#shop">Shop</a><a href="#circle">High Lvl University</a></div><div><span>Connect</span><a href={listenLinks.youtube} target="_blank">YouTube</a><a href={listenLinks.spotify} target="_blank">Spotify</a><a href={listenLinks.apple} target="_blank">Apple Podcasts</a><a href={listenLinks.iheart} target="_blank">iHeart</a><button onClick={() => openSponsorForm("Sponsor and Product Placement")}>Sponsor</button><button onClick={() => openSponsorForm("Apply to Be a Guest")}>Be a guest</button></div></div>
        <div className="footer-bottom"><span>HIGH-LVL CONVERSATIONS WITH 19KEYS</span><div><Youtube size={17} /><Instagram size={17} /><MessageSquareText size={17} /></div><span>SEASON 5 / 2026</span></div>
      </footer>

      <a className="mobile-drop" href={ZIION_URL} target="_blank" rel="noreferrer">Join Ziion <ArrowRight size={16} /></a>

      {trailer && <TrailerModal episode={trailer} onClose={() => setTrailer(null)} />}

      {sponsorOpen && (
        <div className="modal-shell" role="dialog" aria-modal="true" aria-label="Sponsor High-Lvl Conversations">
          <button className="modal-backdrop" onClick={() => setSponsorOpen(false)} aria-label="Dismiss sponsor overlay" />
          <div className="sponsor-modal">
            <button className="icon-button trailer-close" onClick={() => setSponsorOpen(false)} aria-label="Close sponsor form"><X /></button>
            <span className="kicker red">Partnership inquiry</span>
            <h2>Start a High Lvl<br />partnership.</h2>
            {!sponsorDone ? (
              <form onSubmit={submitSponsor}>
                <label>Selection<select name="selection" value={sponsorSelection} onChange={(event) => setSponsorSelection(event.target.value)}>{partnershipOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label>Name<input name="name" required /></label>
                <label>Phone<input name="phone" type="tel" /></label>
                <label>Email<input name="email" type="email" required /></label>
                <label>Business / Brand Name<input name="business" /></label>
                <label>Link to business<input name="link" type="url" placeholder="https://" /></label>
                <label>Inquiry Notes<textarea name="notes" rows={4} required /></label>
                <button>Send inquiry <ArrowRight /></button>
                <p className="modal-status" aria-live="polite">{sponsorStatus}</p>
              </form>
            ) : (
              <div className="sponsor-success"><Check /><h3>Your inquiry is in.</h3><p>{sponsorStatus}</p></div>
            )}
          </div>
        </div>
      )}

      {preorderOpen && (
        <div className="modal-shell" role="dialog" aria-modal="true" aria-label="High-Lvl Conversations card game pre-order">
          <button className="modal-backdrop" onClick={() => setPreorderOpen(false)} aria-label="Dismiss pre-order overlay" />
          <div className="sponsor-modal preorder-modal">
            <button className="icon-button trailer-close" onClick={() => setPreorderOpen(false)} aria-label="Close pre-order form"><X /></button>
            <span className="kicker red">HLC Card Game / $88 pre-order</span>
            <h2>Reserve the<br />Keyism Edition.</h2>
            <form onSubmit={submitPreorder}>
              <label>Name<input name="name" required autoFocus /></label>
              <label>Email<input name="email" type="email" required /></label>
              <button>Continue to payment <ArrowRight /></button>
              <p className="modal-status" aria-live="polite">{preorderStatus}</p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
