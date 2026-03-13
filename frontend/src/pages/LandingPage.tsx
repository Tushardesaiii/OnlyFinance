<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ONLYFINANCE — Know Your True Balance</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,100..900;1,100..900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --black:#080807;
  --white:#f7f6f2;
  --off:#eeece7;
  --mid:#1c1c1a;
  --dim:#6b6b63;
  --faint:#b8b8b0;
  --rule:rgba(8,8,7,.1);
}
html{scroll-behavior:smooth;}
body{background:var(--white);color:var(--black);font-family:'Archivo',sans-serif;overflow-x:hidden;cursor:none;}

/* CURSOR */
.cur{position:fixed;width:9px;height:9px;background:var(--black);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s,border-radius .2s;}
.cur-ring{position:fixed;width:34px;height:34px;border:1px solid rgba(8,8,7,.25);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .28s,height .28s;}

/* NAV */
nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 52px;
  background:rgba(247,246,242,.9);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--rule);
}
.nav-logo{
  font-family:'Archivo Black',sans-serif;
  font-size:15px;letter-spacing:0.04em;color:var(--black);
}
.nav-logo sup{font-family:'Archivo',sans-serif;font-weight:300;font-size:9px;letter-spacing:0.2em;opacity:.4;vertical-align:super;margin-left:4px;}
.nav-links{display:flex;gap:36px;list-style:none;}
.nav-links a{font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:var(--dim);text-decoration:none;transition:color .2s;}
.nav-links a:hover{color:var(--black);}
.nav-cta{font-family:'Archivo Black',sans-serif;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--white);background:var(--black);padding:11px 24px;text-decoration:none;transition:opacity .2s;}
.nav-cta:hover{opacity:.7;}

/* HERO */
.hero{
  min-height:100vh;padding-top:72px;
  display:grid;grid-template-columns:55% 45%;
  position:relative;overflow:hidden;
}
.hero-left{
  padding:72px 52px 80px;
  display:flex;flex-direction:column;justify-content:center;
  position:relative;z-index:2;
  border-right:1px solid var(--rule);
}

/* THE BIG TYPOGRAPHIC STATEMENT */
.hero-eyebrow{
  display:flex;align-items:center;gap:14px;
  margin-bottom:40px;
  opacity:0;animation:fadeUp .8s ease .05s forwards;
}
.eyebrow-line{width:32px;height:1px;background:var(--faint);}
.eyebrow-text{font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:var(--dim);}

.hero-title{
  margin-bottom:36px;
  opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .15s forwards;
}
/* Solid filled line */
.ht-solid{
  display:block;
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(58px,7.5vw,108px);
  line-height:.92;
  letter-spacing:-0.03em;
  color:var(--black);
}
/* Outlined / ghost line */
.ht-outline{
  display:block;
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(58px,7.5vw,108px);
  line-height:.92;
  letter-spacing:-0.03em;
  color:transparent;
  -webkit-text-stroke:1.5px var(--black);
}
/* Italic serif accent line */
.ht-serif{
  display:block;
  font-family:'Instrument Serif',serif;
  font-style:italic;
  font-size:clamp(44px,5.8vw,84px);
  line-height:1.05;
  letter-spacing:-0.01em;
  color:var(--dim);
}
/* Tiny word stacked on same row */
.ht-stack{
  display:flex;align-items:flex-end;gap:14px;
}
.ht-stack-label{
  font-size:10px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;
  color:var(--faint);padding-bottom:14px;line-height:1;
}

.hero-sub{
  font-size:13px;font-weight:300;line-height:1.85;
  color:var(--dim);max-width:400px;margin-bottom:48px;
  opacity:0;animation:fadeUp .8s ease .35s forwards;
}
.hero-sub strong{font-weight:700;color:var(--black);}

.hero-ctas{
  display:flex;align-items:center;gap:20px;
  opacity:0;animation:fadeUp .8s ease .5s forwards;
}
.btn-main{
  font-family:'Archivo Black',sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;
  color:var(--white);background:var(--black);padding:16px 32px;text-decoration:none;
  position:relative;transition:opacity .2s;
}
.btn-main::after{content:'';position:absolute;inset:0;border:1.5px solid var(--black);transform:translate(4px,4px);transition:transform .2s;}
.btn-main:hover{opacity:.85;}
.btn-main:hover::after{transform:translate(6px,6px);}
.btn-text{
  font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;
  color:var(--dim);text-decoration:none;display:flex;align-items:center;gap:8px;transition:color .2s;
}
.btn-text:hover{color:var(--black);}
.btn-text span{transition:transform .2s;}
.btn-text:hover span{transform:translateX(4px);}

