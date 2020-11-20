import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../state/appstate.service';

@Component({
  selector: 'show-button',
  template: `
  <button 
    class="btn-primary"
    (click)="notifyMap()"
  >
    <span *ngIf="dim">Dim Map</span>
    <span *ngIf="!dim">Reset Map</span>
  </button>
  `,
  styleUrls: ['./show-button.component.css']
})
export class ShowButtonComponent implements OnInit {

  public dim: boolean = true;

  constructor(private appStateService: AppStateService) {}

  ngOnInit() {
    this.appStateService.getDim().subscribe(
    (dim: boolean) => this.dim = dim
    );
  }

  notifyMap() {
    this.appStateService.toggleDim();
  }

}