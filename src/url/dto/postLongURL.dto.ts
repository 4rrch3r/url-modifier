import { IsUrl } from 'class-validator';

export class postLongURL{
    @IsUrl({require_tld: true})
     url:string
}