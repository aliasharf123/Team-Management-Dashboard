import { Test, TestingModule } from '@nestjs/testing';
import { TaskGateway } from './task.gateway';
import { TaskService } from './task.service';

describe('TaskGateway', () => {
  let gateway: TaskGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskGateway, TaskService],
    }).compile();

    gateway = module.get<TaskGateway>(TaskGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
