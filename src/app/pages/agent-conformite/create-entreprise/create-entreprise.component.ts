import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-entreprise',
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './create-entreprise.component.html',
  styleUrl: './create-entreprise.component.css',
})
export class CreateEntrepriseComponent {
  step = 3;
  form: FormGroup;
  saving = false;
  autoSaved = false;
  totalSteps = 7;
  maxStepReached = 1;
  removingIndex: number | null = null;

  steps = [
    { id: 1, label: 'Informations légales' },
    { id: 2, label: 'Contacts' },
    { id: 3, label: 'Documents KYC' },
    { id: 4, label: 'Modules & Services' },
    { id: 5, label: 'Workflows' },
    { id: 6, label: 'Attribution' },
    { id: 7, label: 'Validation' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Informations Légales et Identification
      step1: this.fb.group({
        companyName: ['', Validators.required],
        companyNIF: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(20),
          ],
        ],
        legalForm: ['', Validators.required],
        segment: ['', Validators.required],
        sector: ['', Validators.required],
        companyAddress: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        creationDate: ['', Validators.required],
      }),

      // Contacts et Représentants Légaux
      step2: this.fb.group({
        contacts: this.fb.array([this.createContact(true)]),
      }),

      //  Documents KYC et Justificatifs
      step3: this.fb.group({
        registre_commerce: ['', Validators.required],
        statuts: ['', Validators.required],
        pieces_identite: ['', Validators.required],
        justificatif_adresse: ['', Validators.required],
      }),

      // Modules et Services Bancaires
      step4: this.fb.group({
        simple_virement: [''],
        payment_en_masse: [''],
        operation_de_change: [''],
        advenced_repporting: [''],
        internation_payment: [''],
        cash_management: [''],
      }),

      // Configuration des Workflows et Seuils
      step5: this.fb.group({
        validation_level_simple_virement: ['', Validators.required],
        validation_level_masse_payement: ['', Validators.required],
        seuil_valiation: ['', Validators.required],
        nombre_max_operations: ['', Validators.required],
      }),

      // Attribution des Interlocuteurs Internes
      step6: this.fb.group({
        charger_affaire: [''],
        responsable_conformite: [''],
        technique_support: [''],

        //  Notifications Inter-Services
        notify_conformite_service: [''],
        notify_technique_support: [''],
        notify_commercial: [''],
      }),

      // Validation et Création Finale
      step7: this.fb.group({
        //  Vérifications Finales
        confirm1: [''],
        confirm2: [''],
        confirm3: [''],

        // Options de Création
        option1: [''],
        option2: [''],
        option3: [''],
      }),
    });
  }

  // Aller a une etape
  get progressPercent() {
    return (this.step / this.totalSteps) * 100;
  }

  goToStep(stepNumber: number) {
    if (stepNumber <= this.maxStepReached) {
      this.step = stepNumber;
    }
  }

  // Step 1
  get step1() {
    return this.form.get('step1') as FormGroup;
  }

  // Suivant
  next() {
    const currentStepGroup = this.form.get(`step${this.step}`) as FormGroup;

    if (currentStepGroup.invalid) {
      currentStepGroup.markAllAsTouched();
      return;
    }

    // mémoriser l'étape max atteinte
    if (this.step >= this.maxStepReached) {
      this.maxStepReached = this.step + 1;
    }

    this.step++;
  }

  // Precedent
  prev() {
    this.step--;
  }

  // Créer un contact
  createContact(isPrimary: boolean = true): FormGroup {
    return this.fb.group({
      fullname: ['', Validators.required],
      fonction: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isPrimary: [isPrimary],
    });
  }

  // getter pour acceder au formulaire
  get contacts(): FormArray {
    return this.form.get('step2.contacts') as FormArray;
  }

  // Ajouter un contact
  addContact(): void {
    console.log('Contact added ! ');
    this.contacts.push(this.createContact(false));
  }

  // Suppression d'un formulaire
  removeContact(index: number): void {
    if (index === 0) return;

    this.removingIndex = index;

    setTimeout(() => {
      this.contacts.removeAt(index);
      this.removingIndex = null;
    }, 300);
  }

  // A la soumission
  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  // Enregistrer le bouillon
  saveDraft() {
    this.saving = true;

    setTimeout(() => {
      this.saving = false;
      this.autoSaved = true;

      setTimeout(() => (this.autoSaved = false), 2000);
    }, 1000);
  }

  // Exporter le brouillon
  exportDraft() {
    console.log('Export PDF');
  }

  // Apercu
  previewCompany() {
    console.log('Aperçu');
  }

  // Reset le formulaire
  resetForm() {
    this.form.reset();
    this.step = 1;
  }

  // Charger le brouillons
  loadDraftData() {
    console.log('Charger brouillon');
  }

  // Decuplication
  duplicateCompany() {
    console.log('Dupliquer entreprise');
  }

  // Aide
  getHelp() {
    alert('Support bientôt disponible 😉');
  }
}
