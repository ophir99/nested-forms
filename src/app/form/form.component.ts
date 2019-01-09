import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray } from "@angular/forms";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  personForm;
  data = {
    name: "Raj",
    email: "raj@email.com",
    parents: {
      mother: "Mother",
      father: "Father"
    },
    eduDetails: [
      {
        institute: "OneI",
        course: "Course1",
        yop: "10-10-2010",
        skills: ["Reading", "Playing", "Coding"]
      },
      {
        institute: "OneI",
        course: "Course1",
        yop: "10-10-2010",
        skills: ["Reading", "Playing", "Coding", "Running"]
      }
    ]
  };
  constructor(private formBuilder: FormBuilder) {
    this.personForm = this.formBuilder.group({
      name: [""],
      email: [""],
      parents: this.formBuilder.group({
        mother: [""],
        father: [""]
      }),
      eduDetails: this.formBuilder.array([])
    });
  }

  ngOnInit() {}

  addEduDetailsFormGroup() {
    const formGroup = this.formBuilder.group({
      institute: [""],
      course: [""],
      yearOfPassing: [""],
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

  showData() {
    console.log(this.personForm.value);
  }

  setData() {
    for (let i = 0; i < this.data.eduDetails.length; i++) {
      this.personForm.get("eduDetails").push(
        this.formBuilder.group({
          institute: [],
          course: [],
          yop: [],
          skills: this.formBuilder.array([])
        })
      );
      for (let j = 0; j < this.data.eduDetails[i].skills.length; j++) {
        this.personForm
          .get("eduDetails")
          .controls[i].get("skills")
          .push(this.formBuilder.control(""));
      }
    }
    this.personForm.setValue(this.data);
  }

  removeControl() {
    this.personForm.removeControl("name");
  }
}
