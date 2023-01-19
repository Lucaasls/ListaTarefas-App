import { Component } from '@angular/core';
import { ListagemService } from 'src/app/service/listagem.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {

  listas: any[] = [];

  constructor(private serviceTarefa: ListagemService){}

  ngOnInit(): void{
    this.serviceTarefa.firestoreCollection.valueChanges({idField:'id'})
    .subscribe(item =>{
      this.listas = item.sort((a:any, b:any) => a.estaFeito -b.estaFeito);
    })
  }

onClick(tituloInput: HTMLInputElement){
    if(tituloInput){
      this.serviceTarefa.add(tituloInput.value);
      tituloInput.value = "";
    }
  }

onConcluirTarefa(id: string, newStatus: boolean){
  this.serviceTarefa.update(id,newStatus);
}
onDelete(id:string){
  this.serviceTarefa.delete(id);
}

}
