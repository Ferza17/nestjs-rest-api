import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { CreateUserDto } from '../dto/createUser.dto';
import User from '../../../model/user.model';
import ErrorsEnum from '../../../enum/errors.enum';

@Injectable()
export class UserMongodbRepository {
  constructor(private logger: LoggerPkg) {
    this.logger = logger;
  }

  async CreateUser(reqData: CreateUserDto): Promise<void> {
    try {
      const user = new User({
        name: reqData.name,
        email: reqData.email,
        password: reqData.password,
      });
      await user.save();
    } catch (e) {
      this.logger.WithoutField().error(`CreateUserRepository err : ${e}`);
      throw new Error(ErrorsEnum.INTERNAL_SERVER);
    }
  }
}
