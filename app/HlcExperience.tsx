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

const categories = ["All", "AI + Tech", "Ownership", "Culture", "Supermind", "Legacy"];

const listenLinks = {
  youtube: "https://www.youtube.com/@19Keys/videos",
  spotify: "https://open.spotify.com/show/2Xuv0FRgrJsN4Dl2QE0a9Y",
  apple: "https://podcasts.apple.com/us/podcast/19-keys-presents-high-level-conversations/id1331519433",
};

function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={`arrow-link ${className}`} href={href}>
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [trailer, setTrailer] = useState<Episode | null>(null);
  const [archiveResult, setArchiveResult] = useState(false);
  const [archiveQuery, setArchiveQuery] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [sponsorDone, setSponsorDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const visibleEpisodes = useMemo(
    () => activeCategory === "All" ? episodes : episodes.filter((episode) => episode.category === activeCategory),
    [activeCategory],
  );
  const archiveEpisodes = activeCategory === "All" ? visibleEpisodes.slice(1) : visibleEpisodes;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setIntro(false), reducedMotion ? 50 : 1550);
    return () => window.clearTimeout(timer);
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
    if (archiveQuery.trim()) setArchiveResult(true);
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterDone(true);
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
          <button onClick={() => setSponsorOpen(true)}>Sponsor</button>
        </nav>
        <div className="header-actions">
          <a className="drop-link" href="#drop">Get the drop</a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="icon-button menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        <span className="kicker">Navigate / HLC</span>
        {[["Watch", "#watch"], ["Ask the Archive", "#archive"], ["Shop", "#shop"], ["Inner Circle", "#circle"], ["About", "#about"]].map(([label, href], index) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>
        ))}
        <button className="mobile-sponsor" onClick={() => { setMenuOpen(false); setSponsorOpen(true); }}>Sponsor the show <ArrowRight /></button>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="hero-season">Season 5 / The future is in session</span>
          <h1><span className="hero-main-line"><b>HIGH-</b><b className="hero-lvl">LVL</b></span><strong>CONVERSATIONS</strong></h1>
          <p>Ideas for the people building, funding, and owning what comes next.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => setTrailer(episodes[0])}>
              <CirclePlay size={19} aria-hidden="true" /> Watch season trailer
            </button>
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
          <div><span className="kicker">The archive / Curated</span><h2>Follow your curiosity.</h2></div>
          <div className="topic-filters" role="group" aria-label="Filter episodes by topic">
            {categories.map((category) => (
              <button className={activeCategory === category ? "is-active" : ""} key={category} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
        </div>
        <div className="episode-grid">
          {archiveEpisodes.map((episode, index) => (
            <article className="episode-card reveal" key={episode.id}>
              <button className="episode-image" onClick={() => setTrailer(episode)} aria-label={`Watch trailer for ${episode.title}`}>
                <img src={episode.image} alt="" />
                <span className="card-wash" style={{ background: episode.accent }} />
                <span className="card-play"><Play size={18} fill="currentColor" /></span>
                <b>0{index + 2}</b>
              </button>
              <span className="kicker">{episode.eyebrow}</span>
              <h3>{episode.title}</h3>
              <p>{episode.hook}</p>
              <div className="card-footer"><span>{episode.category}</span><button onClick={() => setTrailer(episode)}>Trailer <ArrowRight size={15} /></button></div>
            </article>
          ))}
        </div>
        <ArrowLink href="#archive">Search the full archive</ArrowLink>
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
          <p>Ask any question. Find the exact episode, quote, and moment where 19Keys and his guests explored it.</p>
          {!archiveResult ? (
            <form className="archive-form" onSubmit={submitArchive}>
              <label htmlFor="archive-query">What do you want to understand?</label>
              <div><Search size={19} /><input id="archive-query" value={archiveQuery} onChange={(event) => setArchiveQuery(event.target.value)} placeholder="How do I move from AI-curious to AI-owning?" /><button aria-label="Ask the Archive"><ArrowRight /></button></div>
            </form>
          ) : (
            <div className="archive-beta-result">
              <Check size={20} />
              <div><strong>Your question belongs in the beta.</strong><p>Archive answers will be grounded in real transcripts with visible episode sources. Join the first-access list below.</p></div>
              <button onClick={() => document.querySelector("#drop")?.scrollIntoView({ behavior: "smooth" })}>Get first access</button>
            </div>
          )}
          <div className="sample-questions"><span>Try asking</span><button onClick={() => setArchiveQuery("What does ownership look like in the age of AI?")}>AI + ownership</button><button onClick={() => setArchiveQuery("How do you turn culture into infrastructure?")}>Culture + infrastructure</button></div>
        </div>
      </section>

      <section className="guest-ledger">
        <div className="guest-intro reveal"><span className="kicker">The guest ledger</span><h2>People shaping<br />the world after next.</h2><p>Builders. Artists. Thinkers. Founders. Every conversation is an invitation to see farther.</p></div>
        <div className="guest-collage reveal">
          <img className="guest-a" src="/assets/guests-culture.webp" alt="19Keys with guests from High-Lvl Conversations" />
          <img className="guest-b" src="/assets/guests-builders.webp" alt="High-Lvl Conversations guest portraits" />
        </div>
      </section>

      <section className="commerce-band" id="shop">
        <div className="product-stage reveal">
          <div className="deck-box deck-back"><img src="/assets/19keys-key.png" alt="" /></div>
          <div className="deck-box deck-front"><span>HIGH-LVL</span><img src="/assets/19keys-key.png" alt="" /><b>CONVERSATION CARDS</b><small>VOL. 01</small></div>
        </div>
        <div className="commerce-copy reveal">
          <span className="kicker">Bring the show home</span>
          <h2>Questions that<br />change the room.</h2>
          <p>The HLC Card Game turns the energy of the show into a ritual for friends, families, teams, and communities.</p>
          <div className="commerce-actions"><a className="light-action" href="#drop"><ShoppingBag size={18} /> Join the product list</a><ArrowLink href="#sponsor">Corporate orders</ArrowLink></div>
        </div>
      </section>

      <section className="circle-section" id="circle">
        <img className="circle-portrait" src="/assets/portrait-still.webp" alt="19Keys in reflection" />
        <div className="circle-copy reveal">
          <span className="kicker red">The Inner Circle / Founding list</span>
          <h2>Go beyond<br />the episode.</h2>
          <p>Extended cuts. Early releases. Member questions. Archive access. A closer seat inside the conversations shaping what comes next.</p>
          <div className="circle-benefits"><span>01 / Unreleased conversations</span><span>02 / Member-only Q+A</span><span>03 / Early event access</span><span>04 / HLC product privileges</span></div>
          <ArrowLink href="#drop">Join the founding list</ArrowLink>
        </div>
      </section>

      <section className="sponsor-section" id="sponsor">
        <div className="sponsor-top reveal"><span className="kicker">Partnerships / HLC</span><h2>Put your brand inside<br />the conversation.</h2></div>
        <div className="sponsor-grid reveal">
          <div><b>01</b><h3>Episode partnerships</h3><p>Integrated host reads, presenting partnerships, and thoughtful placements.</p></div>
          <div><b>02</b><h3>Product + culture</h3><p>Gifting, wardrobe, on-set integration, and co-created cultural moments.</p></div>
          <div><b>03</b><h3>Live experiences</h3><p>Event, series, and community partnerships across the High Lvl ecosystem.</p></div>
        </div>
        <button className="sponsor-cta" onClick={() => setSponsorOpen(true)}>Request the media kit <ArrowRight /></button>
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
          <span className="kicker red">Episodes. Resources. First access.</span>
          <h2>Do not just watch<br />the future happen.</h2>
          {!newsletterDone ? (
            <form className="drop-form" onSubmit={submitNewsletter}>
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" required placeholder="you@email.com" />
              <button>Enter the ecosystem <ArrowRight /></button>
            </form>
          ) : (
            <div className="success-note"><Check /> You are on the list. The next drop starts here.</div>
          )}
          <small>By joining, you agree to receive HLC updates. Unsubscribe anytime.</small>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><img src="/assets/hlc-wordmark.png" alt="High-Lvl Conversations" /><p>Ideas for the people building, funding, and owning what comes next.</p></div>
        <div className="footer-links"><div><span>Explore</span><a href="#watch">Watch</a><a href="#archive">Ask the Archive</a><a href="#shop">Shop</a><a href="#circle">Inner Circle</a></div><div><span>Connect</span><a href={listenLinks.youtube} target="_blank">YouTube</a><a href="https://www.instagram.com/19_keys/" target="_blank">Instagram</a><button onClick={() => setSponsorOpen(true)}>Sponsor</button><a href="#drop">Be a guest</a></div></div>
        <div className="footer-bottom"><span>HIGH-LVL CONVERSATIONS WITH 19KEYS</span><div><Youtube size={17} /><Instagram size={17} /><MessageSquareText size={17} /></div><span>SEASON 5 / 2026</span></div>
      </footer>

      <a className="mobile-drop" href="#drop">Get the drop <ArrowRight size={16} /></a>

      {trailer && <TrailerModal episode={trailer} onClose={() => setTrailer(null)} />}

      {sponsorOpen && (
        <div className="modal-shell" role="dialog" aria-modal="true" aria-label="Sponsor High-Lvl Conversations">
          <button className="modal-backdrop" onClick={() => setSponsorOpen(false)} aria-label="Dismiss sponsor overlay" />
          <div className="sponsor-modal">
            <button className="icon-button trailer-close" onClick={() => setSponsorOpen(false)} aria-label="Close sponsor form"><X /></button>
            <span className="kicker red">Partnership inquiry</span>
            <h2>Start a High Lvl<br />partnership.</h2>
            {!sponsorDone ? <form onSubmit={(event) => { event.preventDefault(); setSponsorDone(true); }}><label>Name<input required /></label><label>Work email<input type="email" required /></label><label>Brand / organization<input required /></label><label>What are you building?<textarea rows={3} required /></label><button>Request the media kit <ArrowRight /></button></form> : <div className="sponsor-success"><Check /><h3>Your interest is noted.</h3><p>This design is ready to connect to your CRM or partnership inbox when you add the final destination.</p></div>}
          </div>
        </div>
      )}
    </main>
  );
}
