/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }


  async generateToken(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.SECRET,
        expiresIn: "7 days",
        subject: String(payload.sub),
        issuer: 'signin',
        audience: 'google',
      })
    }
  }

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
      if(userdata){
       const token = await this.generateToken(userdata);
       return {
        message: 'User criado from google',
        user: userdata ,
        token: token
      }
      }else{
        throw new BadRequestException("falha ao autencicar")
      }
      
     
    } else {
      const token = await this.generateToken(user);
      return {
       user: user ,
       token: token
      }
    }
  }


}


