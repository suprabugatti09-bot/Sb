import { Router } from "express";
import { db, keysTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jean010912@$";
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genPart(len = 4) {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}
function genKey() { return `JEAN-${genPart()}-${genPart()}`; }

function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers["x-admin-token"];
  if (token === Buffer.from(ADMIN_PASSWORD).toString("base64")) return next();
  return res.status(401).json({ error: "No autorizado" });
}

router.post("/admin/auth", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ token: Buffer.from(ADMIN_PASSWORD).toString("base64") });
  } else {
    res.status(401).json({ error: "Contraseña incorrecta" });
  }
});

router.get("/admin/keys", authMiddleware, async (_req, res) => {
  const keys = await db.select().from(keysTable).orderBy(desc(keysTable.createdAt));
  res.json(keys);
});

router.post("/admin/keys", authMiddleware, async (req, res) => {
  const { count = 1, maxUses = 1, expiresAt, note } = req.body;
  const rows = Array.from({ length: Math.min(count, 200) }, () => ({
    key: genKey(),
    maxUses: Number(maxUses) || 1,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
    note: note || null,
  }));
  const created = await db.insert(keysTable).values(rows).onConflictDoNothing().returning();
  res.json(created);
});

router.patch("/admin/keys/:id", authMiddleware, async (req, res) => {
  const { isActive } = req.body;
  await db.update(keysTable).set({ isActive }).where(eq(keysTable.id, Number(req.params.id)));
  res.json({ success: true });
});

router.delete("/admin/keys/:id", authMiddleware, async (req, res) => {
  await db.delete(keysTable).where(eq(keysTable.id, Number(req.params.id)));
  res.json({ success: true });
});

const ADMIN_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>JEAN Admin Panel</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--gold:#f5c518;--gold2:#ffdd57;--purple:#8b5cf6;--purple2:#a78bfa;--green:#22d3a5;--red:#ff5470;--bg:#07070c;--card:rgba(20,20,32,.72);--border:rgba(255,255,255,.07);--txt:#e7e7f0;--muted:#7a7a92}
html,body{min-height:100%}
body{font-family:'Inter',system-ui,sans-serif;color:var(--txt);background:var(--bg);min-height:100vh;position:relative;overflow-x:hidden;-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;inset:0;z-index:0;background:
  radial-gradient(650px circle at 12% 8%,rgba(139,92,246,.18),transparent 55%),
  radial-gradient(600px circle at 88% 0%,rgba(245,197,24,.12),transparent 50%),
  radial-gradient(700px circle at 50% 120%,rgba(34,211,165,.10),transparent 55%);pointer-events:none}
