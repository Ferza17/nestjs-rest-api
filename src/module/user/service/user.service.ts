import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { UserMongodbRepository } from '../repository/user.mongodb.repository';
import { CreateUserDto } from '../dto/createUser.dto';
import GeneralException from '../../../exception/general.exception';
import { Encrypt } from '../../../utils/encryption.util';
import { FindUserByEmailDto } from '../dto/findUserByEmail.dto';

@Injectable()
export class UserService {
  constructor(
    private logger: LoggerPkg,
    private userRepository: UserMongodbRepository,
  ) {
    this.logger = logger;
    this.userRepository = userRepository;
  }

  async CreateUser(reqData: CreateUserDto) {
    const prevUser = await this.userRepository.FindUserByEmail(
      new FindUserByEmailDto(reqData.RequestID, reqData.email),
    );
    if (prevUser !== null && prevUser.email === reqData.email) {
      this.logger
        .WithField(reqData.RequestID)
        .Error('UserService', `errCreateUserService err : user already exist}`);
      throw GeneralException.GENERAL_BAD_REQUEST;
    }
    reqData.password = await Encrypt(reqData.password);
    await this.userRepository.CreateUser(reqData);
    return;
  }
}
