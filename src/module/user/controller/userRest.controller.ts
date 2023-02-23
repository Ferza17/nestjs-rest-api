import {
  Body,
  Catch,
  Controller,
  HttpException,
  Post,
  UseFilters,
  ContextType,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserService } from '../service/user.service';
import { Exception } from '../../../exception/exception';
import { FindUserByIDDto } from '../dto/findUserByID.dto';

@Controller('/v1/user')
@Catch(HttpException)
export class UserRestController {
  constructor(private logger: LoggerPkg, private userService: UserService) {
    this.logger = logger;
    this.userService = userService;
  }

  @Post()
  @UseFilters(new Exception())
  async CreateUser(@Req() req, @Body() reqData: CreateUserDto) {
    reqData.RequestID = req.context.RequestID;
    await this.userService.CreateUser(reqData);
    return;
  }

  @Get(':id')
  @UseFilters(new Exception())
  async FindUserById(@Req() req, @Param('id') id: string) {
    const reqData = new FindUserByIDDto(req.context.RequestID, id);
    return;
  }

  // TODO :
  // FindUserList

  // UpdateUserById
  // DeleteUserById
}
