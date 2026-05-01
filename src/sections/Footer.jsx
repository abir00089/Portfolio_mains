import { mySocials } from "../constants";
import { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "abirmondal8926@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      
      {/* ── Email Copy Button ── */}
      <div 
        onClick={copyToClipboard}
        className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors group"
        title="Copy Email Address"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        
        <p className="font-mono text-base">{email}</p>
        
        <img 
          src={copied ? "assets/copy-done.svg" : "assets/copy.svg"} 
          alt="copy" 
          className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" 
        />
      </div>

      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index} target="_blank" rel="noopener noreferrer">
            <img
              src={social.icon}
              className="w-5 h-5 transition-opacity opacity-80 hover:opacity-100"
              alt={social.name}
              style={social.invert ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </a>
        ))}
      </div>
      <p className="w-full text-center sm:w-auto sm:text-left">© 2025 Abir Mondal. All rights reserved.</p>
    </section>
  );
};

export default Footer;