.login,.panel{position:relative;z-index:1}
::selection{background:rgba(139,92,246,.4)}
/* LOGIN */
.login{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.login-box{background:var(--card);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid var(--border);border-radius:22px;padding:44px 38px;width:100%;max-width:380px;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.03) inset;animation:pop .5s cubic-bezier(.2,.9,.3,1.2)}
@keyframes pop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}
.logo-badge{width:72px;height:72px;margin:0 auto 18px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:26px;color:#0a0a0f;background:linear-gradient(135deg,var(--gold2),var(--gold));box-shadow:0 12px 30px -8px rgba(245,197,24,.6)}
.login-box h1{font-family:'Space Grotesk',sans-serif;background:linear-gradient(135deg,#fff,var(--gold2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-size:26px;font-weight:700;letter-spacing:3px;margin-bottom:6px}
.login-box p{color:var(--muted);font-size:13px;margin-bottom:26px}
.login-box input{width:100%;background:rgba(0,0,0,.35);border:1px solid var(--border);border-radius:12px;padding:14px 16px;color:#fff;font-size:14px;outline:none;margin-bottom:14px;transition:.2s}
.login-box input:focus{border-color:var(--purple);box-shadow:0 0 0 4px rgba(139,92,246,.15)}
/* BUTTONS */
.btn{width:100%;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#0a0a0f;font-weight:700;font-size:14px;border:none;border-radius:12px;padding:14px;cursor:pointer;letter-spacing:1px;transition:.2s;box-shadow:0 10px 26px -10px rgba(245,197,24,.7)}
.btn:hover{transform:translateY(-2px);box-shadow:0 16px 34px -10px rgba(245,197,24,.8)}
.btn:active{transform:translateY(0)}
.btn-sm{padding:8px 16px;font-size:12px;border-radius:9px;border:none;cursor:pointer;font-weight:600;transition:.18s;color:#fff}
.btn-sm:hover{transform:translateY(-1px);filter:brightness(1.1)}
.btn-red{background:linear-gradient(135deg,#ff6b84,var(--red))}
.btn-green{background:linear-gradient(135deg,#3ee7bb,var(--green));color:#062018}
.btn-purple{background:linear-gradient(135deg,var(--purple2),var(--purple))}
.btn-gray{background:rgba(255,255,255,.08);color:#c5c5d6}
.hidden{display:none}
/* PANEL */
.panel{max-width:1140px;margin:0 auto;padding:30px 18px 60px}
header{display:flex;align-items:center;justify-content:space-between;margin-bottom:30px;padding-bottom:20px;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:12px}
.brand{display:flex;align-items:center;gap:14px}
.brand .mini{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#0a0a0f;background:linear-gradient(135deg,var(--gold2),var(--gold));box-shadow:0 8px 22px -8px rgba(245,197,24,.6)}
header h1{font-family:'Space Grotesk',sans-serif;color:#fff;font-size:20px;font-weight:700;letter-spacing:2px}
header h1 span{color:var(--gold)}
/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
.stat{position:relative;background:var(--card);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--border);border-radius:18px;padding:20px;overflow:hidden;transition:.25s}
.stat:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.14)}
.stat::after{content:"";position:absolute;top:-40%;right:-20%;width:120px;height:120px;border-radius:50%;background:var(--glow,rgba(245,197,24,.16));filter:blur(24px)}
.stat .ico{font-size:20px;margin-bottom:10px}
.stat-n{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;line-height:1;color:#fff}
.stat-l{font-size:11px;color:var(--muted);margin-top:8px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600}
.stat.g{--glow:rgba(245,197,24,.18)} .stat.b{--glow:rgba(34,211,165,.18)} .stat.p{--glow:rgba(139,92,246,.2)} .stat.r{--glow:rgba(255,84,112,.18)}
/* CARDS */
.card{background:var(--card);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--border);border-radius:18px;padding:26px;margin-bottom:22px;box-shadow:0 20px 50px -30px rgba(0,0,0,.8)}
.card h2{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#cfcfe0;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:20px}
.card h2 .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,var(--gold2),var(--gold));box-shadow:0 0 10px var(--gold)}
.form-row{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end}
.form-group{display:flex;flex-direction:column;gap:7px;flex:1;min-width:120px}
.form-group label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;font-weight:600}
.form-group input,.form-group select{background:rgba(0,0,0,.35);border:1px solid var(--border);border-radius:11px;padding:11px 13px;color:#fff;font-size:13px;outline:none;transition:.2s}
.form-group input:focus,.form-group select:focus{border-color:var(--purple);box-shadow:0 0 0 4px rgba(139,92,246,.15)}
/* TABLE */
.table-wrap{overflow-x:auto;border-radius:12px}
table{width:100%;border-collapse:collapse;font-size:13px;min-width:640px}
th{text-align:left;padding:12px 14px;color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid var(--border);font-weight:600}
td{padding:13px 14px;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:middle}
tbody tr{transition:.15s}
tbody tr:hover td,tr:hover td{background:rgba(255,255,255,.03)}
.badge{display:inline-block;padding:4px 11px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid transparent}
.badge-green{background:rgba(34,211,165,.12);color:var(--green);border-color:rgba(34,211,165,.25)}
.badge-red{background:rgba(255,84,112,.12);color:var(--red);border-color:rgba(255,84,112,.25)}
.badge-gray{background:rgba(255,255,255,.06);color:var(--muted);border-color:rgba(255,255,255,.1)}
.key-text{font-family:'JetBrains Mono',monospace;color:var(--gold2);font-size:12.5px;font-weight:700;letter-spacing:.5px}
.copy-btn{background:rgba(255,255,255,.04);border:1px solid var(--border);color:var(--muted);padding:4px 10px;border-radius:7px;cursor:pointer;font-size:11px;margin-left:6px;transition:.18s}
.copy-btn:hover{border-color:var(--gold);color:var(--gold);background:rgba(245,197,24,.08)}
.error-msg{color:var(--red);font-size:13px;margin-top:12px;font-weight:600}
.success-msg{color:var(--green);font-size:13px;margin-top:12px;font-weight:600}
@media(max-width:700px){.stats{grid-template-columns:repeat(2,1fr)}.form-row{flex-direction:column;align-items:stretch}.panel{padding:20px 12px 50px}}
</style>
</head>
<body>

<div class="login" id="loginScreen">
  <div class="login-box">
    <div class="logo-badge">JX</div>
    <h1>JEAN X JAY</h1>
    <p>Panel de Administración</p>
    <input type="password" id="passInput" placeholder="Contraseña admin" onkeydown="if(event.key==='Enter')login()"/>
    <button class="btn" onclick="login()">ENTRAR</button>
    <p class="error-msg hidden" id="loginErr">Contraseña incorrecta</p>
  </div>
</div>

<div class="panel hidden" id="mainPanel">
  <header>
    <div class="brand">
      <div class="mini">JX</div>
      <h1>JEAN <span>&#10022; ADMIN</span></h1>
    </div>
    <button class="btn-sm btn-gray" onclick="logout()">Cerrar sesión</button>
  </header>

  <div class="stats">
    <div class="stat g"><div class="ico">&#128273;</div><div class="stat-n" id="sTotal">—</div><div class="stat-l">Total Keys</div></div>
    <div class="stat b"><div class="ico">&#9989;</div><div class="stat-n" id="sActive">—</div><div class="stat-l">Activas</div></div>
    <div class="stat p"><div class="ico">&#128100;</div><div class="stat-n" id="sUsed">—</div><div class="stat-l">Usadas</div></div>
    <div class="stat r"><div class="ico">&#9203;</div><div class="stat-n" id="sExpired">—</div><div class="stat-l">Expiradas</div></div>
  </div>

  <div class="card">
    <h2><span class="dot"></span>Crear Keys Nuevas</h2>
    <div class="form-row">
      <div class="form-group">
        <label>Cantidad</label>
        <input type="number" id="fCount" value="10" min="1" max="200"/>
      </div>
      <div class="form-group">
        <label>Usos por key</label>
        <input type="number" id="fMaxUses" value="1" min="1"/>
      </div>
      <div class="form-group">
        <label>Expira en</label>
        <select id="fExpiry">
          <option value="">Sin expiración</option>
          <option value="1h">1 hora</option>
          <option value="6h">6 horas</option>
          <option value="24h">24 horas</option>
          <option value="3d">3 días</option>
          <option value="7d">7 días</option>
          <option value="30d">30 días</option>
          <option value="custom">Fecha personalizada</option>
        </select>
      </div>
      <div class="form-group hidden" id="customDateGroup">
        <label>Fecha exacta</label>
        <input type="datetime-local" id="fCustomDate"/>
      </div>
      <div class="form-group">
        <label>Nota</label>
        <input type="text" id="fNote" placeholder="Opcional"/>
      </div>
      <div class="form-group" style="min-width:auto">
        <label>&nbsp;</label>
        <button class="btn-sm btn-purple" style="padding:9px 20px" onclick="createKeys()">CREAR</button>
      </div>
    </div>
    <p id="createMsg" class="hidden"></p>
  </div>

  <div class="card">
    <h2><span class="dot"></span>Keys — <span id="keyCount">cargando...</span></h2>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Key</th><th>Estado</th><th>Usos</th><th>Expira</th><th>Nota</th><th>Acciones</th>
        </tr></thead>
        <tbody id="keysBody"></tbody>
      </table>
    </div>
  </div>
</div>

<script>
let token = localStorage.getItem('jeanAdminToken') || '';
if (token) tryLoad();

function login() {
  const pass = document.getElementById('passInput').value;
  fetch('/api/admin/auth', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({password: pass})
  }).then(r=>r.json()).then(d=>{
    if (d.token) {
      token = d.token;
      localStorage.setItem('jeanAdminToken', token);
      showPanel();
    } else {
      document.getElementById('loginErr').classList.remove('hidden');
    }
  });
}

function logout() {
  localStorage.removeItem('jeanAdminToken');
  token = '';
  document.getElementById('mainPanel').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
}

function tryLoad() {
  fetch('/api/admin/keys', {headers:{'x-admin-token':token}})
    .then(r=> r.ok ? showPanel() : null).catch(()=>{});
}

function showPanel() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainPanel').classList.remove('hidden');
  loadKeys();
}

document.getElementById('fExpiry').addEventListener('change', function() {
  document.getElementById('customDateGroup').classList.toggle('hidden', this.value !== 'custom');
});

function expiryToDate(val) {
  if (!val || val === '') return null;
  if (val === 'custom') {
    const v = document.getElementById('fCustomDate').value;
    return v ? new Date(v).toISOString() : null;
  }
  const now = new Date();
  const map = {
    '1h': 1*60*60*1000,
    '6h': 6*60*60*1000,
    '24h': 24*60*60*1000,
    '3d': 3*24*60*60*1000,
    '7d': 7*24*60*60*1000,
    '30d': 30*24*60*60*1000,
  };
  return new Date(now.getTime() + map[val]).toISOString();
}

function createKeys() {
  const count = parseInt(document.getElementById('fCount').value) || 1;
  const maxUses = parseInt(document.getElementById('fMaxUses').value) || 1;
  const expiry = document.getElementById('fExpiry').value;
  const expiresAt = expiryToDate(expiry);
  const note = document.getElementById('fNote').value || null;
  const msg = document.getElementById('createMsg');

  fetch('/api/admin/keys', {
    method:'POST',
    headers:{'Content-Type':'application/json','x-admin-token':token},
    body: JSON.stringify({count, maxUses, expiresAt, note})
  }).then(r=>r.json()).then(d=>{
    msg.className = 'success-msg';
    msg.textContent = d.length + ' keys creadas correctamente';
    loadKeys();
    setTimeout(()=> msg.className = 'hidden', 3000);
  }).catch(()=>{
    msg.className = 'error-msg';
    msg.textContent = 'Error al crear keys';
  });
}

function loadKeys() {
  fetch('/api/admin/keys', {headers:{'x-admin-token':token}})
    .then(r=>r.json())
    .then(keys=>{
      const now = new Date();
      let total=keys.length, active=0, used=0, expired=0;
      const tbody = document.getElementById('keysBody');
      tbody.innerHTML = '';
      keys.forEach(k=>{
        const isExpired = k.expires_at && new Date(k.expires_at) < now;
        const isFullyUsed = k.times_used >= k.max_uses;
        if (k.is_active && !isExpired) active++;
        if (isFullyUsed) used++;
        if (isExpired) expired++;

        const statusBadge = !k.is_active
          ? '<span class="badge badge-gray">Desactivada</span>'
          : isExpired
            ? '<span class="badge badge-red">Expirada</span>'
            : isFullyUsed
              ? '<span class="badge badge-red">Agotada</span>'
              : '<span class="badge badge-green">Activa</span>';

        const expText = k.expires_at
          ? new Date(k.expires_at).toLocaleString('es')
          : '<span style="color:#333">Sin límite</span>';

        const toggleLabel = k.is_active ? 'Desactivar' : 'Activar';
        const toggleClass = k.is_active ? 'btn-red' : 'btn-green';

        const usedByList = (k.used_by || []).join(', ') || '—';

        tbody.innerHTML += \`<tr>
          <td><span class="key-text">\${k.key}</span>
            <button class="copy-btn" onclick="navigator.clipboard.writeText('\${k.key}')">Copiar</button>
          </td>
          <td>\${statusBadge}</td>
          <td>\${k.times_used}/\${k.max_uses} <span style="color:#444;font-size:11px">(\${usedByList})</span></td>
          <td style="font-size:12px">\${expText}</td>
          <td style="color:#555;font-size:12px">\${k.note||'—'}</td>
          <td style="display:flex;gap:6px">
            <button class="btn-sm \${toggleClass}" onclick="toggleKey(\${k.id},\${!k.is_active})">\${toggleLabel}</button>
            <button class="btn-sm btn-gray" onclick="deleteKey(\${k.id})">Borrar</button>
          </td>
        </tr>\`;
      });
      document.getElementById('keyCount').textContent = total + ' keys';
      document.getElementById('sTotal').textContent = total;
      document.getElementById('sActive').textContent = active;
      document.getElementById('sUsed').textContent = used;
      document.getElementById('sExpired').textContent = expired;
    });
}

function toggleKey(id, isActive) {
  fetch('/api/admin/keys/'+id, {
    method:'PATCH',
    headers:{'Content-Type':'application/json','x-admin-token':token},
    body: JSON.stringify({isActive})
  }).then(()=>loadKeys());
}

function deleteKey(id) {
  if (!confirm('¿Borrar esta key?')) return;
  fetch('/api/admin/keys/'+id, {method:'DELETE',headers:{'x-admin-token':token}})
    .then(()=>loadKeys());
}
</script>
</body>
</html>`;

router.get("/admin", (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(ADMIN_HTML);
});

export default router;
