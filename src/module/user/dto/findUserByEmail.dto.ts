export class FindUserByEmailDto {
  constructor(requestID: string, email: string) {
    this.RequestID = requestID;
    this.Email = email;
  }
  RequestID: string;
  Email: string;
}
