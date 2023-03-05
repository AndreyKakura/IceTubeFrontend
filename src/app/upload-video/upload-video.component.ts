import {Component} from '@angular/core';
import {NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry} from 'ngx-file-drop';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoService} from "../service/video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  isLoading = false;

  uploadVideoForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  //
  previewFile!: File;
  videoFile!: File;
  /*------------------------------------------------*/
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;
  tags: string[] = [];

  errorMessage?:string;

  constructor(private videoService: VideoService, private matSnackBar: MatSnackBar, private router: Router, private builder: FormBuilder) {
    this.uploadVideoForm = new FormGroup({
      title: this.title,
      description: this.description,
    })

  }


  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.removeTag(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onImageSelected(event: Event) {
    //@ts-ignore
    this.previewFile = event.target.files[0];
  }

  onVideoSelected(event: Event) {
    //@ts-ignore
    this.videoFile = event.target.files[0];
  }

  uploadVideo() {
    if (this.uploadVideoForm.valid && this.videoFile != null && this.previewFile != null) {
      this.isLoading = true;
      const newVideoFormData = new FormData();
      newVideoFormData.append('title', this.uploadVideoForm.get('title')?.value);
      newVideoFormData.append('description', this.uploadVideoForm.get('description')?.value);
      newVideoFormData.append('tags', this.tags.toString());
      newVideoFormData.append('videoFile', this.videoFile);
      newVideoFormData.append('previewFile', this.previewFile);
      this.videoService.uploadVideo(newVideoFormData).subscribe(data => {
        this.isLoading = false;
        this.matSnackBar.open("Видео успешно загружено на сервер", "Ок", {duration: 3000});
        this.router.navigate(['home']);
      },
        error => {
        this.errorMessage = error;
        this.isLoading = false;
        })
    } else {
      this.matSnackBar.open("Пожалуйста, заполните все необходимые поля и прикрепите файлы", "Ладно", {duration: 3000});
    }
  }

}
