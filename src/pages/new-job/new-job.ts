import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { JobsDonePage } from '../jobs-done/jobs-done';


@Component({
  selector: 'page-new-job',
  templateUrl: 'new-job.html'
})
export class NewJobPage {

  job: any;
  timer: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider
  ) {
    this.job = {
      title: '',
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        timeString: '00:00:00',
      },
      income: '0.00',
      timeAccuracy: '30',
      hourlyRate: 35
    };
  }
  
  ionViewDidLoad() {
    this.initTimer();
  }

  stop(job) {
    this.pauseTimer();
    this.dataProvider.saveJob(job);
    this.navCtrl.setRoot(JobsDonePage);
    this.navCtrl.popToRoot();
  }

  initTimer() { 
    this.timer = {
      seconds: 0,
      runTimer: false,
      hasStarted: false
    };
  }
  
  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }
  
  pauseTimer() {
    this.timer.runTimer = false;
  }
  
  resumeTimer() {
    this.startTimer();
  }
  
  timerTick() {
    setTimeout(() => {
    if (!this.timer.runTimer) { return; }
    this.timer.seconds++;
    this.job.time = this.getTime(this.timer.seconds);
    this.job.income = this.getIncome();
    this.timerTick();
    }, 1000);
  }
  
  getTime(inputSeconds: number) {

    const secNum = inputSeconds;
    const hoursNum = Math.floor(secNum / 3600);
    const minutesNum = Math.floor((secNum - (hoursNum * 3600)) / 60);
    const secondsNum = secNum - (hoursNum * 3600) - (minutesNum * 60);
    
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hoursNum < 10) ? '0' + hoursNum : hoursNum.toString();
    minutesString = (minutesNum < 10) ? '0' + minutesNum : minutesNum.toString();
    secondsString = (secondsNum < 10) ? '0' + secondsNum : secondsNum.toString();

    let time = {
      hour: hoursNum,
      minute: minutesNum,
      second: secondsNum,
      timeString: hoursString + ':' + minutesString + ':' + secondsString
    };

    return time;
  }

  getIncome() {

    let hours        = this.job.time.hour;
    let minutes      = this.job.time.minute;
    let minuteRate   = this.job.hourlyRate / 60;
    let timeAccuracy = parseInt(this.job.timeAccuracy);
    let minutesMod   = minutes % timeAccuracy;
    let totalIncome  = 0;

    if (minutesMod === 0 ) {
      totalIncome = (minutes + hours * 60) * minuteRate;
    }else {
      totalIncome = ((minutes + hours * 60) + (timeAccuracy - minutesMod)) * minuteRate; 
    }

    return (Math.round(totalIncome * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
  }

}
