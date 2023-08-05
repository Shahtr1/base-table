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

export function toCamelCase(input: string): string {
  const words = input.split('_');
  const camelCaseWords = words.map((word, index) =>
    index === 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return camelCaseWords.join('');
}
