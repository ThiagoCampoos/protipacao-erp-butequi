import React, { useRef, useEffect } from "react";

interface Tab {
  id: number;
  client_name: string;
}

interface TabSliderProps {
  tabs: Tab[];
  activeTabId: number | null;
  onSelectTab: (tabId: number) => void;
  onCreateNew?: () => void;
}

export function TabSlider({ tabs, activeTabId, onSelectTab, onCreateNew }: TabSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected tab
  useEffect(() => {
    if (scrollRef.current && activeTabId) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTabId]);

  // Find main tab and subtabs
  const mainTab = tabs.find(t => t.client_name === 'Comanda Principal' || t.client_name.toLowerCase() === 'mesa') || tabs[0];
  const subTabs = tabs.filter(t => t.id !== mainTab?.id);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="bg-white relative rounded-md border border-zinc-200/60 overflow-hidden shadow-sm mx-1">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          onClick={() => onSelectTab(mainTab.id)}
          data-active={activeTabId === mainTab.id}
          className={`shrink-0 flex-1 min-w-[90px] py-3 text-[11px] font-black tracking-widest uppercase transition-colors ${
            activeTabId === mainTab.id 
              ? "bg-[#FF0000] text-white" 
              : "bg-zinc-50 border-r border-zinc-200 text-zinc-400"
          }`}
        >
          MESA
        </button>

        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            data-active={activeTabId === tab.id}
            className={`shrink-0 flex-1 min-w-[90px] py-3 text-[11px] font-black tracking-widest uppercase transition-colors border-r border-zinc-200 ${
              activeTabId === tab.id 
                ? "bg-[#FF0000] text-white border-none" 
                : "bg-zinc-50 text-zinc-400"
            }`}
          >
            {tab.client_name.split(' ')[0]} {/* Show first name */}
          </button>
        ))}

        {onCreateNew && (
           <button
             onClick={onCreateNew}
             className="shrink-0 flex-1 min-w-[90px] py-3 text-[11px] font-black tracking-widest uppercase bg-zinc-50 text-[#FF0000] flex justify-center items-center gap-1.5 hover:bg-zinc-100 transition-colors"
           >
             <span className="text-[14px] leading-none mb-[2px]">+</span> NEW
           </button>
        )}
      </div>
      
      {/* Scroll indicator gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
}
