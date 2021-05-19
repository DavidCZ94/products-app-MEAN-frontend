import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../services/users/users.service';

@Pipe({
  name: 'clientName'
})
export class ClientNamePipe implements PipeTransform {

  clientName: string;

  constructor(
    private usersService: UsersService
  ){}

  transform(value: string, ...args: unknown[]) {
    this.usersService.getUser(value)
    .subscribe(
      (res) => {
        value = res.data.name;
        console.log(value);
        return value;
      }
    );
  }

}
