import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'domSecurity'
})
export class DomSecurityPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(url: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
