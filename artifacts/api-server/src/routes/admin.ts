import { Router } from "express";
import { db, keysTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "JEAN2024";
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
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',sans-serif;background:#0a0a0f;color:#e0e0e0;min-height:100vh}
:root{--gold:#f5c518;--purple:#7c3aed;--green:#10b981;--red:#ef4444;--card:#111118;--border:#1e1e2e}
.login{display:flex;align-items:center;justify-content:center;min-height:100vh}
.login-box{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:40px;width:360px;text-align:center}
.login-box h1{color:var(--gold);font-size:28px;font-weight:800;letter-spacing:2px;margin-bottom:4px}
.login-box p{color:#555;font-size:13px;margin-bottom:28px}
.login-box input{width:100%;background:#0a0a0f;border:1px solid var(--border);border-radius:8px;padding:12px 16px;color:#fff;font-size:14px;outline:none;margin-bottom:12px}
.login-box input:focus{border-color:var(--purple)}
.btn{width:100%;background:var(--gold);color:#000;font-weight:700;font-size:14px;border:none;border-radius:8px;padding:12px;cursor:pointer;letter-spacing:1px}
.btn:hover{opacity:.9}
.btn-sm{padding:6px 14px;font-size:12px;border-radius:6px;border:none;cursor:pointer;font-weight:600}
.btn-red{background:var(--red);color:#fff}.btn-green{background:var(--green);color:#fff}
.btn-purple{background:var(--purple);color:#fff}.btn-gray{background:#2a2a3a;color:#aaa}
.hidden{display:none}
.panel{max-width:1100px;margin:0 auto;padding:24px 16px}
header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid var(--border)}
header h1{color:var(--gold);font-size:22px;font-weight:800;letter-spacing:2px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px}
.stat{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.stat-n{font-size:28px;font-weight:800;color:var(--gold)}
.stat-l{font-size:11px;color:#555;margin-top:4px;text-transform:uppercase;letter-spacing:1px}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px}
.card h2{font-size:14px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px}
.form-row{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end}
.form-group{display:flex;flex-direction:column;gap:6px;flex:1;min-width:120px}
.form-group label{font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px}
.form-group input,.form-group select{background:#0a0a0f;border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:#fff;font-size:13px;outline:none}
.form-group input:focus,.form-group select:focus{border-color:var(--purple)}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:10px 12px;color:#555;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid var(--border)}
td{padding:10px 12px;border-bottom:1px solid #0f0f1a;vertical-align:middle}
tr:hover td{background:#12121a}
.badge{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
.badge-green{background:#0d2b1e;color:var(--green)}
.badge-red{background:#2b0d0d;color:var(--red)}
.badge-gray{background:#1a1a2a;color:#666}
.key-text{font-family:monospace;color:var(--gold);font-size:12px}
.copy-btn{background:none;border:1px solid #2a2a3a;color:#666;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:11px}
.copy-btn:hover{border-color:var(--gold);color:var(--gold)}
.error-msg{color:var(--red);font-size:12px;margin-top:8px}
.success-msg{color:var(--green);font-size:12px;margin-top:8px}
@media(max-width:600px){.stats{grid-template-columns:repeat(2,1fr)}.form-row{flex-direction:column}}
</style>
</head>
<body>

<div class="login" id="loginScreen">
  <div class="login-box">
    <h1>JEAN</h1>
    <p>Panel de Administración</p>
    <input type="password" id="passInput" placeholder="Contraseña admin" onkeydown="if(event.key==='Enter')login()"/>
    <button class="btn" onclick="login()">ENTRAR</button>
    <p class="error-msg hidden" id="loginErr">Contraseña incorrecta</p>
  </div>
</div>

<div class="panel hidden" id="mainPanel">
  <header>
    <h1>JEAN ✦ ADMIN</h1>
    <button class="btn-sm btn-gray" onclick="logout()">Cerrar sesión</button>
  </header>

  <div class="stats">
    <div class="stat"><div class="stat-n" id="sTotal">—</div><div class="stat-l">Total Keys</div></div>
    <div class="stat"><div class="stat-n" id="sActive">—</div><div class="stat-l">Activas</div></div>
    <div class="stat"><div class="stat-n" id="sUsed">—</div><div class="stat-l">Usadas</div></div>
    <div class="stat"><div class="stat-n" id="sExpired">—</div><div class="stat-l">Expiradas</div></div>
  </div>

  <div class="card">
    <h2>Crear Keys Nuevas</h2>
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
    <h2>Keys — <span id="keyCount">cargando...</span></h2>
    <table>
      <thead><tr>
        <th>Key</th><th>Estado</th><th>Usos</th><th>Expira</th><th>Nota</th><th>Acciones</th>
      </tr></thead>
      <tbody id="keysBody"></tbody>
    </table>
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
