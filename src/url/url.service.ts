import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Url, UrlDocument } from './shemas/url.schema';
import { Model } from 'mongoose';

@Injectable()
export class UrlService {
    constructor (@InjectModel(Url.name) private urlModel:Model<UrlDocument>){   
    }
    async getByQuery(query: object): Promise<Url> {
        return this.urlModel.findOne(query).exec();
      }
      async postByUrsl(longRequestUrl:string,shortRequestUrl:string)
      {
        const newUrl = new this.urlModel({longURL:longRequestUrl,shortURL:shortRequestUrl})
        return newUrl.save();
      }
}