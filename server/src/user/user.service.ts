import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { ClientSession, Model } from 'mongoose';

import { Role } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

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

  async getInfo(userId: string){
    return this.userModel.find({_id: userId}).exec()
  }
  
}
