import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateUsernameService } from 'src/app/services/update-username.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {
  public updateInfo !: FormGroup;
  public usernamesMatch = true;
  constructor(private formBuilder: FormBuilder, private updateUsernameService: UpdateUsernameService ) {

  }

  ngOnInit(): void {
    this.updateInfo = this.formBuilder.group({
      oldUsername: ["", Validators.required],
      newUsername: ["", Validators.required],
      confirmUsername: ["", Validators.required]
    })
  }


  update():any  {
    if (this.updateInfo.value.newUsername !== this.updateInfo.value.confirmUsername) return this.usernamesMatch = false;
    this.updateUsernameService.updateUsername({
      username: this.updateInfo.value.newUsername
    }).subscribe(async (res) => {
      console.log(res)
    })
  }


}
