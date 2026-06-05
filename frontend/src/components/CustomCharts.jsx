import React, { useState } from 'react';

// ----------------------------------------------------
// 1. LINE CHART (REVENUE & EARNINGS)
// ----------------------------------------------------
export const LineChart = ({ data = [], height = 200 }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) {
    return <div className="text-slate-400 text-sm py-8 text-center">No revenue data available</div>;
  }

  const padding = 40;
  const svgWidth = 500;
  const svgHeight = height;

  const maxVal = Math.max(...data.map(d => d.amount)) * 1.15 || 1000;
  const minVal = 0;

  // Compute points
  const points = data.map((d, index) => {
    const x = padding + (index * (svgWidth - padding * 2)) / (data.length - 1);
    const y = svgHeight - padding - ((d.amount - minVal) * (svgHeight - padding * 2)) / (maxVal - minVal);
    return { x, y, label: d.name, val: d.amount };
  });

  // Construct path string
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Smooth curves using bezier anchors
      const cpX1 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
      const cpY1 = points[i - 1].y;
      const cpX2 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
      const cpY2 = points[i].y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
  }

  // Path for gradient fill under the line
  const fillD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z` 
    : '';

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * (svgHeight - padding * 2);
          const valLabel = Math.round(maxVal - ratio * (maxVal - minVal));
          return (
            <g key={i}>
              <line 
                x1={padding} 
                y1={y} 
                x2={svgWidth - padding} 
                y2={y} 
                stroke="#1e293b" 
                strokeDasharray="4 4" 
              />
              <text 
                x={padding - 8} 
                y={y + 4} 
                fill="#64748b" 
                fontSize="10" 
                textAnchor="end"
                className="font-sans"
              >
                ${valLabel}
              </text>
            </g>
          );
        })}

        {/* Gradient fill */}
        <path d={fillD} fill="url(#areaGrad)" />

        {/* Interactive line path */}
        <path 
          d={pathD} 
          fill="none" 
          stroke="url(#lineGrad)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />

        {/* Data points */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={hoveredPoint && hoveredPoint.idx === idx ? "7" : "4.5"}
              fill="#0f172a"
              stroke={hoveredPoint && hoveredPoint.idx === idx ? "#f472b6" : "#6366f1"}
              strokeWidth="2.5"
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredPoint({ ...pt, idx })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            {/* X Axis Labels */}
            <text
              x={pt.x}
              y={svgHeight - padding + 20}
              fill="#94a3b8"
              fontSize="10"
              textAnchor="middle"
              className="font-sans font-medium"
            >
              {pt.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Dynamic Hover Tooltip */}
      {hoveredPoint && (
        <div 
          className="absolute z-10 bg-slate-950/90 border border-indigo-500/50 backdrop-blur-md rounded-md p-2 text-xs shadow-lg font-sans"
          style={{
            left: `${(hoveredPoint.x / svgWidth) * 100}%`,
            top: `${(hoveredPoint.y / svgHeight) * 100 - 45}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-semibold text-slate-300">{hoveredPoint.label}</div>
          <div className="text-indigo-400 font-bold">${hoveredPoint.val.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 2. BAR CHART (PRODUCT SALES / QUANTITY)
// ----------------------------------------------------
export const BarChart = ({ data = [], height = 200 }) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  if (!data || data.length === 0) {
    return <div className="text-slate-400 text-sm py-8 text-center">No sales data available</div>;
  }

  const padding = 40;
  const svgWidth = 500;
  const svgHeight = height;

  const maxVal = Math.max(...data.map(d => d.sales)) * 1.1 || 100;
  const minVal = 0;

  const barWidth = 32;
  const barSpacing = (svgWidth - padding * 2 - data.length * barWidth) / (data.length - 1 || 1);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="barGradHover" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * (svgHeight - padding * 2);
          const valLabel = Math.round(maxVal - ratio * (maxVal - minVal));
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={svgWidth - padding} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
              <text x={padding - 8} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">
                {valLabel}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, idx) => {
          const x = padding + idx * (barWidth + barSpacing);
          const barHeight = ((d.sales - minVal) * (svgHeight - padding * 2)) / (maxVal - minVal);
          const y = svgHeight - padding - barHeight;
          const isHovered = hoveredBar && hoveredBar.idx === idx;

          return (
            <g key={idx}>
              {/* Rounded Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill={isHovered ? "url(#barGradHover)" : "url(#barGrad)"}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredBar({ ...d, idx, x, y })}
                onMouseLeave={() => setHoveredBar(null)}
              />
              {/* X Label */}
              <text
                x={x + barWidth / 2}
                y={svgHeight - padding + 20}
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
                className="font-sans font-medium"
              >
                {d.title.length > 10 ? d.title.substring(0, 10) + '..' : d.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Dynamic Hover Tooltip */}
      {hoveredBar && (
        <div 
          className="absolute z-10 bg-slate-950/95 border border-indigo-400/50 backdrop-blur-md rounded-md p-2 text-xs shadow-lg font-sans w-36"
          style={{
            left: `${((hoveredBar.x + barWidth / 2) / svgWidth) * 100}%`,
            top: `${(hoveredBar.y / svgHeight) * 100 - 50}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-semibold text-slate-300 truncate">{hoveredBar.title}</div>
          <div className="text-indigo-400 font-bold">Sales: {hoveredBar.sales} items</div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 3. PIPELINE FUNNEL CHART (APPLICANTS FUNNEL)
// ----------------------------------------------------
export const FunnelChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <div className="text-slate-400 text-sm py-8 text-center">No hiring pipeline details</div>;
  }

  const maxVal = Math.max(...data.map(d => d.count)) || 1;

  return (
    <div className="space-y-4 py-2">
      {data.map((stage, idx) => {
        const percentage = Math.round((stage.count / maxVal) * 100) || 0;
        // Harmonic custom colors: indigo -> purple -> pink
        const gradientClass = idx === 0 
          ? 'from-indigo-600 to-indigo-500' 
          : idx === 1 
            ? 'from-purple-600 to-purple-500' 
            : 'from-pink-600 to-pink-500';

        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>{stage.name}</span>
              <span className="text-slate-400">{stage.count} ({percentage}%)</span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden border border-slate-700/30">
              <div 
                className={`bg-gradient-to-r ${gradientClass} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