/* HERO RIGHT */
.hero-right{
  display:flex;align-items:center;justify-content:center;
  padding:80px 32px;
  background:var(--off);
  position:relative;
  opacity:0;animation:fadeIn .9s ease .6s forwards;
}

/* dot grid bg */
.hero-right::before{
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle, rgba(8,8,7,.12) 1px, transparent 1px);
  background-size:22px 22px;
  mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);
}

.mockup{
  width:310px;background:var(--black);border-radius:18px;padding:24px;
  box-shadow:0 32px 72px rgba(8,8,7,.22),0 6px 20px rgba(8,8,7,.12);
  position:relative;z-index:2;
}
.m-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;}
.m-logo{font-family:'Archivo Black',sans-serif;font-size:9px;letter-spacing:0.18em;color:rgba(247,246,242,.28);}
.m-pill{font-size:8px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;background:rgba(247,246,242,.07);border:1px solid rgba(247,246,242,.1);color:rgba(247,246,242,.35);padding:3px 9px;border-radius:99px;}
.tb-label{font-size:8px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(247,246,242,.28);margin-bottom:5px;}
.tb-amt{
  font-family:'Archivo Black',sans-serif;
  font-size:48px;line-height:1;letter-spacing:-0.03em;
  color:var(--white);margin-bottom:4px;
}
.tb-sub{font-size:9px;font-weight:400;color:rgba(247,246,242,.28);margin-bottom:20px;}
.mdiv{height:1px;background:rgba(247,246,242,.07);margin-bottom:16px;}
.src-list{display:flex;flex-direction:column;gap:8px;margin-bottom:18px;}
.src-row{display:flex;justify-content:space-between;align-items:center;}
.src-l{font-size:9.5px;font-weight:400;color:rgba(247,246,242,.36);display:flex;align-items:center;gap:7px;}
.src-dot{width:4px;height:4px;border-radius:50%;background:rgba(247,246,242,.22);}
.src-r{font-size:9.5px;font-weight:600;color:rgba(247,246,242,.62);}
.upc-label{font-size:8px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(247,246,242,.2);margin-bottom:9px;}
.upc-list{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
.upc-row{display:flex;justify-content:space-between;align-items:center;background:rgba(247,246,242,.04);border-radius:6px;padding:8px 10px;}
.upc-n{font-size:10px;font-weight:500;color:rgba(247,246,242,.52);}
.upc-d{font-size:8px;font-weight:400;color:rgba(247,246,242,.2);margin-top:1px;}
.upc-a{font-size:10px;font-weight:600;color:rgba(247,246,242,.42);}
.cp-box{background:rgba(247,246,242,.05);border:1px solid rgba(247,246,242,.08);border-radius:9px;padding:12px 13px;}
.cp-q{
  font-family:'Instrument Serif',serif;font-style:italic;
  font-size:12px;color:rgba(247,246,242,.6);margin-bottom:7px;line-height:1.4;
}
.cp-a{font-size:9px;font-weight:400;line-height:1.6;color:rgba(247,246,242,.38);}
.cp-a strong{color:rgba(247,246,242,.75);font-weight:600;}

/* Float cards */
.fc{position:absolute;background:var(--white);border:1px solid rgba(8,8,7,.14);padding:12px 16px;border-radius:10px;box-shadow:0 8px 28px rgba(8,8,7,.08);z-index:3;}
.fc-1{top:16%;right:-2%;animation:float 4.2s ease-in-out infinite;}
.fc-2{bottom:20%;left:-4%;animation:float 4.2s ease-in-out 2s infinite;}
.fc-lbl{font-size:8px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--faint);margin-bottom:3px;}
.fc-val{font-family:'Archivo Black',sans-serif;font-size:20px;letter-spacing:-0.02em;color:var(--black);}
.fc-sub{font-size:8px;font-weight:400;color:var(--faint);margin-top:2px;}

/* ─── PROBLEM ─── */
.section{padding:112px 52px;border-top:1px solid var(--rule);}
.section.alt{background:var(--off);}

