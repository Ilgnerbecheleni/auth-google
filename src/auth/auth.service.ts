/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) { }



  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    const sub: string = req.user.id;
    console.log(req.user);
    const { id, email, firstName, picture } = req.user;
    const user = await this.userService.findBySub(id);

    if (!user) {
      const userdata = await this.userService.create({ sub: id, email: email, nome: firstName, picture: picture });
      return {
        message: 'User criado from google',
        user: userdata
      }
    } else {
      return "fazer JWT"
    }
  }


}


