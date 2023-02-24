import { Controller, ValidationPipe } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { MessagePattern, Payload } from '@nestjs/microservices';
import KafkaTopicEnum from '../../../enum/kafkaTopic.enum';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserService } from '../service/user.service';

@Controller('user-consumer')
export class UserConsumerController {
  constructor(private logger: LoggerPkg, private userService: UserService) {
    this.logger = logger;
    this.userService = userService;
  }
  @MessagePattern(KafkaTopicEnum.StreamingUserCreateUserJson)
  StreamingCreateUserJsonHandler(
    @Payload(ValidationPipe) message: CreateUserDto,
  ) {
    try {
      this.userService.CreateUser(message);
    } catch (e) {
      this.logger
        .WithoutField()
        .Error(`StreamingCreateUserJsonHandlerController err : ${e}`);
      throw new Error(e);
    }
  }
}