.s-header{
  display:grid;grid-template-columns:auto 1fr;gap:0;
  margin-bottom:72px;padding-bottom:28px;border-bottom:1px solid var(--rule);
  align-items:end;
}
.s-num{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(80px,10vw,140px);line-height:.85;
  letter-spacing:-0.04em;color:transparent;
  -webkit-text-stroke:1px rgba(8,8,7,.1);
  margin-right:32px;
  user-select:none;
}
.s-title-block{}
.s-eyebrow{font-size:9px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:var(--faint);margin-bottom:12px;}
.s-title{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(28px,3.2vw,46px);line-height:1.05;letter-spacing:-0.02em;
  color:var(--black);
}
.s-title em{
  font-family:'Instrument Serif',serif;font-weight:400;font-style:italic;
  letter-spacing:0;color:var(--dim);
}

.pain-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--rule);}
.pain-cell{background:var(--white);padding:32px 28px;transition:background .2s;}
.pain-cell:hover{background:var(--off);}
.section.alt .pain-cell{background:var(--off);}
.section.alt .pain-cell:hover{background:var(--white);}
.p-ico{font-size:22px;margin-bottom:14px;display:block;filter:grayscale(1);}
.p-title{font-family:'Archivo Black',sans-serif;font-size:13px;letter-spacing:-0.01em;color:var(--black);margin-bottom:8px;}
.p-desc{font-size:11px;font-weight:300;line-height:1.75;color:var(--dim);}

