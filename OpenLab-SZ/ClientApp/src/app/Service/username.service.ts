import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  private newUsername: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public newUsername$: Observable<any> = this.newUsername.asObservable();

  updateResultList(newUsername: string) {
  }

  constructor() { }
}
