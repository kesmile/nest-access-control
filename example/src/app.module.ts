import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessControlModule, RolesBuilder } from '../../src';
import { roles } from './app.roles';
import { RolesModule } from './roles/roles.module';
import { RolesService } from 'roles/roles.service';
@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [RolesModule],
      useFactory: async (accessControlService: RolesService): Promise<RolesBuilder> => {
        const role = await accessControlService.findAll();

        return new RolesBuilder(role);
      },
      inject: [RolesService],
    }), 
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
