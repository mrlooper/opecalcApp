import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BPToolbarComponent } from './bptoolbar/bptoolbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BPToolbarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BPToolbarComponent]
})
export class ComponentsModule { }
