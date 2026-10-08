const fs = require('fs');

let text = fs.readFileSync('src/app/page.jsx', 'utf8');

text = text.replace(/<DraggableItem style=\{\{top: 90, left: 194, zIndex: 20\}\} className="absolute"><div className="rounded-2xl border border-white\/45 bg-white\/30 p-4 shadow-\[inset_0_1px_0_rgba\(255,255,255,0\.6\),0_8px_32px_rgba\(0,0,0,0\.12\)\] backdrop-blur-2xl backdrop-saturate-150 h-\[150px\] w-\[150px\] cursor-pointer !p-3\.5" title="Book a meeting" \/><\/div>/g, '<DraggableItem style={{top: 90, left: 194, zIndex: 20}} className="absolute"><div className="rounded-2xl border border-white/45 bg-white/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 h-[150px] w-[150px] cursor-pointer !p-3.5" title="Book a meeting" /></DraggableItem>');

text = text.replace(/<DraggableItem style=\{\{top: 90, left: 364, zIndex: 20\}\} className="absolute"><AudioPlayer \/><div className="mt-3"><div className="h-\[3px\] w-full rounded-full bg-black\/10"><div className="h-\[3px\] rounded-full bg-black\/55" style=\{\{width: '0%'\}\} \/><\/div><div className="mt-1 flex justify-between text-\[9px\] tabular-nums text-black\/35"><span>0:00<\/span><span>-\{\/\* \*\*\/\}0:30<\/span><\/div><\/div><\/div><\/DraggableItem>/g, '<DraggableItem style={{top: 90, left: 364, zIndex: 20}} className="absolute"><AudioPlayer /></DraggableItem>');

// wait, the AudioPlayer replacement left some trailing `<div className="mt-3">...</div>` ? 
// In the original, the AudioPlayer block had that inside it. When I replaced `<AudioPlayer />`, I replaced the outer div of the player, but maybe I missed the trailing part because of my regex?
// Wait, my rewrite script replaced `<div ...><div ...>Audio ... </div></div></div>` but let me check what was left.
// Let's just restore page.jsx from the previous step and do it right.
