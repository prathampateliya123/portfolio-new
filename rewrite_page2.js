const fs = require('fs');

let text = fs.readFileSync('src/app/page.jsx', 'utf8');

if (!text.includes('import DraggableItem')) {
  text = text.replace('export default function Page() {', `import DraggableItem from "@/components/DraggableItem";\nimport AudioPlayer from "@/components/AudioPlayer";\nimport MiamiClock from "@/components/MiamiClock";\nimport { motion } from "framer-motion";\n\nexport default function Page() {`);
}
if (!text.includes('"use client"')) {
  text = '"use client";\n' + text;
}

// 1. Replace the AudioPlayer block
const audioRegex = /<div className="rounded-2xl border border-white\/45 bg-white\/30 p-4 shadow-\[inset_0_1px_0_rgba\(255,255,255,0\.6\),0_8px_32px_rgba\(0,0,0,0\.12\)\] backdrop-blur-2xl backdrop-saturate-150 h-\[150px\] w-\[320px\] !p-4">[\s\S]*?<\/div><\/div><\/div>/;
text = text.replace(audioRegex, '<AudioPlayer />');

// 2. Replace the Miami Clock block
const clockRegex = /<div className="rounded-2xl border border-white\/45 bg-white\/30 p-4 shadow-\[inset_0_1px_0_rgba\(255,255,255,0\.6\),0_8px_32px_rgba\(0,0,0,0\.12\)\] backdrop-blur-2xl backdrop-saturate-150 flex h-\[150px\] w-\[150px\] items-center justify-center !p-3">[\s\S]*?<\/svg><\/div><\/div>/;
text = text.replace(clockRegex, '<MiamiClock />');

// 3. Make the elements draggable by wrapping the `<a>` or `<div className="rounded-2xl...` in DraggableItem.
// We look for: <div className="absolute cursor-grab touch-none select-none active:cursor-grabbing" draggable="false" style={{top: 90, right: '2.5%', zIndex: 20, opacity: 1, transform: 'translateY(0px)', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none'}}>
// There are exactly 11 such wrappers.
const wrapperRegex = /<div className="absolute cursor-grab touch-none select-none active:cursor-grabbing" draggable="false" style={{(top|bottom): ([^,]+), (right|left): ([^,]+), zIndex: 20, opacity: 1, transform: 'translateY\(0px\)', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none'}}>/g;

// Instead of string replacing, let's find indices.
let match;
const tagsToReplace = [];
while ((match = wrapperRegex.exec(text)) !== null) {
  const start = match.index;
  const end = match.index + match[0].length;
  tagsToReplace.push({ start, end, matchText: match[0], yProp: match[1], yVal: match[2], xProp: match[3], xVal: match[4] });
}

// We will process backwards so indices don't shift.
for (let i = tagsToReplace.length - 1; i >= 0; i--) {
  const tag = tagsToReplace[i];
  
  // Find the matching closing </div>
  let depth = 1;
  let j = tag.end;
  let closeIndex = -1;
  while (j < text.length) {
    if (text.substring(j, j + 4) === '<div') {
      depth++;
    } else if (text.substring(j, j + 6) === '</div ') {
      depth--;
    } else if (text.substring(j, j + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        closeIndex = j;
        break;
      }
    }
    j++;
  }

  if (closeIndex !== -1) {
    // Replace the closing tag first
    text = text.substring(0, closeIndex) + '</DraggableItem>' + text.substring(closeIndex + 6);
    // Replace the opening tag
    const newOpenTag = `<DraggableItem style={{${tag.yProp}: ${tag.yVal}, ${tag.xProp}: ${tag.xVal}, zIndex: 20}} className="absolute">`;
    text = text.substring(0, tag.start) + newOpenTag + text.substring(tag.end);
  }
}

// Let's also animate the hero text
const heroRegex = /<div className="max-w-3xl text-center"><h1 className="text-4xl font-extrabold leading-\[1\.05\] tracking-tight md:text-5xl 2xl:text-6xl"><span className="hero-line hero-line-1">I'm Elena\.<\/span><br \/><span className="hero-line hero-line-2">I lead product at <a href="https:\/\/www\.arrive\.accountants\/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto underline decoration-black\/20 decoration-\[3px\] underline-offset-\[6px\] transition-colors hover:decoration-black\/60">Arrive<\/a>\.<\/span><\/h1><p className="hero-line hero-line-3 mx-auto mt-6 max-w-xl text-base leading-relaxed text-black\/50">Managing engineers, customers, and building agent loops and graphs to make every person in my team more efficient\.<\/p><\/div>/;

const animatedHero = `
<div className="max-w-3xl text-center">
  <motion.h1 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl 2xl:text-6xl"
  >
    <span className="hero-line hero-line-1">I'm Elena.</span><br />
    <span className="hero-line hero-line-2">I lead product at <a href="https://www.arrive.accountants/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto underline decoration-black/20 decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-black/60">Arrive</a>.</span>
  </motion.h1>
  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="hero-line hero-line-3 mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/50"
  >
    Managing engineers, customers, and building agent loops and graphs to make every person in my team more efficient.
  </motion.p>
</div>
`;
text = text.replace(heroRegex, animatedHero);

fs.writeFileSync('src/app/page.jsx', text);
console.log('Rewrite complete');
