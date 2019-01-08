import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray } from "@angular/forms";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  personForm;
  constructor(private formBuilder: FormBuilder) {
    this.personForm = this.formBuilder.group({
      name: [],
      email: [],
      parents: this.formBuilder.group({
        mother: [],
        father: []
      }),
      eduDetails: this.formBuilder.array([])
    });
  }

  ngOnInit() {}

  addEduDetailsFormGroup() {
    const formGroup = this.formBuilder.group({
      institute: [],
      course: [],
      yearOfPassing: [],
      skills: this.formBuilder.array([])
    });

    (this.personForm.get("eduDetails") as FormArray).push(formGroup);
  }

  addSkillsFormControls(i) {
    const formControl = this.formBuilder.control("My Skill", [
      fc => {
        return fc.value.length > 6
          ? {
              maxErr: true
            }
          : null;
      }
    ]);
    const fg = (this.personForm.get("eduDetails") as FormArray).controls[i];

    (fg.get("skills") as FormArray).push(formControl);
  }
}
