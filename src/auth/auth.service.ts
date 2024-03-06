/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { payloadInterface } from './interface/payload.interface';



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(payload:payloadInterface) {
   try {
    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '7 days',
      
    })
if(!token){
  throw new BadRequestException("falha ao gerar token")
}
    return token;


   } catch (error) {
    throw new BadRequestException(error);
   }
  }

   checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
              });

            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }


  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const sub: string = req.user.id;
    console.log(req.user);
    const { id, email, firstName, picture } = req.user;
    const user = await this.userService.findBySub(id);

    if (!user) {
      const userdata:payloadInterface = await this.userService.create({
        sub: id,
        email: email,
        nome: firstName,
        picture: picture,
      });
      if (userdata) {
        const token = await this.generateToken(userdata);
        return {
          message: 'User criado from google',
          user: userdata,
          token: token,
        };
      } else {
        throw new BadRequestException('falha ao autencicar');
      }
    } else {
      const token = await this.generateToken(user);

      console.log( await this.jwtService.verify(token,{secret:process.env.SECRET}))
      return {
        user: user,
        token: token,
      };
    }
  }
}
