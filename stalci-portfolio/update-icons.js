import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconsDir = path.join(__dirname, 'public', 'icons');

// Official SimpleIcons brand hex colors
const brandColors = {
  'android': '#3DDC84',
  'angular': '#DD0031',
  'apachekafka': '#231F20',
  'apachespark': '#E25A1C',
  'auth0': '#EB5424',
  'cloudflare': '#F38020',
  'cloudflareworkers': '#F38020',
  'django': '#092E20',
  'docker': '#2496ED',
  'elasticsearch': '#005571',
  'expo': '#000020',
  'figma': '#F24E1E',
  'flutter': '#02569B',
  'git': '#F05032',
  'githubactions': '#2088FF',
  'go': '#00ADD8',
  'googlecloud': '#4285F4',
  'grafana': '#F46800',
  'graphql': '#E10098',
  'huggingface': '#FFD21E',
  'jira': '#0052CC',
  'kotlin': '#7F52FF',
  'kubernetes': '#326CE5',
  'langchain': '#1C3C3C',
  'laravel': '#FF2D20',
  'mongodb': '#47A248',
  'nestjs': '#E0234E',
  'nextdotjs': '#000000',
  'nodedotjs': '#5FA04E',
  'ollama': '#000000',
  'postgresql': '#4169E1',
  'prometheus': '#E6522C',
  'python': '#3776AB',
  'pytorch': '#EE4C2C',
  'react': '#61DAFB',
  'redis': '#DC382D',
  'rust': '#DEA584',
  'sentry': '#362D59',
  'snowflake': '#29B5E8',
  'spring': '#6DB33F',
  'stripe': '#635BFF',
  'svelte': '#FF3E00',
  'swift': '#F05138',
  'tailwindcss': '#06B6D4',
  'tensorflow': '#FF6F00',
  'terraform': '#844FBA',
  'typescript': '#3178C6',
  'vault': '#000000',
  'vercel': '#000000',
  'vite': '#646CFF',
  'vuedotjs': '#4FC08D'
};

const files = fs.readdirSync(iconsDir);

for (const file of files) {
  if (!file.endsWith('.svg')) continue;
  const slug = file.replace('.svg', '');
  const color = brandColors[slug];
  if (!color) {
    console.log(`No color mapping for ${slug}`);
    continue;
  }

  const filePath = path.join(iconsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace fill="#D89B5B" or fill="currentColor" with original brand color
  content = content.replace(/fill="[^"]*"/g, `fill="${color}"`);
  
  // If no fill attribute on root svg, add it
  if (!content.includes('fill=')) {
    content = content.replace('<svg ', `<svg fill="${color}" `);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file} with color ${color}`);
}

console.log('All icons updated with official brand colors successfully!');
