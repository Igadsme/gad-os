"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  Compass,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Radar,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import "./neighborly.css";

type Surface = "Home" | "Explore" | "Community" | "Inventory" | "Radar" | "Requests" | "Messages" | "Profile";

const requests = [
  { title: "A sturdy drill for a weekend shelf project", person: "Maya R.", distance: "0.4 mi", category: "Tools", time: "Needed by Sat", color: "coral", initials: "MR" },
  { title: "Looking for a folding table for a block party", person: "Jordan K.", distance: "0.7 mi", category: "Events", time: "Needed Jun 14", color: "forest", initials: "JK" },
  { title: "Does anyone have a spare kitten carrier?", person: "Nia T.", distance: "1.1 mi", category: "Pet care", time: "Needed this week", color: "gold", initials: "NT" },
];

const inventory = [
  { name: "Bosch cordless drill", owner: "Sam P.", meta: "Available · 0.3 mi", tag: "Tools", emoji: "🔧" },
  { name: "Two-person camping tent", owner: "Eli W.", meta: "Available · 0.8 mi", tag: "Outdoors", emoji: "⛺" },
  { name: "Projector + HDMI cable", owner: "Priya D.", meta: "Available · 1.2 mi", tag: "Tech", emoji: "📽️" },
  { name: "Kids’ bike, 20 inch", owner: "Tomas G.", meta: "Available · 1.4 mi", tag: "Family", emoji: "🚲" },
];

const nav: { label: Surface; icon: typeof Home }[] = [
  { label: "Home", icon: Home }, { label: "Explore", icon: Compass }, { label: "Community", icon: UserRound },
  { label: "Inventory", icon: Boxes }, { label: "Radar", icon: Radar }, { label: "Requests", icon: BookOpen },
  { label: "Messages", icon: MessageCircle },
];

