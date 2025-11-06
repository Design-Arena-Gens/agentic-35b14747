"use client";

import { useMemo, useState } from "react";

type Language = "hi" | "en";

type Inputs = {
  topic: string;
  targetAudience: string;
  primaryGoal: "views" | "subs" | "clicks" | "watch";
  niche: string;
  tone: "friendly" | "educational" | "motivational" | "funny" | "bold";
  videoLengthMin: number;
  postingCadence: "daily" | "2-3/week" | "weekly" | "biweekly";
  painPoints: string;
  uniqueAngle: string;
};

function generateContent(lang: Language, inputs: Inputs) {
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);

  const hookFormulas = [
    L("Agar aap bhi [PAIN] se pareshaan hain, ye video aapke liye hai.", "If you're also struggling with [PAIN], this video is for you."),
    L("[TIME] mein [OUTCOME] ka seedha tareeka.", "The straightforward way to get [OUTCOME] in [TIME]."),
    L("Log [MISTAKE] karte hain, aap mat kijiye.", "Most people make this [MISTAKE] ? don't."),
    L("Maine [SHORT_TIME] mein [QUICK_WIN] kaise paaya.", "How I achieved [QUICK_WIN] in [SHORT_TIME]."),
  ];

  const titlePatterns = [
    L("[OUTCOME] in [TIME] ? bina [PAIN]", "[OUTCOME] in [TIME] ? without [PAIN]"),
    L("[NUMBER] powerful tips for [OUTCOME]", "[NUMBER] powerful tips for [OUTCOME]"),
    L("Koi nahi batata: [SECRET]", "No one tells you: [SECRET]"),
    L("[OUTCOME] roadmap for beginners", "[OUTCOME] roadmap for beginners"),
  ];

  const thumbnailPhrases = [
    L("Mat Karo Ye Galti!", "Stop Doing This!"),
    L("Ultra Simple Trick", "Ultra Simple Trick"),
    L("Before ? After", "Before ? After"),
    L("1% Formula", "1% Formula"),
    L("3-Step Plan", "3-Step Plan"),
  ];

  const aidaScript = [
    L("Attention: [HOOK_LINE]", "Attention: [HOOK_LINE]"),
    L("Interest: Aap [PAIN] feel karte hain kyunki [WHY].", "Interest: You feel [PAIN] because [WHY]."),
    L("Desire: Sochiye agar [OUTCOME] mil jaaye bina [PAIN] ke.", "Desire: Imagine getting [OUTCOME] without [PAIN]."),
    L("Action: End tak dekhiye aur pinned comment se template le jaiye.", "Action: Watch till the end and grab the template from the pinned comment."),
  ];

  const replacements: Record<string, string> = {
    "[PAIN]": inputs.painPoints || L("iss problem", "this problem"),
    "[OUTCOME]": inputs.primaryGoal === "watch" ? L("watch time boost", "watch time boost") : L("behtar results", "better results"),
    "[TIME]": inputs.videoLengthMin <= 6 ? L("6 minute", "6 minutes") : L("10 minute", "10 minutes"),
    "[MISTAKE]": L("galti", "mistake"),
    "[SHORT_TIME]": L("7 din", "7 days"),
    "[QUICK_WIN]": L("quick boost", "quick boost"),
    "[NUMBER]": "7",
    "[SECRET]": inputs.uniqueAngle || L("hidden trick", "hidden trick"),
    "[WHY]": L("wrong strategy aur scattered approach", "wrong strategy and a scattered approach"),
    "[HOOK_LINE]": hookFormulas[0]
  };

  const apply = (pattern: string) =>
    Object.entries(replacements).reduce((acc, [k, v]) => acc.replaceAll(k, v), pattern);

  const titles = titlePatterns.map(apply);
  const hooks = hookFormulas.map(apply);

  const postingAdvice = L(
    `Aap ${inputs.postingCadence} post kar rahe hain. 90-day ke liye consistent bane rahiyega. Same publishing time choose kijiye. 3 pillar topics fix karke unke around series banaiye.`,
    `You're posting ${inputs.postingCadence}. Stay consistent for 90 days. Pick a fixed publishing time. Lock 3 content pillars and build series around them.`
  );

  const chapterPlan = [
    L("00:00 Hook (0-10s)", "00:00 Hook (0-10s)"),
    L("00:10 Setup & Promise (10-30s)", "00:10 Setup & Promise (10-30s)"),
    L("00:30 Value Block 1", "00:30 Value Block 1"),
    L("02:00 Value Block 2", "02:00 Value Block 2"),
    L("03:30 Value Block 3 / Demo", "03:30 Value Block 3 / Demo"),
    L("05:00 Recap + CTA", "05:00 Recap + CTA")
  ];

  const cta = inputs.primaryGoal === "subs"
    ? L("Subscribe kijiye ? agla video iss series ka part 2 hai!", "Subscribe ? next video is part 2 of this series!")
    : inputs.primaryGoal === "clicks"
    ? L("Pinned comment se checklist download kijiye.", "Grab the checklist from the pinned comment.")
    : inputs.primaryGoal === "watch"
    ? L("End screen par related video dekhiye ? full tutorial.", "Watch the related video on the end screen ? full tutorial.")
    : L("Agar helpful laga to like/share zaroor kijiye!", "If helpful, like/share it!");

  const tags = [
    inputs.niche, inputs.topic,
    L("Hindi", "English"),
    L("YouTube growth", "YouTube growth"),
    L("hooks", "hooks"),
    L("retention", "retention")
  ].filter(Boolean).slice(0, 10);

  const thumbnailIdeas = thumbnailPhrases.map(apply);

  const description = [
    L("Is video mein aap seekhenge:", "In this video you will learn:"),
    L("- Hook kaise likhein jo skip na ho", "- How to write skip-proof hooks"),
    L("- Retention blocks se watch time badhayen", "- Use retention blocks to increase watch time"),
    L("- Thumbnail text aur framing", "- Thumbnail text and framing"),
    "",
    L("Chapters:", "Chapters:"),
    ...chapterPlan,
    "",
    L("Resources: Pinned comment mein template.", "Resources: Template in the pinned comment."),
  ].join("\n");

  const retentionBeats = [
    L("0-10s: Pattern interrupt + bold promise", "0-10s: Pattern interrupt + bold promise"),
    L("10-30s: Relatable pain + credibility", "10-30s: Relatable pain + credibility"),
    L("30-120s: Value sandwich (quick win ? context ? deeper win)", "30-120s: Value sandwich (quick win ? context ? deeper win)"),
    L("Last 20s: Payoff + next step CTA", "Last 20s: Payoff + next step CTA")
  ];

  return {
    titles,
    hooks,
    description,
    tags,
    thumbnailIdeas,
    aidaScript: aidaScript.map(apply),
    chapterPlan,
    cta,
    postingAdvice,
    retentionBeats
  };
}

