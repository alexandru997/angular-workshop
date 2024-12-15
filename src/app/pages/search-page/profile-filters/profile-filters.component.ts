import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfilesService} from "../../../data/services/profiles.service";
import {debounceTime, startWith, Subscription, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfilesService);


  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],

  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges.pipe(
      startWith({}),
      debounceTime(100),
      switchMap(formValue => {
        return this.profileService.filterProfiles(formValue);
      })
      // , takeUntilDestroyed()
    )
      .subscribe()
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe()
  }

}
