import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Connection, Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private userService: UserService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private db: Connection,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    admainId: string,
  ): Promise<any> {
    const newProject = {
      ...createProjectDto,
      admain: admainId,
      createdAt: new Date(),
      updateAt: new Date(),
    };
    let createProject = null;
    await this.db
      .transaction(
        async (session) => {
          // create a new project
          createProject = new this.projectModel(newProject, {
            session: session,
          });
          Logger.log(`a created project id ${createProject._id.toString()}`);
         

          if (!createProject) throw new Error();

          const createdProjectId = createProject._id.toString();
          // Add project to admain user
          const userDoc = await this.userService.addProject(
            createdProjectId,
            admainId,
            'ADMAIN',
            session,
          );

          if (!userDoc) throw new Error();
        },
        { readPreference: 'primary' },
      )
      .catch((error) => {
        Logger.error('Error creating project:', error);
        throw new ForbiddenException(error.message || 'Error creating project');
      });
    return createProject;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  async findOne(id: string) {
    try {
      const project = await this.projectModel.findById(id).exec();
      console.log(project)
      if (!project) throw new NotFoundException('Project not found');

      return project;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
