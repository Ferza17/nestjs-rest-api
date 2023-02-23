import { Module } from '@nestjs/common';
import { UserRestController } from './controller/userRest.controller';
import { UserService } from './service/user.service';
import { UserMongodbRepository } from './repository/user.mongodb.repository';
import { PkgModule } from '../../pkg/pkg.module';
import { UserConsumerController } from './controller/userConsumer.controller';

@Module({
  imports: [PkgModule],
  controllers: [UserRestController, UserConsumerController],
  providers: [UserService, UserMongodbRepository],
})
export class UserModule {}