export default function NeighborlyPage() {
  const [active, setActive] = useState<Surface>("Home");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [sent, setSent] = useState(false);
  const filteredInventory = useMemo(() => inventory.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [query]);

  function go(surface: Surface) {
    setActive(surface);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="neighborly-app">
      <aside className={`neighborly-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="neighborly-brand"><span className="neighborly-mark"><Sparkles size={17} /></span><span>neighborly</span></div>
        <div className="neighborly-place"><MapPin size={15} /><span>Grant Park, Atlanta</span><ChevronRight size={14} /></div>
        <nav className="neighborly-nav" aria-label="Neighborly navigation">
          {nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? "active" : ""} onClick={() => go(label)}><Icon size={18} /><span>{label}</span>{label === "Messages" && <b className="neighborly-badge">2</b>}</button>)}
        </nav>
        <div className="neighborly-sidebar-bottom">
          <button className={active === "Profile" ? "active" : ""} onClick={() => go("Profile")}><span className="neighborly-avatar avatar-small">AR</span><span>Alex Rivera</span><ChevronRight size={15} /></button>
          <p>Prototype experience · local mock data</p>
        </div>
      </aside>

      <main className="neighborly-main">
        <header className="neighborly-mobile-header"><button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><Menu /></button><div className="neighborly-brand"><span className="neighborly-mark"><Sparkles size={15} /></span><span>neighborly</span></div><button aria-label="Notifications"><Bell size={19} /></button></header>
        <div className="neighborly-topbar"><div className="neighborly-crumb"><span>Good morning, Alex</span><span className="dot" /> <span className="muted">Tuesday, June 10</span></div><button className="neighborly-icon-button" aria-label="Notifications"><Bell size={19} /><i /></button></div>

        {active === "Home" && <HomeSurface query={query} setQuery={setQuery} go={go} />}
        {active === "Explore" && <ExploreSurface query={query} setQuery={setQuery} items={filteredInventory} go={go} />}
        {active === "Community" && <CommunitySurface />}
        {active === "Inventory" && <ExploreSurface query={query} setQuery={setQuery} items={filteredInventory} go={go} inventoryView />}
        {active === "Radar" && <RadarSurface />}
        {active === "Requests" && <RequestsSurface onRequest={() => setShowRequest(true)} />}
        {active === "Messages" && <MessagesSurface />}
        {active === "Profile" && <ProfileSurface />}
      </main>

      <button className="neighborly-fab" onClick={() => setShowRequest(true)}><Plus size={19} /> <span>Make a request</span></button>
      {showRequest && <RequestModal sent={sent} setSent={setSent} onClose={() => { setShowRequest(false); setSent(false); }} />}
    </div>
  );
}

function HomeSurface({ query, setQuery, go }: { query: string; setQuery: (v: string) => void; go: (s: Surface) => void }) {
  return <div className="neighborly-content">
    <section className="neighborly-hero"><div><div className="neighborly-kicker"><span className="pulse" /> YOUR NEIGHBORHOOD, IN REACH</div><h1>Find it nearby.<br /><em>Share what you can.</em></h1><p>Neighborly makes it easy to borrow, lend, and show up for the people around you.</p></div><div className="neighborly-hero-art"><div className="hero-sun" /><div className="hero-house house-one" /><div className="hero-house house-two" /><div className="hero-plant">✳</div></div></section>
    <section className="neighborly-search-card"><div className="search-label">What are you looking for?</div><div className="neighborly-search-row"><Search size={21} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “a ladder”, “someone to water plants”..." /><button onClick={() => go("Explore")}>Search <ChevronRight size={16} /></button></div><div className="search-hints"><span>Popular nearby</span><button onClick={() => setQuery("drill")}>drill</button><button onClick={() => setQuery("camping")}>camping gear</button><button onClick={() => setQuery("garden")}>garden tools</button></div></section>
    <section className="neighborly-section-head"><div><span className="eyebrow">NEARBY REQUESTS</span><h2>People are asking for help</h2></div><button className="text-link" onClick={() => go("Requests")}>See all requests <ChevronRight size={16} /></button></section>
    <div className="request-grid">{requests.map((request) => <RequestCard key={request.title} {...request} />)}</div>
    <section className="neighborly-callout"><div className="callout-icon"><Sparkles size={20} /></div><div><span className="eyebrow">A LITTLE GOES A LONG WAY</span><h3>Have something gathering dust?</h3><p>List it for your neighbors. The best inventory is the kind that gets used.</p></div><button className="outline-button" onClick={() => go("Inventory")}>Browse inventory <ChevronRight size={16} /></button></section>
  </div>;
}

function RequestCard({ title, person, distance, category, time, color, initials }: (typeof requests)[number]) {
  return <article className="request-card"><div className={`request-illustration ${color}`}><span>{category === "Tools" ? "⌁" : category === "Events" ? "▱" : "♡"}</span></div><div className="request-card-body"><div className="request-meta"><span>{category}</span><span>{distance}</span></div><h3>{title}</h3><div className="request-footer"><span className="neighborly-avatar avatar-tiny">{initials}</span><span>{person}</span><span className="time">{time}</span></div></div></article>;
}

function ExploreSurface({ query, setQuery, items, go, inventoryView = false }: { query: string; setQuery: (v: string) => void; items: typeof inventory; go: (s: Surface) => void; inventoryView?: boolean }) {
  return <div className="neighborly-content"><div className="page-heading"><div><span className="eyebrow">{inventoryView ? "YOUR NEIGHBORHOOD INVENTORY" : "DISCOVER NEARBY"}</span><h1>{inventoryView ? "Things worth sharing" : "Explore your neighborhood"}</h1><p>Local, practical, and shared by people nearby.</p></div><button className="soft-button"><SlidersHorizontal size={16} /> Filters</button></div><div className="explore-tabs"><button className={!inventoryView ? "active" : ""} onClick={() => go("Explore")}>All nearby</button><button onClick={() => go("Inventory")} className={inventoryView ? "active" : ""}>Inventory</button><button>Requests</button><button>Community</button></div><div className="mini-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items, skills, or requests" /></div>{items.length ? <div className="inventory-grid">{items.map((item) => <article className="inventory-card" key={item.name}><div className="inventory-image">{item.emoji}</div><div className="inventory-info"><span className="tag">{item.tag}</span><h3>{item.name}</h3><p>{item.meta}</p><div className="inventory-owner"><span className="neighborly-avatar avatar-tiny">{item.owner.split(" ").map((x) => x[0]).join("")}</span>{item.owner}<button aria-label={`Message ${item.owner}`}><MessageCircle size={16} /></button></div></div></article>)}</div> : <div className="empty-state"><Search size={30} /><h3>No nearby matches yet</h3><p>Try a broader search or make a request.</p><button className="outline-button" onClick={() => go("Requests")}>Make a request</button></div>}</div>;
}

function CommunitySurface() { return <div className="neighborly-content"><div className="page-heading"><div><span className="eyebrow">THE BLOCK AROUND YOU</span><h1>Community</h1><p>Small moments, shared locally.</p></div><button className="soft-button"><Plus size={16} /> Share an update</button></div><div className="community-layout"><div className="community-feed">{[["Plant swap this Saturday 🌿", "A few of us are meeting at the community garden to trade cuttings and say hi.", "Leah M.", "12 min ago", "LM"], ["Free pantry restock", "Fresh bread, citrus, and pantry staples are out by the little library on Berne St. Take what you need.", "Darius B.", "1 hr ago", "DB"], ["Lost: blue tabby cat", "Last seen near Cherokee Ave. She is friendly and answers to Juniper.", "Kris A.", "Yesterday", "KA"]].map(([title, body, person, time, initials]) => <article className="community-post" key={title}><div className="post-top"><span className="neighborly-avatar avatar-small">{initials}</span><div><b>{person}</b><small>{time} · Grant Park</small></div><button>•••</button></div><h3>{title}</h3><p>{body}</p><div className="post-actions"><button>♡ 12</button><button>↗ Share</button></div></article>)}</div><aside className="community-aside"><span className="eyebrow">UPCOMING NEARBY</span><h3>Don’t miss a thing.</h3><div className="event"><b>SAT <strong>14</strong></b><span>Community garden swap<small>10:00 AM · 0.3 mi</small></span></div><div className="event"><b>SUN <strong>15</strong></b><span>Porch concert on Sydney<small>5:30 PM · 0.6 mi</small></span></div></aside></div></div>; }

function RadarSurface() { return <div className="neighborly-content"><div className="page-heading"><div><span className="eyebrow">LIVE NEIGHBORHOOD SIGNAL</span><h1>Radar</h1><p>A calm view of what’s happening around you.</p></div><span className="live-pill"><i /> Live prototype</span></div><div className="radar-card"><div className="radar-map"><div className="map-roads" /><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" /><span className="map-pin pin-one">🔧</span><span className="map-pin pin-two">🌿</span><span className="map-pin pin-three">⛺</span><div className="you-pin"><span>AR</span><small>You</small></div></div><div className="radar-list"><span className="eyebrow">4 SIGNALS NEARBY</span>{[["A drill is available", "0.3 mi · Sam P.", "🔧"], ["Plant cuttings to swap", "0.5 mi · Community garden", "🌿"], ["Camping gear wanted", "0.8 mi · Maya R.", "⛺"], ["New neighbor intro", "1.1 mi · Thomas L.", "👋"]].map(([a, b, c]) => <div className="radar-item" key={a}><span>{c}</span><div><b>{a}</b><small>{b}</small></div><ChevronRight size={15} /></div>)}</div></div></div>; }

function RequestsSurface({ onRequest }: { onRequest: () => void }) { return <div className="neighborly-content"><div className="page-heading"><div><span className="eyebrow">ASK THE NEIGHBORHOOD</span><h1>Requests</h1><p>Offer a hand, or ask for one.</p></div><button className="coral-button" onClick={onRequest}><Plus size={17} /> New request</button></div><div className="request-list">{requests.concat([{ ...requests[0], title: "Anyone up for a dog walk this evening?", person: "Evan S.", category: "Company", time: "Needed today", initials: "ES" }]).map((r) => <div className="request-row" key={r.title}><div className={`request-dot ${r.color}`} /> <div className="request-row-copy"><span>{r.category} · {r.distance}</span><h3>{r.title}</h3><small><span className="neighborly-avatar avatar-tiny">{r.initials}</span>{r.person} · {r.time}</small></div><button className="offer-button">Offer help</button></div>)}</div></div>; }

function MessagesSurface() { const messages: Array<[string, string, string, string, boolean]> = [["Sam P.", "The drill is charged and ready whenever!", "9:42 AM", "SP", true], ["Leah M.", "Would love to swap those basil cuttings 🌿", "Yesterday", "LM", false], ["Jordan K.", "Thanks again for the folding table!", "Mon", "JK", false]]; return <div className="neighborly-content"><div className="page-heading"><div><span className="eyebrow">STAY IN TOUCH</span><h1>Messages</h1><p>Conversations with your neighbors.</p></div></div><div className="message-list">{messages.map(([name, text, time, initials, unread]) => <div className={`message-row ${unread ? "unread" : ""}`} key={name}><span className="neighborly-avatar avatar-medium">{initials}</span><div><b>{name}</b><p>{text}</p></div><small>{time}</small>{unread && <i />}</div>)}</div></div>; }

function ProfileSurface() { return <div className="neighborly-content"><div className="profile-banner"><div className="neighborly-avatar avatar-large">AR</div><div><span className="eyebrow">YOUR NEIGHBORLY PROFILE</span><h1>Alex Rivera</h1><p><MapPin size={14} /> Grant Park, Atlanta · Joined recently</p></div><button className="soft-button">Edit profile</button></div><div className="profile-grid"><div className="profile-card"><span className="eyebrow">ABOUT</span><p>I love fixing things, growing herbs, and making it easier for neighbors to share what they have.</p><div className="profile-tags"><span>Gardening</span><span>DIY projects</span><span>Pet friendly</span></div></div><div className="profile-card"><span className="eyebrow">YOUR ACTIVITY</span><div className="activity-number"><strong>3</strong><span>items shared<br />this month</span></div><div className="activity-number"><strong>5</strong><span>neighbors<br />helped</span></div></div></div></div>; }

function RequestModal({ onClose, sent, setSent }: { onClose: () => void; sent: boolean; setSent: (v: boolean) => void }) { return <div className="modal-backdrop" onClick={onClose}><div className="request-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button>{sent ? <div className="sent-state"><div className="sent-check"><Check size={28} /></div><h2>Request sent into the neighborhood.</h2><p>Your neighbors will see it nearby. We’ll let you know when someone can help.</p><button className="coral-button" onClick={onClose}>Done</button></div> : <><span className="eyebrow">ASK YOUR NEIGHBORS</span><h2>What can we help you find?</h2><p className="modal-intro">Keep it simple. Your request will be shared with neighbors nearby.</p><label>Request <textarea placeholder="e.g. A ladder for a few hours this weekend" rows={3} /></label><div className="modal-fields"><label>Category<select defaultValue="Choose a category"><option>Choose a category</option><option>Tools & equipment</option><option>Home & garden</option><option>Events & hosting</option><option>Other</option></select></label><label>When do you need it?<select defaultValue="Whenever works"><option>Whenever works</option><option>Today</option><option>This week</option><option>Specific date</option></select></label></div><label>Where are you? <div className="location-input"><MapPin size={16} /> Grant Park, Atlanta <Check size={15} /></div></label><button className="coral-button full" onClick={() => setSent(true)}><Send size={16} /> Post request</button><small className="modal-note">Prototype data only · Nothing will be posted publicly.</small></>}</div></div>; }
