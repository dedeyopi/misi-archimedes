import { useEffect, useRef } from 'react';
import type { Fluid } from '../types';
import { G } from '../constants';

export interface LabReadout {
  rhoObj: number;
  vSub: number;
  Fa: number;
  W: number;
  cond: 'Mengapung' | 'Melayang' | 'Tenggelam';
}

interface Props {
  mass: number;
  volume: number;
  color: string;
  fluid: Fluid;
  runId: number;              // increment to trigger a drop
  onReadout: (r: LabReadout) => void;
}

const W = 640, H = 440, dpr = Math.min(window.devicePixelRatio || 1, 2);
const PPM = 560;
const WATER_Y = 150;
const BOTTOM_Y = 420;
const TANK = { x: 60, y: 34, w: 520, h: 388 };

export default function LabCanvas({ mass, volume, color, fluid, runId, onReadout }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physRef = useRef({ yTop: -0.16, v: 0, running: false, resting: false });
  const propsRef = useRef({ mass, volume, color, fluid });
  const onReadoutRef = useRef(onReadout);
  const lastEmitRef = useRef(0);

  // keep latest props/readout callback available to the animation loop
  propsRef.current = { mass, volume, color, fluid };
  onReadoutRef.current = onReadout;

  // reset vertical position when mass/volume change
  useEffect(() => {
    physRef.current.yTop = -0.16;
    physRef.current.v = 0;
    physRef.current.running = false;
    physRef.current.resting = false;
  }, [mass, volume]);

  // trigger a drop
  useEffect(() => {
    if (runId === 0) return;
    physRef.current.yTop = -0.16;
    physRef.current.v = 0;
    physRef.current.running = true;
    physRef.current.resting = false;
  }, [runId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W * dpr; canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf = 0;
    let last = 0;
    let acc = 0;

    const stepPhysics = (dt: number) => {
      const { mass, volume, fluid } = propsRef.current;
      const p = physRef.current;
      const L = Math.cbrt(volume);
      const submergedDepth = Math.max(0, Math.min(L, p.yTop + L));
      const frac = L > 0 ? submergedDepth / L : 0;
      const Vsub = volume * frac;
      const Fb = fluid.rho * G * Vsub;
      const Wt = mass * G;
      const a = (Wt - Fb) / mass;

      p.v += a * dt;
      const drag = frac > 0.02 ? 3.2 * frac : 0.1;
      p.v -= p.v * drag * dt;
      p.yTop += p.v * dt;

      const maxTop = (BOTTOM_Y - WATER_Y) / PPM - L;
      if (p.yTop >= maxTop) { p.yTop = maxTop; p.v = 0; p.resting = true; }
      else p.resting = false;
      if (p.yTop < -0.16) { p.yTop = -0.16; p.v = 0; }
    };

    const drawArrow = (x: number, y1: number, y2: number, c: string, label: string, dir: 'up' | 'down') => {
      ctx.save();
      ctx.strokeStyle = c; ctx.fillStyle = c;
      ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
      const head = 13;
      ctx.beginPath();
      if (dir === 'up') { ctx.moveTo(x, y2 - 4); ctx.lineTo(x - 11, y2 + head); ctx.lineTo(x + 11, y2 + head); }
      else { ctx.moveTo(x, y2 + 4); ctx.lineTo(x - 11, y2 - head); ctx.lineTo(x + 11, y2 - head); }
      ctx.closePath(); ctx.fill();
      ctx.font = '800 13px "Nunito Sans", sans-serif';
      ctx.textAlign = 'center'; ctx.fillStyle = c;
      ctx.fillText(label, x, dir === 'up' ? y2 - 20 : y2 + 30);
      ctx.restore();
    };

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const shade = (hex: string, amt: number) => {
      const n = parseInt(hex.slice(1), 16);
      let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
      r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
      return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    };

    const draw = () => {
      const { mass, volume, color: objColor, fluid } = propsRef.current;
      const p = physRef.current;
      const L = Math.cbrt(volume);
      const t = performance.now() / 1000;

      ctx.clearRect(0, 0, W, H);

      // tank
      roundRect(TANK.x, TANK.y, TANK.w, TANK.h, 18);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 4; ctx.stroke();

      // water
      const wx = TANK.x + 4, ww = TANK.w - 8;
      const wy = WATER_Y, wh = BOTTOM_Y - WATER_Y;
      const grad = ctx.createLinearGradient(0, wy, 0, BOTTOM_Y);
      grad.addColorStop(0, fluid.color + 'dd');
      grad.addColorStop(1, fluid.deep + 'ee');

      ctx.save();
      ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
      ctx.fillStyle = grad; ctx.fillRect(wx, wy, ww, wh);
      ctx.fillStyle = 'rgba(255,255,255,.35)';
      for (let i = 0; i < 7; i++) {
        const bx = wx + 40 + ((i * 97 + t * 18) % (ww - 70));
        const by = BOTTOM_Y - ((t * 24 + i * 63) % wh);
        ctx.beginPath(); ctx.arc(bx, by, 2.4 + (i % 3), 0, 7); ctx.fill();
      }
      ctx.restore();

      // surface waves
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      for (let x = 0; x <= ww; x += 8) ctx.lineTo(wx + x, wy + Math.sin(x / 46 + t * 1.7) * 3);
      ctx.lineTo(wx + ww, wy + 16); ctx.lineTo(wx, wy + 16); ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,.30)'; ctx.fill();
      ctx.restore();

      ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + ww, wy);
      ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2.5; ctx.stroke();

      ctx.font = '700 14px "Nunito Sans", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,.92)';
      ctx.textAlign = 'left';
      ctx.fillText(`${fluid.name} · ρ = ${fluid.rho} kg/m³`, wx + 14, BOTTOM_Y - 14);

      // object
      const sPx = L * PPM;
      const cx = 320;
      const topPy = WATER_Y + p.yTop * PPM;
      const x0 = cx - sPx / 2;

      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.22)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5;
      roundRect(x0, topPy, sPx, sPx, Math.min(9, sPx * 0.14));
      const og = ctx.createLinearGradient(x0, topPy, x0 + sPx, topPy + sPx);
      og.addColorStop(0, objColor); og.addColorStop(1, shade(objColor, -28));
      ctx.fillStyle = og; ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2;
      roundRect(x0, topPy, sPx, sPx, Math.min(9, sPx * 0.14)); ctx.stroke();

      // forces
      const submergedDepth = Math.max(0, Math.min(L, p.yTop + L));
      const frac = L > 0 ? submergedDepth / L : 0;
      const Vsub = volume * frac;
      const Fb = fluid.rho * G * Vsub;
      const Wt = mass * G;
      const maxF = Math.max(Fb, Wt, 0.5);
      const scale = 82 / maxF;
      const centerY = topPy + sPx / 2;

      if (Fb > 0.05) drawArrow(x0 - 26, centerY, centerY - Fb * scale, '#f59e0b', `Fₐ = ${Fb.toFixed(1)} N`, 'up');
      if (Wt > 0.05) drawArrow(x0 + sPx + 26, centerY, centerY + Wt * scale, '#ef4444', `w = ${Wt.toFixed(1)} N`, 'down');

      // emit readout (throttled)
      const now = performance.now();
      if (now - lastEmitRef.current > 100) {
        lastEmitRef.current = now;
        const rhoObj = mass / volume;
        let cond: LabReadout['cond'] = 'Mengapung';
        if (rhoObj > fluid.rho * 1.005) cond = 'Tenggelam';
        else if (Math.abs(rhoObj - fluid.rho) / fluid.rho < 0.005) cond = 'Melayang';
        onReadoutRef.current({ rhoObj, vSub: Vsub, Fa: Fb, W: Wt, cond });
      }
    };

    const loop = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      if (physRef.current.running) {
        acc += dt;
        const step = 1 / 240;
        let iter = 0;
        while (acc >= step && iter < 60) { stepPhysics(step); acc -= step; iter++; }
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="canvas-box">
      <canvas ref={canvasRef} aria-label="Simulasi benda di dalam fluida" />
    </div>
  );
}