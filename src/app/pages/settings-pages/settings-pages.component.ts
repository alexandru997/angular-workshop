import {Component, effect, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfilesService} from "../../data/services/profiles.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.scss'
})
export class SettingsPagesComponent {

  fb = inject(FormBuilder)
  profileService = inject(ProfilesService)

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: ['',],
    stack: ['',],

  })


  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
          ...this.profileService.me(),
          stack: this.mergeStack(this.profileService.me()?.stack)
        }
      )
    });
  }

  onSave() {

    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) return

    //@ts-ignore

    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))

  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack
    return stack.split(',')

  }

  mergeStack(stack: string | string[] | null | undefined): any {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',')
    return stack
  }

}
