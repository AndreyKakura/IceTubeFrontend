import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentDto} from "../dto/comment-dto";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentService} from "../service/comment.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input()
  videoId!: number;
  // commentForm: FormGroup;
  comments: CommentDto[] = [];

  commentForm = this.builder.group({
    text: this.builder.control('', Validators.required),
  });

  constructor(private builder: FormBuilder, private userService: UserService, private commentService: CommentService,
              private matSnackBar: MatSnackBar) {
    // this.commentForm = new FormGroup({
    //   comment: new FormControl('',),
    // });
  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment() {
    if (this.commentForm.valid) {
      const text = this.commentForm.get('text')?.value;

      const commentDto = {
        "text": text
      }
      this.commentService.postComment(commentDto, this.videoId).subscribe(() => {
        this.matSnackBar.open("Комментарий успешно опубликован", "Замечательно!", {duration: 3000});

        this.commentForm.reset();
        this.getComments();
      })
    } else {
      this.matSnackBar.open('К сожалению, невозможно отправить комментарий без текста',
        'Очень жаль', {duration: 3000});
    }
  }


  getComments() {
    this.commentService.getAllComments(this.videoId).subscribe(data => {
      this.comments = data;
    })
  }


}
