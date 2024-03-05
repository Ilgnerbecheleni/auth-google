/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor (private readonly userPrisma: PrismaService){}

  async findBySub(id:string){
    try {
      const user = await this.userPrisma.user.findFirst({where:{ sub:id }});
if(user){
  return user ;
}
return null;

    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)
    }
  }


 async create(createUserDto: CreateUserDto) {
   try {
    const user = await this.userPrisma.user.create({data:createUserDto});
    if(user){
      return user
    }else{
      throw new BadRequestException("falha ao criar usuario")
    }
   } catch (error) {
    throw new BadRequestException({message:"falha ao buscar User", erro:error.message})
   }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
