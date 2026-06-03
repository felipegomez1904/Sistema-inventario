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

export interface Grua {
  id: string;
  estado: any;
  fecha_de_compra: any;
  marca: string;
  modelo: string;
  placa: string;
  ubicacion: string;
}
@Injectable({
  providedIn: 'root',
})
export class GruasService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, 'gruas');
  constructor() {}

  getData(): Observable<any[]> {

    const docsPromise = getDocs(this._collection);
    return from(docsPromise).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as Grua;
          const ids = docSnapshot.id;
          return { ids, ...data }; 
        });;
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

  addGrua(data: Grua): Observable<any> {
    // Usamos 'addDoc' para agregar un documento nuevo a la colección
    const addDocPromise = addDoc(this._collection, data);

    // Convertimos el Promise en un Observable
    return from(addDocPromise);
  }

  updateGrua(id: string, grua: any): Observable<void> {
    // Obtener la referencia al documento específico
    console.log(id)
    const gruaDocRef = doc(this._firestore, 'gruas/' + id);

    // Usar updateDoc para actualizar el documento
    const updateDocPromise = updateDoc(gruaDocRef, grua);
    return from(updateDocPromise).pipe(
      map(() => {
        // Retornar vacío cuando la actualización esté completa
      })
    );
  }
  // Eliminar una grúa
  deleteGrua(id: string): Observable<void> {
    // Obtener la referencia al documento específico
    const gruaDocRef = doc(this._firestore, 'gruas', id);
    // Usar deleteDoc para eliminar el documento
    const deleteDocPromise = deleteDoc(gruaDocRef);
    console.log(id)
    return from(deleteDocPromise)
  }
}
