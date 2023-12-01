import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectGateway } from './project.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [ProjectGateway, ProjectService , ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
