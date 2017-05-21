import { BrowserModule }            from '@angular/platform-browser'
import { ErrorHandler, NgModule }   from '@angular/core'
import { IonicApp, 
         IonicErrorHandler, 
         IonicModule }              from 'ionic-angular'
import { SplashScreen }             from '@ionic-native/splash-screen'
import { StatusBar }                from '@ionic-native/status-bar'

import { MyApp }                    from './app.component'

import { Home }           from '../pages/home/home'
import { Menu }           from '../pages/menu/menu'
import { Profile }        from '../pages/profile/profile'
import { Questionnaire }  from '../pages/questionnaire/questionnaire'
import { Result }         from '../pages/result/result'
import { Statistics }     from '../pages/statistics/statistics'
import { Training1 }      from '../pages/training1/training1'
import { Training1Voice }      from '../pages/training1voice/training1voice'
import { Training2 }      from '../pages/training2/training2'
import { Training2b }      from '../pages/training2b/training2b'
import { Tabs }           from '../pages/tabs/tabs'

import 'chart.js'
import { ChartModule }    from 'ng2-chartjs2'

import { HttpModule } from '@angular/http'

import { WordList } from '../providers/word-list'

import { Keyboard } from '@ionic-native/keyboard'

import { SpeechRecognition } from '@ionic-native/speech-recognition'

@NgModule({
  declarations: [
    MyApp,
    Home,
    Tabs,
    Menu,
    Profile,
    Questionnaire,
    Result,
    Statistics,
    Training1,
    Training1Voice,
    Training2,
    Training2b
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Tabs,
    Menu,
    Profile,
    Questionnaire,
    Result,
    Statistics,
    Training1,
    Training1Voice,
    Training2,
    Training2b,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WordList,
    Keyboard,
    SpeechRecognition
  ]
})
export class AppModule {}
