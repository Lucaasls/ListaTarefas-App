import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/';

@Injectable({
  providedIn: 'root'
})
export class ListagemService {

firestoreCollection : AngularFirestoreCollection;

constructor(private firestore: AngularFirestore) { 
  this.firestoreCollection = firestore.collection('ListaTarefas')
}

add(titulo: string){
  this.firestoreCollection.add({
    titulo,
    estaFeito : false
  });
}

update(id:string, newStatus:boolean){
  this.firestoreCollection.doc(id).update({estaFeito:newStatus});
}

delete(id:string){
  this.firestoreCollection.doc(id).delete();
}

}
