import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'

import { Menu } from '../menu/menu'

import { Http } from '@angular/http'

@Component({
  selector: 'page-questionnaire',
  templateUrl: 'questionnaire.html',
})
export class Questionnaire {

  questionsModel: any

  questions: any[] = [
    {
      question: 'How did you sleep?',
      answerLow: 'rather bad',
      answerHigh: 'rather good'
    },
    {
      question: 'How well do you feel now?',
      answerLow: 'rather bad',
      answerHigh: 'rather well'
    },
    {
      question: 'How fit do you feel?',
      answerLow: 'rather bad',
      answerHigh: 'rather good'
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.questionsModel = new Array(this.questions.length)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Questionnaire');
  }

  startTrainingClicked() {
    if (!this.questionsValid())
      return
    this.http.post('http://livingbrainapi20170520043518.azurewebsites.net/api/trainings', 
    {
      PatientId: JSON.parse(localStorage.getItem("patient")).Id,
      Started: new Date(),
      QuestionOne: this.questionsModel[0],
      QuestionTwo: this.questionsModel[1],
      QuestionThree: this.questionsModel[2]
    }).map(res => res.json())
    .map(res => res.Id)
    .subscribe(res => this.navCtrl.push(Menu, {TrainingId: res}))

    
  }
  questionsValid(): boolean {
    return true
    /*
    for (let question of this.questionsModel) {
      if (!question)
        return false
    }
    return true
    */
  }

}
