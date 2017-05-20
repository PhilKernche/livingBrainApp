import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Result } from './result';

@NgModule({
  declarations: [
    Result,
  ],
  imports: [
    IonicPageModule.forChild(Result),
  ],
  exports: [
    Result
  ]
})
export class ResultModule {}
