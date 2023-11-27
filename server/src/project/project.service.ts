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

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private userService: UserService,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    adminId: string,
  ): Promise<any> {
    const session = await this.connection.startSession();
    const newProject = {
      ...createProjectDto,
      createdAt: new Date(),
      updateAt: new Date(),
    };

    try {
      session.startTransaction();

      // create a new project
      const createProject = new this.projectModel(newProject);
      await createProject.save({ session });
      Logger.log(`a created project id ${createProject._id.toString()}`);

      if (!createProject) throw new Error();

      // Add project to adminId user
      const userDoc = await this.userService.addProject(
        createProject,
        adminId,
        session,
      );

      if (!userDoc) throw new Error();

      await session.commitTransaction();

      return createProject;
    } catch (err) {
      await session.abortTransaction();
      Logger.error('Error creating project:', err);
      throw new ForbiddenException(err.message || 'Error creating project');
    } finally {
      await session.endSession();
    }
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
      if (!project) throw new NotFoundException('Project not found');

      return project;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
