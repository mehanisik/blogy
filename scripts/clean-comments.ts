import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const TARGET_DIR = "src";

async function getFiles(dir: string): Promise<string[]> {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = join(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

function removeComments(content: string, ext: string): string {
  let newContent = content;

  // 1. Remove Block Comments /* ... */
  // Applies to JS, TS, CSS, and Astro (often used in frontmatter/scripts)
  if (['.ts', '.tsx', '.js', '.jsx', '.css', '.astro'].includes(ext)) {
     newContent = newContent.replace(/\/\*[\s\S]*?\*\//g, '');
  }

  // 2. Remove Line Comments // ...
  // Applies to JS, TS. 
  // For Astro, strictly speaking only in Frontmatter or Scripts, but applying globally 
  // with a safe regex (ignoring http://) is usually acceptable for a cleanup script.
  if (['.ts', '.tsx', '.js', '.jsx', '.astro'].includes(ext)) {
      // Matches // but not if preceded by : (to avoid http://)
      // This is a basic heuristic.
      newContent = newContent.replace(/(^|[^:])\/\/.*$/gm, '$1');
  }

  // 3. Remove HTML Comments <!-- ... -->
  // Applies to HTML and Astro
  if (['.html', '.astro'].includes(ext)) {
      newContent = newContent.replace(/<!--[\s\S]*?-->/g, '');
  }

  return newContent;
}

async function main() {
  console.log(`Scanning ${TARGET_DIR} for comments to clean...`);
  const files = await getFiles(TARGET_DIR);
  let cleanedCount = 0;
  
  for (const file of files) {
    const ext = extname(file);
    if (!['.ts', '.tsx', '.js', '.jsx', '.css', '.astro'].includes(ext)) continue;

    const content = await readFile(file, 'utf-8');
    const cleaned = removeComments(content, ext);
    
    // Trim multiple empty lines that might result from removing comments
    const final = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== final) {
      await writeFile(file, final, 'utf-8');
      console.log(`Cleaned: ${file}`);
      cleanedCount++;
    }
  }
  
  console.log(`\nDone! Cleaned comments from ${cleanedCount} files.`);
}

main().catch(console.error);
