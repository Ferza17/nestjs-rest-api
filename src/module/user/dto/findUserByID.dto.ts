import { IsNotEmpty, IsString } from 'class-validator';
export class FindUserByIDDto {
  // From Header
  constructor(private requestID: string, private id: string) {
    this.requestID = requestID;
    this.Id = id;
  }
  RequestID: string;

  @IsNotEmpty()
  @IsString()
  Id: string;
}
