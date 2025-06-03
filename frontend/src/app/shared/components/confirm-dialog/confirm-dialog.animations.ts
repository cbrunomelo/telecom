import { trigger, transition, style, animate } from '@angular/animations';

export const dialogAnimation = trigger('dialogAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('200ms ease-out', 
      style({ opacity: 1, transform: 'scale(1)' })
    )
  ])
]); 