import { Subject } from 'rxjs';
import { DestroyRef, inject } from '@angular/core';

export function destroy() {
  const destroy = new Subject<void>();
  inject(DestroyRef).onDestroy(() => {
    destroy.next();
    destroy.complete();
    console.log(`Cleaning up...`);
  });
  return destroy;
}
