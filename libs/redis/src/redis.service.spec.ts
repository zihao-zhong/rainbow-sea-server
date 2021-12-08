import { Test, TestingModule } from '@nestjs/testing';
import { IRedisService } from './redis.service';

describe('RedisService', () => {
  let service: IRedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IRedisService],
    }).compile();

    service = module.get<IRedisService>(IRedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
