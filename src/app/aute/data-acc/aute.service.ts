import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuteService {
  constructor(private _aute: Auth) {}

  unirse(user: User) {
    return createUserWithEmailAndPassword(this._aute, user.email, user.password);
  }

  iniciarsesion(user: User) {
    return signInWithEmailAndPassword(this._aute, user.email, user.password);
  }

  singInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    return signInWithPopup(this._aute, provider);
  }
}
