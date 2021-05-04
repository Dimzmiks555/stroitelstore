import { Controller, Get, Post } from '@nestjs/common';

@Controller('one-c')
export class OneCController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Post()
    create(): any {
        console.log('Yes')
    }
}
