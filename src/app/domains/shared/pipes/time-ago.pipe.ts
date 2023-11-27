import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const date = new Date(value);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: es,
    });
  }
}