/* ─── SOLUTION ─── */
.sol-section{background:var(--black);padding:112px 52px;}
.sol-eyebrow{font-size:9px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:rgba(247,246,242,.25);margin-bottom:16px;}
.sol-headline{margin-bottom:0;}
.sol-h-line1{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(44px,6vw,88px);line-height:.9;letter-spacing:-0.03em;
  color:var(--white);display:block;
}
.sol-h-line2{
  font-family:'Instrument Serif',serif;font-style:italic;
  font-size:clamp(40px,5.5vw,82px);line-height:1;letter-spacing:-0.01em;
  color:transparent;-webkit-text-stroke:1px rgba(247,246,242,.35);display:block;
}
.sol-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(247,246,242,.07);margin-top:80px;}
.sol-card{background:var(--black);padding:44px 32px;border-top:1px solid rgba(247,246,242,.07);transition:background .3s;}
.sol-card:hover{background:#151513;}
.sol-n{
  font-family:'Archivo Black',sans-serif;
  font-size:11px;letter-spacing:0.16em;color:rgba(247,246,242,.15);
  margin-bottom:20px;display:block;
}
.sol-head{font-family:'Archivo Black',sans-serif;font-size:15px;letter-spacing:-0.01em;color:var(--white);margin-bottom:12px;}
.sol-desc{font-size:11px;font-weight:300;line-height:1.8;color:rgba(247,246,242,.38);}
.sol-tag{display:inline-block;margin-top:16px;font-size:8.5px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(247,246,242,.2);border:1px solid rgba(247,246,242,.09);padding:4px 10px;}

/* ─── COPILOT ─── */
.copilot-wrap{
  padding:112px 52px;border-top:1px solid var(--rule);
  display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;
}
.chat-win{background:var(--black);border-radius:18px;padding:24px;box-shadow:0 20px 56px rgba(8,8,7,.1);}
.chat-hdr{display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(247,246,242,.07);}
.chat-av{width:28px;height:28px;background:var(--white);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;}
.chat-name{font-family:'Archivo Black',sans-serif;font-size:11px;color:var(--white);}
.chat-st{font-size:8.5px;font-weight:400;color:rgba(247,246,242,.28);}
.bubbles{display:flex;flex-direction:column;gap:11px;}
.bbl{max-width:88%;padding:10px 13px;border-radius:10px;font-size:10px;font-weight:400;line-height:1.65;}
.bbl.user{background:rgba(247,246,242,.07);color:rgba(247,246,242,.52);align-self:flex-end;border-radius:10px 10px 3px 10px;}
.bbl.ai{background:rgba(247,246,242,.04);border:1px solid rgba(247,246,242,.07);color:rgba(247,246,242,.68);align-self:flex-start;border-radius:10px 10px 10px 3px;}
.bbl.ai strong{color:var(--white);font-weight:700;}
.chat-inp{margin-top:16px;display:flex;gap:8px;padding-top:13px;border-top:1px solid rgba(247,246,242,.05);}
.cin-mock{flex:1;background:rgba(247,246,242,.04);border:1px solid rgba(247,246,242,.07);border-radius:7px;padding:8px 12px;font-size:9px;font-weight:400;color:rgba(247,246,242,.2);}
.csend{width:28px;height:28px;background:rgba(247,246,242,.08);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(247,246,242,.32);}

.cp-txt .s-eyebrow{margin-bottom:16px;}
.cp-title{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(30px,3.2vw,46px);line-height:1.05;letter-spacing:-0.02em;
  color:var(--black);margin-bottom:10px;
}
.cp-title em{
  font-family:'Instrument Serif',serif;font-weight:400;font-style:italic;
  letter-spacing:0;color:var(--dim);
}
.cp-body{font-size:12px;font-weight:300;line-height:1.85;color:var(--dim);margin-bottom:28px;}
.eg-list{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:36px;}
.eg-list li{
  font-family:'Instrument Serif',serif;font-style:italic;
  font-size:16px;color:var(--black);padding:10px 16px;
  border-left:2px solid var(--rule);
  transition:border-color .2s,background .2s;
}
.eg-list li:hover{border-left-color:var(--black);background:var(--off);}

/* ─── AUDIENCE ─── */
.audience-section{padding:112px 52px;background:var(--black);color:var(--white);}
.aud-eyebrow{font-size:9px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:rgba(247,246,242,.25);margin-bottom:16px;}
.aud-headline{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(32px,4vw,58px);line-height:.95;letter-spacing:-0.03em;
  color:var(--white);margin-bottom:72px;
}
.aud-headline em{
  font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;
  color:transparent;-webkit-text-stroke:1px rgba(247,246,242,.35);letter-spacing:-0.01em;
}
.persona-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(247,246,242,.07);}
.persona-card{background:var(--black);padding:44px 36px;position:relative;overflow:hidden;transition:background .3s;}
.persona-card:hover{background:#151513;}
.p-initial{
  font-family:'Archivo Black',sans-serif;
  font-size:120px;line-height:1;letter-spacing:-0.04em;
  color:transparent;-webkit-text-stroke:1px rgba(247,246,242,.05);
  position:absolute;top:12px;right:24px;user-select:none;
}
.p-tag{font-size:8.5px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(247,246,242,.25);margin-bottom:14px;}
.p-name{font-family:'Archivo Black',sans-serif;font-size:22px;letter-spacing:-0.02em;color:var(--white);margin-bottom:5px;}
.p-role{font-size:10px;font-weight:400;color:rgba(247,246,242,.3);margin-bottom:20px;}
.p-pain{
  font-family:'Instrument Serif',serif;font-style:italic;
  font-size:15px;color:rgba(247,246,242,.6);line-height:1.5;margin-bottom:16px;
}
.p-solve{font-size:10.5px;font-weight:300;line-height:1.75;color:rgba(247,246,242,.4);}

/* ─── COMPARE ─── */
.compare-section{padding:112px 52px;border-top:1px solid var(--rule);}
.cmp-header{margin-bottom:64px;}
.cmp-super{font-size:9px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:var(--faint);margin-bottom:14px;}
.cmp-title{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(28px,3.2vw,46px);line-height:1.05;letter-spacing:-0.02em;color:var(--black);
}
.cmp-title em{
  font-family:'Instrument Serif',serif;font-weight:400;font-style:italic;letter-spacing:0;color:var(--dim);
}
.cmp-grid{display:grid;grid-template-columns:1fr 48px 1fr;}
.cmp-col{padding:44px 36px;border:1px solid var(--rule);}
.cmp-col.old{background:var(--off);}
.cmp-col.new{background:var(--black);color:var(--white);}
.cmp-badge{font-size:8.5px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:20px;display:inline-block;padding:4px 11px;border:1px solid currentColor;opacity:.4;}
.cmp-head{
  font-family:'Archivo Black',sans-serif;font-size:26px;letter-spacing:-0.02em;
  line-height:1.15;margin-bottom:28px;
}
.cmp-items{list-style:none;display:flex;flex-direction:column;gap:12px;}
.cmp-items li{font-size:11px;font-weight:300;line-height:1.6;padding-left:20px;position:relative;color:var(--dim);}
.cmp-col.new .cmp-items li{color:rgba(247,246,242,.48);}
.cmp-items li::before{content:'—';position:absolute;left:0;opacity:.35;}
.cmp-col.new .cmp-items li::before{content:'✓';color:rgba(247,246,242,.6);opacity:1;}
.cmp-vs{display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-style:italic;font-size:26px;color:var(--faint);}

/* ─── CTA ─── */
.cta-section{
  padding:140px 52px;text-align:center;
  position:relative;overflow:hidden;
  border-top:1px solid var(--rule);
}
.cta-bg-word{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(120px,20vw,260px);letter-spacing:-0.04em;
  color:transparent;-webkit-text-stroke:1px rgba(8,8,7,.05);
  white-space:nowrap;pointer-events:none;line-height:1;
}
.cta-super{font-size:9px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:var(--faint);margin-bottom:20px;position:relative;}
.cta-title{
  font-family:'Archivo Black',sans-serif;
  font-size:clamp(42px,6.5vw,90px);line-height:.92;letter-spacing:-0.03em;
  color:var(--black);margin-bottom:12px;position:relative;
}
.cta-title-2{
  font-family:'Instrument Serif',serif;font-style:italic;
  font-size:clamp(38px,6vw,84px);line-height:1;letter-spacing:-0.01em;
  color:var(--dim);margin-bottom:28px;position:relative;display:block;
}
.cta-sub{font-size:12px;font-weight:300;line-height:1.8;color:var(--dim);max-width:400px;margin:0 auto 48px;position:relative;}
.email-form{display:inline-flex;border:1.5px solid var(--black);position:relative;}
.email-in{background:transparent;border:none;outline:none;padding:15px 20px;font-size:11px;font-weight:400;color:var(--black);width:260px;}
.email-in::placeholder{color:var(--faint);}
.email-sub{background:var(--black);color:var(--white);border:none;padding:15px 24px;font-family:'Archivo Black',sans-serif;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;cursor:none;transition:opacity .2s;}
.email-sub:hover{opacity:.75;}
.cta-trust{display:flex;align-items:center;justify-content:center;gap:28px;margin-top:24px;position:relative;}
.trust-i{font-size:9px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--faint);display:flex;align-items:center;gap:8px;}
.trust-i::before{content:'';width:12px;height:1px;background:var(--faint);}

