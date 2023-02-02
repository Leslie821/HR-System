import { knexConfig } from './../db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaveModule } from './leave/leave.module';
import { env } from '../env';
import { KnexModule } from 'nest-knexjs';
// import { MulterModule } from '@nestjs/platform-express';
import { CheckInModule } from './check_in/check_in.module';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { JobTitleModule } from './job_title/job_title.module';

@Module({
  imports: [
    /////upload file///
    // MulterModule.register({
    //   dest: './upload',
    // }),

    /////upload file  end///
    KnexModule.forRoot({
      config: knexConfig
    }),
    LeaveModule,
    CheckInModule,
    StaffModule,
    JobTitleModule,
    AuthModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
