import { useEffect, useRef } from "react";

/* ─── TYPES ─────────────────────────────────────────────── */
interface SourceRow { label: string; amount: string }
interface UpcomingRow { name: string; date: string; amount: string }
interface SolCard { num: string; head: string; desc: string; tag: string }
interface Bubble { role: "user" | "ai"; content: React.ReactNode }
interface PersonaCard { initial: string; tag: string; name: string; role: string; pain: string; solve: string }
interface PainCell { icon: string; title: string; desc: string }
interface CompareItem { text: string }

/* ─── DATA ───────────────────────────────────────────────── */
const sources: SourceRow[] = [
  { label: "SBI Savings",    amount: "₹22,400" },
  { label: "PhonePe Wallet", amount: "₹1,200"  },
  { label: "HDFC Account",   amount: "₹8,560"  },
];

const upcoming: UpcomingRow[] = [
  { name: "Rent",             date: "Due in 3 days", amount: "−₹12,000" },
  { name: "Student Loan EMI", date: "Due in 5 days", amount: "−₹4,800"  },
  { name: "Netflix + Spotify",date: "Due in 8 days", amount: "−₹1,080"  },
];

const solCards: SolCard[] = [
  { num:"01", head:"True Balance™ Engine",  tag:"Predictive Liquidity",  desc:"Not your account balance. Your real spendable balance — after upcoming rent, EMIs, subs, and bills are automatically subtracted." },
  { num:"02", head:"Unified Aggregation",   tag:"Zero Manual Entry",     desc:"PhonePe, Google Pay, Paytm, SBI, HDFC — all accounts in one live view. Zero manual entry. One real number." },
  { num:"03", head:"AI Co-pilot",           tag:"Gen AI Interface",      desc:'Ask anything in plain language. "Can I afford this?" "Where did my money go?" The AI answers with your full financial context.' },
  { num:"04", head:"Leak Detection",        tag:"Invisible Spend Alert", desc:"Surfaces forgotten subscriptions, duplicate charges, and micro-transactions bleeding you invisibly — before they hurt." },
  { num:"05", head:"Calm UI",               tag:"Psychological Safety",  desc:"No anxiety dashboards. No red alerts. Minimal, intentional design that restores your sense of control, not overwhelm." },
  { num:"06", head:"Predictive Roadmaps",   tag:"Future Planning",       desc:"See when you can afford a goal purchase, how long savings last, and what a raise actually does to your lifestyle." },
];