/* FOOTER */
footer{padding:32px 52px;border-top:1px solid rgba(247,246,242,.08);display:flex;align-items:center;justify-content:space-between;background:var(--black);}
.f-logo{font-family:'Archivo Black',sans-serif;font-size:13px;letter-spacing:0.04em;color:var(--white);}
.f-copy{font-size:9px;font-weight:400;letter-spacing:0.1em;color:rgba(247,246,242,.25);}
.f-links{display:flex;gap:24px;list-style:none;}
.f-links a{font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(247,246,242,.25);text-decoration:none;transition:color .2s;}
.f-links a:hover{color:var(--white);}

/* ANIMATIONS */
@keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
</style>
</head>
<body>

<div class="cur" id="cur"></div>
<div class="cur-ring" id="curRing"></div>

<!-- NAV -->
<nav>
  <div class="nav-logo">ONLYFINANCE <sup>AI</sup></div>
  <ul class="nav-links">
    <li><a href="#">How It Works</a></li>
    <li><a href="#">Features</a></li>
    <li><a href="#">For Students</a></li>
    <li><a href="#">Pricing</a></li>
  </ul>
  <a href="#" class="nav-cta">Early Access</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-left">
    <div class="hero-eyebrow">
      <div class="eyebrow-line"></div>
      <span class="eyebrow-text">AI Financial Co-pilot — Beta Now Open</span>
    </div>

    <h1 class="hero-title">
      <div class="ht-stack">
        <span class="ht-solid">YOUR</span>
        <span class="ht-stack-label">money is</span>
      </div>
      <span class="ht-outline">EVERY-</span>
      <span class="ht-outline">WHERE.</span>
      <span class="ht-serif">your clarity shouldn't be.</span>
    </h1>

    <p class="hero-sub">
      One intelligent layer that unifies your bank accounts, UPI apps, and subscriptions —
      and shows you your <strong>True Balance™</strong> after every upcoming bill, EMI, and rent.
    </p>

    <div class="hero-ctas">
      <a href="#" class="btn-main">Get Free Access</a>
      <a href="#" class="btn-text">See how it works <span>→</span></a>
    </div>
  </div>

  <div class="hero-right">
    <div class="fc fc-1">
      <div class="fc-lbl">True Balance™</div>
      <div class="fc-val">₹14,280</div>
      <div class="fc-sub">After rent, EMI &amp; subs</div>
    </div>

    <div class="mockup">
      <div class="m-bar">
        <span class="m-logo">ONLYFINANCE</span>
        <span class="m-pill">● Live</span>
      </div>
      <div class="tb-label">True Balance™</div>
      <div class="tb-amt">₹14,280</div>
      <div class="tb-sub">safe to spend right now</div>
      <div class="mdiv"></div>
      <div class="src-list">
        <div class="src-row"><span class="src-l"><span class="src-dot"></span>SBI Savings</span><span class="src-r">₹22,400</span></div>
        <div class="src-row"><span class="src-l"><span class="src-dot"></span>PhonePe Wallet</span><span class="src-r">₹1,200</span></div>
        <div class="src-row"><span class="src-l"><span class="src-dot"></span>HDFC Account</span><span class="src-r">₹8,560</span></div>
      </div>
      <div class="mdiv"></div>
      <div class="upc-label">Upcoming Obligations</div>
      <div class="upc-list">
        <div class="upc-row"><div><div class="upc-n">Rent</div><div class="upc-d">Due in 3 days</div></div><div class="upc-a">−₹12,000</div></div>
        <div class="upc-row"><div><div class="upc-n">Student Loan EMI</div><div class="upc-d">Due in 5 days</div></div><div class="upc-a">−₹4,800</div></div>
        <div class="upc-row"><div><div class="upc-n">Netflix + Spotify</div><div class="upc-d">Due in 8 days</div></div><div class="upc-a">−₹1,080</div></div>
      </div>
      <div class="cp-box">
        <div class="cp-q">"Can I go to that ₹800 dinner tonight?"</div>
        <div class="cp-a"><strong>Yes, comfortably.</strong> You'll still have ₹13,480 — rent is 3 days out. Go enjoy it.</div>
      </div>
    </div>

    <div class="fc fc-2">
      <div class="fc-lbl">Invisible Leak Found</div>
      <div class="fc-val">₹840/mo</div>
      <div class="fc-sub">3 forgotten subscriptions</div>
    </div>
  </div>
