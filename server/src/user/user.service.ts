import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { ClientSession, Model } from 'mongoose';
import { Role } from './types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addProject(
    addProjectId: string,
    userID: string,
    role: Role,
    session: ClientSession,
  ): Promise<mongoose.UpdateWriteOpResult> {
    const userDoc = await this.userModel.updateOne(
      { _id: userID },
      { $push: { projects: { project: addProjectId, role: role } } },
      { session: session },
    );

    return userDoc;
  }

  async getInfo(userId: string) {
    try {
      const user = await this.userModel.findById(userId)
      .select('-password')
      .populate("projects");
      
      if (!user) throw new NotFoundException('User not found');

      user.projects = await this.userModel.populate(user.projects , {path : "project"}) as any

      return user
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
