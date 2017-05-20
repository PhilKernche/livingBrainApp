import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { Home } from '../home/home'
import { Statistics } from '../statistics/statistics'
import { Profile } from '../profile/profile'

@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {

  tab1Root: any = Home
  tab2Root: any = Statistics
  tab3Root: any = Profile

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
