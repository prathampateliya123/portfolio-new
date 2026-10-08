const fs = require('fs');
let text = fs.readFileSync('src/app/page.jsx', 'utf8');

// Add imports
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

// 3. Make the elements draggable
// We look for: <div className="absolute cursor-grab touch-none select-none active:cursor-grabbing" draggable="false" style={{top: 90, right: '2.5%', zIndex: 20, opacity: 1, transform: 'translateY(0px)', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none'}}>
// And we want to wrap the inner content with DraggableItem.
// Actually, it's better to replace the WHOLE wrapper with DraggableItem.
const draggables = [
  { top: 90, right: "'2.5%'" },
  { top: 198, right: "'2.5%'" },
  { top: 306, right: "'2.5%'" },
  { top: 414, right: "'2.5%'" },
  { top: 522, right: "'2.5%'" },
  { top: 90, left: 24 },
  { top: 90, left: 194 },
  { top: 90, left: 364 },
  { top: 404, left: 24 },
  { top: 264, left: 24 },
  { bottom: 120, right: 48 }
];

for (const p of draggables) {
  let styleStr = '';
  if (p.right !== undefined) styleStr = `top: ${p.top}, right: ${p.right}`;
  else if (p.bottom !== undefined) styleStr = `bottom: ${p.bottom}, right: ${p.right}`;
  else styleStr = `top: ${p.top}, left: ${p.left}`;

  const regexStr = `<div className="absolute cursor-grab touch-none select-none active:cursor-grabbing" draggable="false" style=\\{\\{${styleStr}, zIndex: 20, opacity: 1, transform: 'translateY\\(0px\\)', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none'\\}\\}>([\\s\\S]*?)(?=<div className="absolute cursor-grab touch-none|<div className="pointer-events-none flex h-full items-center justify-center)`;
  
  // This approach is difficult because matching HTML tags is tricky.
  // Instead, let's just replace the exact start tag.
  const exactStart = `<div className="absolute cursor-grab touch-none select-none active:cursor-grabbing" draggable="false" style={{${styleStr}, zIndex: 20, opacity: 1, transform: 'translateY(0px)', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none'}}>`;
  
  text = text.replace(exactStart, `<DraggableItem style={{${styleStr}, zIndex: 20}} className="absolute">`);
}

// Now replace all the exact closing `</div>` tags. 
// Since every `<DraggableItem>` now lacks a closing tag (it has a closing `</div>`), we can just let it be `</div>`!
// Wait! `DraggableItem` renders `<motion.div className={className} style={style}>`, so if we replace `<div...>` with `<DraggableItem...>`, the matching `</div>` must be changed to `</DraggableItem>`.
// So let's match the inner blocks manually or use a simple HTML parser.
