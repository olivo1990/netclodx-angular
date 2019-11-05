import { Component, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

  title:string;
  message:string;
  cancelButtonText:string;
  error:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>) {
      if(data){
        this.title = data.title || this.title;
        this.message = data.message || this.message;
        this.error = data.error || this.error;
        if (data.buttonText) {
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }
}
