import { Injectable } from '@angular/core'

import { Http } from '@angular/http'

import 'rxjs/add/operator/map'

@Injectable()
export class WordList {

  constructor(public http: Http) {
    
  }

  wordIsValid(word: string) {
    return this.http.get('https://livingbrain-app.co/api/' + word)
      .map(res => res.json())
      .map(res => res.isValid)
  }

}