import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { UserMongodbRepository } from '../repository/user.mongodb.repository';
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserQuery } from '../../../model/user.model';
import { Encrypt } from '../../../utils/encryption.util';

const mockLoggerPkg = () => ({
  WithField: jest.fn(),
  Error: jest.fn(),
});
const mockUserRepository = () => ({
  CreateUser: jest.fn(),
  FindUserByEmail: jest.fn(),
});

describe('UserService', () => {
  let userService;
  let loggerPkg;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserMongodbRepository,
          useFactory: mockUserRepository,
        },
        {
          provide: LoggerPkg,
          useFactory: mockLoggerPkg,
        },
      ],
    }).compile();
    userService = module.get(UserService);
    loggerPkg = module.get(LoggerPkg);
    userRepository = module.get(UserMongodbRepository);
  });

  describe('CreateUser', () => {
    it('Call CreateUser ', async () => {
      expect(userRepository.FindUserByEmail).not.toHaveBeenCalled();
      expect(userRepository.CreateUser).not.toHaveBeenCalled();

      const mockUser = new UserQuery({
        _id: 'abc',
        name: 'abc',
        email: 'reqData.email',
        password: 'abc',
      });
      userRepository.FindUserByEmail.mockResolvedValue(mockUser);

      userService.CreateUser({
        RequestID: 'abc',
        email: 'abc',
        name: 'abc',
        password: 'abc',
      });
      await Encrypt(mockUser.password);

      expect(userRepository.FindUserByEmail).toHaveBeenCalled();
    });
  });
});
