# BciOnlineBackoffice

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

========================================

<form (ngSubmit)="modifierInfos()">
                        <label>Nom :</label>
                        <input
                          type="text"
                          [(ngModel)]="currentUserInfo.vcLastname"
                          name="vcLastname"
                          placeholder="Entrez votre nom"
                          required
                        />

                        <label>Prénom :</label>
                        <input
                          type="text"
                          [(ngModel)]="currentUserInfo.vcFirstname"
                          name="vcFirstname"
                          placeholder="Entrez votre prénom"
                          required
                        />

                        <label>Email :</label>
                        <input
                          type="email"
                          [(ngModel)]="currentUserInfo.email"
                          name="email"
                          placeholder="Entrez votre email"
                          required
                        />

                        <label>Téléphone :</label>
                        <input
                          type="text"
                          [(ngModel)]="currentUserInfo.vcPhoneNumber"
                          name="vcPhoneNumber"
                          placeholder="Entrez votre téléphone"
                        />

                        <button
                          type="submit"
                          class="btn save"
                          [disabled]="isLoading"
                        >
                          <span *ngIf="!isLoading">Mettre à jour</span>
                          <span *ngIf="isLoading">
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Mis a jours en cours...
                          </span>
                        </button>
                      </form>

                      ============
                      <form (ngSubmit)="changerMotDePasse()">
                      <label>Ancien mot de passe :</label>
                      <div class="input-group auth-pass-inputgroup">
                        <input
                          class="form-control"
                          [type]="passwordVisibleOld ? 'text' : 'password'"
                          [(ngModel)]="password.old"
                          name="ancien"
                          placeholder="Entrez l'ancien mot de passe"
                          required
                        />

                        <button
                          class="btn btn-light shadow-none ms-0"
                          type="button"
                          (click)="togglePasswordVisibility('old')"
                          [attr.aria-pressed]="passwordVisibleOld"
                          [title]="
                            passwordVisibleOld
                              ? 'Masquer le mot de passe'
                              : 'Afficher le mot de passe'
                          "
                        >
                          <i
                            [ngClass]="
                              passwordVisibleOld
                                ? 'mdi mdi-eye-off-outline'
                                : 'mdi mdi-eye-outline'
                            "
                          ></i>
                        </button>
                      </div>

                      <label>Nouveau mot de passe :</label>
                      <div class="input-group auth-pass-inputgroup">
                        <input
                          class="form-control"
                          [type]="passwordVisibleNew ? 'text' : 'password'"
                          [(ngModel)]="password.new"
                          name="nouveau"
                          placeholder="Entrez le nouveau mot de passe"
                          required
                        />

                        <button
                          class="btn btn-light shadow-none ms-0"
                          type="button"
                          (click)="togglePasswordVisibility('new')"
                          [attr.aria-pressed]="passwordVisibleNew"
                          [title]="
                            passwordVisibleNew
                              ? 'Masquer le mot de passe'
                              : 'Afficher le mot de passe'
                          "
                        >
                          <i
                            [ngClass]="
                              passwordVisibleNew
                                ? 'mdi mdi-eye-off-outline'
                                : 'mdi mdi-eye-outline'
                            "
                          ></i>
                        </button>
                      </div>

                      <label>Confirmer mot de passe :</label>
                      <div class="input-group auth-pass-inputgroup">
                        <input
                          class="form-control"
                          [type]="passwordVisibleConfirm ? 'text' : 'password'"
                          [(ngModel)]="password.confirm"
                          name="confirmer"
                          placeholder="Confirmez le mot de passe"
                          required
                        />

                        <button
                          class="btn btn-light shadow-none ms-0"
                          type="button"
                          (click)="togglePasswordVisibility('confirm')"
                          [attr.aria-pressed]="passwordVisibleConfirm"
                          [title]="
                            passwordVisibleConfirm
                              ? 'Masquer le mot de passe'
                              : 'Afficher le mot de passe'
                          "
                        >
                          <i
                            [ngClass]="
                              passwordVisibleConfirm
                                ? 'mdi mdi-eye-off-outline'
                                : 'mdi mdi-eye-outline'
                            "
                          ></i>
                        </button>
                      </div>

                      <button
                        type="submit"
                        class="btn save"
                        [disabled]="isLoading"
                      >
                        <span *ngIf="!isLoading">Changer</span>
                        <span *ngIf="isLoading">
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Mise à jour en cours...
                        </span>
                      </button>
                    </form>