const bubbles: Bubble[] = [
  { role:"user", content:"Can I afford a ₹50 dinner if gym and rent are both due next week?" },
  { role:"ai",   content: <><strong>Yes — go for it.</strong><br/><br/>True Balance: ₹14,280. After gym (₹999, 18th) + rent (₹12,000, 20th) you'll still have ₹1,331. A ₹50 dinner barely registers.<br/><br/><span style={{opacity:.5}}>Side note: Hotstar sub (₹299) on the 22nd you may have forgotten.</span></> },
  { role:"user", content:"What are my invisible leaks this month?" },
  { role:"ai",   content: <>Found <strong>3 forgotten subscriptions:</strong><br/><br/>· Hotstar — ₹299/mo<br/>· LinkedIn Premium — ₹2,399/mo<br/>· Adobe CC (unused) — ₹1,675/mo<br/><br/><strong>₹4,373/mo</strong> — ₹52,476/year. Cancel the unused ones?</> },
];

const personas: PersonaCard[] = [
  { initial:"P", tag:"The Student",          name:"Priya, 21", role:"Engineering student · Allowance: ₹15,000/mo",        pain:'"I never know if I can say yes to food with friends — the money feels gone before I spend it."', solve:"OnlyFinance shows Priya her exact safe-to-spend after tuition instalments — so she says yes or no with confidence, not anxiety." },
  { initial:"A", tag:"The Young Professional",name:"Arjun, 26",role:"Software engineer · Salary: ₹65,000 · EMI: ₹18,000", pain:'"I earn well but feel broke every month. I can never see rent, EMI, and subscriptions all at once."',      solve:"OnlyFinance gives Arjun a single True Balance that accounts for everything — plus a co-pilot to make smarter moves." },
];

const painCells: PainCell[] = [
  { icon:"🌫️", title:"Financial Fragmentation", desc:"Salary in SBI. Emergency fund in HDFC. Daily spends via Google Pay. No single view of your reality." },
  { icon:"👻", title:"Invisible Leaks",          desc:"Subscriptions and micro-transactions bleed you silently. You only notice when your balance shocks you." },
  { icon:"✍️", title:"Manual Entry Fatigue",     desc:"Spreadsheets. Notebooks. Decoy bank accounts. Smart people burning energy on financial logistics." },
  { icon:"⏳", title:"No Future Vision",          desc:"Banking apps show what you spent. Nobody tells you what's safe to spend after next week's rent." },
];

const oldItems: CompareItem[] = [
  { text:"Shows raw balance — ignores upcoming bills" },
  { text:"Covers one account only" },
  { text:"Numbers with no context" },
  { text:"Reactive — alerts after overspending" },
  { text:"Silent about forgotten subscriptions" },
  { text:"Anxiety-inducing notification flood" },
];
const newItems: CompareItem[] = [
  { text:"True Balance™ after all future obligations" },
  { text:"All accounts, UPI apps, wallets unified" },
  { text:"Plain-language AI with full context" },
  { text:"Proactive — warns before overspending" },
  { text:"Surfaces and kills invisible leaks" },
  { text:"Calm UI designed for financial peace" },
];

const egQuestions = [
  "Can I afford this trip next month?",
  "How long until I hit ₹1L in savings?",
  "Where did I overspend in June?",
  "What if I got a ₹10,000 raise?",
];

/* ─── GLOBAL STYLES injected once ───────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,100..900;1,100..900&family=Instrument+Serif:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --black: #080807;
  --white: #f7f6f2;
  --off:   #eeece7;
  --dim:   #6b6b63;
  --faint: #b8b8b0;
  --rule:  rgba(8,8,7,.1);
}
html { scroll-behavior: smooth; }
body { background: var(--white); color: var(--black); font-family:'Archivo',sans-serif; overflow-x:hidden; cursor:none; }

/* cursor */
.of-cur      { position:fixed; width:9px; height:9px; background:var(--black); border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition:width .2s,height .2s,border-radius .2s; }
.of-cur-ring { position:fixed; width:34px; height:34px; border:1px solid rgba(8,8,7,.25); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:width .28s,height .28s; }

/* hero title */
.ht-solid   { display:block; font-family:'Archivo Black',sans-serif; font-size:clamp(58px,7.5vw,108px); line-height:.92; letter-spacing:-0.03em; color:var(--black); }
.ht-outline { display:block; font-family:'Archivo Black',sans-serif; font-size:clamp(58px,7.5vw,108px); line-height:.92; letter-spacing:-0.03em; color:transparent; -webkit-text-stroke:1.5px var(--black); }
.ht-serif   { display:block; font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(44px,5.8vw,84px); line-height:1.05; letter-spacing:-0.01em; color:var(--dim); }

/* btn shadow trick */
.btn-shadow { position:relative; }
.btn-shadow::after { content:''; position:absolute; inset:0; border:1.5px solid var(--black); transform:translate(4px,4px); transition:transform .2s; }
.btn-shadow:hover::after { transform:translate(6px,6px); }

/* sol headline */
.sol-h1 { display:block; font-family:'Archivo Black',sans-serif; font-size:clamp(44px,6vw,88px); line-height:.9; letter-spacing:-0.03em; color:var(--white); }
.sol-h2 { display:block; font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(40px,5.5vw,82px); line-height:1; letter-spacing:-0.01em; color:transparent; -webkit-text-stroke:1px rgba(247,246,242,.35); }

/* audience headline */
.aud-em { font-family:'Instrument Serif',serif; font-style:italic; font-weight:400; color:transparent; -webkit-text-stroke:1px rgba(247,246,242,.35); letter-spacing:-0.01em; }

/* persona initial bg */
.p-initial-bg { font-family:'Archivo Black',sans-serif; font-size:120px; line-height:1; letter-spacing:-0.04em; color:transparent; -webkit-text-stroke:1px rgba(247,246,242,.05); position:absolute; top:12px; right:24px; user-select:none; }

/* dot grid on hero right */
.hero-dot-grid::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(8,8,7,.12) 1px,transparent 1px); background-size:22px 22px; mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%); }

/* cta outline title */
.cta-outline { font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(38px,6vw,84px); line-height:1; letter-spacing:-0.01em; color:var(--dim); display:block; }

/* section ghost number */
.s-ghost-num { font-family:'Archivo Black',sans-serif; font-size:clamp(80px,10vw,140px); line-height:.85; letter-spacing:-0.04em; color:transparent; -webkit-text-stroke:1px rgba(8,8,7,.1); margin-right:32px; user-select:none; }

/* cmp ghost head */
.cmp-head-new { font-family:'Archivo Black',sans-serif; font-size:26px; letter-spacing:-0.02em; line-height:1.15; margin-bottom:28px; color:var(--white); }

/* animations */
@keyframes fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }

/* apple-like glass nav */
.glass-nav {
  background: rgba(247, 246, 242, 0.52);
  backdrop-filter: saturate(180%) blur(18px);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
  border-bottom: 1px solid rgba(8, 8, 7, 0.12);
  box-shadow: 0 8px 24px rgba(8, 8, 7, 0.06);
}

/* fallback for browsers without backdrop-filter */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-nav {
    background: rgba(247, 246, 242, 0.9);
  }
}

/* firefox fallback */
@-moz-document url-prefix() {
  .glass-nav {
    background: rgba(247, 246, 242, 0.9);
  }
}

