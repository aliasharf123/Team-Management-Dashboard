import { Test, TestingModule } from '@nestjs/testing';
import { NotifictionGateway } from './notifiction.gateway';
import { NotifictionService } from './notifiction.service';

describe('NotifictionGateway', () => {
  let gateway: NotifictionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifictionGateway, NotifictionService],
    }).compile();

    gateway = module.get<NotifictionGateway>(NotifictionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
