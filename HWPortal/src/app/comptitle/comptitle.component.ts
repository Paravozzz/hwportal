import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comptitle',
  templateUrl: './comptitle.component.html',
  styleUrls: ['./comptitle.component.css']
})
export class ComptitleComponent implements OnInit {

  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
