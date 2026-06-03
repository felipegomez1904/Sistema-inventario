import { inject, Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, updateDoc, addDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
  private firestore = inject(Firestore);

  private gruasCollection = collection(this.firestore, 'gruas');
  private historialCollection = collection(this.firestore, 'HistorialMantenimiento');

  constructor() {}
  async getMaintenanceGruas() {
    const q = query(this.gruasCollection, where('estado.label', 'in', ['mantenimiento', 'fuera de servicio']));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ids: doc.id, ...doc.data() }));
  }
  updateGruaState(id: string,  descripcion: string): Observable<any> {
      const gruaDoc = doc(this.firestore, `gruas/${id}`);
      const update = updateDoc(gruaDoc, {
        estado: {label: 'operativo'},
        comentario: descripcion,
      });
      return from(update)
  }
}
