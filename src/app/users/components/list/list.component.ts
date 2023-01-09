import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users!: User[];
  public user!: User;
  constructor(private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.users = this.usersService.getUsers();
  }

  public onDelete(userId: string): void {
    this.usersService.deleteUser(userId);
    this.users = this.usersService.getUsers();
  }

  public editUser(id: string) {
    console.log(id);
    this.router.navigate(['/users/edit', id]);
  }
}
