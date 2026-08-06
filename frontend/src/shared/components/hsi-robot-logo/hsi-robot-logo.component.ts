import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

/**
 * HsiRobotLogoComponent
 * ----------------------
 * Mini robot animado (SVG) del asistente de soporte HSI.
 *
 * Optimización de recursos:
 *  - Todas las animaciones "ambientales" (levitación, balanceo, balanceo 3D,
 *    antena, brillo, aura, parpadeo y entrada) son 100% CSS: corren en el
 *    compositor del navegador (GPU) y NO disparan detección de cambios.
 *  - El seguimiento del mouse se registra con `runOutsideAngular` + un único
 *    `requestAnimationFrame` por frame, y escribe directo en el DOM. Así el
 *    movimiento del cursor NO ejecuta change detection en cada píxel.
 *  - Listeners `passive` y limpieza en OnDestroy.
 *  - Respeta `prefers-reduced-motion` (ver .scss) desactivando animaciones.
 *
 * Uso:
 *   <hsi-robot-logo size="230px"></hsi-robot-logo>
 *   <hsi-robot-logo size="40px" [followMouse]="false"></hsi-robot-logo>
 */
@Component({
  selector: 'hsi-robot-logo',
  standalone: true,
  templateUrl: './hsi-robot-logo.component.html',
  styleUrl: './hsi-robot-logo.component.scss',
})
export class HsiRobotLogoComponent implements OnInit, OnDestroy {
  /** Tamaño (ancho = alto). Cualquier unidad CSS. */
  @Input() size = '230px';

  /** Si es false, los ojos quedan centrados y no escuchan el mouse (0 costo). */
  @Input() followMouse = true;

  @ViewChild('wrap', { static: true }) wrap!: ElementRef<HTMLDivElement>;
  @ViewChild('eyeL', { static: true }) eyeL!: ElementRef<SVGEllipseElement>;
  @ViewChild('eyeR', { static: true }) eyeR!: ElementRef<SVGEllipseElement>;

  private readonly maxEyeOffset = 12;
  private rafId = 0;
  private pointerHandler?: (e: PointerEvent) => void;

  constructor(private readonly zone: NgZone) {}

  ngOnInit(): void {
    if (!this.followMouse) {
      return;
    }
    // No animamos si el usuario pidió reducir movimiento.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      return;
    }

    // Fuera de la zona de Angular: el mousemove no gatilla change detection.
    this.zone.runOutsideAngular(() => {
      this.pointerHandler = (e: PointerEvent) => this.onPointerMove(e);
      window.addEventListener('pointermove', this.pointerHandler, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (this.pointerHandler) {
      window.removeEventListener('pointermove', this.pointerHandler);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private onPointerMove(e: PointerEvent): void {
    // Coalescemos a un solo update por frame de pintado.
    if (this.rafId) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      const el = this.wrap?.nativeElement;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) {
        return;
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = (e.clientX - cx) / (rect.width / 2);
      let dy = (e.clientY - cy) / (rect.height / 2);
      const hypot = Math.hypot(dx, dy);
      if (hypot > 0) {
        const dist = Math.min(1, hypot);
        dx = (dx / hypot) * dist;
        dy = (dy / hypot) * dist;
      }
      const ox = dx * this.maxEyeOffset;
      const oy = dy * this.maxEyeOffset;
      this.eyeL.nativeElement.setAttribute('cx', String(196 + ox));
      this.eyeL.nativeElement.setAttribute('cy', String(228 + oy));
      this.eyeR.nativeElement.setAttribute('cx', String(286 + ox));
      this.eyeR.nativeElement.setAttribute('cy', String(222 + oy));
    });
  }
}
