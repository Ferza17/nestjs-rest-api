import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { EncryptionUtil } from '../../../utils/encryption.util';
import { UserMongodbRepository } from '../repository/user.mongodb.repository';
import { CreateUserDto } from '../dto/createUser.dto';
import GeneralException from '../../../exception/general.exception';

@Injectable()
export class UserService {
  constructor(
    private logger: LoggerPkg,
    private encryption: EncryptionUtil,
    private userRepository: UserMongodbRepository,
  ) {
    this.logger = logger;
    this.encryption = encryption;
    this.userRepository = userRepository;
  }

  async CreateUser(reqData: CreateUserDto) {
    const prevUser = await this.userRepository.FindUserByEmail(reqData.email);
    if (prevUser !== null && prevUser.email === reqData.email) {
      throw GeneralException.GENERAL_BAD_REQUEST;
    }
    reqData.password = await this.encryption.Decrypt(reqData.password);
    return this.userRepository.CreateUser(reqData);
  }
}
