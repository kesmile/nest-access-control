import { Injectable } from '@nestjs/common';
import { IRole } from './role.interface';

@Injectable()
export class RolesService {
  findAll(): Promise<IRole[]> {
    const role : IRole = {
      createAt: new Date(),
      role: 'admin',
      resource: 'video',
      action: 'create:any',
      attributes: '*'
    }
    return Promise.resolve([role]);
  }
}