.anim-fadeup-1 { opacity:0; animation:fadeUp .8s ease .05s forwards; }
.anim-fadeup-2 { opacity:0; animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .15s forwards; }
.anim-fadeup-3 { opacity:0; animation:fadeUp .8s ease .35s forwards; }
.anim-fadeup-4 { opacity:0; animation:fadeUp .8s ease .5s forwards; }
.anim-fadein-5 { opacity:0; animation:fadeIn .9s ease .6s forwards; }
.anim-float-1  { animation:float 4.2s ease-in-out infinite; }
.anim-float-2  { animation:float 4.2s ease-in-out 2s infinite; }
.anim-pulse    { animation:pulse 2s ease-in-out infinite; }
`;

/* ─── COMPONENT ──────────────────────────────────────────── */
export function LandingPage() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rxRef   = useRef(0);
  const ryRef   = useRef(0);
  const mxRef   = useRef(0);
  const myRef   = useRef(0);

  useEffect(() => {
    /* inject global CSS once */
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);

    /* cursor tracking */
    const onMove = (e: MouseEvent) => {
      mxRef.current = e.clientX;
      myRef.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top  = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const animRing = () => {
      rxRef.current += (mxRef.current - rxRef.current) * 0.11;
      ryRef.current += (myRef.current - ryRef.current) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current + "px";
        ringRef.current.style.top  = ryRef.current + "px";
      }
      raf = requestAnimationFrame(animRing);
    };
    raf = requestAnimationFrame(animRing);

    /* cursor scale on interactive els */
    const enter = () => {
      if (!curRef.current || !ringRef.current) return;
      curRef.current.style.width        = "20px";
      curRef.current.style.height       = "20px";
      curRef.current.style.borderRadius = "4px";
      ringRef.current.style.width       = "48px";
      ringRef.current.style.height      = "48px";
    };
    const leave = () => {
      if (!curRef.current || !ringRef.current) return;
      curRef.current.style.width        = "9px";
      curRef.current.style.height       = "9px";
      curRef.current.style.borderRadius = "50%";
      ringRef.current.style.width       = "34px";
      ringRef.current.style.height      = "34px";
    };
    const interactives = document.querySelectorAll<HTMLElement>("a,button,input");
    interactives.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    /* scroll reveal */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity   = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(20px)";
      el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
      obs.observe(el);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
      obs.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  /* ── shared style objects (avoids Tailwind dependency) ── */
  const S = {
    /* layout */
    page:         { background:"var(--white)", color:"var(--black)", fontFamily:"'Archivo',sans-serif", overflowX:"hidden" as const, maxWidth:1440, margin:"0 auto", padding:"0 24px" },
    /* nav */
    nav:          { position:"fixed" as const, top:0, left:"50%", transform:"translateX(-50%)", width:"calc(100% - 48px)", maxWidth:1392, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 28px" },
    navLogo:      { fontFamily:"'Archivo Black',sans-serif", fontSize:15, letterSpacing:"0.04em", color:"var(--black)" },
    navLinks:     { display:"flex", gap:36, listStyle:"none" as const },
    navA:         { fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"var(--dim)", textDecoration:"none" },
    navCta:       { fontFamily:"'Archivo Black',sans-serif", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"var(--white)", background:"var(--black)", padding:"11px 24px", textDecoration:"none" },
    /* hero */
    hero:         { minHeight:"100vh", paddingTop:72, display:"grid", gridTemplateColumns:"55% 45%", position:"relative" as const, overflow:"hidden" as const },
    heroLeft:     { padding:"72px 52px 80px", display:"flex", flexDirection:"column" as const, justifyContent:"center", position:"relative" as const, zIndex:2, borderRight:"1px solid var(--rule)" },
    eyebrowWrap:  { display:"flex", alignItems:"center", gap:14, marginBottom:40 },
    eyebrowLine:  { width:32, height:1, background:"var(--faint)" },
    eyebrowTxt:   { fontSize:10, fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"var(--dim)" },
    heroTitle:    { marginBottom:36 },
    htStack:      { display:"flex", alignItems:"flex-end", gap:14 },
    htStackLabel: { fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"var(--faint)", paddingBottom:14, lineHeight:"1" },
    heroSub:      { fontSize:13, fontWeight:300, lineHeight:1.85, color:"var(--dim)", maxWidth:400, marginBottom:48 },
    heroCtas:     { display:"flex", alignItems:"center", gap:20 },
    btnMain:      { fontFamily:"'Archivo Black',sans-serif", fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase" as const, color:"var(--white)", background:"var(--black)", padding:"16px 32px", textDecoration:"none", position:"relative" as const, transition:"opacity .2s" },
    btnTxt:       { fontSize:11, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:"var(--dim)", textDecoration:"none", display:"flex", alignItems:"center", gap:8 },
    heroRight:    { display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 32px", background:"var(--off)", position:"relative" as const },
    /* mockup */
    mockup:       { width:310, background:"var(--black)", borderRadius:18, padding:24, boxShadow:"0 32px 72px rgba(8,8,7,.22),0 6px 20px rgba(8,8,7,.12)", position:"relative" as const, zIndex:2 },
    mBar:         { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 },
    mLogo:        { fontFamily:"'Archivo Black',sans-serif", fontSize:9, letterSpacing:"0.18em", color:"rgba(247,246,242,.28)" },
    mPill:        { fontSize:8, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase" as const, background:"rgba(247,246,242,.07)", border:"1px solid rgba(247,246,242,.1)", color:"rgba(247,246,242,.35)", padding:"3px 9px", borderRadius:99 },
    tbLabel:      { fontSize:8, fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.28)", marginBottom:5 },
    tbAmt:        { fontFamily:"'Archivo Black',sans-serif", fontSize:48, lineHeight:1, letterSpacing:"-0.03em", color:"var(--white)", marginBottom:4 },
    tbSub:        { fontSize:9, fontWeight:400, color:"rgba(247,246,242,.28)", marginBottom:20 },
    mdiv:         { height:1, background:"rgba(247,246,242,.07)", marginBottom:16 },
    srcList:      { display:"flex", flexDirection:"column" as const, gap:8, marginBottom:18 },
    srcRow:       { display:"flex", justifyContent:"space-between", alignItems:"center" },
    srcL:         { fontSize:"9.5px", fontWeight:400, color:"rgba(247,246,242,.36)", display:"flex", alignItems:"center", gap:7 },
    srcDot:       { width:4, height:4, borderRadius:"50%", background:"rgba(247,246,242,.22)" },
    srcR:         { fontSize:"9.5px", fontWeight:600, color:"rgba(247,246,242,.62)" },
    upcLabel:     { fontSize:8, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.2)", marginBottom:9 },
    upcList:      { display:"flex", flexDirection:"column" as const, gap:6, marginBottom:18 },
    upcRow:       { display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(247,246,242,.04)", borderRadius:6, padding:"8px 10px" },
    upcN:         { fontSize:10, fontWeight:500, color:"rgba(247,246,242,.52)" },
    upcD:         { fontSize:8, fontWeight:400, color:"rgba(247,246,242,.2)", marginTop:1 },
    upcA:         { fontSize:10, fontWeight:600, color:"rgba(247,246,242,.42)" },
    cpBox:        { background:"rgba(247,246,242,.05)", border:"1px solid rgba(247,246,242,.08)", borderRadius:9, padding:"12px 13px" },
    cpQ:          { fontFamily:"'Instrument Serif',serif", fontStyle:"italic" as const, fontSize:12, color:"rgba(247,246,242,.6)", marginBottom:7, lineHeight:1.4 },
    cpA:          { fontSize:9, fontWeight:400, lineHeight:1.6, color:"rgba(247,246,242,.38)" },
    /* float cards */
    fc:           { position:"absolute" as const, background:"var(--white)", border:"1px solid rgba(8,8,7,.14)", padding:"12px 16px", borderRadius:10, boxShadow:"0 8px 28px rgba(8,8,7,.08)", zIndex:3 },
    fcLbl:        { fontSize:8, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"var(--faint)", marginBottom:3 },
    fcVal:        { fontFamily:"'Archivo Black',sans-serif", fontSize:20, letterSpacing:"-0.02em", color:"var(--black)" },
    fcSub:        { fontSize:8, fontWeight:400, color:"var(--faint)", marginTop:2 },
    /* sections */
    section:      { padding:"112px 52px", borderTop:"1px solid var(--rule)" },
    sectionAlt:   { padding:"112px 52px", borderTop:"1px solid var(--rule)", background:"var(--off)" },
    sHeader:      { display:"grid", gridTemplateColumns:"auto 1fr", gap:0, marginBottom:72, paddingBottom:28, borderBottom:"1px solid var(--rule)", alignItems:"end" },
    sEyebrow:     { fontSize:9, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"var(--faint)", marginBottom:12 },
    sTitle:       { fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(28px,3.2vw,46px)", lineHeight:1.05, letterSpacing:"-0.02em", color:"var(--black)" },
    /* pain grid */
    painGrid:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"var(--rule)" },
    painCell:     { background:"var(--white)", padding:"32px 28px" },
    pIco:         { fontSize:22, marginBottom:14, display:"block", filter:"grayscale(1)" },
    pTitle:       { fontFamily:"'Archivo Black',sans-serif", fontSize:13, letterSpacing:"-0.01em", color:"var(--black)", marginBottom:8 },
    pDesc:        { fontSize:11, fontWeight:300, lineHeight:1.75, color:"var(--dim)" },
    /* solution */
    solSection:   { background:"var(--black)", padding:"112px 52px" },
    solEyebrow:   { fontSize:9, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.25)", marginBottom:16 },
    solGrid:      { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"rgba(247,246,242,.07)", marginTop:80 },
    solCard:      { background:"var(--black)", padding:"44px 32px", borderTop:"1px solid rgba(247,246,242,.07)" },
    solN:         { fontFamily:"'Archivo Black',sans-serif", fontSize:11, letterSpacing:"0.16em", color:"rgba(247,246,242,.15)", marginBottom:20, display:"block" },
    solHead:      { fontFamily:"'Archivo Black',sans-serif", fontSize:15, letterSpacing:"-0.01em", color:"var(--white)", marginBottom:12 },
    solDesc:      { fontSize:11, fontWeight:300, lineHeight:1.8, color:"rgba(247,246,242,.38)" },
    solTag:       { display:"inline-block", marginTop:16, fontSize:"8.5px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.2)", border:"1px solid rgba(247,246,242,.09)", padding:"4px 10px" },
    /* copilot */
    copilotWrap:  { padding:"112px 52px", borderTop:"1px solid var(--rule)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" },
    chatWin:      { background:"var(--black)", borderRadius:18, padding:24, boxShadow:"0 20px 56px rgba(8,8,7,.1)" },
    chatHdr:      { display:"flex", alignItems:"center", gap:10, marginBottom:20, paddingBottom:16, borderBottom:"1px solid rgba(247,246,242,.07)" },
    chatAv:       { width:28, height:28, background:"var(--white)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 },
    chatName:     { fontFamily:"'Archivo Black',sans-serif", fontSize:11, color:"var(--white)" },
    chatSt:       { fontSize:"8.5px", fontWeight:400, color:"rgba(247,246,242,.28)" },
    bubblesWrap:  { display:"flex", flexDirection:"column" as const, gap:11 },
    bblUser:      { maxWidth:"88%", padding:"10px 13px", borderRadius:"10px 10px 3px 10px", fontSize:10, fontWeight:400, lineHeight:1.65, background:"rgba(247,246,242,.07)", color:"rgba(247,246,242,.52)", alignSelf:"flex-end" as const },
    bblAi:        { maxWidth:"88%", padding:"10px 13px", borderRadius:"10px 10px 10px 3px", fontSize:10, fontWeight:400, lineHeight:1.65, background:"rgba(247,246,242,.04)", border:"1px solid rgba(247,246,242,.07)", color:"rgba(247,246,242,.68)", alignSelf:"flex-start" as const },
    chatInp:      { marginTop:16, display:"flex", gap:8, paddingTop:13, borderTop:"1px solid rgba(247,246,242,.05)" },
    cinMock:      { flex:1, background:"rgba(247,246,242,.04)", border:"1px solid rgba(247,246,242,.07)", borderRadius:7, padding:"8px 12px", fontSize:9, fontWeight:400, color:"rgba(247,246,242,.2)" },
    csend:        { width:28, height:28, background:"rgba(247,246,242,.08)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"rgba(247,246,242,.32)" },
    cpTitle:      { fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(30px,3.2vw,46px)", lineHeight:1.05, letterSpacing:"-0.02em", color:"var(--black)", marginBottom:10 },
    cpBody:       { fontSize:12, fontWeight:300, lineHeight:1.85, color:"var(--dim)", marginBottom:28 },
    egList:       { listStyle:"none" as const, display:"flex", flexDirection:"column" as const, gap:10, marginBottom:36 },
    egItem:       { fontFamily:"'Instrument Serif',serif", fontStyle:"italic" as const, fontSize:16, color:"var(--black)", padding:"10px 16px", borderLeft:"2px solid var(--rule)" },
    /* audience */
    audSection:   { padding:"112px 52px", background:"var(--black)", color:"var(--white)" },
    audEyebrow:   { fontSize:9, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.25)", marginBottom:16 },
    audHeadline:  { fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(32px,4vw,58px)", lineHeight:.95, letterSpacing:"-0.03em", color:"var(--white)", marginBottom:72 },
    personaGrid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"rgba(247,246,242,.07)" },
    personaCard:  { background:"var(--black)", padding:"44px 36px", position:"relative" as const, overflow:"hidden" as const },
    pTag:         { fontSize:"8.5px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.25)", marginBottom:14 },
    pName:        { fontFamily:"'Archivo Black',sans-serif", fontSize:22, letterSpacing:"-0.02em", color:"var(--white)", marginBottom:5 },
    pRole:        { fontSize:10, fontWeight:400, color:"rgba(247,246,242,.3)", marginBottom:20 },
    pPain:        { fontFamily:"'Instrument Serif',serif", fontStyle:"italic" as const, fontSize:15, color:"rgba(247,246,242,.6)", lineHeight:1.5, marginBottom:16 },
    pSolve:       { fontSize:"10.5px", fontWeight:300, lineHeight:1.75, color:"rgba(247,246,242,.4)" },
    /* compare */
    cmpSection:   { padding:"112px 52px", borderTop:"1px solid var(--rule)" },
    cmpHeader:    { marginBottom:64 },
    cmpSuper:     { fontSize:9, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"var(--faint)", marginBottom:14 },
    cmpTitle:     { fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(28px,3.2vw,46px)", lineHeight:1.05, letterSpacing:"-0.02em", color:"var(--black)" },
    cmpGrid:      { display:"grid", gridTemplateColumns:"1fr 48px 1fr" },
    cmpColOld:    { padding:"44px 36px", border:"1px solid var(--rule)", background:"var(--off)" },
    cmpColNew:    { padding:"44px 36px", border:"1px solid var(--rule)", background:"var(--black)", color:"var(--white)" },
    cmpBadge:     { fontSize:"8.5px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase" as const, marginBottom:20, display:"inline-block", padding:"4px 11px", border:"1px solid currentColor", opacity:.4 },
    cmpHead:      { fontFamily:"'Archivo Black',sans-serif", fontSize:26, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:28 },
    cmpItems:     { listStyle:"none" as const, display:"flex", flexDirection:"column" as const, gap:12 },
    cmpItemOld:   { fontSize:11, fontWeight:300, lineHeight:1.6, paddingLeft:20, position:"relative" as const, color:"var(--dim)" },
    cmpItemNew:   { fontSize:11, fontWeight:300, lineHeight:1.6, paddingLeft:20, position:"relative" as const, color:"rgba(247,246,242,.48)" },
    cmpVs:        { display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Instrument Serif',serif", fontStyle:"italic" as const, fontSize:26, color:"var(--faint)" },
    /* cta */
    ctaSection:   { padding:"140px 52px", textAlign:"center" as const, position:"relative" as const, overflow:"hidden" as const, borderTop:"1px solid var(--rule)" },
    ctaBgWord:    { position:"absolute" as const, top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(120px,20vw,260px)", letterSpacing:"-0.04em", color:"transparent", WebkitTextStroke:"1px rgba(8,8,7,.05)", whiteSpace:"nowrap" as const, pointerEvents:"none" as const, lineHeight:1 },
    ctaSuper:     { fontSize:9, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"var(--faint)", marginBottom:20, position:"relative" as const },
    ctaTitle:     { fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(42px,6.5vw,90px)", lineHeight:.92, letterSpacing:"-0.03em", color:"var(--black)", marginBottom:12, position:"relative" as const },
    ctaSub:       { fontSize:12, fontWeight:300, lineHeight:1.8, color:"var(--dim)", maxWidth:400, margin:"0 auto", marginBottom:48, position:"relative" as const },
    emailForm:    { display:"inline-flex", border:"1.5px solid var(--black)", position:"relative" as const },
    emailIn:      { background:"transparent", border:"none", outline:"none", padding:"15px 20px", fontSize:11, fontWeight:400, color:"var(--black)", width:260 },
    emailSub:     { background:"var(--black)", color:"var(--white)", border:"none", padding:"15px 24px", fontFamily:"'Archivo Black',sans-serif", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase" as const, cursor:"none" },
    ctaTrust:     { display:"flex", alignItems:"center", justifyContent:"center", gap:28, marginTop:24, position:"relative" as const },
    trustI:       { fontSize:9, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"var(--faint)", display:"flex", alignItems:"center", gap:8 },
    /* footer */
    footer:       { padding:"32px 52px", borderTop:"1px solid rgba(247,246,242,.08)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--black)" },
    fLogo:        { fontFamily:"'Archivo Black',sans-serif", fontSize:13, letterSpacing:"0.04em", color:"var(--white)" },
    fCopy:        { fontSize:9, fontWeight:400, letterSpacing:"0.1em", color:"rgba(247,246,242,.25)" },
    fLinks:       { display:"flex", gap:24, listStyle:"none" as const },
    fA:           { fontSize:9, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"rgba(247,246,242,.25)", textDecoration:"none" },
  } as const;

  return (
    <><div className="">
    <div style={S.page} className="">
      {/* Cursor */}
      <div ref={curRef}  className="of-cur" />
      <div ref={ringRef} className="of-cur-ring" />

      {/* ── NAV ── */}
    <nav className="flex items-center justify-between h-16 fixed top-0 z-50 w-screen max-w-none m-0 px-0 left-[calc(50%-50vw)] bg-[#000000] border-b border-white/6 backdrop-blur-2xl p-0">
  
  {/* BRANDING: The "Hero" Logo Assembly */}
  <div className="flex items-center gap-1 group cursor-pointer">
    {/* Image Container with Subtle Glass Backing */}
    <div className="relative flex items-center justify-center">
      {/* Dynamic Background Glow */}
      <div className="absolute -inset-4 bg-white/3 blur-2xl rounded-full group-hover:bg-white/8 transition-all duration-1000" />
      
      {/* The Logo: Massive & Crisp */}
      <img
        src="/Logo2.png"
        alt="OnlyFinance"
        className="h-12 w-12 md:h-14 left-2 md:w-14 object-contain relative z-10 brightness-0 invert transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-2"
      />
    </div>

    {/* Text Assembly */}
    <div>
      <h1>
      <span className="text-sm tracking-widest text-white">Only</span>
      <span className="text-sm tracking-widest text-white">FINANCE</span>
      </h1>
    </div>
   
  </div>

  {/* NAVIGATION: Subtle Ghost Links */}
  <ul className="hidden xl:flex items-center gap-12 ">
    {["How It Works", "Features", "For Students", "Pricing"].map((item) => (
      <li key={item}>
        <a 
          href={`#${item.toLowerCase().replace(/ /g, '')}`} 
          className="text-[14px] font-medium text-white/30 hover:text-white transition-all duration-500 hover:tracking-widest"
        >
          {item}
        </a>
      </li>
    ))}
  </ul>

  {/* CTA: Minimalist Weight */}
  <div className="flex items-center gap-8">
    <button className="hidden sm:block text-[14px] font-medium text-white/50 hover:text-white transition-colors">
      Sign In
    </button>
   
  </div>
