import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from './user.service';
@Injectable()
export class RouteResolver implements Resolve<any> {
    constructor(public userService: UserService) { }
    async resolve() {
        return await this.userService.getAllCollection()
    }

}