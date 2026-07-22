import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = readFileSync(join(root, 'dist', 'printer-status-card.js'), 'utf8')
  .replace(/<\/script>/gi, '<\\/script>');
const template = readFileSync(join(root, 'scripts', 'preview.template.html'), 'utf8');

writeFileSync(
  join(root, 'dist', 'preview.html'),
  template.split('/*__BUNDLE__*/').join(bundle),
  'utf8',
);

console.log('✓ dist/preview.html generated');
