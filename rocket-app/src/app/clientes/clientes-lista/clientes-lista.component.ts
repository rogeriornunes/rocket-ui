import { ClientesService } from 'src/app/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: ClientesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.service.getClientes().subscribe(response => {
      this.clientes = response;
    });
  }

  // tslint:disable-next-line: typedef
  novoCadastro(){
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(response =>{
      this.mensagemSucesso = 'Cliente deletado com Sucesso!';
      this.ngOnInit();
    },
      erro => this.mensagemErro = 'Ocorreu erro ao deletar o Cliente'
    );
  }

}
