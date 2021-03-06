import { Component, ViewChild }   from '@angular/core'
import { NavController, 
        NavParams, 
        AlertController }         from 'ionic-angular'

import { Observable, Subscription } from 'rxjs/Rx'

import { Keyboard } from '@ionic-native/keyboard'

import { Score } from '../score/score'

import { WordList } from '../../providers/word-list'

@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class Training {

  @ViewChild('input') mInput

  //Specify how long the training will take and calculate the time
  timeNumber: number = 90
  initialTime: number = this.timeNumber
  minute = Math.floor(this.timeNumber / 60)
  seconds = this.timeNumber % 60
  time: string = this.minute + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)

  timerSubscription: Subscription

  //last 5 seconds color of timer will be red
  timerRed: boolean = false

  //the current word in the input field
  currentWord: string

  //number of words (and the sum of the length) that already have been found
  wordCount: number = 0
  wordLengthCount: number = 0

  //list of words, that were already entered
  currentWords: string[]

  wordFailure: boolean = false
  wordSuccess: boolean = false

  timerPaused: boolean = false

  letters: string[] = [
    'A',
    'B'
  ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              public keyboard: Keyboard, 
              public wordList: WordList) {

    this.currentWords = new Array()
  }

  ionViewDidLoad() {
    let alert = this.alertCtrl.create({
      title: 'Übung 1: Fluorish',
      message: 'Bilde in ' + this.initialTime + ' Sekunden so viele Verben wie möglich, die mit der vorgegebenen Buchstabenkombination beginnen',
      buttons: [
        {
          text: 'Los geht\'s!',
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
    this.navCtrl.push(Score, {
      score: this.wordLengthCount,
      trainingName: "Übung 1: Flourish",
      trainingSum: 5,
      trainingNum: 1
    })
  }

  alertClosed() {
    this.startTimer();

    setTimeout(() => {
      this.keyboard.show();
    }, 250)
    setTimeout(() => {
      this.mInput.setFocus();
    }, 350)
  }

  helpClicked() {
    let alert = this.alertCtrl.create({
      title: 'Exercise 2: Fluorish',
      message: 'Bilde in ' + this.initialTime + ' Sekunden so viele Verben wie möglich, die mit der vorgegebenen Buchstabenkombination beginnen',
      buttons: [
        {
          text: 'Weiter geht\'s!',
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

  inputHandler(keyCode) {
    if (keyCode === 13) {
      this.currentWord = this.currentWord.toLocaleLowerCase()
      if (!this.currentWord.startsWith('ab') || this.currentWords.indexOf(this.currentWord) !== -1) {
        this.invalidWordFound()
        return
      }

      this.wordList.wordIsValid(this.currentWord)
        .subscribe((isValid) => {
          if (isValid) {
            this.validWordFound()
          } else {
            this.invalidWordFound()
          }
        })
    }
  }

  validWordFound() {
    this.wordCount++
    this.wordLengthCount += this.currentWord.length
    this.currentWords.push(this.currentWord)
    this.currentWord = ""
    this.wordSuccess = true
    setTimeout(() => {
      this.wordSuccess = false
    }, 500)
  }

  invalidWordFound() {
    this.wordFailure = true
    setTimeout(() => {
      this.wordFailure = false
    }, 500)
  }

  clockClicked() {
    this.timerFinished()
  }

}