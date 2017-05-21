import { Component } from '@angular/core'
import { NavController, NavParams, AlertController } from 'ionic-angular'
import { Observable, Subscription } from 'rxjs/Rx'
import { Score } from '../score/score'
import { Training2b } from '../training2b/training2b'


@Component({
  selector: 'page-training2',
  templateUrl: 'training2.html',
})
export class Training2 {

  //Specify how long the training will take and calculate the time
  timeNumber: number = 5
  initialTime: number = this.timeNumber
  minute = Math.floor(this.timeNumber / 60)
  seconds = this.timeNumber % 60
  time: string = this.minute + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)

  wordArray: Array<string>
  wordPool: Array<string>
  arrayTransmit: Array<string>

  timerSubscription: Subscription

  //last 5 seconds color of timer will be red
  timerRed: boolean = false



  //list of words, that were already entered
  timerPaused: boolean = false



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.wordArray = new Array()
    this.arrayTransmit = new Array()
    this.wordPool = ['push',
      'son',
      'increase',
      'space',
      'hands',
      'breath',
      'railway',
      'jewel',
      'wash',
      'payment',
      'position',
      'team',
      'step',
      'death',
      'cat',
      'liquid',
      'airplane',
      'knee',
      'channel',
      'shame',
      'river',
      'carriage',
      'wheel',
      'locket',
      'guide',
      'doctor',
      'mountain',
      'bells',
      'ship',
      'copper',
      'offer',
      'wall',
      'tray',
      'furniture',
      'arch',
      'loss',
      'brick',
      'bucket',
      'dinosaurs',
      'quicksand',
      'bait',
      'friction',
      'plant',
      'board',
      'apparatus',
      'route',
      'hobbies',
      'pickle',
      'thunder',
      'rub',
      'plot',
      'ear',
      'part',
      'chicken',
      'scarf',
      'bikes',
      'store',
      'believe',
      'thread',
      'wing',
      'ticket',
      'leather',
      'screw',
      'show',
      'value',
      'scissors',
      'tank',
      'hope',
      'pail',
      'anger',
      'form',
      'fairies',
      'bed',
      'basket',
      'party',
      'thumb',
      'bone',
      'tramp',
      'nose',
      'money',
      'books',
      'rainstorm',
      'worm',
      'activity',
      'eggs',
      'bath',
      'mother',
      'record',
      'hydrant',
      'cap',
      'chickens',
      'legs',
      'gun',
      'porter',
      'deer',
      'iron',
      'mailbox',
      'drawer',
      'sun',
      'push',
      'son',
      'increase',
      'space',
      'hands',
      'breath',
      'railway',
      'jewel',
      'wash',
      'payment',
      'position',
      'team',
      'step',
      'death',
      'cat',
      'liquid',
      'airplane',
      'knee',
      'channel',
      'shame',
      'river',
      'carriage',
      'wheel',
      'locket',
      'guide',
      'doctor',
      'mountain',
      'bells',
      'ship',
      'copper',
      'offer',
      'wall',
      'tray',
      'furniture',
      'arch',
      'loss',
      'brick',
      'bucket',
      'dinosaurs',
      'quicksand',
      'bait',
      'friction',
      'plant',
      'board',
      'apparatus',
      'route',
      'hobbies',
      'pickle',
      'thunder',
      'rub',
      'plot',
      'ear',
      'part',
      'chicken',
      'scarf',
      'bikes',
      'store',
      'believe',
      'thread',
      'wing',
      'ticket',
      'leather',
      'screw',
      'show',
      'value',
      'scissors',
      'tank',
      'hope',
      'pail',
      'anger',
      'form',
      'fairies',
      'bed',
      'basket',
      'party',
      'thumb',
      'bone',
      'tramp',
      'nose',
      'money',
      'books',
      'rainstorm',
      'worm',
      'activity',
      'eggs',
      'bath',
      'mother',
      'record',
      'hydrant',
      'cap',
      'chickens',
      'legs',
      'gun',
      'porter',
      'deer',
      'iron',
      'mailbox',
      'drawer',
      'earth',
      'scale']

    let i = 0
    while (i < 20) {
      let countword = Math.floor(Math.random() * this.wordPool.length)
      let randword = this.wordPool[countword]
      if (this.wordArray.indexOf(randword) === -1) {
        this.wordArray.push(randword)
        i++
      }
    }

    //fill arrayTransmit with 7 out of 20 words
    let j = 0
    while (j < 7) {
      let countword = Math.floor(Math.random() * this.wordArray.length)
      let randword = this.wordArray[countword]
      if (this.arrayTransmit.indexOf(randword) === -1) {
        this.arrayTransmit.push(randword)
        j++
      }
    }




  }



  ionViewDidLoad() {
    let alert = this.alertCtrl.create({
      title: 'Exercise 2: FindingMemo',
      message: 'Remember for ' + this.initialTime + ' seconds as many words as possible',
      buttons: [
        {
          text: 'Lets start\'s!',
          role: 'cancel',
          handler: () => {
            this.alertClosed()
          }
        }
      ]
    })
    alert.present()
  }

  startTimer() {
    //1000ms timer
    let timer = Observable.timer(1000, 1000)
    this.timerSubscription = timer.subscribe(() => {
      this.timerTick()
    })
  }

  timerTick() {

    console.log("tick1")

    if (this.timerPaused)
      return

    //decrease timer and calculate the new timerString to show and the ui  
    this.timeNumber--
    let minute = Math.floor(this.timeNumber / 60)
    let seconds = this.timeNumber % 60
    this.time = minute + ':' + (seconds < 10 ? '0' + seconds : seconds)

    if (this.timeNumber === 0) {
      console.log("tick0")
      this.timerSubscription.unsubscribe()
      this.timerFinished()
    } else if (this.timeNumber <= 5) {
      this.timerRed = true
    }
  }

  timerFinished() {
    console.log("timer finish")
    this.navCtrl.push(Training2b, {
      arrayTransmit: this.arrayTransmit,
      trainingName: "Exercise 2: FindingMemo"

    })
  }

  alertClosed() {
    this.startTimer();

    setTimeout(() => {
      //      this.keyboard.show();
    }, 250)
    setTimeout(() => {
      //  this.mInput.setFocus();
    }, 350)
  }

  helpClicked() {
    let alert = this.alertCtrl.create({
      title: 'Exercise 2: FindingMemo',
      message: 'Remember for ' + this.initialTime + ' seconds as many words as possible',
      buttons: [
        {
          text: 'Let\'s start!',
          role: 'cancel',
          handler: () => {
            this.timerPaused = false;
          }
        }
      ]
    })
    alert.present()
    this.timerPaused = true;
  }



}
