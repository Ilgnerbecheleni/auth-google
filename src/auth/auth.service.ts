/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  
  constructor(private readonly userService: UsersService){}
  
    
  
    async googleLogin(req) {
        if (!req.user) {
          return 'No user from google'
        }
        const user = this.userService.findBySub(req.user.sub);
if(!user){
  throw new BadRequestException("falha ao criar usuario")
}
const userdata = this.userService.create({...req.user});
 return {
    message: 'User criado from google',
    user: userdata
  }

}
      }

