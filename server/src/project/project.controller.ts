import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectService } from './project.service'
import { GetUser } from 'src/auth/decorator/get-user-controller.decorator'
import { JwtAuthGuard } from 'src/auth/guard/auth.guard'
import { UpdateProjectDto } from './dto/update-project.dto'

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('createProject')
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser('userId') id: string
  ) {
    return this.projectService.create(createProjectDto, id)
  }
  @Post('findProject')
  findOne(@Body() { id }: { id: string }) {
    return this.projectService.findOne(id)
  }
}