</section>

<!-- PROBLEM -->
<section class="section">
  <div class="s-header">
    <div class="s-num">01</div>
    <div class="s-title-block">
      <div class="s-eyebrow">The Problem</div>
      <h2 class="s-title">You're not broke. You're in <em>Financial Fog.</em></h2>
    </div>
  </div>
  <p style="font-size:13px;font-weight:300;line-height:1.85;color:var(--dim);max-width:600px;margin-bottom:52px;">Your money lives in 4 different places. Your brain tries to hold a running total while tracking UPI spends, EMIs due next Tuesday, and the subscription you forgot. No app shows your actual number — what's safe to spend, right now.</p>
  <div class="pain-grid">
    <div class="pain-cell"><span class="p-ico">🌫️</span><div class="p-title">Financial Fragmentation</div><div class="p-desc">Salary in SBI. Emergency fund in HDFC. Daily spends via Google Pay. No single view of your reality.</div></div>
    <div class="pain-cell"><span class="p-ico">👻</span><div class="p-title">Invisible Leaks</div><div class="p-desc">Subscriptions and micro-transactions bleed you silently. You only notice when your balance shocks you.</div></div>
    <div class="pain-cell"><span class="p-ico">✍️</span><div class="p-title">Manual Entry Fatigue</div><div class="p-desc">Spreadsheets. Notebooks. Decoy bank accounts. Smart people burning energy on financial logistics.</div></div>
    <div class="pain-cell"><span class="p-ico">⏳</span><div class="p-title">No Future Vision</div><div class="p-desc">Banking apps show what you spent. Nobody tells you what's safe to spend after next week's rent.</div></div>
  </div>
</section>

