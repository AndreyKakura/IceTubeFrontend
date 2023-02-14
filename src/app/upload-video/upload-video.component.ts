import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoService} from "../service/video.service";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  public files: NgxFileDropEntry[] = [];

  fileUploaded: boolean = false;

  fileEntry: FileSystemFileEntry | undefined;

  /*------------------------------------------------*/
  uploadVideoForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  //
  previewFile!: File;
  videoFile!: File;


  /*------------------------------------------------*/
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  /*------------------------------------------------*/
  // selectedImageName = '';
  streamUrl!: string;


  constructor(private videoService: VideoService, private matSnackBar: MatSnackBar) {
    this.videoService.getVideo(50).subscribe(data => {
      this.streamUrl = data.streamUrl;
    })
    this.uploadVideoForm = new FormGroup( {
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
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


  /*------------------------------------------------*/

  // public dropped(files: NgxFileDropEntry[]) {
  //   this.files = files;
  //   for (const droppedFile of files) {
  //
  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       this.fileEntry.file((file: File) => {
  //
  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath, file);
  //
  //         this.fileUploaded = true
  //         /**
  //          // You could upload it like this:
  //          const formData = new FormData()
  //          formData.append('logo', file, relativePath)
  //
  //          // Headers
  //          const headers = new HttpHeaders({
  //           'security-token': 'mytoken'
  //         })
  //
  //          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
  //          .subscribe(data => {
  //           // Sanitized logo returned from backend
  //         })
  //          **/
  //
  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  // public fileOver(event: any){
  //   console.log(event);
  // }
  //
  // public fileLeave(event: any){
  //   console.log(event);
  // }

  // uploadVideo() {
  //   console.log(this.fileEntry);
  //
  //   if(this.fileEntry !== undefined) {
  //     this.fileEntry?.file(file => {
  //       this.videoService.uploadVideo(file).subscribe(data => {
  //         console.log("Video uploaded successfully");
  //       })
  //     })
  //   }
  // }

  onImageSelected(event: Event) {
    //@ts-ignore
    this.previewFile = event.target.files[0];
    // this.selectedFileName = this.selectedFile.name;
  }

  onVideoSelected(event: Event) {
    //@ts-ignore
    this.videoFile = event.target.files[0];
  }

  uploadVideo() {
    const newVideoFormData = new FormData();
    newVideoFormData.append('title', this.uploadVideoForm.get('title')?.value);
    newVideoFormData.append('description', this.uploadVideoForm.get('description')?.value);
    newVideoFormData.append('tags', this.tags.toString());
    newVideoFormData.append('videoStatus', this.uploadVideoForm.get('videoStatus')?.value);
    newVideoFormData.append('videoFile', this.videoFile);
    newVideoFormData.append('previewFile', this.previewFile);
    this.videoService.uploadVideo(newVideoFormData).subscribe(data => {
      this.matSnackBar.open("Видео успешно загружено на сервер", "Ок", {duration: 3000 });
    })
  }
}
