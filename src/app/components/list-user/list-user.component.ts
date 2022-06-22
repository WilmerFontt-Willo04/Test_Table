import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { CellClickedEvent } from 'ag-grid-community';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { itemContact } from 'src/app/models/contactoModel';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  rowData: any[] = [];
  contactForm!: FormGroup;
  numberPhonePattern: any = '^[0-9]*$';

  columnDefs = [
    {
      headerName: 'Nombre',
      field: 'nombreCompleto',
    },
    {
      headerName: 'Empresa',
      field: 'nombreEmpresa',
    },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Telefono', field: 'telefono' },
    { headerName: 'Categoria', field: 'categoria' },
    { headerName: 'Mensaje', field: 'mensaje' },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    filterParams: { buttons: ['apply', 'clear'] },
    width: 200,
    editable: true,
  };

  onCellClicked(event: CellClickedEvent) {
    console.log('click eventos', event);
  }

  onCellValueChanged(event: any) {
    console.log('changeevent', event.value);
    this.sendContact(event.value);
    // handle the rest here
  }

  constructor(
    public contactService: ContactService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getContacts();
    this.contactForm = this.initForm();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(
      (res) => {
        this.contactService.contacts = res;
        this.rowData = this.contactService.contacts;
      },
      (err) => console.error({ err })
    );
  }

  sendContact(contactForm: any): void {
    const datosEnviados: itemContact = this.contactForm.value;

    this.contactService.createContact(datosEnviados).subscribe(
      (res) => {
        this.getContacts();
      },
      (err) => console.error({ err })
    );
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      nombreEmpresa: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.numberPhonePattern),
        ],
      ],
      categoria: ['', [Validators.required]],
      mensaje: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(218),
        ],
      ],
    });
  }
}
