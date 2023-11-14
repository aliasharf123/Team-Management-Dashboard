import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({namespace: 'project'})
export class ProjectGateway {
  constructor(private readonly projectService: ProjectService) {}


  @SubscribeMessage('updateProject')
  update(@MessageBody() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(updateProjectDto.id, updateProjectDto);
  }

  @SubscribeMessage('removeProject')
  remove(@MessageBody() id: number) {
    return this.projectService.remove(id);
  }
}
