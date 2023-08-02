import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();
@Module({
  imports: [UrlModule, MongooseModule.forRoot(process.env.MONGODB_URL)],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
