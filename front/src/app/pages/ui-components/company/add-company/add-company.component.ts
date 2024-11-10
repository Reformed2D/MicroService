import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent {
  companyForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private companyservice: CompanyService,
    public dialogRef: MatDialogRef<AddCompanyComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      pnumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addCompany(): void {
    if (this.companyForm.valid && this.selectedFile) {
      const formData = new FormData();
      
      // Add the selected file
      formData.append('file', this.selectedFile);
      
      // Prepare the company data and append it to FormData
      const company = {
        id: null,
        name: this.companyForm.get('name')?.value,
        address: this.companyForm.get('address')?.value,
        email: this.companyForm.get('email')?.value,
        description: this.companyForm.get('description')?.value,
        pnumber: this.companyForm.get('pnumber')?.value.toString(),
        offers: []
      };
      // formData.append('company', JSON.stringify({
      //   id: null,
      //   name: this.companyForm.get('name')?.value,
      //   address: this.companyForm.get('address')?.value,
      //   email: this.companyForm.get('email')?.value,
      //   description: this.companyForm.get('description')?.value,
      //   pnumber: this.companyForm.get('pnumber')?.value.toString(),
      //   offers: []
      // }));
  
      console.log('FormData:', formData);
  
      // Now call the service with the FormData
      this.companyservice.addCompany(company).subscribe({
        next: () => {
          this.snackBar.open('Company added successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close();
          this.router.navigate(['/ui-components/company']);
        },
        error: (error) => {
          console.error('Error details:', error);
          let errorMessage = 'Failed to add company';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.companyForm);
      this.snackBar.open('Please fill in all required fields and select a file.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
  

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}