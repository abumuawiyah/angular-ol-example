import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable, Observer } from 'rxjs/Rx';
import { scan } from 'rxjs/operators';

@Injectable()
export class AppStateService{
  private trigger = new Subject();
  private state;

  constructor(){
    this.state = this.trigger.pipe(
      scan(current => !current, true)
    );
  }

  public toggleDim(){
    this.trigger.next();
  }

  public getDim(): Observable<boolean> {
    return this.state.asObservable();
  }

}