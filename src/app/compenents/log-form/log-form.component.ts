import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/logs';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id:number;
  title:string;
  date:any;
  isNew:boolean = true;

  constructor(private logService : LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(log => {
      if(log.id != null){
         this.id = log.id;
         this.title = log.title;
         this.date = log.date;
         this.isNew = false;
      }
    })
  }

  onSubmit(){
    
    if(this.isNew){
     
      const newLog = {
        id: parseInt(this.generateId()),
        title: this.title,
        date: new Date()
      }
      const j = this.generateId()
     this.logService.addLog(newLog)
    }else{
      const updLog = {
        id: this.id,
        title: this.title,
        date: new Date()
      }
      this.logService.updateLog(updLog)
    }
    this.clearState();
  }

  clearState(){
    this.isNew = true;
    this.id=null
    this.title = '';
    this.date = '';
    this.logService.clearState();

  }

   generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
