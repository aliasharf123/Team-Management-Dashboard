import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@WebSocketGateway({namespace: 'project'})
export class ProjectGateway {
  constructor(private readonly projectService: ProjectService) {}

  @SubscribeMessage('createProject')
  create(@MessageBody() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @SubscribeMessage('findAllProject')
  findAll() {
    return this.projectService.findAll();
  }

  @SubscribeMessage('findOneProject')
  findOne(@MessageBody() id: number) {
    return this.projectService.findOne(id);
  }

  @SubscribeMessage('updateProject')
  update(@MessageBody() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(updateProjectDto.id, updateProjectDto);
  }

  @SubscribeMessage('removeProject')
  remove(@MessageBody() id: number) {
    return this.projectService.remove(id);
  }
}
