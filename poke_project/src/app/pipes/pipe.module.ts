import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSecurityPipe } from './dom-security.pipe';



@NgModule({
  declarations: [
    DomSecurityPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    DomSecurityPipe
  ]
})
export class PipeModule { }
