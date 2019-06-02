import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { Log } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
 
  logs : Log[];

  private logSource = new BehaviorSubject<Log>({id:null,title:null,date:null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true)
  stateClear = this.stateSource.asObservable();

  constructor() { 
    this.logs=[
      {id:1, title:"generated component",date:new Date('12/05/2019 12:54:23')},
      {id:2, title:"added bootstrap",date:new Date('05/06/2019')},
      {id:3, title:"implemented logs",date:new Date('11/05/2019')}
   ]
  }

  getLogs():Observable<Log[]>{
    return of(this.logs);
  }

  setFormLog(log:Log){
     this.logSource.next(log);
  }

  addLog(log:Log){
    this.logs.unshift(log);
  }

  updateLog(log:Log){
    this.logs.forEach((cur,index) => {
      if(log.id === cur.id){
        this.logs.splice(index,1)
      }
    })
    this.logs.unshift(log);
  }

  deleteLog(log:Log){
    this.logs.forEach((cur,index) => {
      if(log.id === cur.id){
        this.logs.splice(index,1)
      }
    })
  }

  clearState(){
     this.stateSource.next(true);
  }
}
