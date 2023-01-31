import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class loginInfo {
  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  public email: string;

  // Validates for a non-empty integer array
  @IsString()
  @IsNotEmpty()
  public password: string;
}
