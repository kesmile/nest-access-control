import { Get, Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AppRoles } from 'app.roles';
import { ACGuard, UseRoles, UserRoles, IsOwn, UseRole } from '../../src';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard, ACGuard)
  @UseRole({
    resource: 'video',
    action: 'read'
  })
  @Get()
  root(@UserRoles() userRoles: any, @IsOwn() isOwn: boolean) {
    console.log('controller', isOwn);
    return this.appService.root(userRoles);
  }
}
