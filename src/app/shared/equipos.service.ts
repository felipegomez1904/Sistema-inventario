import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

export interface Equipo {
  
  id: string;
  tipo: any;
  marca: string;
  comentarios: string;
}

@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, 'equipos');
  constructor() {}

  getData(): Observable<any[]> {
    const docsPromise = getDocs(this._collection);
    return from(docsPromise).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as Equipo;
          const ids = docSnapshot.id;
          return { ids, ...data };
        });
      })
    );
  }
  getDataById(id: string): Observable<any> {
    const docRef = doc(this._collection, id);
    const docPromise = getDoc(docRef);
    return from(docPromise).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data();
        } else {
          return null;
        }
      })
    );
  }
  addEquipo(data: Equipo): Observable<any> {
    const addDocPromise = addDoc(this._collection, data);
    return from(addDocPromise);
  }
  updateEquipo(id: string, equipo: any): Observable<void> {
    console.log(id)
    const equipoDocRef = doc(this._firestore, 'equipos/' + id);
    const updateDocPromise = updateDoc(equipoDocRef, equipo);
    return from(updateDocPromise).pipe(
      map(() => {})
    );
  }
  deleteEquipo(id: string): Observable<void> {
    const equipoDocRef = doc(this._firestore, 'equipos', id);
    const deleteDocPromise = deleteDoc(equipoDocRef);
    return from(deleteDocPromise);
  }
}
