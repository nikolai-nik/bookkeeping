import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, pipe, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
@Injectable()
export class SendService {
  public items$: Observable<any[]>
  public size$: BehaviorSubject<string | null>;

  public items: Observable<any[]>;
  constructor(private af: AngularFireDatabase) {
    this.size$ = new BehaviorSubject(null);
  }


  public getSectionData(section: string) {
    return this.af.list(`sections/${section}`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

  public filterSec(section: string) {
    return this.af.list(`sections/${section}`, ref => ref.orderByChild('data/name').equalTo('test')).snapshotChanges()
  }
  public GetSectionDatabase(section: string) {
    return this.af.list(`sections/${section}`);
  }
  public SendToDatabase(section: string, data) {
    return this.af.list(`sections/${section}`).push(data);
  }

}