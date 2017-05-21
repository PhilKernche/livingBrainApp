import { Component, ViewChild } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { Chart, ChartComponent } from 'ng2-chartjs2'

import { Questionnaire } from '../questionnaire/questionnaire'

import { Profile } from '../profile/profile'

import { Http } from '@angular/http'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  labels: string[] = []
  data: Chart.Dataset[] = [
    {
      label: "",
      data: [],
      backgroundColor: [
        'rgba(190, 10, 30, 1)'
      ],
      borderColor: [
        'rgba(245, 150, 20, 1)'
      ]
    }
  ]

  @ViewChild('mChart') mChart: ChartComponent;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    let firstStart = localStorage.getItem("firstStart")

    if (!firstStart) {
      this.navCtrl.push(Profile)
    } else {
      this.data[0].label = "Patient: " + JSON.parse(localStorage.getItem("patient")).Id
      let patientId = JSON.parse(localStorage.getItem("patient")).Id
      this.http.get("http://livingbrainapi20170520043518.azurewebsites.net/api/patients/" + patientId + "/scores")
        .map(res => res.json())
        .subscribe((res: Array<any>) => {
          res.forEach((entry) => {
            this.labels.push((new Date()).toLocaleDateString())
            this.data[0].data.push(entry.score)
            this.mChart.update()
          })
        })

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

  startClicked() {
    this.navCtrl.push(Questionnaire)
  }
}
