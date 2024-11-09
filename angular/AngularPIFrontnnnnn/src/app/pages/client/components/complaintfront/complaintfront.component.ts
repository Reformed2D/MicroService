import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Complaint, TypeRec } from 'src/app/core/Complaint';
import { HttpClient } from '@angular/common/http'; // Import HttpClient


@Component({
  selector: 'app-complaintfront',
  templateUrl: './complaintfront.component.html',
  styleUrls: ['./complaintfront.component.scss']
})
export class ComplaintfrontComponent implements OnInit {
  complaintTypes: string[] = Object.values(TypeRec);
  complaint: Complaint = new Complaint(); // Initialisation de la variable complaint
  selectedType: string | null = null;
  constructor(
    private _service: ComplaintService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}



  ngOnInit(): void {
    console.log('complaintTypes:', this.complaintTypes);
  }

  addComplaint() {
    this.complaint.dateComplaint = new Date();
    const url = 'http://localhost:8222/api/complaint/add'; // URL pour ajouter une plainte
    this.http.post(url, this.complaint).subscribe(() => {
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      this.snackBar.open('La plainte a été ajoutée avec succès', 'Fermer', config);
      this.router.navigate(['/home/complaint']);
  
      // Réinitialiser le formulaire après l'ajout
      this.complaint = new Complaint(); // Réinitialiser les valeurs de complaint
      this.selectedType = null; // Réinitialiser le type sélectionné
    });
  }
  
}
