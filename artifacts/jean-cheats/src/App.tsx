import { useState } from "react";

const DISCORD_URL = "https://discord.com/users/jean14_17";
const CASHAPP_URL = "https://cash.app/$juliocesar250387";
const TIKTOK_URL = "https://www.tiktok.com/@jean14_17";
const FREE_SCRIPT = `loadstring(game:HttpGet("https://rawscripts.net/raw/South-Bronx:-The-Trenches-BEST-AUTO-FARM-UNDETECTED-41818"))()`;

const cheats = [
  {
    id: 1,
    name: "SCRIPT JAY",
    description: "Scripts exclusivos — nivel élite",
    icon: "💀",
  },
  {
    id: 2,
    name: "AUTO FARM JC",
    description: "Farm automático — sin límites",
    icon: "👑",
  },
];

function DripsTop() {
  return (
    <svg className="drips" viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {[80,160,260,380,460,540,620,720,820,900,1000,1100].map((x, i) => (
        <ellipse key={i} cx={x} cy={20 + (i % 3) * 8} rx={6 + (i % 2) * 3} ry={12 + (i % 4) * 6} fill="#f5c518" opacity="0.85" />
      ))}
      <rect x="0" y="0" width="1200" height="10" fill="#f5c518" />
    </svg>
  );
}

function FreeScriptCard() {
  const [step, setStep] = useState<"follow" | "confirm" | "script">("follow");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FREE_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cheat-card free-card">
      <div className="card-stripe free-stripe" />

      <div className="card-header">
        <div className="card-number free-number">03</div>
        <div className="card-icon">🎁</div>
        <div className="card-info">
          <h2 className="card-title free-title">SCRIPT GRATIS</h2>
          <p className="card-description">
            {step === "follow" && "Sígueme en TikTok para desbloquear"}
            {step === "confirm" && "¿Ya me seguiste?"}
            {step === "script" && "Script desbloqueado — cópialo"}
          </p>
        </div>
        <div className="free-badge">GRATIS</div>
      </div>

      <div className="card-divider" />

      <div className="free-body">

        {/* STEP 1: follow on TikTok */}
        {step === "follow" && (
          <>
            <div className="gate-msg">
              <span className="step-num">PASO 1 —</span> Sígueme en TikTok para obtener el script gratis
            </div>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn action-btn--tiktok"
              onClick={() => setTimeout(() => setStep("confirm"), 800)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
              <span>SEGUIR EN TIKTOK @jean14_17</span>
            </a>
          </>
        )}

        {/* STEP 2: confirm they followed */}
        {step === "confirm" && (
          <>
            <div className="gate-msg">
              <span className="step-num">PASO 2 —</span> Confirma que ya me seguiste para desbloquear el script
            </div>
            <div className="confirm-row">
              <button className="action-btn confirm-yes" onClick={() => setStep("script")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>SÍ, YA TE SEGUÍ</span>
              </button>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn action-btn--tiktok confirm-no"
              >
                <span>AÚN NO — IR A TIKTOK</span>
              </a>
            </div>
          </>
        )}

        {/* STEP 3: show script */}
        {step === "script" && (
          <>
            <div className="gate-msg unlocked">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>SCRIPT DESBLOQUEADO — GRACIAS POR SEGUIRME</span>
            </div>
            <div className="script-box">
              <div className="script-label">SCRIPT — COPIA Y PEGA EN TU EXECUTOR</div>
              <div className="script-code">{FREE_SCRIPT}</div>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>COPIADO ✓</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>COPIAR SCRIPT</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CheatCard({ cheat }: { cheat: (typeof cheats)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cheat-card"
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 0 40px rgba(245,197,24,0.3), 0 12px 40px rgba(0,0,0,0.8)`
          : `0 4px 20px rgba(0,0,0,0.7)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-stripe" style={{ opacity: hovered ? 1 : 0.6 }} />

      <div className="card-header">
        <div className="card-number">{String(cheat.id).padStart(2, "0")}</div>
        <div className="card-icon">{cheat.icon}</div>
        <div className="card-info">
          <h2 className="card-title">{cheat.name}</h2>
          <p className="card-description">{cheat.description}</p>
        </div>
      </div>

      <div className="card-divider" />

      <div className="card-actions">
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn action-btn--discord"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.02.01.04.028.054a19.84 19.84 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          <span>CONTACTAR</span>
        </a>

        <a
          href={CASHAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn action-btn--cashapp"
        >
          <span className="cashapp-price">$5</span>
          <span>PAGAR AHORA</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <div className="noise" />
      <div className="scanlines" />

      <DripsTop />

      <main className="main">
        <div className="crown-row">
          <span className="crown-icon">👑</span>
          <div className="crown-line" />
          <span className="crown-icon">👑</span>
        </div>

        <div className="header-section">
          <div className="tag-line">// EST. 2024 //</div>
          <h1 className="title">
            <span className="title-jean">JEAN</span>
            <br />
            <span className="title-cheats">CHEATS</span>
          </h1>
          <div className="gold-bar" />
          <p className="subtitle">OG SCRIPT MENU — DISCORD ONLY</p>
        </div>

        <div className="chain-divider">
          {"⛓️".repeat(6)}
        </div>

        <div className="cards-grid">
          {cheats.map((cheat) => (
            <CheatCard key={cheat.id} cheat={cheat} />
          ))}
          <FreeScriptCard />
        </div>

        <div className="footer">
          <div className="footer-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865f2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.02.01.04.028.054a19.84 19.84 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            <span>jean14_17</span>
          </div>
        </div>
      </main>
    </div>
  );
}
