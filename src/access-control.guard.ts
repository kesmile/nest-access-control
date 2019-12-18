import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IQueryInfo, AccessControl } from 'accesscontrol';
import * as ac from 'accesscontrol';
import { Role } from './role.interface';
import { InjectRolesBuilder } from './decorators/inject-roles-builder.decorator';
import { RolesBuilder } from './roles-builder.class';

@Injectable()
export class ACGuard<User extends any = any> implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  protected async getUser(context: ExecutionContext): Promise<User> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
    const user = await this.getUser(context);
    if (!user) throw new UnauthorizedException();
    return user.roles;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<Role>('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    console.log('this')
    if (!role) {
      return true;
    }
    let isOwn = false;

    const userRoles = await this.getUserRoles(context);

    const permission = (action: string, owned: boolean, roles: IQueryInfo, resource: String): ac.Permission =>
            (this.roleBuilder.can(roles))[action + (owned ? 'Own' : '')](resource);
            
    const queryInfo: IQueryInfo = role;
    queryInfo.role = userRoles;
    let perm = permission(role.action, false, queryInfo, role.resource);

    if (perm.granted) {
      console.log('set any', perm.granted)
      request.isOwn = isOwn;
      return true
    }

    perm = permission(role.action, true, queryInfo, role.resource);

    if (perm.granted) {
      isOwn = true;
    }
    request.isOwn = isOwn;
    console.log('set own');
    return perm.granted;
  }
}
