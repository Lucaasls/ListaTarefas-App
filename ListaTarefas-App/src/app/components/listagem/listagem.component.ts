import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListagemService } from 'src/app/service/listagem.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {

  listas: any[] = [];

  constructor(private serviceTarefa: ListagemService, private toastr: ToastrService){}

  ngOnInit(): void{
    this.serviceTarefa.firestoreCollection.valueChanges({idField:'id'})
    .subscribe(item =>{
      this.listas = item.sort((a:any, b:any) => a.estaFeito -b.estaFeito);
    })
  }

onClick(tituloInput: HTMLInputElement){
  debugger
    if(tituloInput.value){
      this.serviceTarefa.add(tituloInput.value);
      this.toastr.success('Sua tarefa foi adicionada!', 'Deu certo.');
      tituloInput.value = "";
    }
    else{
      this.toastr.warning('Insira alguma tarefa!', 'Ops...');
    }
  }

onConcluirTarefa(id: string, newStatus: boolean){
  this.serviceTarefa.update(id,newStatus);
  this.toastr.success('Sua tarefa foi atualizada!', 'Muito bem.');
}
onDelete(id:string){
  this.serviceTarefa.delete(id);
  this.toastr.info('Sua tarefa foi deletada!', 'Tudo certo.');
}

}
