import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx'
import { Result } from '../result/result'



@Component({
  selector: 'page-training2b',
  templateUrl: 'training2b.html',
})
export class Training2b {
  //Specify how long the training will take and calculate the time

  selectedword: any = {}
  timeNumber: number = 10
  initialTime: number = this.timeNumber
  minute = Math.floor(this.timeNumber / 60)
  seconds = this.timeNumber % 60
  time: string = this.minute + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)

  wordArray: Array<string>
  wordPool: Array<string>
  arrayTransmit: Array<string>
  finalArray: Array<string>

  timerSubscription: Subscription

  //last 5 seconds color of timer will be red
  timerRed: boolean = false


  scoreCounter: number = 0
  checkedBoxes: number = 0


  //list of words, that were already entered
  timerPaused: boolean = false



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.wordArray = new Array()
    this.arrayTransmit = new Array()
    this.arrayTransmit = this.navParams.data.arrayTransmit;
    this.finalArray = new Array()
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
    while (i < 13) {

      let countword = Math.floor(Math.random() * this.wordPool.length)
      let randword = this.wordPool[countword]
      if (this.wordArray.indexOf(randword) === -1 && this.arrayTransmit.indexOf(randword) === -1) {
        this.wordArray.push(randword)
        i++

      }
    }



    let lea = 0
    let counterwordPool = 0
    let counterGivenwords = 0
    while (lea < 20) {
      let decide = Math.floor(Math.random() * 10)
      if (decide < 5 && counterwordPool < 13) {
        let countword = Math.floor(Math.random() * this.wordPool.length)
        let randword = this.wordPool[countword]
        if (this.finalArray.indexOf(randword) === -1 && this.arrayTransmit.indexOf(randword) === -1) {
          this.finalArray.push(randword)
          lea++
          counterwordPool++
        }
      }


      else if (counterGivenwords < 7 && decide > 5) {
        let countword2 = Math.floor(Math.random() * 7)
        let randword2 = this.arrayTransmit[countword2]
        if (this.finalArray.indexOf(randword2) === -1) {
          this.finalArray.push(randword2)
          lea++
          counterGivenwords++
        }
      }




    }
    console.log(this.finalArray)
    console.log(this.arrayTransmit)
  }


  ionViewDidLoad() {




    let alert = this.alertCtrl.create({
      title: 'Exercise 2: FindingMemo',
      message: 'Mark all remembered words. You have ' + this.initialTime + ' seconds time',
      buttons: [
        {
          text: 'Let\'s start!',
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
    if (this.timerPaused)
      return

    //decrease timer and calculate the new timerString to show and the ui  
    this.timeNumber--
    let minute = Math.floor(this.timeNumber / 60)
    let seconds = this.timeNumber % 60
    this.time = minute + ':' + (seconds < 10 ? '0' + seconds : seconds)

    if (this.timeNumber === 0) {
      this.timerSubscription.unsubscribe()
      this.timerFinished()
    } else if (this.timeNumber <= 5) {
      this.timerRed = true
    }
  }

  timerFinished() {
    let counter = 0

    while (counter < this.arrayTransmit.length) {
      if (this.selectedword[this.arrayTransmit[counter]] === true) {
        this.scoreCounter++
      }

      counter++
    }
    let counter2 = 0
    while (counter2 < this.finalArray.length) {
      if (this.selectedword[this.finalArray[counter2]] === true) {
        this.checkedBoxes++
      }

      counter2++
    }

    this.scoreCounter = 2*this.scoreCounter - this.checkedBoxes

    if (this.scoreCounter <= 0) {
      this.scoreCounter = 0
    }

    this.navCtrl.push(Result, {
      score: this.scoreCounter,
      trainingName: "Exercise 2: FindingMemo",
      trainingSum: 5,
      trainingNum: 1
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
      message: 'Mark all remembered words. You have ' + this.initialTime + ' seconds time',
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
