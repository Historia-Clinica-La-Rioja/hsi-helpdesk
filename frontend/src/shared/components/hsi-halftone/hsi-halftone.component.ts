import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

/**
 * HsiHalftoneComponent
 * --------------------
 * Fondo animado tipo "halftone" (oleaje de puntos muy sutil) sobre un <canvas>.
 *
 * Optimización de recursos:
 *  - Todo el loop corre con `NgZone.runOutsideAngular` => nunca dispara change detection.
 *  - Se limita a ~30 FPS (suficiente para un movimiento tan lento) en vez de 60.
 *  - Se dibujan TODOS los puntos en un solo `path` + un único `fill()` por frame.
 *  - Los puntos fuera de la banda del oleaje se descartan antes de dibujarse.
 *  - Se pausa al ocultar la pestaña (visibilitychange) y al hacer scroll fuera de vista
 *    no aplica (es fondo fijo). Respeta `prefers-reduced-motion` (dibuja 1 frame estático).
 *  - `devicePixelRatio` acotado a 1: los puntos son suaves a propósito, no necesitan retina.
 *
 * Uso:  <hsi-halftone></hsi-halftone>   (posicionar con CSS: absolute; inset:0)
 */
@Component({
  selector: 'hsi-halftone',
  standalone: true,
  template: `<canvas #canvas class="hsi-halftone-canvas"></canvas>`,
  styles: [
    `:host { position: absolute; inset: 0; display: block; pointer-events: none; }
     .hsi-halftone-canvas { width: 100%; height: 100%; display: block; }`,
  ],
})
export class HsiHalftoneComponent implements AfterViewInit, OnDestroy {
  /** Separación entre puntos (px). Más grande = menos puntos = más barato. */
  @Input() spacing = 15;
  /** Radio máximo del punto (px). */
  @Input() maxRadius = 2.2;
  /** Color de los puntos. */
  @Input() color = '#8aa2ac';
  /** Opacidad global del fondo. */
  @Input() opacity = 0.6;
  /** Velocidad del oleaje (avance de fase por frame). */
  @Input() speed = 0.02;

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private t = 0;
  private last = 0;
  private rafId = 0;
  private readonly TAU = Math.PI * 2;

  private resizeHandler = () => this.resize();
  private visibilityHandler = () => this.onVisibility();

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.resize();

    window.addEventListener('resize', this.resizeHandler, { passive: true });
    document.addEventListener('visibilitychange', this.visibilityHandler);

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      this.draw(); // un solo frame estático
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame((ts) => this.loop(ts));
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  private onVisibility(): void {
    if (document.hidden) {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
      }
    } else if (!this.rafId) {
      this.zone.runOutsideAngular(() => {
        this.rafId = requestAnimationFrame((ts) => this.loop(ts));
      });
    }
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.width = Math.ceil(rect.width);
    this.height = Math.ceil(rect.height);
    canvas.width = this.width;
    canvas.height = this.height;
    if (this.rafId === 0) {
      this.draw(); // redibuja el frame estático si estábamos pausados / reduced-motion
    }
  }

  private loop(ts: number): void {
    this.rafId = requestAnimationFrame((n) => this.loop(n));
    if (ts - this.last < 33) {
      return; // ~30 FPS
    }
    this.last = ts;
    this.t += this.speed;
    this.draw();
  }

  private draw(): void {
    const { ctx, width: W, height: H, t, TAU } = this;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();

    const s = this.spacing;
    const maxR = this.maxRadius;
    const bandH = H * 0.26;

    for (let y = 0; y <= H; y += s) {
      for (let x = 0; x <= W; x += s) {
        // Banda diagonal ondulante donde "vive" el oleaje
        const yBand = H * 0.58 + Math.sin(x * 0.006 + t * 0.5) * H * 0.13 - x * 0.12;
        const env = Math.exp(-Math.pow((y - yBand) / bandH, 2));
        if (env < 0.04) {
          continue;
        }
        const wv =
          Math.sin(x * 0.01 + y * 0.004 + t) +
          0.6 * Math.sin(x * 0.004 - y * 0.011 + t * 0.8);
        const w01 = (wv + 1.6) / 3.2;
        const r = maxR * env * (0.3 + 0.7 * w01);
        if (r < 0.25) {
          continue;
        }
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }
    }
    ctx.fill();
  }
}
