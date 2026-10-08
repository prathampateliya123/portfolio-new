"use client";
import { useState, useEffect } from "react";

export default function MiamiClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="rounded-2xl border border-white/45 bg-white/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 flex h-[150px] w-[150px] items-center justify-center !p-3">
        <div className="relative h-full w-full opacity-0"></div>
      </div>
    );
  }

  // Miami is Eastern Time (UTC-4 in EDT, UTC-5 in EST)
  const miamiTime = new Date(time.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const hours = miamiTime.getHours();
  const minutes = miamiTime.getMinutes();
  const seconds = miamiTime.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="rounded-2xl border border-white/45 bg-white/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 flex h-[150px] w-[150px] items-center justify-center !p-3">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx={50} cy={50} r={48} fill="rgba(255,255,255,0.45)" stroke="rgba(255,255,255,0.6)" />
          {/* Dial markers */}
          <line x1={50} y1={8} x2={50} y2={4} stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
          <line x1={71} y1="13.627" x2={73} y2="10.163" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1="86.373" y1={29} x2="89.837" y2={27} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1={92} y1={50} x2={96} y2={50} stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
          <line x1="86.373" y1={71} x2="89.837" y2={73} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1={71} y1="86.373" x2={73} y2="89.837" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1={50} y1={92} x2={50} y2={96} stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
          <line x1={29} y1="86.373" x2={27} y2="89.837" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1="13.627" y1={71} x2="10.163" y2={73} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1={8} y1={50} x2={4} y2={50} stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
          <line x1="13.627" y1={29} x2="10.163" y2={27} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          <line x1={29} y1="13.627" x2={27} y2="10.163" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
          
          <text x={50} y={26} textAnchor="middle" fontSize={8} fill="rgba(0,0,0,0.4)" fontWeight={600}>MIAMI</text>
          
          {/* Hands */}
          {/* Hour */}
          <line x1={50} y1={50} x2={50} y2={30} stroke="black" strokeWidth="3" strokeLinecap="round" transform={`rotate(${hourAngle} 50 50)`} />
          {/* Minute */}
          <line x1={50} y1={50} x2={50} y2={20} stroke="black" strokeWidth="2" strokeLinecap="round" transform={`rotate(${minuteAngle} 50 50)`} />
          {/* Second */}
          <line x1={50} y1={50} x2={50} y2={15} stroke="#ff3b30" strokeWidth="1" strokeLinecap="round" transform={`rotate(${secondAngle} 50 50)`} />

          <circle cx={50} cy={50} r="2.4" fill="black" />
          <circle cx={50} cy={50} r="1" fill="#ff3b30" />
        </svg>
      </div>
    </div>
  );
}
