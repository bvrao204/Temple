import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, ShieldCheck, MapPin, Star, AlertTriangle, Compass, Heart, MessageSquare, Globe } from 'lucide-react';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const basePath = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}${cleanPath}`;
};

const getArchitectureStyleKey = (styleName) => {
  const name = (styleName || '').toLowerCase();
  if (name.includes('nagara')) return 'nagara';
  if (name.includes('dravidian') || name.includes('chola') || name.includes('nayak')) return 'dravidian';
  return 'vesara';
};

const getHotspots = (styleKey) => {
  const common = [
    { id: 'garbhagriha', term: 'Garbhagriha', coords: { x: 0, y: -50, z: -10 }, definition: 'The sanctum sanctorum or innermost chamber where the main deity idol (Murti) is housed.' },
    { id: 'mandapa', term: 'Mandapa', coords: { x: 0, y: -45, z: 45 }, definition: 'The pillared assembly hall or pavilion leading to the inner sanctum, used for prayers and gatherings.' }
  ];
  
  if (styleKey === 'nagara') {
    return [
      ...common,
      { id: 'shikhara', term: 'Shikhara', coords: { x: 0, y: 20, z: -25 }, definition: 'The curvilinear, beehive-shaped tower characteristic of Northern Indian architecture.' },
      { id: 'amalaka', term: 'Amalaka', coords: { x: 0, y: 75, z: -25 }, definition: 'A stone disc with ribbed edges, placed on top of a Nagara spire representing a sacred lotus.' },
      { id: 'kalasha', term: 'Kalasha', coords: { x: 0, y: 92, z: -25 }, definition: 'The crowning pot-shaped element at the absolute peak of the temple spire, symbolizing spiritual completion.' }
    ];
  } else if (styleKey === 'dravidian') {
    return [
      ...common,
      { id: 'vimana', term: 'Vimana', coords: { x: 0, y: 10, z: -25 }, definition: 'The stepped pyramidal tower rising over the inner sanctum in Dravidian architecture.' },
      { id: 'stupika', term: 'Stupika', coords: { x: 0, y: 60, z: -25 }, definition: 'The bulbous dome-shaped monolithic capstone crowning the Dravidian Vimana.' },
      { id: 'gopuram', term: 'Gopuram', coords: { x: 0, y: 0, z: 80 }, definition: 'The monumental, highly decorated entrance gateway towers that dominate the temple boundaries.' }
    ];
  } else {
    return [
      ...common,
      { id: 'shikhara_vimana', term: 'Shikhara / Vimana', coords: { x: 0, y: 15, z: 0 }, definition: 'The hybrid spire rising above the sanctum, showcasing mixed stepped pyramid and circular profiles.' },
      { id: 'stupika_kalasha', term: 'Stupika / Kalasha', coords: { x: 0, y: 80, z: 0 }, definition: 'The crowning element on top of the hybrid spire.' }
    ];
  }
};

const generateModelData = (styleKey) => {
  const vertices = [];
  const edges = [];

  if (styleKey === 'nagara') {
    const baseSize = 70;
    const baseTop = -60;
    const baseBottom = -75;
    const jagatiStart = vertices.length;
    vertices.push(
      {x: -baseSize, y: baseBottom, z: -baseSize},
      {x: baseSize, y: baseBottom, z: -baseSize},
      {x: baseSize, y: baseBottom, z: baseSize},
      {x: -baseSize, y: baseBottom, z: baseSize},
      {x: -baseSize, y: baseTop, z: -baseSize},
      {x: baseSize, y: baseTop, z: -baseSize},
      {x: baseSize, y: baseTop, z: baseSize},
      {x: -baseSize, y: baseTop, z: baseSize}
    );
    edges.push(
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    );

    const mIdx = vertices.length;
    vertices.push(
      {x: -30, y: -60, z: 20},
      {x: 30, y: -60, z: 20},
      {x: 30, y: -60, z: 60},
      {x: -30, y: -60, z: 60},
      
      {x: -30, y: -30, z: 20},
      {x: 30, y: -30, z: 20},
      {x: 30, y: -30, z: 60},
      {x: -30, y: -30, z: 60},
      
      {x: 0, y: -10, z: 40}
    );
    edges.push(
      [mIdx+0, mIdx+1], [mIdx+1, mIdx+2], [mIdx+2, mIdx+3], [mIdx+3, mIdx+0],
      [mIdx+4, mIdx+5], [mIdx+5, mIdx+6], [mIdx+6, mIdx+7], [mIdx+7, mIdx+4],
      [mIdx+0, mIdx+4], [mIdx+1, mIdx+5], [mIdx+2, mIdx+6], [mIdx+3, mIdx+7],
      [mIdx+4, mIdx+8], [mIdx+5, mIdx+8], [mIdx+6, mIdx+8], [mIdx+7, mIdx+8]
    );

    const shikharaLayers = 7;
    const shikharaStart = vertices.length;
    const zCenter = -25;
    for (let i = 0; i < shikharaLayers; i++) {
      const t = i / (shikharaLayers - 1);
      const yVal = -60 + 130 * t;
      const curve = 1 - Math.pow(t, 2.2); 
      const halfW = 40 * curve;
      const halfD = 40 * curve;
      
      vertices.push(
        {x: -halfW, y: yVal, z: zCenter - halfD},
        {x: halfW, y: yVal, z: zCenter - halfD},
        {x: halfW, y: yVal, z: zCenter + halfD},
        {x: -halfW, y: yVal, z: zCenter + halfD}
      );
      
      const idx = shikharaStart + i * 4;
      edges.push([idx, idx+1], [idx+1, idx+2], [idx+2, idx+3], [idx+3, idx]);
      
      if (i > 0) {
        const prevIdx = idx - 4;
        edges.push(
          [idx, prevIdx],
          [idx+1, prevIdx+1],
          [idx+2, prevIdx+2],
          [idx+3, prevIdx+3]
        );
      }
    }

    const amalakaStart = vertices.length;
    const yAmalakaBottom = 70;
    const yAmalakaTop = 80;
    const numRibs = 12;
    for (let r = 0; r < numRibs; r++) {
      const angle = (r / numRibs) * Math.PI * 2;
      const radius = (r % 2 === 0) ? 14 : 10;
      const xVal = radius * Math.cos(angle);
      const zVal = zCenter + radius * Math.sin(angle);
      
      vertices.push(
        {x: xVal, y: yAmalakaBottom, z: zVal},
        {x: xVal, y: yAmalakaTop, z: zVal}
      );
      
      const curIdx = amalakaStart + r * 2;
      edges.push([curIdx, curIdx+1]);
      
      const nextR = (r + 1) % numRibs;
      const nextIdx = amalakaStart + nextR * 2;
      edges.push([curIdx, nextIdx], [curIdx+1, nextIdx+1]);
    }

    const kalashaStart = vertices.length;
    vertices.push(
      {x: 0, y: 80, z: zCenter},
      {x: -3, y: 85, z: zCenter},
      {x: 3, y: 85, z: zCenter},
      {x: -1, y: 92, z: zCenter},
      {x: 1, y: 92, z: zCenter},
      {x: 0, y: 98, z: zCenter}
    );
    edges.push(
      [kalashaStart, kalashaStart+1], [kalashaStart, kalashaStart+2],
      [kalashaStart+1, kalashaStart+3], [kalashaStart+2, kalashaStart+4],
      [kalashaStart+3, kalashaStart+5], [kalashaStart+4, kalashaStart+5],
      [kalashaStart+1, kalashaStart+2], [kalashaStart+3, kalashaStart+4]
    );
  } else if (styleKey === 'dravidian') {
    const baseSize = 75;
    const baseTop = -60;
    const baseBottom = -75;
    const jagatiStart = vertices.length;
    vertices.push(
      {x: -baseSize, y: baseBottom, z: -baseSize},
      {x: baseSize, y: baseBottom, z: -baseSize},
      {x: baseSize, y: baseBottom, z: baseSize},
      {x: -baseSize, y: baseBottom, z: baseSize},
      {x: -baseSize, y: baseTop, z: -baseSize},
      {x: baseSize, y: baseTop, z: -baseSize},
      {x: baseSize, y: baseTop, z: baseSize},
      {x: -baseSize, y: baseTop, z: baseSize}
    );
    edges.push(
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    );

    const wallIdx = vertices.length;
    const wSize = 92;
    vertices.push(
      {x: -wSize, y: -75, z: -wSize}, {x: wSize, y: -75, z: -wSize},
      {x: wSize, y: -75, z: wSize}, {x: -wSize, y: -75, z: wSize},
      {x: -wSize, y: -55, z: -wSize}, {x: wSize, y: -55, z: -wSize},
      {x: wSize, y: -55, z: wSize}, {x: -wSize, y: -55, z: wSize}
    );
    edges.push(
      [wallIdx+0, wallIdx+1], [wallIdx+1, wallIdx+2], [wallIdx+2, wallIdx+3], [wallIdx+3, wallIdx+0],
      [wallIdx+4, wallIdx+5], [wallIdx+5, wallIdx+6], [wallIdx+6, wallIdx+7], [wallIdx+7, wallIdx+4],
      [wallIdx+0, wallIdx+4], [wallIdx+1, wallIdx+5], [wallIdx+2, wallIdx+6], [wallIdx+3, wallIdx+7]
    );

    const vimanaTiers = 5;
    const vimanaStart = vertices.length;
    const tierHeight = 22;
    const zCenter = -25;
    for (let i = 0; i < vimanaTiers; i++) {
      const yBottom = -60 + i * tierHeight;
      const yTop = yBottom + tierHeight;
      
      const sizeFactor = 1 - i * 0.18;
      const halfW = 40 * sizeFactor;
      const halfD = 40 * sizeFactor;
      
      vertices.push(
        {x: -halfW, y: yBottom, z: zCenter - halfD},
        {x: halfW, y: yBottom, z: zCenter - halfD},
        {x: halfW, y: yBottom, z: zCenter + halfD},
        {x: -halfW, y: yBottom, z: zCenter + halfD},
        
        {x: -halfW, y: yTop, z: zCenter - halfD},
        {x: halfW, y: yTop, z: zCenter - halfD},
        {x: halfW, y: yTop, z: zCenter + halfD},
        {x: -halfW, y: yTop, z: zCenter + halfD}
      );
      
      const baseIdx = vimanaStart + i * 8;
      edges.push(
        [baseIdx+0, baseIdx+1], [baseIdx+1, baseIdx+2], [baseIdx+2, baseIdx+3], [baseIdx+3, baseIdx+0],
        [baseIdx+4, baseIdx+5], [baseIdx+5, baseIdx+6], [baseIdx+6, baseIdx+7], [baseIdx+7, baseIdx+4],
        [baseIdx+0, baseIdx+4], [baseIdx+1, baseIdx+5], [baseIdx+2, baseIdx+6], [baseIdx+3, baseIdx+7]
      );
    }

    const stupikaStart = vertices.length;
    const yStupikaBase = -60 + 5 * tierHeight;
    vertices.push(
      {x: -10, y: yStupikaBase, z: zCenter - 10},
      {x: 10, y: yStupikaBase, z: zCenter - 10},
      {x: 10, y: yStupikaBase, z: zCenter + 10},
      {x: -10, y: yStupikaBase, z: zCenter + 10},
      
      {x: -14, y: yStupikaBase + 8, z: zCenter - 14},
      {x: 14, y: yStupikaBase + 8, z: zCenter - 14},
      {x: 14, y: yStupikaBase + 8, z: zCenter + 14},
      {x: -14, y: yStupikaBase + 8, z: zCenter + 14},
      
      {x: 0, y: yStupikaBase + 18, z: zCenter}
    );
    edges.push(
      [stupikaStart+0, stupikaStart+4], [stupikaStart+1, stupikaStart+5], [stupikaStart+2, stupikaStart+6], [stupikaStart+3, stupikaStart+7],
      [stupikaStart+4, stupikaStart+5], [stupikaStart+5, stupikaStart+6], [stupikaStart+6, stupikaStart+7], [stupikaStart+7, stupikaStart+4],
      [stupikaStart+4, stupikaStart+8], [stupikaStart+5, stupikaStart+8], [stupikaStart+6, stupikaStart+8], [stupikaStart+7, stupikaStart+8]
    );

    const gopuramTiers = 4;
    const gopuramStart = vertices.length;
    const gZCenter = 80;
    for (let i = 0; i < gopuramTiers; i++) {
      const yBottom = -55 + i * 18;
      const yTop = yBottom + 18;
      
      const taper = 1 - i * 0.20;
      const halfW = 35 * taper;
      const halfD = 20 * taper;
      
      vertices.push(
        {x: -halfW, y: yBottom, z: gZCenter - halfD},
        {x: halfW, y: yBottom, z: gZCenter - halfD},
        {x: halfW, y: yBottom, z: gZCenter + halfD},
        {x: -halfW, y: yBottom, z: gZCenter + halfD},
        
        {x: -halfW, y: yTop, z: gZCenter - halfD},
        {x: halfW, y: yTop, z: gZCenter - halfD},
        {x: halfW, y: yTop, z: gZCenter + halfD},
        {x: -halfW, y: yTop, z: gZCenter + halfD}
      );
      
      const baseIdx = gopuramStart + i * 8;
      edges.push(
        [baseIdx+0, baseIdx+1], [baseIdx+1, baseIdx+2], [baseIdx+2, baseIdx+3], [baseIdx+3, baseIdx+0],
        [baseIdx+4, baseIdx+5], [baseIdx+5, baseIdx+6], [baseIdx+6, baseIdx+7], [baseIdx+7, baseIdx+4],
        [baseIdx+0, baseIdx+4], [baseIdx+1, baseIdx+5], [baseIdx+2, baseIdx+6], [baseIdx+3, baseIdx+7]
      );
    }
    const gRoofStart = vertices.length;
    const gRoofHeight = -55 + gopuramTiers * 18;
    const roofSizeW = 35 * (1 - gopuramTiers * 0.20);
    const roofSizeD = 20 * (1 - gopuramTiers * 0.20);
    vertices.push(
      {x: 0, y: gRoofHeight + 10, z: gZCenter - roofSizeD},
      {x: 0, y: gRoofHeight + 10, z: gZCenter + roofSizeD}
    );
    const lastGopIdx = gopuramStart + (gopuramTiers - 1) * 8;
    edges.push(
      [lastGopIdx+4, gRoofStart], [lastGopIdx+5, gRoofStart],
      [lastGopIdx+7, gRoofStart+1], [lastGopIdx+6, gRoofStart+1],
      [gRoofStart, gRoofStart+1]
    );
  } else {
    const baseStarStart = vertices.length;
    const starPoints = 12;
    for (let p = 0; p < starPoints; p++) {
      const angle = (p / starPoints) * Math.PI * 2;
      const radius = (p % 2 === 0) ? 75 : 55;
      const xVal = radius * Math.cos(angle);
      const zVal = radius * Math.sin(angle);
      
      vertices.push(
        {x: xVal, y: -75, z: zVal},
        {x: xVal, y: -60, z: zVal}
      );
      
      const curIdx = baseStarStart + p * 2;
      edges.push([curIdx, curIdx+1]);
      const nextP = (p + 1) % starPoints;
      const nextIdx = baseStarStart + nextP * 2;
      edges.push([curIdx, nextIdx], [curIdx+1, nextIdx+1]);
    }

    const cylinderStart = vertices.length;
    const cylSlices = 4;
    const numCylPoints = 12;
    for (let s = 0; s < cylSlices; s++) {
      const yVal = -60 + s * 13;
      const radius = 50;
      for (let p = 0; p < numCylPoints; p++) {
        const angle = (p / numCylPoints) * Math.PI * 2;
        const xVal = radius * Math.cos(angle);
        const zVal = radius * Math.sin(angle);
        vertices.push({x: xVal, y: yVal, z: zVal});
        
        const curIdx = cylinderStart + s * numCylPoints + p;
        const nextP = (p + 1) % numCylPoints;
        const nextIdx = cylinderStart + s * numCylPoints + nextP;
        edges.push([curIdx, nextIdx]);
        
        if (s > 0) {
          const prevIdx = curIdx - numCylPoints;
          edges.push([curIdx, prevIdx]);
        }
      }
    }

    const spireStart = vertices.length;
    const spireSlices = 7;
    const numSpirePoints = 12;
    for (let s = 0; s < spireSlices; s++) {
      const t = s / (spireSlices - 1);
      const yVal = -21 + 95 * t;
      const curve = Math.cos(t * Math.PI / 2);
      const radius = 45 * curve;
      
      for (let p = 0; p < numSpirePoints; p++) {
        const angle = (p / numSpirePoints) * Math.PI * 2;
        const xVal = radius * Math.cos(angle);
        const zVal = radius * Math.sin(angle);
        vertices.push({x: xVal, y: yVal, z: zVal});
        
        const curIdx = spireStart + s * numSpirePoints + p;
        const nextP = (p + 1) % numSpirePoints;
        const nextIdx = spireStart + s * numSpirePoints + nextP;
        edges.push([curIdx, nextIdx]);
        
        if (s > 0) {
          const prevIdx = curIdx - numSpirePoints;
          edges.push([curIdx, prevIdx]);
        }
      }
    }

    const vesaraPeakStart = vertices.length;
    vertices.push(
      {x: 0, y: 88, z: 0}
    );
    const lastSpireIdx = spireStart + (spireSlices - 1) * numSpirePoints;
    for (let p = 0; p < numSpirePoints; p++) {
      edges.push([lastSpireIdx + p, vesaraPeakStart]);
    }
  }

  return { vertices, edges };
};

function Temple3DViewer({ styleName }) {
  const canvasRef = React.useRef(null);
  const styleKey = React.useMemo(() => {
    const name = (styleName || '').toLowerCase();
    if (name.includes('nagara')) return 'nagara';
    if (name.includes('dravidian') || name.includes('chola') || name.includes('nayak')) return 'dravidian';
    return 'vesara';
  }, [styleName]);

  const [rotationX, setRotationX] = React.useState(0.25);
  const [rotationY, setRotationY] = React.useState(0.5);
  const [zoom, setZoom] = React.useState(1.4);
  const [selectedHotspot, setSelectedHotspot] = React.useState(null);
  const [hoveredHotspot, setHoveredHotspot] = React.useState(null);

  const hotspots = React.useMemo(() => getHotspots(styleKey), [styleKey]);

  const dragStartRef = React.useRef({ x: 0, y: 0 });
  const isDraggingRef = React.useRef(false);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setRotationY(prev => prev + dx * 0.007);
      setRotationX(prev => Math.max(-1.1, Math.min(1.1, prev + dy * 0.007)));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    } else {
      if (canvas.projectedHotspots) {
        let found = null;
        for (const h of canvas.projectedHotspots) {
          const dx = mouseX - h.px;
          const dy = mouseY - h.py;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 12) {
            found = h;
            break;
          }
        }
        setHoveredHotspot(found);
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (isDraggingRef.current && e.touches.length === 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setRotationY(prev => prev + dx * 0.01);
      setRotationX(prev => Math.max(-1.1, Math.min(1.1, prev + dy * 0.01)));
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const width = 500;
    const height = 350;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const { vertices, edges } = generateModelData(styleKey);

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2 + 80, 100 * zoom, 35 * zoom, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(212, 163, 89, 0.06)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(212, 163, 89, 0.15)';
    ctx.stroke();

    const projected = vertices.map(v => {
      let x1 = v.x * Math.cos(rotationY) - v.z * Math.sin(rotationY);
      let z1 = v.x * Math.sin(rotationY) + v.z * Math.cos(rotationY);
      
      let y2 = v.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
      let z2 = v.y * Math.sin(rotationX) + z1 * Math.cos(rotationX);

      const fov = 400;
      const scale = fov / (fov + z2);
      const px = width / 2 + x1 * scale * zoom;
      const py = height / 2 - y2 * scale * zoom;
      return { x: px, y: py, z: z2 };
    });

    ctx.lineWidth = 1.2;
    edges.forEach(([p1, p2]) => {
      const pt1 = projected[p1];
      const pt2 = projected[p2];
      if (!pt1 || !pt2) return;
      
      const zAvg = (pt1.z + pt2.z) / 2;
      const opacity = Math.max(0.15, Math.min(0.8, 1 - (zAvg + 100) / 250));
      
      ctx.beginPath();
      ctx.moveTo(pt1.x, pt1.y);
      ctx.lineTo(pt2.x, pt2.y);
      ctx.strokeStyle = `rgba(212, 163, 89, ${opacity})`;
      ctx.stroke();
    });

    const projectedHotspots = hotspots.map(h => {
      let x1 = h.coords.x * Math.cos(rotationY) - h.coords.z * Math.sin(rotationY);
      let z1 = h.coords.x * Math.sin(rotationY) + h.coords.z * Math.cos(rotationY);
      
      let y2 = h.coords.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
      let z2 = h.coords.y * Math.sin(rotationX) + z1 * Math.cos(rotationX);

      const fov = 400;
      const scale = fov / (fov + z2);
      const px = width / 2 + x1 * scale * zoom;
      const py = height / 2 - y2 * scale * zoom;
      return { ...h, px, py, pz: z2 };
    });

    projectedHotspots.sort((a, b) => b.pz - a.pz);

    projectedHotspots.forEach(h => {
      const isHovered = hoveredHotspot && hoveredHotspot.id === h.id;
      const isSelected = selectedHotspot && selectedHotspot.id === h.id;

      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(h.px, h.py, 13, 0, 2 * Math.PI);
        ctx.fillStyle = isSelected ? 'rgba(255, 111, 60, 0.15)' : 'rgba(212, 163, 89, 0.12)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(h.px, h.py, 6, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected 
        ? '#ff6f3c' 
        : isHovered 
          ? 'var(--saffron)' 
          : 'var(--gold)';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSelected ? 'var(--saffron)' : 'var(--text-primary)';
      ctx.font = isSelected ? 'bold 11px Inter, sans-serif' : '500 10px Inter, sans-serif';
      ctx.fillText(h.term, h.px + 12, h.py + 4);
    });

    canvas.projectedHotspots = projectedHotspots;
  }, [rotationX, rotationY, zoom, styleKey, hotspots, selectedHotspot, hoveredHotspot]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.projectedHotspots) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let clicked = null;
    for (const h of canvas.projectedHotspots) {
      const dx = mouseX - h.px;
      const dy = mouseY - h.py;
      if (Math.sqrt(dx*dx + dy*dy) < 14) {
        clicked = h;
        break;
      }
    }
    
    if (clicked) {
      setSelectedHotspot(clicked);
    }
  };

  const handleReset = () => {
    setRotationX(0.25);
    setRotationY(0.5);
    setZoom(1.4);
    setSelectedHotspot(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }} className="threed-viewer-layout">
      <div className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Interactive 3D {styleKey.toUpperCase()} Style Spire
          </span>
          <button 
            type="button"
            onClick={handleReset} 
            className="btn btn-secondary btn-small"
            style={{ padding: '4px 8px', fontSize: '0.78rem' }}
          >
            Reset Camera
          </button>
        </div>

        <canvas 
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ 
            background: 'linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-primary) 100%)', 
            borderRadius: 'var(--radius-md)', 
            cursor: isDraggingRef.current ? 'grabbing' : 'grab',
            border: '1px solid var(--border-color)',
            touchAction: 'none'
          }}
        />

        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Zoom:</span>
          <input 
            type="range" 
            min="0.8" 
            max="2.5" 
            step="0.1" 
            value={zoom} 
            onChange={(e) => setZoom(Number(e.target.value))}
            style={{ flexGrow: 1, accentColor: 'var(--saffron)' }}
          />
        </div>

        <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          💡 Drag mouse / touch to rotate 3D wireframe. Click on nodes to explore structural parts.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '20px', height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {selectedHotspot ? (
            <div style={{ animation: 'fadeInUp 0.25s' }}>
              <span style={{
                display: 'inline-block',
                padding: '3px 8px',
                background: 'rgba(255, 111, 60, 0.12)',
                color: 'var(--saffron)',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                Architecture Term
              </span>
              <h3 style={{ color: 'var(--gold)', fontSize: '1.4rem', margin: '0 0 12px 0', fontFamily: 'var(--font-title)' }}>
                {selectedHotspot.term}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                {selectedHotspot.definition}
              </p>
            </div>
          ) : (
            <div>
              <span style={{
                display: 'inline-block',
                padding: '3px 8px',
                background: 'rgba(212, 163, 89, 0.12)',
                color: 'var(--gold)',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                {styleKey === 'nagara' ? 'Northern India Style' : styleKey === 'dravidian' ? 'Southern India Style' : 'Vesara Hybrid Style'}
              </span>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 12px 0', fontFamily: 'var(--font-title)' }}>
                Geometric Structure
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '14px' }}>
                {styleKey === 'nagara' 
                  ? 'The Nagara Style is characterized by curvilinear spires (Shikharas) built on a square plan, which curve gradually inward as they rise. The tower is capped with a ribbed Amalaka stone disk representing a sacred lotus.'
                  : styleKey === 'dravidian'
                    ? 'The Dravidian Style features a stepped pyramidal tower (Vimana) rising in levels or storeys over the inner sanctum, crowned by a dome capstone (Stupika). It is enclosed by high walls with massive entrance gateway towers (Gopurams).'
                    : 'The Vesara Style is a hybrid architecture blending elements of the Northern Nagara style and Southern Dravidian style, featuring a star-shaped base platform and circular spire tapers.'
                }
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Select any highlight node on the left model to explore structural glossary definitions under Vastu Shastra rules.
              </p>
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '14px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Select Temple Element:</h4>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {hotspots.map(h => (
              <button
                type="button"
                key={h.id}
                onClick={() => setSelectedHotspot(h)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid ' + (selectedHotspot?.id === h.id ? 'var(--saffron)' : 'var(--border-color)'),
                  background: selectedHotspot?.id === h.id ? 'rgba(255, 111, 60, 0.12)' : 'var(--bg-secondary)',
                  color: selectedHotspot?.id === h.id ? 'var(--saffron)' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {h.term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DetailView({ temple, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ name: '', text: '', rating: 5, date: '' });
  const [liked, setLiked] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [threedMode, setThreedMode] = useState('streetview');

  // Load and save visitor notes from LocalStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`temple_notes_${temple.id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes([
        { name: 'Rohan Sharma', text: 'Beautiful and highly spiritual. Make sure to visit early in the morning around 5 AM to witness the morning Aarti without heavy queues.', rating: 5, date: '2026-05-12' },
        { name: 'Ananya Rao', text: 'Very well maintained temple corridor. Follow the dress code strictly as the temple authorities check at the main tower gate.', rating: 4, date: '2026-06-02' }
      ]);
    }

    // Load liked status
    const isLiked = localStorage.getItem(`temple_liked_${temple.id}`) === 'true';
    setLiked(isLiked);
  }, [temple.id]);

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem(`temple_notes_${temple.id}`, JSON.stringify(updatedNotes));
  };

  const handleLikeToggle = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    localStorage.setItem(`temple_liked_${temple.id}`, String(nextLiked));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.name.trim() || !newNote.text.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const updated = [
      {
        name: newNote.name,
        text: newNote.text,
        rating: Number(newNote.rating),
        date: today
      },
      ...notes
    ];
    saveNotes(updated);
    setNewNote({ name: '', text: '', rating: 5, date: '' });
  };

  const tabs = [
    { id: 'overview', label: 'History & Overview' },
    { id: 'threedview', label: '3D Streets & Views' },
    { id: 'timings', label: 'Rituals & Timings' },
    { id: 'live', label: '🔴 Live Darshan' },
    { id: 'guidelines', label: 'Visitor Guidelines' },
    { id: 'facilities', label: 'Travel & Facilities' },
    { id: 'notes', label: 'Visitor Notes' }
  ];

  const detailStyles = {
    header: {
      position: 'relative',
      height: '350px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: '30px',
      boxShadow: 'var(--shadow-lg)'
    },
    headerImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    headerOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px'
    },
    backBtn: {
      alignSelf: 'flex-start',
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: 600,
      fontSize: '0.9rem',
      transition: 'all var(--transition-fast)'
    },
    headerText: {
      color: '#fff'
    },
    title: {
      fontSize: '2.5rem',
      color: '#fff',
      margin: '0 0 10px 0',
      textShadow: '0 2px 4px rgba(0,0,0,0.4)'
    },
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.95rem'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px',
      alignItems: 'start'
    },
    card: {
      padding: '24px',
      marginBottom: '24px'
    },
    infoRow: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    infoLabel: {
      fontWeight: 700,
      color: 'var(--text-secondary)'
    },
    timelineItem: {
      position: 'relative',
      paddingLeft: '24px',
      borderLeft: '2px solid var(--gold)',
      paddingBottom: '20px'
    },
    timelineDot: {
      position: 'absolute',
      left: '-6px',
      top: '6px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'var(--saffron)'
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header Image section */}
      <div style={detailStyles.header}>
        <img src={getImageUrl(temple.image)} alt={temple.name} style={detailStyles.headerImg} />
        <div style={detailStyles.headerOverlay}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button
              onClick={onBack}
              style={detailStyles.backBtn}
              className="back-btn-hover"
            >
              <ArrowLeft size={16} /> Back to Explore
            </button>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {temple.website && (
                <a
                  href={temple.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...detailStyles.backBtn,
                    background: 'rgba(245, 158, 11, 0.85)',
                    borderColor: 'var(--gold)',
                    textDecoration: 'none'
                  }}
                  className="back-btn-hover"
                >
                  <Globe size={16} /> Official Website
                </a>
              )}

              {/* Google Earth hero button */}
              {temple.mapCoords && (
                <a
                  href={`https://earth.google.com/web/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords.lat},${temple.mapCoords.lng},500a,800d,35y,0h,45t,0r`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...detailStyles.backBtn,
                    background: 'rgba(26, 115, 232, 0.75)',
                    borderColor: 'rgba(26,115,232,0.8)',
                    textDecoration: 'none'
                  }}
                  className="back-btn-hover"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Google Earth 3D
                </a>
              )}

              <button
                onClick={handleLikeToggle}
                style={{
                  ...detailStyles.backBtn,
                  background: liked ? 'rgba(255, 111, 60, 0.85)' : 'rgba(255, 255, 255, 0.25)',
                  borderColor: liked ? 'var(--saffron)' : 'rgba(255, 255, 255, 0.4)'
                }}
                className="back-btn-hover"
              >
                <Heart size={16} fill={liked ? '#fff' : 'none'} />
                {liked ? 'Added to Saved' : 'Save Temple'}
              </button>
            </div>
          </div>

          <div style={detailStyles.headerText}>
            <h1 style={detailStyles.title}>{temple.name}</h1>
            <div style={detailStyles.metaRow}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={16} color="var(--saffron)" />
                {temple.city}, {temple.state} ({temple.region} India)
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Compass size={16} color="var(--gold)" />
                {temple.architectureStyle.split(' (')[0]}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px' }}>
                <Star size={14} fill="var(--gold)" stroke="var(--gold)" />
                {temple.rating.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.id === 'notes' && <MessageSquare size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div style={detailStyles.mainContent} className="detail-view-layout">
        <div className="detail-main-left">
          {/* Tab 1: Overview & History */}
          {activeTab === 'overview' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Historical Significance</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                {temple.history}
              </p>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Architectural Legacy</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                The temple stands as a primary monument of the <strong>{temple.architectureStyle}</strong>. Its structural style showcases detailed calculations, rock cutting, and placement layout patterns typical of the <strong>{temple.heritageStatus}</strong> era of heritage construction.
              </p>

              <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Deity and Worship</h3>
              <div style={{ display: 'flex', gap: '16px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--saffron)', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ color: 'var(--saffron)', fontSize: '1.1rem', marginBottom: '4px' }}>Principal Deity: {temple.deity}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Highly revered by millions of devotees, the sanctum holds deep religious rituals and cultural worship routines designed around the deity's significance in Vedic philosophy.
                  </p>
                </div>
              </div>

              {/* Image Gallery */}
              {temple.gallery && temple.gallery.length > 0 && (
                <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.25rem', fontFamily: 'var(--font-title)' }}>Photo Gallery</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    {temple.gallery.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="gallery-img-container"
                        style={{
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          height: '140px',
                          cursor: 'pointer',
                          position: 'relative',
                          border: '1px solid var(--border-color)',
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setSelectedGalleryImage(imgUrl)}
                      >
                        <img
                          src={getImageUrl(imgUrl)}
                          alt={`${temple.name} Gallery View ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                          className="gallery-thumbnail"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}
                          className="gallery-overlay"
                        >
                          View Large
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: 3D Streets & Views */}
          {activeTab === 'threedview' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                3D Streets & Views Exploration
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Explore the sacred geographic environment of <strong>{temple.name}</strong>. Toggle between 360° street views, 3D satellite maps, or an interactive architectural 3D wireframe model.
              </p>

              {/* Mode Toggle Buttons */}
              <div className="threed-toggle-row" style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
                <button
                  type="button"
                  onClick={() => setThreedMode('streetview')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid ' + (threedMode === 'streetview' ? 'var(--saffron)' : 'var(--border-color)'),
                    background: threedMode === 'streetview' ? 'rgba(255, 111, 60, 0.08)' : 'transparent',
                    color: threedMode === 'streetview' ? 'var(--saffron)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  360° Street View / Photo Sphere
                </button>
                <button
                  type="button"
                  onClick={() => setThreedMode('satellite')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid ' + (threedMode === 'satellite' ? 'var(--saffron)' : 'var(--border-color)'),
                    background: threedMode === 'satellite' ? 'rgba(255, 111, 60, 0.08)' : 'transparent',
                    color: threedMode === 'satellite' ? 'var(--saffron)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  3D Satellite & Drone Map
                </button>
                <button
                  type="button"
                  onClick={() => setThreedMode('wireframe')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid ' + (threedMode === 'wireframe' ? 'var(--saffron)' : 'var(--border-color)'),
                    background: threedMode === 'wireframe' ? 'rgba(255, 111, 60, 0.08)' : 'transparent',
                    color: threedMode === 'wireframe' ? 'var(--saffron)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Interactive 3D Architectural Model
                </button>
              </div>

              {/* View Content area */}
              <div style={{ minHeight: '400px' }}>
                {threedMode === 'streetview' && (
                  <div style={{ animation: 'fade-in 0.3s ease' }}>
                    {/* Action buttons row */}
                    <div className="threed-action-row" style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <a
                        href={`https://www.google.com/maps/@${temple.mapCoords?.lat || 28.6139},${temple.mapCoords?.lng || 77.2090},3a,75y,0h,90t/data=!3m1!1e1`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '10px 18px', borderRadius: 'var(--radius-sm)',
                          background: 'linear-gradient(135deg, #FF6F3C, #E53935)',
                          color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                          textDecoration: 'none', boxShadow: '0 4px 12px rgba(255,111,60,0.35)',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,111,60,0.5)'; }}
                        onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,111,60,0.35)'; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                        Open 360° Street View in Google Maps
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords?.lat || 28.6139},${temple.mapCoords?.lng || 77.2090},17z`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '10px 18px', borderRadius: 'var(--radius-sm)',
                          background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
                          color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                          textDecoration: 'none', boxShadow: '0 4px 12px rgba(26,115,232,0.35)',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,115,232,0.5)'; }}
                        onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,115,232,0.35)'; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        View Temple on Google Maps
                      </a>
                    </div>

                    {/* Embedded Street View iframe */}
                    <div style={{ position: 'relative', width: '100%', height: '430px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <iframe
                        src={`https://maps.google.com/maps?q=&layer=c&cbll=${temple.mapCoords?.lat || 28.6139},${temple.mapCoords?.lng || 77.2090}&cbp=11,0,0,0,0&z=14&output=embed&hl=en`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title={`${temple.name} 360° Street View`}
                      />
                    </div>

                    <div style={{ marginTop: '12px', background: 'rgba(212, 163, 89, 0.05)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--gold)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      🌐 <strong>How to use:</strong> Click <em>"Open 360° Street View"</em> above to directly jump to this temple's location in Google Maps with panoramic Street View enabled. Drag the orange Pegman icon on the map to any blue-highlighted road to enter Street View. Coverage within the temple inner sanctum is sometimes limited to entrance areas.
                    </div>
                  </div>
                )}

                {threedMode === 'satellite' && (
                  <div style={{ animation: 'fade-in 0.3s ease' }}>
                    {/* Action buttons row */}
                    <div className="threed-action-row" style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords?.lat || 28.6139},${temple.mapCoords?.lng || 77.2090},18z/data=!3m1!1e3`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '10px 18px', borderRadius: 'var(--radius-sm)',
                          background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
                          color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                          textDecoration: 'none', boxShadow: '0 4px 12px rgba(46,125,50,0.35)',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(46,125,50,0.5)'; }}
                        onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 12px rgba(46,125,50,0.35)'; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        Open Satellite View in Google Maps
                      </a>
                      <a
                        href={`https://earth.google.com/web/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords?.lat || 28.6139},${temple.mapCoords?.lng || 77.2090},500a,800d,35y,0h,45t,0r`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '10px 18px', borderRadius: 'var(--radius-sm)',
                          background: 'linear-gradient(135deg, #4a148c, #311b92)',
                          color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                          textDecoration: 'none', boxShadow: '0 4px 12px rgba(74,20,140,0.35)',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(74,20,140,0.5)'; }}
                        onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 12px rgba(74,20,140,0.35)'; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Open in Google Earth 3D
                      </a>
                    </div>

                    {/* Satellite map embed */}
                    <div style={{ position: 'relative', width: '100%', height: '430px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <iframe
                        src={`https://maps.google.com/maps?q=${temple.mapCoords?.lat || 28.6139},${temple.mapCoords?.lng || 77.2090}&t=k&z=18&output=embed&hl=en`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title={`${temple.name} Satellite Map`}
                      />
                    </div>
                    <div style={{ marginTop: '12px', background: 'rgba(212, 163, 89, 0.05)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--gold)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      🛰️ <strong>Satellite & 3D View:</strong> Click <em>"Open Satellite View"</em> to see a high-resolution aerial view of this exact temple location. Click <em>"Open in Google Earth 3D"</em> for a full 3D tilted aerial flyover of the temple complex from Google Earth.
                    </div>
                  </div>
                )}

                {threedMode === 'wireframe' && (
                  <div style={{ animation: 'fade-in 0.3s ease' }}>
                    <Temple3DViewer styleName={temple.architectureStyle} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Rituals & Timings */}
          {activeTab === 'timings' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Darshan Timings</h2>
              
              <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={36} color="var(--saffron)" />
                  <div>
                    <h4 style={{ margin: 0 }}>Morning Slots</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{temple.darshanTimings.morning}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={36} color="var(--gold)" />
                  <div>
                    <h4 style={{ margin: 0 }}>Evening Slots</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      {temple.darshanTimings.evening || 'Closed for general worship'}
                    </span>
                  </div>
                </div>
              </div>

              {temple.darshanTimings.aarti && temple.darshanTimings.aarti.length > 0 && (
                <>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Pooja & Aarti Calendar</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {temple.darshanTimings.aarti.map((a, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontWeight: 600 }}>{a.name}</span>
                        <span style={{ color: 'var(--saffron)', fontWeight: 700 }}>{a.time}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Important Daily Rituals</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                {temple.rituals.map((ritual, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{ritual}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 3: Visitor Guidelines */}
          {activeTab === 'guidelines' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Visitor Rules & Dress Code</h2>

              <div style={{ background: 'rgba(255, 111, 60, 0.08)', border: '1px solid var(--saffron)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <ShieldCheck size={24} color="var(--saffron)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: 'var(--saffron)', margin: '0 0 4px 0' }}>Dress Code Policy</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{temple.guidelines.dressCode}</p>
                </div>
              </div>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Guidelines & Code of Conduct</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {temple.guidelines.rules.map((rule, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', marginTop: '8px', flexShrink: 0 }}></span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{rule}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem', color: 'var(--danger)' }}>Restrictions & Travel Precautions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {temple.guidelines.restrictions.map((restriction, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(211, 47, 47, 0.05)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <AlertTriangle size={16} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{restriction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Travel & Facilities */}
          {activeTab === 'facilities' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Pilgrimage Facilities</h2>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>How to Reach</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {temple.facilities.transport.map((trans, idx) => (
                  <div key={idx} style={{ padding: '12px 16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    {trans}
                  </div>
                ))}
              </div>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Accommodation & Utilities</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                {temple.facilities.details}
              </p>
            </div>
          )}

          {/* Tab 5: Visitor Notes & Review module */}
          {activeTab === 'notes' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Visitor Notes & Feedback</h2>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} style={{ marginBottom: '30px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Add your Pilgrimage Note</h3>
                
                <div className="grid-2" style={{ marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Rahul Verma"
                      required
                      value={newNote.name}
                      onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Rating (1 to 5 Stars)</label>
                    <select
                      className="form-control"
                      value={newNote.rating}
                      onChange={(e) => setNewNote({ ...newNote, rating: Number(e.target.value) })}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review / Experience Notes</label>
                  <textarea
                    className="form-control"
                    placeholder="Share tips about timing, lines, dress code compliance, or special pooja experiences..."
                    required
                    value={newNote.text}
                    onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit Note</button>
              </form>

              {/* Notes List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notes.map((n, index) => (
                  <div key={index} style={{ padding: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700 }}>{n.name}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{n.date}</span>
                    </div>
                    <div style={{ color: 'var(--gold)', marginBottom: '8px', fontSize: '0.85rem' }}>
                      {Array.from({ length: n.rating }).map((_, i) => '★').join('')}
                      {Array.from({ length: 5 - n.rating }).map((_, i) => '☆').join('')}
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Live Darshan */}
          {activeTab === 'live' && (() => {
            const liveData = {
              'kedarnath':         { channelId: 'UCo7ySBVcITFzEeH0LVCHiqg', searchQuery: 'Kedarnath Temple Live Darshan', videos: ['Kedarnath Live Aarti'] },
              'kashi-vishwanath':  { channelId: 'UC0oeVQpQ8ERd5yw7vXGS08A', searchQuery: 'Kashi Vishwanath Ganga Aarti Live', videos: ['Kashi Vishwanath Mangala Aarti Live'] },
              'tirupati-balaji':   { channelId: 'UCVtBpgpNNuBMOCvvlvS5jSw', searchQuery: 'Tirupati Balaji Live Darshan TTD', videos: ['TTD Tirupati Live Suprabhata Seva'] },
              'meenakshi-amman':   { channelId: 'UCJbCmXbCK3S26aAhc1zSwJw', searchQuery: 'Meenakshi Amman Temple Live Pooja Madurai', videos: ['Meenakshi Amman Live Abhishekam'] },
              'jagannath-puri':    { channelId: 'UCVILZRiJHPxQfStiobwBtGA', searchQuery: 'Jagannath Puri Temple Live Aarti', videos: ['Jagannath Puri Live Mangala Alati'] },
              'golden-temple':     { channelId: 'UCQEqwnFmCE4GqwFyKUbZf_g', searchQuery: 'Golden Temple Amritsar Live Kirtan SGPC', videos: ['Golden Temple Live Gurbani Kirtan'] },
              'somnath-temple':    { channelId: 'UCbxq4oC5Mbl-jzOXzMqpPow', searchQuery: 'Somnath Temple Live Aarti Gujarat', videos: ['Somnath Live Sandhya Aarti'] },
              'badrinath':         { channelId: 'UCo7ySBVcITFzEeH0LVCHiqg', searchQuery: 'Badrinath Temple Live Aarti Darshan', videos: ['Badrinath Live Shayan Aarti'] },
              'mahakaleshwar':     { channelId: 'UCvtldmJUWuNa5TpxSnMhH2Q', searchQuery: 'Mahakaleshwar Ujjain Bhasma Aarti Live', videos: ['Mahakaleshwar Bhasma Aarti Live'] },
              'dwarkadhish':       { channelId: 'UCbxq4oC5Mbl-jzOXzMqpPow', searchQuery: 'Dwarkadhish Temple Dwarka Live Aarti', videos: ['Dwarkadhish Mangala Aarti Live'] },
              'brihadeeswarar-temple': { channelId: 'UCJbCmXbCK3S26aAhc1zSwJw', searchQuery: 'Brihadeeswarar Temple Thanjavur Live', videos: ['Brihadeeswarar Live Abhishekam'] },
              'ramanathaswamy':    { channelId: 'UCJbCmXbCK3S26aAhc1zSwJw', searchQuery: 'Ramanathaswamy Temple Rameswaram Live', videos: ['Ramanathaswamy Live Darshan'] },
              'padmanabhaswamy':   { channelId: 'UCJbCmXbCK3S26aAhc1zSwJw', searchQuery: 'Padmanabhaswamy Temple Live Thiruvananthapuram', videos: ['Padmanabhaswamy Aarti Live'] },
              'kamakhya':          { channelId: 'UCVtBpgpNNuBMOCvvlvS5jSw', searchQuery: 'Kamakhya Temple Live Aarti Guwahati', videos: ['Kamakhya Devi Live Aarti'] },
              'siddhivinayak':     { channelId: 'UCVtBpgpNNuBMOCvvlvS5jSw', searchQuery: 'Siddhivinayak Temple Mumbai Live Darshan', videos: ['Siddhivinayak Live Aarti Mumbai'] },
              'dakshineswar-kali': { channelId: 'UCVILZRiJHPxQfStiobwBtGA', searchQuery: 'Dakshineswar Kali Temple Live Kolkata', videos: ['Dakshineswar Kali Aarti Live'] },
              'vaishno-devi':      { channelId: 'UCo7ySBVcITFzEeH0LVCHiqg', searchQuery: 'Vaishno Devi Katra Live Darshan Aarti', videos: ['Vaishno Devi Live Aarti'] },
              'virupaksha':        { channelId: 'UCJbCmXbCK3S26aAhc1zSwJw', searchQuery: 'Virupaksha Temple Hampi Live', videos: ['Virupaksha Hampi Live Darshan'] },
              'ramappa-temple':    { channelId: 'UCJbCmXbCK3S26aAhc1zSwJw', searchQuery: 'Ramappa Temple Telangana Live UNESCO', videos: ['Ramappa Temple Live Darshan'] },
              'mahabodhi-temple':  { channelId: 'UCVILZRiJHPxQfStiobwBtGA', searchQuery: 'Mahabodhi Temple Bodh Gaya Live Buddha Puja', videos: ['Mahabodhi Temple Live Prayer'] },
              'sun-temple-konark': { channelId: 'UCVILZRiJHPxQfStiobwBtGA', searchQuery: 'Konark Sun Temple Live Sound Light Show', videos: ['Konark Sound Light Show Live'] },
              'kandariya-mahadeva':{ channelId: 'UCVILZRiJHPxQfStiobwBtGA', searchQuery: 'Khajuraho Kandariya Mahadeva Temple Live', videos: ['Khajuraho Live Dance Festival'] },
              'dilwara-temples':   { channelId: 'UCbxq4oC5Mbl-jzOXzMqpPow', searchQuery: 'Dilwara Jain Temple Mount Abu Live', videos: ['Dilwara Temples Live Darshan'] },
            };
            const info = liveData[temple.id] || { searchQuery: `${temple.name} Live Darshan Aarti`, videos: [`${temple.name} Live`] };
            const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.searchQuery)}&sp=EgJAAQ%253D%253D`;
            const ytEmbedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(info.searchQuery)}&autoplay=0`;

            return (
              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <span className="live-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#e53935', display: 'inline-block', flexShrink: 0 }} />
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-title)' }}>Live Darshan — {temple.name}</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
                  Watch live temple broadcasts, morning/evening Aarti, and sacred pooja ceremonies streamed directly from the temple premises.
                </p>

                {/* Embedded YouTube Search Player */}
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '2px solid var(--border-color)', marginBottom: '28px', background: '#000', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(229,57,53,0.9)', padding: '4px 10px', borderRadius: '20px' }}>
                    <span className="live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                    <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em' }}>LIVE / LATEST</span>
                  </div>
                  <iframe
                    width="100%"
                    height="420"
                    src={ytEmbedUrl}
                    title={`${temple.name} Live Darshan`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: 'block' }}
                  />
                </div>

                {/* Aarti Schedule */}
                {temple.darshanTimings?.aarti?.length > 0 && (
                  <div style={{ marginBottom: '28px' }}>
                    <h3 style={{ marginBottom: '14px', fontSize: '1.1rem', fontFamily: 'var(--font-title)' }}>🪔 Today's Aarti & Pooja Schedule</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                      {temple.darshanTimings.aarti.map((a, i) => {
                        const [h, m] = a.time.split(':').map(Number);
                        const now = new Date();
                        const aartiDate = new Date();
                        aartiDate.setHours(h, m, 0, 0);
                        const diffMs = aartiDate - now;
                        const isPast = diffMs < 0;
                        const diffMins = Math.abs(Math.floor(diffMs / 60000));
                        const hoursLeft = Math.floor(diffMins / 60);
                        const minsLeft = diffMins % 60;
                        const isNext = !isPast && diffMins < 90;
                        return (
                          <div key={i} style={{
                            padding: '14px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${isNext ? 'var(--saffron)' : 'var(--border-color)'}`,
                            background: isNext ? 'rgba(255,111,60,0.06)' : 'var(--bg-primary)',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            {isNext && (
                              <span style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--saffron)', background: 'rgba(255,111,60,0.15)', padding: '2px 7px', borderRadius: '10px' }}>NEXT</span>
                            )}
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>{a.name}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: isPast ? 'var(--text-muted)' : 'var(--gold)', fontFamily: 'var(--font-title)' }}>{a.time}</div>
                            <div style={{ fontSize: '0.8rem', marginTop: '4px', color: isPast ? 'var(--text-muted)' : 'var(--saffron)' }}>
                              {isPast ? `Ended ${hoursLeft > 0 ? hoursLeft + 'h ' : ''}${minsLeft}m ago` : `In ${hoursLeft > 0 ? hoursLeft + 'h ' : ''}${minsLeft}m`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* YouTube Search Link */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={ytSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                      background: 'linear-gradient(135deg, #c62828, #e53935)',
                      color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                      boxShadow: '0 4px 14px rgba(229,57,53,0.35)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = ''; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                    Search Live on YouTube
                  </a>
                  <a
                    href={`https://www.youtube.com/@${temple.name.replace(/\s+/g, '').toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                      border: '1px solid var(--border-color)', background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem',
                      transition: 'transform 0.2s, border-color 0.2s'
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--saffron)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    🔔 Subscribe for Aarti Alerts
                  </a>
                </div>

                <p style={{ marginTop: '18px', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  💡 <strong>Tip:</strong> For the best experience, watch live around the scheduled Aarti timings listed above. Many temples broadcast their morning Abhishekam and evening Aarti live on YouTube and their official websites.
                </p>
              </div>
            );
          })()}
        </div>


        {/* Sidebar Info Card */}
        <div className="detail-sidebar">
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '14px' }}>Quick Info</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Main Deity</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.deity}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>State / Region</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.state} ({temple.region})</p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Architecture Era</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.heritageStatus}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Style Classification</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.architectureStyle}</p>
              </div>

              {temple.facilities.accommodation && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '6px', color: 'var(--success)' }}>
                  <ShieldCheck size={16} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Visitor Lodging Available</span>
                </div>
              )}
            </div>

            {temple.website && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href={temple.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary animate-pulse-ring"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    textDecoration: 'none',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <Globe size={16} /> Visit Official Website
                </a>
              </div>
            )}

            {/* Google Maps + Google Earth sidebar buttons */}
            {temple.mapCoords && (
              <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords.lat},${temple.mapCoords.lng},17z`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '9px 12px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
                    color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                    boxShadow: '0 3px 10px rgba(26,115,232,0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(26,115,232,0.45)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 10px rgba(26,115,232,0.3)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  View on Google Maps
                </a>
                <a
                  href={`https://earth.google.com/web/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords.lat},${temple.mapCoords.lng},500a,800d,35y,0h,45t,0r`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '9px 12px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
                    color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                    boxShadow: '0 3px 10px rgba(46,125,50,0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(46,125,50,0.45)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 10px rgba(46,125,50,0.3)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Open in Google Earth 3D
                </a>
                <a
                  href={`https://www.google.com/maps/@${temple.mapCoords.lat},${temple.mapCoords.lng},3a,75y,0h,90t/data=!3m1!1e1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '9px 12px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #bf360c, #e53935)',
                    color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                    boxShadow: '0 3px 10px rgba(191,54,12,0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(191,54,12,0.45)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 10px rgba(191,54,12,0.3)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                  360° Street View
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedGalleryImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(5px)',
            animation: 'fade-in 0.25s ease'
          }}
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
              background: '#000',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(selectedGalleryImage)}
              alt="Temple Gallery Zoomed View"
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain'
              }}
            />
            <button
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onClick={() => setSelectedGalleryImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        .back-btn-hover:hover {
          background: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-1px);
        }
        .gallery-img-container:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .gallery-img-container:hover .gallery-thumbnail {
          transform: scale(1.12);
        }
        .gallery-img-container:hover .gallery-overlay {
          opacity: 1 !important;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        .live-dot { animation: live-pulse 1.4s ease-in-out infinite; }
        .live-channel-card:hover {
          border-color: var(--saffron) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        @media (max-width: 768px) {
          .detail-view-layout, .threed-viewer-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .threed-toggle-row {
            flex-direction: column !important;
          }
          .threed-action-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .threed-action-row a {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
