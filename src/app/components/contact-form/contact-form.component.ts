import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { itemContact } from 'src/app/models/contactoModel';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  numberPhonePattern: any = '^[0-9]*$';
  mensaje = '';
  registrado = false;
  nombreCompleto = '';

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

  get nombreCompletoControl(): FormControl {
    return this.contactForm.get('nombreCompleto') as FormControl;
  }
  get nombreEmpresaControl(): FormControl {
    return this.contactForm.get('nombreEmpresa') as FormControl;
  }
  get emailControl(): FormControl {
    return this.contactForm.get('email') as FormControl;
  }
  get telefonoControl(): FormControl {
    return this.contactForm.get('telefono') as FormControl;
  }
  get categoriaControl(): FormControl {
    return this.contactForm.get('categoria') as FormControl;
  }
  get mensajeControl(): FormControl {
    return this.contactForm.get('mensaje') as FormControl;
  }

  sendContact(contactForm: any): void {
    const datosEnviados: itemContact = this.contactForm.value;

    this.contactService.createContact(datosEnviados).subscribe(
      (res) => {
        this.getContacts();
        this.registrado = true;
        this.mensaje = 'registrado correctamente..!';
      },
      (err) => console.error({ err })
    );
  }

  deleteContact(_id: any) {
    if (confirm('Seguro que desea eliminar el Contacto...?')) {
      this.contactService.deleteContact(_id).subscribe(
        (res) => {
          this.getContacts();
        },
        (err) => console.log(err)
      );
    }
  }
}
