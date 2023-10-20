import {Vehicle} from './vehicle.model';

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  vehicles?: Vehicle[] = [];

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
