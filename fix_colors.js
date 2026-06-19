import fs from 'fs';

const appJsxPath = 'src/App.jsx';
let content = fs.readFileSync(appJsxPath, 'utf8');

// Replacements
content = content.replace(/'#fff'/g, "'var(--text-pop)'")
                 .replace(/"#fff"/g, '"var(--text-pop)"')
                 .replace(/'#000'/g, "'var(--black-to-white)'")
                 .replace(/"#000"/g, '"var(--black-to-white)"')
                 .replace(/'#030303'/g, "'var(--dark-to-light-bg)'")
                 .replace(/"#030303"/g, '"var(--dark-to-light-bg)"')
                 .replace(/'#020202'/g, "'var(--dark-to-light-bg)'")
                 .replace(/"#020202"/g, '"var(--dark-to-light-bg)"')
                 .replace(/'rgba\(0,0,0,0\.5\)'/g, "'var(--glass-card-inner)'")
                 .replace(/"rgba\(0,0,0,0\.5\)"/g, '"var(--glass-card-inner)"')
                 .replace(/'rgba\(0,0,0,0\.6\)'/g, "'var(--glass-card-inner)'")
                 .replace(/"rgba\(0,0,0,0\.6\)"/g, '"var(--glass-card-inner)"');

fs.writeFileSync(appJsxPath, content, 'utf8');
console.log('Colors substituted for CSS variables.');
