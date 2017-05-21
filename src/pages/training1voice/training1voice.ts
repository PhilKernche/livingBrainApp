import { Component, ViewChild } from '@angular/core'
import {
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular'

import { Observable, Subscription } from 'rxjs/Rx'

import { Keyboard } from '@ionic-native/keyboard'

import { Result } from '../result/result'

import { WordList } from '../../providers/word-list'

import { Http } from '@angular/http'

import { SpeechRecognition } from '@ionic-native/speech-recognition'

@Component({
  selector: 'training1voice-page',
  templateUrl: 'training1voice.html',
})
export class Training1Voice {

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

  possibleWords: Array<string>

  letters: string[] = [
    'A',
    'B'
  ]

  options: any

  allInputs: Array<any>

  timeInMilliseconds: number

  isVoice: boolean

  trainingId: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public keyboard: Keyboard,
    public wordList: WordList,
    public recognition: SpeechRecognition,
    public http: Http) {

    this.options = {
      language: 'de-DE',
      showPopup: true
    }
    this.currentWords = new Array<string>()

    this.trainingId = this.navParams.data.TrainingId

    this.currentWords = new Array()

    this.isVoice = JSON.parse(localStorage.getItem("patient")).EntryType === 0

    this.allInputs = new Array()
  }

  startRecord() {
    this.recognition.startListening(this.options)
      .subscribe(
      (matches: Array<string>) => {
        console.log(matches)
        this.checkWordArray(matches, (isValid, word) => {
          if (isValid) {
            this.validWordFound(word)
          } else {
            this.invalidWordFound(word)
          }
        })
      },
      (err) => console.log(err)
      )
  }

  ionViewDidLoad() {
    let message = ""
    if (this.isVoice)
      message = 'Say as many words as possible that start with the given letters in ' + this.initialTime + ' seconds'
    else
      message = 'Write as many words as possible that start with the given letters in ' + this.initialTime + ' seconds'
    let alert = this.alertCtrl.create({
      title: 'Exercise 1: Fluorish',
      message,
      buttons: [
        {
          text: 'Start!',
          role: 'cancel',
          handler: () => {
            this.startTimer()
          }
        }
      ]
    })
    alert.present()

    this.recognition.isRecognitionAvailable().then((avail) => {
      if (avail === false) {
      } else {
        this.recognition.requestPermission()
          .then((res) => {
            console.log("yaaay speech recognition available")
          }, (rej) => {
            console.log("nooo")
          })
        console.log("Speech Recognition is available")
      }
    })
  }

  startTimer() {
    //1000ms timer
    let timer = Observable.timer(1000, 1000)
    this.timerSubscription = timer.subscribe(() => {
      this.timerTick()
      this.timeInMilliseconds = (new Date()).getTime()
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
    this.navCtrl.push(Result, {
      score: this.wordLengthCount,
      trainingName: "Exercise 1: Flourish",
      trainingSum: 5,
      trainingNum: 1
    })
    this.http.post('http://livingbrainapi20170520043518.azurewebsites.net/api/Result01', {
      TrainingId: this.trainingId,
      Score: this.wordLengthCount,
      words: this.allInputs,
      VoiceConfidence: 0
    }).subscribe(res => console.log(res))
  }

  helpClicked() {
    let message = ""
    if (this.isVoice)
      message = 'Say as many words as possible that start with the given letters in ' + this.initialTime + ' seconds'
    else
      message = 'Write as many words as possible that start with the given letters in ' + this.initialTime + ' seconds'
    let alert = this.alertCtrl.create({
      title: 'Exercise 1: Fluorish',
      message,
      buttons: [
        {
          text: 'Start!',
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

  checkWordArray(words: Array<string>, cb) {
    let newWords = words
      .map(word => word.toLocaleLowerCase())
      .filter((word) => { return word.startsWith('ab') })
      .filter((word) => { return this.currentWords.indexOf(word) === -1 })

    console.log(newWords)

    if (newWords.length === 0) {
      cb(false, null)
    } else {

      this.wordList.wordIsValid(newWords[0]).subscribe(isValid => {
        cb(isValid, newWords[0])
      })
    }
  }

  validWordFound(word) {
    this.wordCount++
    this.wordLengthCount += word.length
    this.currentWords.push(word)
    this.allInputs.push({
      word,
      isValid: true,
      timeInMilliseconds: (new Date()).getTime() - this.timeInMilliseconds
    })
    this.wordSuccess = true
    setTimeout(() => {
      this.wordSuccess = false
    }, 500)
  }

  invalidWordFound(word) {
    this.allInputs.push({
      word,
      isValid: true,
      timeInMilliseconds: (new Date()).getTime() - this.timeInMilliseconds
    })
    this.wordFailure = true
    setTimeout(() => {
      this.wordFailure = false
    }, 500)
  }

  clockClicked() {
    this.timerFinished()
  }

}