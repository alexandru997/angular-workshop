import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfilesService} from "../../data/services/profiles.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.scss'
})
export class SettingsPagesComponent {

  fb = inject(FormBuilder)
  profileService = inject(ProfilesService)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

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

  ngAfterViewInit() {
    this.avatarUploader.avatar

  }

  onSave() {

    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) return
    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

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
