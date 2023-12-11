import { Global, Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectGateway } from './project.gateway'
import { MongooseModule } from '@nestjs/mongoose'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectController } from './project.controller'
import { ProjectRepository } from './project.repository'
import { NotificationService } from 'src/notification/notification.service'
import { NotificationModule } from 'src/notification/notification.module'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    NotificationModule,
  ],
  providers: [ProjectGateway, ProjectService, ProjectRepository],
  controllers: [ProjectController],
  exports: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
