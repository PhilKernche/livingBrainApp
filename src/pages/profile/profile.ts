import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { Http } from '@angular/http'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  firstStart: boolean

  patient: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    let patient = JSON.parse(localStorage.getItem("patient"))
    if (patient) {
      this.patient = patient
      return
    }

    this.http.get('http://livingbrainapi20170520043518.azurewebsites.net/api/patients/new')
      .map((res) => res.json())
      .subscribe((res) => {
        this.patient = res 
        console.log(this.patient)
      })

    let firstStart = localStorage.getItem("firstStart")

    if (!firstStart) {
      this.firstStart = true
    } else {
      this.firstStart = false
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  submit(shouldReturn = false) {
    console.log("test")
    this.http.put('http://livingbrainapi20170520043518.azurewebsites.net/api/patients/' + this.patient.Id,
     this.patient
    )
    .subscribe(res => {
      localStorage.setItem("firstStart", "false")
      localStorage.setItem("patient", JSON.stringify(this.patient))
      if (shouldReturn)
        this.navCtrl.popToRoot()
    }, (err) => {
      console.error(err)
    })
  }

  profileValid(): boolean {
    return true
  }

}
