import { Component, ViewChild }     from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { Observable, Subscription } from 'rxjs/Rx'

import { Chart, ChartComponent } from 'ng2-chartjs2'
import {Home} from '../home/home'

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class Result {

  //used to indicate the current progress (current Training, total num of trainings)
  private trainingNum: number
  private trainingSum: number

  //the score that the user got in the last training
  score: number
  rightScore: number = 0
  falseScore: number = 0
  trainingName: string

  //helper variable for the ui
  currentScore: number = 0
  timerSub: Subscription

  labels: string[] = ['5w', '4w', '3w', '2w', '1w', 'today'];
  data: Chart.Dataset[] = [
    {
      label: 'past weeks',
      data: [0, 0, 0, 0, 0, 0],

      backgroundColor: [
        'rgba(38, 185, 154, 1)'
      ]
    }
  ]

  @ViewChild('mChart') mChart: ChartComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.trainingSum = this.navParams.data.trainingSum;
    this.trainingNum = this.navParams.data.trainingNum;

    this.score = this.navParams.data.score * 5
    this.rightScore = this.navParams.data.rightScore
    this.falseScore = this.navParams.data.falseScore
    this.trainingName = this.navParams.data.trainingName

console.log(this.rightScore, this.falseScore)


    //update the chart to show the right score
    this.data[0].data[5] = this.score
    this.mChart.update()

    let timer = Observable.timer(0, 2000 / this.score)
    this.timerSub = timer.subscribe(() => {
      this.timerTick()
    })
  }

  timerTick() {
    if (this.currentScore < this.score) {
      this.currentScore += 5
    }
    else {
      this.timerSub.unsubscribe()
    }
  }

  nextTrainingClicked() {
    this.navCtrl.push(Home) 
  }
}