<!-- SOLUTION -->
<section class="sol-section">
  <div class="sol-eyebrow">The Solution</div>
  <div class="sol-headline">
    <span class="sol-h-line1">FROM REPORTER</span>
    <span class="sol-h-line2">to co-pilot.</span>
  </div>
  <div class="sol-grid">
    <div class="sol-card"><span class="sol-n">01</span><div class="sol-head">True Balance™ Engine</div><div class="sol-desc">Not your account balance. Your real spendable balance — after upcoming rent, EMIs, subs, and bills are automatically subtracted.</div><span class="sol-tag">Predictive Liquidity</span></div>
    <div class="sol-card"><span class="sol-n">02</span><div class="sol-head">Unified Aggregation</div><div class="sol-desc">PhonePe, Google Pay, Paytm, SBI, HDFC — all accounts in one live view. Zero manual entry. One real number.</div><span class="sol-tag">Zero Manual Entry</span></div>
    <div class="sol-card"><span class="sol-n">03</span><div class="sol-head">AI Co-pilot</div><div class="sol-desc">Ask anything in plain language. "Can I afford this?" "Where did my money go?" The AI answers with your full financial context.</div><span class="sol-tag">Gen AI Interface</span></div>
    <div class="sol-card"><span class="sol-n">04</span><div class="sol-head">Leak Detection</div><div class="sol-desc">Surfaces forgotten subscriptions, duplicate charges, and micro-transactions bleeding you invisibly — before they hurt.</div><span class="sol-tag">Invisible Spend Alert</span></div>
    <div class="sol-card"><span class="sol-n">05</span><div class="sol-head">Calm UI</div><div class="sol-desc">No anxiety dashboards. No red alerts. Minimal, intentional design that restores your sense of control, not overwhelm.</div><span class="sol-tag">Psychological Safety</span></div>
    <div class="sol-card"><span class="sol-n">06</span><div class="sol-head">Predictive Roadmaps</div><div class="sol-desc">See when you can afford a goal purchase, how long savings last, and what a raise actually does to your lifestyle.</div><span class="sol-tag">Future Planning</span></div>
  </div>
</section>

<!-- COPILOT -->
<section class="copilot-wrap">
  <div>
    <div class="chat-win">
      <div class="chat-hdr">
        <div class="chat-av">🤖</div>
        <div>
          <div class="chat-name">FinanceGPT</div>
          <div class="chat-st">● Online · Knows your full financial picture</div>
        </div>
      </div>
      <div class="bubbles">
        <div class="bbl user">Can I afford a ₹50 dinner if gym and rent are both due next week?</div>
        <div class="bbl ai"><strong>Yes — go for it.</strong><br/><br/>True Balance: ₹14,280. After gym (₹999, 18th) + rent (₹12,000, 20th) you'll still have ₹1,331. A ₹50 dinner barely registers.<br/><br/><span style="opacity:.5">Side note: Hotstar sub (₹299) on the 22nd you may have forgotten.</span></div>
        <div class="bbl user">What are my invisible leaks this month?</div>
        <div class="bbl ai">Found <strong>3 forgotten subscriptions:</strong><br/><br/>· Hotstar — ₹299/mo<br/>· LinkedIn Premium — ₹2,399/mo<br/>· Adobe CC (unused) — ₹1,675/mo<br/><br/><strong>₹4,373/mo</strong> — ₹52,476/year. Cancel the unused ones?</div>
      </div>
      <div class="chat-inp">
        <div class="cin-mock">Ask anything about your money…</div>
        <div class="csend">↑</div>
      </div>
    </div>
  </div>
  <div class="cp-txt">
    <div class="s-eyebrow">AI Co-pilot</div>
    <h2 class="cp-title">Ask your money <em>anything.</em></h2>
    <p class="cp-body">The co-pilot answers with full context — your balances across all accounts, upcoming obligations, spending patterns, and goals. No more guessing.</p>
    <ul class="eg-list">
      <li>Can I afford this trip next month?</li>
      <li>How long until I hit ₹1L in savings?</li>
      <li>Where did I overspend in June?</li>
      <li>What if I got a ₹10,000 raise?</li>
    </ul>
    <a href="#" class="btn-main">Try the Co-pilot</a>
  </div>
</section>

