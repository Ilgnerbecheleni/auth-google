/* eslint-disable prettier/prettier */
import { IsString } from "class-validator"

export class CreateUserDto {
    
    @IsString()
    sub :string
    @IsString()
    nome :string
    @IsString()
    email :string
    @IsString()
    picture :string

}
