import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UrlDocument = Url & Document;
@Schema()
export class Url {
  @Prop({ required: true, unique: true, type: String })
  longURL: string;

  @Prop({ required: true, unique: true, type: String })
  shortURL: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
