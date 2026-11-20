const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const from = path.join(dist, 'assets', 'node_modules');
const to = path.join(dist, 'assets', 'vendor');

if (fs.existsSync(from)) {
  fs.cpSync(from, to, { recursive: true });
  try {
    fs.rmSync(from, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch (e) {
    console.warn('Impossible de supprimer assets/node_modules (non bloquant):', e.message);
  }
}

// Remplacer les références dans les fichiers JS/HTML/CSS/JSON
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|html|css|json)$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('assets/node_modules')) {
        fs.writeFileSync(p, c.split('assets/node_modules').join('assets/vendor'));
      }
    }
  }
}
walk(dist);

fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log('fix-dist: terminé');