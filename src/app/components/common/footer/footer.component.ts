import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private notiserv: NotificationService,
    private loadServ: LoadingService) { }

  ngOnInit(): void {
  }
  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      this.loadServ.openDialog();
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/xeqpogak',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          response => {
            this.notiserv.success('Gracias por comunicarse con nosotros.!');
            contactForm.reset();
            this.loadServ.close();
          }
        );
    } else {
      this.notiserv.warn('Debe completar los campos obligatorios* antes de continuar.!');
    }
  }
}
