import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Questionnaire } from './questionnaire';

@NgModule({
  declarations: [
    Questionnaire,
  ],
  imports: [
    IonicPageModule.forChild(Questionnaire),
  ],
  exports: [
    Questionnaire
  ]
})
export class QuestionnaireModule {}
