import { Observable } from 'rxjs';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  uploadForm: FormGroup;
  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.cliente = new Cliente();
    this.uploadForm = this.formBuilder.group({
      file1: [''],
      file2: [''],
      photo: ['']
    });
  }

  opcoesCidade: string[] = ['Abadia de Goiás',
    'Aparecida de Goiânia',
    'Aragoiânia',
    'Bela Vista de Goiás',
    'Bonfinópolis',
    'Brazabrantes',
    'Caldazinha',
    'Caturaí',
    'Goiânia',
    'Goianápolis',
    'Goianira',
    'Guapó',
    'Hidrolândia',
    'Inhumas',
    'Nerópolis',
    'Nova Veneza',
    'Santo Antônio de Goiás',
    'Senador Canedo',
    'Terezópolis de Goiás',
    'Trindade'];
    opcaoCidadeSelecionada: string = 'Goiânia';

  opcoesEstado: string[] = ['GO'];
  opcaoEstadoSelecionada: string = 'GO';
  

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getClienteById(this.id)
          .subscribe(
            response => this.cliente = response,
            errorResponse => this.cliente = new Cliente()
          );
      }
    });
  }

  onFileChangeDocumento(event, controlName) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.get(controlName).setValue(file);
  }

  onFileChangePhoto(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.get('photo').setValue(file);
  }

  
  // tslint:disable-next-line: typedef
  onSubmit() {
    this.cliente.cidade = this.opcaoCidadeSelecionada;
    this.cliente.estado = this.opcaoEstadoSelecionada;
    this.retirarMascaraCpf();
    if (this.id) {
      this.service.atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Cliente'];
        });
    } else {
      this.service.salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
          this.cliente = response;

        }, errorsResponse => {
          this.success = false;
          this.errors = errorsResponse.error.errors;
        });
    }
  }

  retirarMascaraCpf(){
    if(this.cliente.cpf !== undefined) {
      let regex = /\d/g;
      let valorFiltrado = this.cliente.cpf.match(regex).join("");
      this.cliente.cpf = valorFiltrado;
    }
  }

  // tslint:disable-next-line: typedef
  voltarParaListagem() {
    this.router.navigate(['/clientes/lista']);
  }

}
