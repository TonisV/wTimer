import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewJobPage } from '../new-job/new-job';
import { JobsDonePage } from '../jobs-done/jobs-done';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = NewJobPage;
  tab2Root: any = JobsDonePage;
  constructor(public navCtrl: NavController) {
  }
  
}
