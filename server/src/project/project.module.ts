import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectGateway } from './project.gateway';

@Module({
  providers: [ProjectGateway, ProjectService],
})
export class ProjectModule {}