<!-- AUDIENCE -->
<section class="audience-section">
  <div class="aud-eyebrow">Who It's For</div>
  <h2 class="aud-headline">
    BUILT FOR THE<br/>
    <em>generation juggling</em><br/>
    EVERYTHING.
  </h2>
  <div class="persona-grid">
    <div class="persona-card">
      <div class="p-initial">P</div>
      <div class="p-tag">The Student</div>
      <div class="p-name">Priya, 21</div>
      <div class="p-role">Engineering student · Allowance: ₹15,000/mo</div>
      <div class="p-pain">"I never know if I can say yes to food with friends — the money feels gone before I spend it."</div>
      <div class="p-solve">OnlyFinance shows Priya her exact safe-to-spend after tuition instalments — so she says yes or no with confidence, not anxiety.</div>
    </div>
    <div class="persona-card">
      <div class="p-initial">A</div>
      <div class="p-tag">The Young Professional</div>
      <div class="p-name">Arjun, 26</div>
      <div class="p-role">Software engineer · Salary: ₹65,000 · EMI: ₹18,000</div>
      <div class="p-pain">"I earn well but feel broke every month. I can never see rent, EMI, and subscriptions all at once."</div>
      <div class="p-solve">OnlyFinance gives Arjun a single True Balance that accounts for everything — plus a co-pilot to make smarter moves.</div>
    </div>
  </div>
</section>

<!-- COMPARE -->
<section class="compare-section">
  <div class="cmp-header">
    <div class="cmp-super">The Paradigm Shift</div>
    <h2 class="cmp-title">Your bank app is a reporter.<br/><em>We're your co-pilot.</em></h2>
  </div>
  <div class="cmp-grid">
    <div class="cmp-col old">
      <span class="cmp-badge">Traditional App</span>
      <div class="cmp-head">Tells you what already happened.</div>
      <ul class="cmp-items">
        <li>Shows raw balance — ignores upcoming bills</li>
        <li>Covers one account only</li>
        <li>Numbers with no context</li>
        <li>Reactive — alerts after overspending</li>
        <li>Silent about forgotten subscriptions</li>
        <li>Anxiety-inducing notification flood</li>
      </ul>
    </div>
    <div class="cmp-vs">vs</div>
    <div class="cmp-col new">
      <span class="cmp-badge">OnlyFinance</span>
      <div class="cmp-head" style="color:var(--white)">Guides what comes next.</div>
      <ul class="cmp-items">
        <li>True Balance™ after all future obligations</li>
        <li>All accounts, UPI apps, wallets unified</li>
        <li>Plain-language AI with full context</li>
        <li>Proactive — warns before overspending</li>
        <li>Surfaces and kills invisible leaks</li>
        <li>Calm UI designed for financial peace</li>
      </ul>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="cta-bg-word">CLARITY</div>
  <p class="cta-super">Limited Beta — Free for Students</p>
  <h2 class="cta-title">KNOW YOUR</h2>
  <span class="cta-title-2">true balance.</span>
  <p class="cta-sub">Join 2,800+ students and young professionals already on the waitlist. Free during beta. No credit card needed.</p>
  <div class="email-form">
    <input type="email" class="email-in" placeholder="your@email.com"/>
    <button class="email-sub">Join Waitlist</button>
  </div>
  <div class="cta-trust">
    <span class="trust-i">Free for students</span>
    <span class="trust-i">Bank-grade encryption</span>
    <span class="trust-i">No data sold</span>
  </div>
</section>

<footer>
  <div class="f-logo">ONLYFINANCE</div>
  <span class="f-copy">© 2024 OnlyFinance · Made for India's next generation</span>
  <ul class="f-links">
    <li><a href="#">Privacy</a></li>
    <li><a href="#">Security</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</footer>

<script>
  // Cursor
  const cur=document.getElementById('cur'),ring=document.getElementById('curRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function anim(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim);})();
  document.querySelectorAll('a,button,input').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.width='20px';cur.style.height='20px';cur.style.borderRadius='4px';ring.style.width='48px';ring.style.height='48px';});
    el.addEventListener('mouseleave',()=>{cur.style.width='9px';cur.style.height='9px';cur.style.borderRadius='50%';ring.style.width='34px';ring.style.height='34px';});
  });

  // Scroll reveal
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}
  }),{threshold:0.08});
  document.querySelectorAll('.pain-cell,.sol-card,.persona-card,.cmp-col,.bbl').forEach((el,i)=>{
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    el.style.transition=`opacity .5s ease ${i*0.06}s, transform .5s ease ${i*0.06}s`;
    obs.observe(el);
  });
</script>
</body>
</html>