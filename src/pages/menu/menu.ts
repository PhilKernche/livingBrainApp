import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { Training1 } from '../training1/training1'
import { Training1Voice } from '../training1voice/training1voice'
import { Training2 } from '../training2/training2'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  isVoice: boolean


  trainingId: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trainingId = this.navParams.data.TrainingId

    console.log(parseInt(JSON.parse(localStorage.getItem("patient")).EntryType))
    if (parseInt(JSON.parse(localStorage.getItem("patient")).EntryType) === 0) {
      this.isVoice = true
    } else {
      this.isVoice = false
    }

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

  training1Tap() {
    if (this.isVoice) {
      this.navCtrl.push(Training1Voice, { TrainingId: this.trainingId })
    } else {
      this.navCtrl.push(Training1, { TrainingId: this.trainingId })
    }
  }

  training2Tap() {
    this.navCtrl.push(Training2, { TrainingId: this.trainingId })
  }

}
