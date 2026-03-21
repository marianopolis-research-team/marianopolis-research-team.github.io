import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the events directly using dynamic import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_FILE = path.join(path.dirname(__dirname), 'app/_data/eventsData.ts');
const OUT_DIR = path.join(path.dirname(__dirname), 'content/events');

async function migrate() {
  console.log('Reading source file...');
  
  // Read and parse manually since it's a TS file
  const content = fs.readFileSync(SOURCE_FILE, 'utf8');
  
  // Find the events array - look for the pattern more carefully
  // The array starts after "export const events: Event[] = ["
  const startPattern = /export\s+const\s+events:\s*Event\[\]\s*=\s*\[/;
  const match = content.match(startPattern);
  
  if (!match) {
    console.error('Could not find events array declaration');
    process.exit(1);
  }
  
  const startIdx = match.index + match[0].length - 1; // Position of the opening [
  
  // Now find the matching ] by counting brackets
  let depth = 0;
  let endIdx = startIdx;
  
  for (let i = startIdx; i < content.length; i++) {
    const char = content[i];
    if (char === '[' || char === '{') depth++;
    if (char === ']' || char === '}') depth--;
    
    if (depth === 0 && char === ']') {
      endIdx = i + 1;
      break;
    }
  }
  
  // Extract the array string
  const arrayStr = content.substring(startIdx, endIdx);
  
  console.log('Extracted array, length:', arrayStr.length);
  console.log('First 300 chars:', arrayStr.substring(0, 300));
  
  // Try to evaluate it
  let events;
  try {
    events = eval(arrayStr);
    console.log(`Successfully parsed ${events.length} events`);
  } catch (err) {
    console.error('Error evaluating array:', err.message);
    // Write the extracted content to a debug file
    fs.writeFileSync(path.join(path.dirname(__dirname), 'debug-array.txt'), arrayStr);
    console.error('Wrote extracted content to debug-array.txt for inspection');
    process.exit(1);
  }

  // Write files
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  events.forEach((event) => {
    // Separate body content from frontmatter
    const { longDescription, ...frontMatter } = event;
    const bodyContent = longDescription || '';
    
    // Use JSON for frontmatter - it's cleaner to generate and valid for Next.js
    const fm = JSON.stringify(frontMatter, null, 2);

    const fileContent = `---
${fm}
---

${bodyContent}
`;

    const fileName = `${event.slug}.md`;
    fs.writeFileSync(path.join(OUT_DIR, fileName), fileContent);
    console.log(`Created ${fileName}`);
  });

  console.log('\nMigration complete! 🚀');
  console.log(`\nCreated ${events.length} markdown files in ${OUT_DIR}`);
}

migrate();
