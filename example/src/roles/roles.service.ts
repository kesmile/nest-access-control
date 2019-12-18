import { Injectable } from '@nestjs/common';
import { IRole } from './role.interface';

@Injectable()
export class RolesService {
  findAll(): Promise<IRole[]> {
    const role : IRole = {
      createAt: new Date(),
      role: 'admin',
      resource: 'video',
      action: 'read:own',
      attributes: '*'
    }
    const root: IRole = {
      createAt: new Date(),
      role: 'root',
      resource: 'video',
      action: 'create:own',
      attributes: '*'
    }
    return Promise.resolve([role, root]);
  }
}
