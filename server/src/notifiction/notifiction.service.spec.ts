import { Test, TestingModule } from '@nestjs/testing';
import { NotifictionService } from './notifiction.service';

describe('NotifictionService', () => {
  let service: NotifictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifictionService],
    }).compile();

    service = module.get<NotifictionService>(NotifictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
