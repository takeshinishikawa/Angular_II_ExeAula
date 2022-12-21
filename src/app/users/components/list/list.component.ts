import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users: User[] = JSON.parse(localStorage.getItem('USERS') || '[]');
  constructor() { }

  ngOnInit() {
  }

}
