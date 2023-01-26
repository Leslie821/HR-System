import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { LeaveModule } from './leave/leave.module';
import { env } from '../env';
import { KnexModule } from 'nest-knexjs';
// import { MulterModule } from '@nestjs/platform-express';
import { CheckInModule } from './check_in/check_in.module';
import { StaffModule } from './staff/staff.module';

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
    LoginModule,
    LeaveModule,
    CheckInModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
