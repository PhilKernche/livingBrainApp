import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Training1 } from './training1';

@NgModule({
  declarations: [
    Training1,
  ],
  imports: [
    IonicPageModule.forChild(Training1),
  ],
  exports: [
    Training1
  ]
})
export class Training1Module {}
