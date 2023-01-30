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
<<<<<<< HEAD
=======
import { UsersModule } from './users/users.module';
import { JobTitleModule } from './job_title/job_title.module';
>>>>>>> 85bc1ebe5d5ee89e14b6b1cf1e1af270b0f4e23c

@Module({
  imports: [
    /////upload file///
    // MulterModule.register({
    //   dest: './upload',
    // }),

    /////upload file  end///
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        connection: {
          database: env.DB_NAME,
          user: env.DB_USER,
          password: env.DB_PASSWORD,
        },
        pool: {
          min: 2,
          max: 10,
        },
        migrations: {
          tableName: 'knex_migrations',
        },
      },
    }),
    LeaveModule,
    CheckInModule,
    StaffModule,
    AuthModule,
<<<<<<< HEAD
=======
    UsersModule,
    JobTitleModule,
>>>>>>> 85bc1ebe5d5ee89e14b6b1cf1e1af270b0f4e23c
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
