import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { CreateUserDto } from '../dto/createUser.dto';
import { IUser, UserCommand, UserQuery } from '../../../model/user.model';

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
      this.logger.WithoutField().error(`errCreateUserRepository err : ${e}`);
      throw e;
    }
  }

  async FindUserByEmail(email: string): Promise<IUser> {
    try {
      return await this.query.findOne({ email: email });
    } catch (e) {
      this.logger.WithoutField().error(`errFindUserByEmail err : ${e}`);
      throw e;
    }
  }
}
