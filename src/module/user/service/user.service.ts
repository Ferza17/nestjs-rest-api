import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { EncryptionUtil } from '../../../utils/encryption/encryption.util';
import { UserMongodbRepository } from '../repository/user.mongodb.repository';
import { CreateUserDto } from '../dto/createUser.dto';
import errorsEnum from '../../../enum/errors.enum';

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

  async CreateUser(reqData: CreateUserDto): Promise<void> {
    try {
      reqData.password = await this.encryption.Decrypt(reqData.password);
      return await this.userRepository.CreateUser(reqData);
    } catch (e) {
      this.logger.WithoutField().error(`CreateUserService err : ${e}`);
      throw new Error(errorsEnum.INTERNAL_SERVER);
    }
  }
}