</nav>

      {/* ── HERO ── */}
      <section id="hero" style={S.hero}>
        {/* left */}
        <div style={S.heroLeft}>
          <div style={S.eyebrowWrap} className="anim-fadeup-1">
            <div style={S.eyebrowLine} />
            <span style={S.eyebrowTxt}>AI Financial Co-pilot — Beta Now Open</span>
          </div>

          <h1 style={S.heroTitle} className="anim-fadeup-2">
            <div style={S.htStack}>
              <span className="ht-solid">YOUR</span>
              <span style={S.htStackLabel}>money is</span>
            </div>
            <span className="ht-outline">EVERY-</span>
            <span className="ht-outline">WHERE.</span>
            <span className="ht-serif">your clarity shouldn't be.</span>
          </h1>

          <p style={S.heroSub} className="anim-fadeup-3">
            One intelligent layer that unifies your bank accounts, UPI apps, and subscriptions —
            and shows you your <strong style={{fontWeight:700,color:"var(--black)"}}>True Balance™</strong> after every upcoming bill, EMI, and rent.
          </p>

          <div style={S.heroCtas} className="anim-fadeup-4">
            <a href="#" style={S.btnMain} className="btn-shadow">Get Free Access</a>
            <a href="#" style={S.btnTxt}>See how it works <span>→</span></a>
          </div>
        </div>

        {/* right — mockup */}
        <div style={S.heroRight} className="hero-dot-grid anim-fadein-5">
          {/* float card 1 */}
          <div style={{ ...S.fc, top:"16%", right:"-2%" }} className="anim-float-1">
            <div style={S.fcLbl}>True Balance™</div>
            <div style={S.fcVal}>₹14,280</div>
            <div style={S.fcSub}>After rent, EMI &amp; subs</div>
          </div>

          {/* mockup */}
          <div style={S.mockup}>
            <div style={S.mBar}>
              <span style={S.mLogo}>ONLYFINANCE</span>
              <span style={S.mPill}>● Live</span>
            </div>
            <div style={S.tbLabel}>True Balance™</div>
            <div style={S.tbAmt}>₹14,280</div>
            <div style={S.tbSub}>safe to spend right now</div>
            <div style={S.mdiv} />
            <div style={S.srcList}>
              {sources.map(r => (
                <div key={r.label} style={S.srcRow}>
                  <span style={S.srcL}><span style={S.srcDot}/>{r.label}</span>
                  <span style={S.srcR}>{r.amount}</span>
                </div>
              ))}
            </div>
            <div style={S.mdiv} />
            <div style={S.upcLabel}>Upcoming Obligations</div>
            <div style={S.upcList}>
              {upcoming.map(u => (
                <div key={u.name} style={S.upcRow}>
                  <div><div style={S.upcN}>{u.name}</div><div style={S.upcD}>{u.date}</div></div>
                  <div style={S.upcA}>{u.amount}</div>
                </div>
              ))}
            </div>
            <div style={S.cpBox}>
              <div style={S.cpQ}>"Can I go to that ₹800 dinner tonight?"</div>
              <div style={S.cpA}><strong style={{color:"rgba(247,246,242,.75)",fontWeight:600}}>Yes, comfortably.</strong> You'll still have ₹13,480 — rent is 3 days out. Go enjoy it.</div>
            </div>
          </div>

          {/* float card 2 */}
          <div style={{ ...S.fc, bottom:"20%", left:"-4%" }} className="anim-float-2">
            <div style={S.fcLbl}>Invisible Leak Found</div>
            <div style={S.fcVal}>₹840/mo</div>
            <div style={S.fcSub}>3 forgotten subscriptions</div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" style={S.section}>
        <div style={S.sHeader}>
          <div className="s-ghost-num">01</div>
          <div>
            <div style={S.sEyebrow}>The Problem</div>
            <h2 style={S.sTitle}>
              You're not broke. You're in{" "}
              <em style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",letterSpacing:0,color:"var(--dim)"}}>Financial Fog.</em>
            </h2>
          </div>
        </div>
        <p style={{fontSize:13,fontWeight:300,lineHeight:1.85,color:"var(--dim)",maxWidth:600,marginBottom:52}}>
          Your money lives in 4 different places. Your brain tries to hold a running total while tracking UPI spends, EMIs due next Tuesday, and the subscription you forgot. No app shows your actual number — what's safe to spend, right now.
        </p>
        <div style={S.painGrid}>
          {painCells.map(c => (
            <div key={c.title} style={S.painCell} className="reveal">
              <span style={S.pIco}>{c.icon}</span>
              <div style={S.pTitle}>{c.title}</div>
              <div style={S.pDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section id="solution" style={S.solSection}>
        <div style={S.solEyebrow}>The Solution</div>
        <div>
          <span className="sol-h1">FROM REPORTER</span>
          <span className="sol-h2">to co-pilot.</span>
        </div>
        <div style={S.solGrid}>
          {solCards.map(c => (
            <div key={c.num} style={S.solCard} className="reveal">
              <span style={S.solN}>{c.num}</span>
              <div style={S.solHead}>{c.head}</div>
              <div style={S.solDesc}>{c.desc}</div>
              <span style={S.solTag}>{c.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── COPILOT ── */}
      <section id="copilot" style={S.copilotWrap}>
        <div>
          <div style={S.chatWin}>
            <div style={S.chatHdr}>
              <div style={S.chatAv}>🤖</div>
              <div>
                <div style={S.chatName}>FinanceGPT</div>
                <div style={S.chatSt}>● Online · Knows your full financial picture</div>
              </div>
            </div>
            <div style={S.bubblesWrap}>
              {bubbles.map((b, i) => (
                <div key={i} style={b.role === "user" ? S.bblUser : S.bblAi} className="reveal">
                  {b.content}
                </div>
              ))}
            </div>
            <div style={S.chatInp}>
              <div style={S.cinMock}>Ask anything about your money…</div>
              <div style={S.csend}>↑</div>
            </div>
          </div>
        </div>
        <div>
          <div style={S.sEyebrow}>AI Co-pilot</div>
          <h2 style={S.cpTitle}>
            Ask your money{" "}
            <em style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",letterSpacing:0,color:"var(--dim)"}}>anything.</em>
          </h2>
          <p style={S.cpBody}>
            The co-pilot answers with full context — your balances across all accounts, upcoming obligations, spending patterns, and goals. No more guessing.
          </p>
          <ul style={S.egList}>
            {egQuestions.map(q => <li key={q} style={S.egItem}>{q}</li>)}
          </ul>
          <a href="#" style={S.btnMain} className="btn-shadow">Try the Co-pilot</a>
        </div>
      </section>

      {/* ── AUDIENCE ── */}
      <section id="audience" style={S.audSection}>
        <div style={S.audEyebrow}>Who It's For</div>
        <h2 style={S.audHeadline}>
          BUILT FOR THE<br/>
          <span className="aud-em">generation juggling</span><br/>
          EVERYTHING.
        </h2>
        <div style={S.personaGrid}>
          {personas.map(p => (
            <div key={p.name} style={S.personaCard} className="reveal">
              <div className="p-initial-bg">{p.initial}</div>
              <div style={S.pTag}>{p.tag}</div>
              <div style={S.pName}>{p.name}</div>
              <div style={S.pRole}>{p.role}</div>
              <div style={S.pPain}>{p.pain}</div>
              <div style={S.pSolve}>{p.solve}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section id="compare" style={S.cmpSection}>
        <div style={S.cmpHeader}>
          <div style={S.cmpSuper}>The Paradigm Shift</div>
          <h2 style={S.cmpTitle}>
            Your bank app is a reporter.<br/>
            <em style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",letterSpacing:0,color:"var(--dim)"}}>We're your co-pilot.</em>
          </h2>
        </div>
        <div style={S.cmpGrid}>
          <div style={S.cmpColOld} className="reveal">
            <span style={S.cmpBadge}>Traditional App</span>
            <div style={{...S.cmpHead,color:"var(--black)"}}>Tells you what already happened.</div>
            <ul style={S.cmpItems}>
              {oldItems.map(i => (
                <li key={i.text} style={S.cmpItemOld}>
                  <span style={{position:"absolute",left:0,opacity:.35}}>—</span>{i.text}
                </li>
              ))}
            </ul>
          </div>
          <div style={S.cmpVs}>vs</div>
          <div style={S.cmpColNew} className="reveal">
            <span style={S.cmpBadge}>OnlyFinance</span>
            <div className="cmp-head-new">Guides what comes next.</div>
            <ul style={S.cmpItems}>
              {newItems.map(i => (
                <li key={i.text} style={S.cmpItemNew}>
                  <span style={{position:"absolute",left:0,color:"rgba(247,246,242,.6)"}}>✓</span>{i.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" style={S.ctaSection}>
        <div style={S.ctaBgWord}>CLARITY</div>
        <p style={S.ctaSuper}>Limited Beta — Free for Students</p>
        <h2 style={S.ctaTitle}>KNOW YOUR</h2>
        <span className="cta-outline">true balance.</span>
        <p style={S.ctaSub}>
          Join 2,800+ students and young professionals already on the waitlist. Free during beta. No credit card needed.
        </p>
        <div style={S.emailForm}>
          <input type="email" placeholder="your@email.com" style={S.emailIn} />
          <button style={S.emailSub}>Join Waitlist</button>
        </div>
        <div style={S.ctaTrust}>
          {["Free for students","Bank-grade encryption","No data sold"].map(t => (
            <span key={t} style={S.trustI}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={S.footer}>
        <div style={S.fLogo}>ONLYFINANCE</div>
        <span style={S.fCopy}>© 2024 OnlyFinance · Made for India's next generation</span>
        <ul style={S.fLinks}>
          {["Privacy","Security","Contact"].map(l => (
            <li key={l}><a href="#" style={S.fA}>{l}</a></li>
          ))}
        </ul>
      </footer>
    </div>
    </div></>
  );
}

export default LandingPage;