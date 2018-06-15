import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  jobs: any = [];

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('DataProvider - OK');
  }

  loadJobs() {
    return new Promise(resolve => {
      if (this.jobs.length > 0) {
        resolve(this.jobs);
      } else {
        this.storage.get('jobData').then((jobs) => {
          if (jobs && typeof(jobs) !== "undefined") {
            this.jobs = jobs;
          }

          resolve(this.jobs);
        });

      }
    });
  }

  saveJob(job) {
    let index = this.jobs.indexOf(job);

    if (index === -1) {
      this.jobs.push(job);
    } else {
      this.jobs[index] = job;
    }

    this.storage.set('jobData', this.jobs);
  }

  removeJob(job) {
    let index = this.jobs.indexOf(job);

    if (index !== -1) {
      this.jobs.splice(index, 1);
    }

    this.storage.set('jobData', this.jobs);
  }

}
