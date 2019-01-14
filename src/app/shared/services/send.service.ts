import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class SendService {
    constructor(private af: AngularFireDatabase) { }
    public SendToDatabase(data) {
        return this.af.list('sections').push(data)
    }

}