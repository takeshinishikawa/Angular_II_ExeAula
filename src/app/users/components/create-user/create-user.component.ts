import { Address } from './../../models/address.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { State } from '../../models/state.model';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public userForm!: FormGroup;
  public user!: User;
  public states!: State[];
  public userId!: string;

  ngOnInit() {
    this.buildForm();
    this.getStates();
    this.getRouteParams();
    this.setFormValue();
  }

  private getRouteParams() {
    this.userId = this.activatedRoute.snapshot.params['id'];
  }

  private setFormValue() {
    const user = this.usersService.getUserById(this.userId);
    this.userForm.patchValue(user);
  }

  private buildForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      profession: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      birthDate: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      documentNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      address: new FormGroup({
        id: new FormControl(null),
        zipCode: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
        street: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        number: new FormControl(null, [
          Validators.required,
          Validators.minLength(1),
        ]),
        complement: new FormControl(null),
        neighborhood: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
        ]),
        city: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        state: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      contact: new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      }),
    });
  }

  public onSubmit(): void {
    const user = this.userForm.getRawValue();
    user.id = this.generateUUID();
    user.address.id = this.generateUUID();
    this.usersService.saveUser(user);
    this.userForm.reset();
    this.router.navigate(['/users']);
  }

  public keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private getStates(): void {
    this.states = this.usersService.getStatesOfBrazil();
  }

  get f() {
    return this.userForm.controls;
  }

  closeForm(): void {
    this.userForm.reset();
  }

  public generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
}
