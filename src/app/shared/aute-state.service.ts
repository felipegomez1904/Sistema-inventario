import { Injectable } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuteStateService {

  constructor(private _aute: Auth) {}

  get autestate$(): Observable<any> {
    return authState(this._aute);
  }

  logOut() {
    return signOut(this._aute);
  }
}
