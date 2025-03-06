import { Component, OnInit } from '@angular/core';
import { ConventionService } from '../../services/convention.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Convention } from "../../core/model/db";
import { Router } from "@angular/router";
import { PdfGenerationService } from "../../services/pdf-generation.service";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {
  conventions: Convention[] = [];
  conventionForm: FormGroup;
  searchForm: FormGroup;
  isEditMode = false;
  currentConventionId?: number;
  selectedConvention: Convention | null = null;
  showFormError = false;
  conId: number | undefined;
  currentPage: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  isGeneratingPDF: number | null = null;

  constructor(
    private fb: FormBuilder,
    private conventionService: ConventionService,
    private router: Router,
    private pdfGenerationService: PdfGenerationService
  ) {
    this.conventionForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      internshipId: ['', [Validators.required, Validators.min(1)]],
      signed: [false, Validators.required],
      terms: this.fb.array([], [this.atLeastOneTermValidator])
    });

    this.searchForm = this.fb.group({
      keyword: [''],
      signed: [null]
    });
  }

  private atLeastOneTermValidator(control: AbstractControl): ValidationErrors | null {
    return (control as FormArray).length > 0 ? null : { noTerms: true };
  }

  ngOnInit() {

    this.getAllConventions();

    this.searchForm.get('keyword')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.performSearch());

    this.searchForm.get('signed')?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.performSearch());
  }

  get getTerms(): FormArray {
    return this.conventionForm.get('terms') as FormArray;
  }

  addTerm() {
    this.getTerms.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeTerm(index: number) {
    this.getTerms.removeAt(index);
  }

  submitForm() {
    if (this.conventionForm.valid) {
      const newConvention: Convention = this.conventionForm.value;
      this.conventionService.addConvention(newConvention).subscribe({
        next: () => {
          this.getAllConventions();
          this.conventionForm.reset();
          this.showFormError = false;
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.showFormError = true;
        }
      });
      alert("Convention ajoutée avec succès !");
    } else {
      this.showFormError = true;
      this.markFormGroupTouched(this.conventionForm);
    }
  }

  getAllConventions() {
    this.conventionService.getAllConventions().subscribe(data => {
      this.conventions = data;
    });
  }

  deleteConvention(conventionId: number | undefined) {
    if (conventionId !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cette convention ?')) {
      this.conventionService.deleteConvention(conventionId).subscribe(() => {
        this.getAllConventions();
      }, error => console.error('Erreur:', error));
    }
  }

  loadConventionData(convention: Convention) {
    this.isEditMode = true;
    this.currentConventionId = convention.conId;

    this.conventionForm.patchValue({
      description: convention.description,
      internshipId: convention.internshipId,
      signed: convention.signed,
      dateConv: convention.dateConv
    });

    this.getTerms.clear();
    convention.terms.forEach(term => {
      this.getTerms.push(this.fb.group({
        termId: [term.termId],
        title: [term.title, Validators.required],
        description: [term.description, Validators.required]
      }));
    });
  }

  updateConvention() {
    if (!this.currentConventionId) return;

    if (this.conventionForm.valid) {
      const termsArray = this.conventionForm.value.terms || [];
      if (termsArray.length === 0) {
        this.showFormError = true;
        return;
      }

      const termsValid = termsArray.every((term: any) => term.title.trim() && term.description.trim());
      if (!termsValid) {
        this.showFormError = true;
        this.markFormGroupTouched(this.conventionForm.get('terms') as FormArray);
        return;
      }

      const updatedConvention: Convention = {
        ...this.conventionForm.value,
        conId: this.currentConventionId,
        terms: termsArray.map((term: any) => ({
          termId: term.termId || null,
          title: term.title.trim(),
          description: term.description.trim()
        }))
      };

      this.conventionService.updateConvention(this.currentConventionId, updatedConvention)
        .subscribe({
          next: () => {
            this.getAllConventions();
            this.conventionForm.reset();
            this.isEditMode = false;
            this.showFormError = false;
          },
          error: (err) => {
            console.error('Erreur:', err);
            this.showFormError = true;
          }
        });
      alert('Convention mise à jour avec succès !');
    } else {
      this.showFormError = true;
      this.markFormGroupTouched(this.conventionForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getConventionDetails(conId: number | undefined): void {
    if (!conId) {
      console.error('ID de convention non défini');
      return;
    }

    this.conventionService.getConventionById(conId).subscribe({
      next: (convention) => {
        this.selectedConvention = convention;
        this.router.navigate(['/conventions', conId], {
          state: { convention }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération:', err);
        this.router.navigate(['/conventions']);
      }
    });
  }

  performSearch() {
    const keyword = this.searchForm.get('keyword')?.value;
    const signed = this.searchForm.get('signed')?.value;
    this.conventionService.intelligentSearch(keyword, signed)
      .subscribe(results => this.conventions = results);
  }

  resetSearch() {
    this.searchForm.reset({
      keyword: '',
      signed: null
    });
    this.getAllConventions();
  }

  generatePdf(conId: number | undefined) {
    if (!conId) return;

    this.isGeneratingPDF = conId;

    this.pdfGenerationService.generatePdf(conId).subscribe({
      next: (data: Blob) => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = `convention_${conId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(downloadURL);
        this.isGeneratingPDF = null;
      },
      error: (error: any) => {
        console.error('Erreur de téléchargement', error);
        alert('Échec du téléchargement');
        this.isGeneratingPDF = null;
      }
    });
  }
}
