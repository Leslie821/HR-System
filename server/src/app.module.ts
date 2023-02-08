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
import { ClaimFormModule } from './claim-form/claim-form.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import path from 'path';

@Module({
  imports: [
    /////upload file///
    // MulterModule.register({
    //   dest: './upload',
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'uploads'),
    // }),

    /////upload file  end///
    KnexModule.forRoot({
      config: knexConfig,
    }),
    LeaveModule,
    CheckInModule,
    StaffModule,
    JobTitleModule,
    AuthModule,
    DepartmentModule,
    ClaimFormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
