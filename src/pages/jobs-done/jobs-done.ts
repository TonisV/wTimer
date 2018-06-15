import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-jobs-done',
  templateUrl: 'jobs-done.html'
})
export class JobsDonePage {

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.dataProvider.loadJobs();
  }

  removeJob(job) {
    this.dataProvider.removeJob(job);
  }
  
}
