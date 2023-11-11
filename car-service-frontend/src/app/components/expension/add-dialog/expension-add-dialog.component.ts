import {Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ExpensionAddDialogFormService} from './expension-add-dialog-form.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Attachment} from '../../../models/attachment.model';

@Component({
  selector: 'expension-add-dialog',
  templateUrl: './expension-add-dialog.component.html',
  styleUrls: ['./expension-add-dialog.component.scss']
})
export class ExpensionAddDialogComponent {
  form: FormGroup;
  attachments: Attachment[] = [];

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: ExpensionAddDialogFormService,
              @Inject(MAT_DIALOG_DATA) private vehicleId: string) {
    this.form = this.formService.getFormGroup(vehicleId);
  }

  cancel() {
    this.dialogRef.close();
  }

  addExpension() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const expension = this.formService.convertFormToExpensionRequest(this.form)
      this.dialogRef.close({expension: expension, attachments: this.attachments.map((attachment) => attachment.file)});
    }
  }

  addAttachment(fileEvent: any) {
    const file = fileEvent.target.files[0] as File;
    const id = crypto.randomUUID();
    this.attachments.push(new Attachment(id, file));
  }

  deleteAttachment(attachmentId: string) {
    this.attachments = this.attachments.filter((attachment) => attachment.id !== attachmentId);
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