export default function Page() {
  const [language, setLanguage] = useState<Language>("hi");
  const [inputs, setInputs] = useState<Inputs>({
    topic: "YouTube video engagement",
    targetAudience: "Beginners",
    primaryGoal: "watch",
    niche: "YouTube tips",
    tone: "educational",
    videoLengthMin: 6,
    postingCadence: "2-3/week",
    painPoints: "low retention, high drop-off",
    uniqueAngle: "data-backed hooks"
  });

  const plan = useMemo(() => generateContent(language, inputs), [language, inputs]);

  const L = (hi: string, en: string) => (language === "hi" ? hi : en);

  return (
    <div className="container">
      <div className="card section">
        <div className="header">
          <div>
            <h1>{L("YouTube Engagement Assistant", "YouTube Engagement Assistant")}</h1>
            <small>
              {L("Hooks, titles, thumbnails, retention ? sab ek jagah.", "Hooks, titles, thumbnails, retention ? all in one place.")}
            </small>
          </div>
          <div className="actions">
            <span className="badge">
              <span className="mono">{language.toUpperCase()}</span>
            </span>
            <button className="button ghost" onClick={() => setLanguage(language === "hi" ? "en" : "hi")}>{L("Switch to English", "????? ??? ?????")}</button>
          </div>
        </div>
      </div>

      <div className="card section">
        <div className="formGrid">
          <div className="row">
            <label className="label">{L("Topic", "Topic")}</label>
            <input className="input" value={inputs.topic} onChange={e => setInputs({ ...inputs, topic: e.target.value })} placeholder={L("e.g. Shorts growth", "e.g. Shorts growth")} />
          </div>
          <div className="row">
            <label className="label">{L("Target Audience", "Target Audience")}</label>
            <input className="input" value={inputs.targetAudience} onChange={e => setInputs({ ...inputs, targetAudience: e.target.value })} placeholder={L("e.g. Students", "e.g. Students")} />
          </div>
          <div className="row">
            <label className="label">{L("Primary Goal", "Primary Goal")}</label>
            <select className="select" value={inputs.primaryGoal} onChange={e => setInputs({ ...inputs, primaryGoal: e.target.value as Inputs["primaryGoal"] })}>
              <option value="watch">{L("Watch time", "Watch time")}</option>
              <option value="views">{L("Views", "Views")}</option>
              <option value="subs">{L("Subscribers", "Subscribers")}</option>
              <option value="clicks">{L("Link Clicks", "Link Clicks")}</option>
            </select>
          </div>
          <div className="row">
            <label className="label">{L("Niche", "Niche")}</label>
            <input className="input" value={inputs.niche} onChange={e => setInputs({ ...inputs, niche: e.target.value })} placeholder={L("e.g. Finance", "e.g. Finance")} />
          </div>
          <div className="row">
            <label className="label">{L("Tone", "Tone")}</label>
            <select className="select" value={inputs.tone} onChange={e => setInputs({ ...inputs, tone: e.target.value as Inputs["tone"] })}>
              <option value="friendly">{L("Friendly", "Friendly")}</option>
              <option value="educational">{L("Educational", "Educational")}</option>
              <option value="motivational">{L("Motivational", "Motivational")}</option>
              <option value="funny">{L("Funny", "Funny")}</option>
              <option value="bold">{L("Bold", "Bold")}</option>
            </select>
          </div>
          <div className="row">
            <label className="label">{L("Video Length (min)", "Video Length (min)")}</label>
            <input className="input" type="number" value={inputs.videoLengthMin}
                   onChange={e => setInputs({ ...inputs, videoLengthMin: Number(e.target.value) })} />
          </div>
          <div className="row">
            <label className="label">{L("Posting Cadence", "Posting Cadence")}</label>
            <select className="select" value={inputs.postingCadence}
                    onChange={e => setInputs({ ...inputs, postingCadence: e.target.value as Inputs["postingCadence"] })}>
              <option value="daily">{L("Daily", "Daily")}</option>
              <option value="2-3/week">{L("2-3 / week", "2-3 / week")}</option>
              <option value="weekly">{L("Weekly", "Weekly")}</option>
              <option value="biweekly">{L("Bi-weekly", "Bi-weekly")}</option>
            </select>
          </div>
          <div className="row" style={{ gridColumn: "1 / -1" }}>
            <label className="label">{L("Audience Pain Points", "Audience Pain Points")}</label>
            <textarea className="textarea" value={inputs.painPoints} onChange={e => setInputs({ ...inputs, painPoints: e.target.value })} />
          </div>
          <div className="row" style={{ gridColumn: "1 / -1" }}>
            <label className="label">{L("Your Unique Angle", "Your Unique Angle")}</label>
            <textarea className="textarea" value={inputs.uniqueAngle} onChange={e => setInputs({ ...inputs, uniqueAngle: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="card output">
        <div className="outputSection">
          <div className="outputTitle">{L("Title Ideas", "Title Ideas")}</div>
          <div className="outputText">{plan.titles.map((t, i) => (<div key={i}>? {t}</div>))}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Hook Lines (first 5-10s)", "Hook Lines (first 5-10s)")}</div>
          <div className="outputText">{plan.hooks.map((t, i) => (<div key={i}>? {t}</div>))}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("AIDA Script Outline", "AIDA Script Outline")}</div>
          <div className="outputText">{plan.aidaScript.map((t, i) => (<div key={i}>? {t}</div>))}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Description (copy-paste)", "Description (copy-paste)")}</div>
          <div className="outputText mono">{plan.description}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Chapters", "Chapters")}</div>
          <div className="outputText">{plan.chapterPlan.map((t, i) => (<div key={i}>? {t}</div>))}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Thumbnail Text Ideas", "Thumbnail Text Ideas")}</div>
          <div className="outputText">{plan.thumbnailIdeas.map((t, i) => (<div key={i}>? {t}</div>))}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Tags", "Tags")}</div>
          <div className="outputText mono">{plan.tags.join(", ")}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Retention Beats", "Retention Beats")}</div>
          <div className="outputText">{plan.retentionBeats.map((t, i) => (<div key={i}>? {t}</div>))}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">CTA</div>
          <div className="outputText">{plan.cta}</div>
        </div>
        <div className="outputSection">
          <div className="outputTitle">{L("Posting Advice", "Posting Advice")}</div>
          <div className="outputText">{plan.postingAdvice}</div>
        </div>
      </div>

      <div className="footer">
        {L("Tip: 30-50% audience retention on first 30 seconds target kijiye.", "Tip: Target 30-50% retention in the first 30 seconds.")}
      </div>
    </div>
  );
}
