import { Controller, Get,Post,Param, Redirect, Body, UsePipes, ValidationPipe,Res, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import {UrlService} from './url.service'
import {postLongURL} from './dto/postLongURL.dto'
let shortUrlIterator=0;
@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {
    }
    @Get(':shortURL')
    @Redirect()
   async redirectByShortURL(@Param('shortURL') shortURL:string,@Res() res: Response){
    const URLs = await this.UrlService.getByQuery({shortURL:shortURL});
    if (!URLs) {
      throw new NotFoundException('Short URL was not found');
    }
        return {
            url:URLs.longURL,
            statusCode:302
        }
    }
    @UsePipes(new ValidationPipe())
    @Post()
   async postLongURL(@Body() body:postLongURL):Promise<object>{
    const URLs = await this.UrlService.getByQuery({longURL:body.url});
    if (URLs) {
      throw new BadRequestException('Such URL already exists');
    }
    const shortUrl = `${body.url.replace(/^(https?|ftp|s?ftp):\/\/(www\.)?/, '').split('.')[0]}_${shortUrlIterator++}`;
        let newUrls = await this.UrlService.postByUrsl(body.url, shortUrl);
        return {
            shortURL:newUrls.shortURL
        };
    }
}
