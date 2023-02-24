import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { CreateUserDto } from '../dto/createUser.dto';
import { IUser, UserCommand, UserQuery } from '../../../model/user.model';
import { FindUserByEmailDto } from '../dto/findUserByEmail.dto';

@Injectable()
export class UserMongodbRepository {
  private query;
  constructor(private logger: LoggerPkg) {
    this.logger = logger;
    this.query = UserQuery;
  }

  async CreateUser(reqData: CreateUserDto): Promise<void> {
    try {
      const user = new UserCommand({
        name: reqData.name,
        email: reqData.email,
        password: reqData.password,
      });

      await user.save();
    } catch (e) {
      this.logger
        .WithField(reqData.RequestID)
        .Error('UserMongodbRepository', `errCreateUserRepository err : ${e}`);
      throw e;
    }
  }

  async FindUserByEmail(reqData: FindUserByEmailDto): Promise<IUser> {
    try {
      return await this.query.findOne({ email: reqData.Email });
    } catch (e) {
      this.logger
        .WithField(reqData.RequestID)
        .Error('UserMongodbRepository', `errFindUserByEmail err : ${e}`);
      throw e;
    }
  }
}
