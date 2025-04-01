import { Component, OnInit } from '@angular/core';
import { StudentProfileService } from '../../services/student-profile.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SkillComponent } from '../skill/skill.component';
import { EducationComponent } from '../education/education.component';
<<<<<<< HEAD
=======
import { ExtraActComponent } from '../extra-act/extra-act.component';
import { WorkExpComponent } from '../work-exp/work-exp.component';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { ExportCvComponent } from '../export-cv/export-cv.component';
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b

@Component({
  selector: 'app-studentProfile',
  templateUrl: './studentProfile.component.html',
  styleUrls: ['./studentProfile.component.css']
})
export class StudentProfileComponent implements OnInit {
  userData: any = {};
  studentData:any={};
<<<<<<< HEAD
=======
  f10:any={};
  enhancer:any={};
  p: number = 1;
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  constructor(private studentProfileService: StudentProfileService, private userService: UserService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUserDataAndInitializeCV();
<<<<<<< HEAD
=======
    this.studentProfileService.get10Skill().subscribe((skills) => {
      this.f10 = skills; // Assign the API response to the variable
      console.log(this.f10); // Check if the data is received correctly
    });
    this.studentProfileService.skillEnhancer().subscribe((enhancer) => {
      this.enhancer = enhancer; // Assign the API response to the variable
      console.log(this.enhancer); // Check if the data is received correctly
    });

>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  }

  fetchUserDataAndInitializeCV(): void {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }
<<<<<<< HEAD
  
=======
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
    this.userService.getUserData().subscribe({
      next: (userData) => {
        this.userData = userData;
        console.log('User data fetched:', userData);
<<<<<<< HEAD
  
=======
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
        this.studentProfileService.getStudentData().subscribe({
          next: (studentData) => {
            this.studentData = studentData;
            console.log('CV data fetched:', studentData);
          },
          error: (error) => console.error('Error fetching CV data:', error)
        });
      },
      error: (error) => console.error('Error fetching user data:', error)
    });
  }
  
  onUpdateSkill(skillId: number): void {
    const dialogRef = this.dialog.open(SkillComponent, {
      width: '400px',
      data: this.studentData.skills?.find((skill: any) => skill.id === skillId)
    });

    dialogRef.componentInstance.setFormData(dialogRef.componentInstance.data); // Pass data to form
  }

  onDeleteSkill(skillId: number): void {
    this.studentProfileService.deleteSkill(skillId).subscribe(
      () => {
        this.studentData.skills = this.studentData.skills?.filter((skill: any) => skill.id !== skillId);
      },
      (error) => {
        console.error('Error deleting skill:', error);
      }
    );
  }

  onAddSkill(): void {
    const dialogRef = this.dialog.open(SkillComponent, {
      width: '400px'
    });
<<<<<<< HEAD
    
  }
=======
    dialogRef.afterClosed().subscribe((skill) => {
      if (skill) {
        this.studentProfileService.get10Skill().subscribe((skills) => {
          this.f10 = skills;
        });
        this.fetchUserDataAndInitializeCV();
      }
    }); 
    
  }
  onAffectSkill(skillId:number): void {
    this.studentProfileService.affectSkill(skillId).subscribe(
      (response) => {
        this.fetchUserDataAndInitializeCV();
        this.studentProfileService.get10Skill().subscribe((skills) => {
          this.f10 = skills;
        });
        alert('Skill affected successfully:');
      },
      (error) => {
        alert('Error while affecting skill:'+ error);
      }
    );
  }
  onDisAffectSkill(skillId: number): void {
    this.studentProfileService.disAffectSkill(skillId).subscribe(
      (response) => {
        this.fetchUserDataAndInitializeCV();
        this.studentProfileService.get10Skill().subscribe((skills) => {
          this.f10 = skills;
        });
        alert('Skill Removed successfully:');
      },
      (error) => {
        alert('Error while Removing skill: '+ error);
      }
    );
  }
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b

  onUpdateEducation(educationId: number): void {
    const dialogRef = this.dialog.open(EducationComponent, {
      width: '500px',
      data: this.studentData.educations?.find((edu: any) => edu.id === educationId)
    });

    dialogRef.componentInstance.setFormData(dialogRef.componentInstance.data); // Pass data to form
<<<<<<< HEAD
=======
    dialogRef.afterClosed().subscribe((edu) => {
      if (edu) {
         this.fetchUserDataAndInitializeCV();
      }
    });
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  }

  onDeleteEducation(educationId: number): void {
    this.studentProfileService.deleteEducation(educationId).subscribe(
      () => {
        this.studentData.educations = this.studentData.educations?.filter((edu: any) => edu.id !== educationId);
      },
      (error) => {
        console.error('Error deleting education:', error);
      }
    );
  }

  onAddEducation(): void {
<<<<<<< HEAD
    const dialogRef = this.dialog.open(EducationComponent, {
      
=======
    const dialogRef = this.dialog.open(EducationComponent, { 
    });
    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
         this.fetchUserDataAndInitializeCV();
      }
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
    });
  }
  onUpdateProfile(): void {
    console.log('Updating profile...');
<<<<<<< HEAD
    // Navigate to update profile form or open modal
  }

  onUpdateBio(id: number): void {
    console.log('Updating bio for student ID:', id);
    // Open bio update modal or navigate to update page
  }

  onUpdateFieldOfStudy(id: number): void {
    console.log('Updating field of study for student ID:', id);
    // Open field of study update modal or navigate to update page
  }

  onUpdateDateOfBirth(id: number): void {
    console.log('Updating date of birth for student ID:', id);
    // Open date of birth update modal or navigate to update page
  }



  onUpdateActivity(activityId: number): void {
    console.log('Updating activity with ID:', activityId);
    // Open activity update modal or navigate to update page
=======
    const dialogRef = this.dialog.open(ProfileUpdateComponent, {
      width: '400px',
      data: { ...this.studentData, ...this.userData }
    });
    dialogRef.componentInstance.setFormData(dialogRef.componentInstance.data); // Pass data to form

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
         this.fetchUserDataAndInitializeCV();
      }
    }); 
  }
  onUpdateActivity(activityId: number): void {
    console.log('Updating activity with ID:', activityId);
    const dialogRef = this.dialog.open(ExtraActComponent, {
      width: '400px',
      data: this.studentData.extraActivities?.find((extraAct: any) =>extraAct.id === activityId)
      
      
    });

    dialogRef.componentInstance.setFormData(dialogRef.componentInstance.data); // Pass data to form
    dialogRef.afterClosed().subscribe((extraAct) => {
      if (extraAct) {
        // If a new work experience was returned, update the list
        this.fetchUserDataAndInitializeCV();
      }
    }); 
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  }

  onDeleteActivity(activityId: number): void {
    console.log('Deleting activity with ID:', activityId);
    this.studentProfileService.deleteExtraActivity(activityId).subscribe(
      () => {
        this.studentData.extraActivities = this.studentData.extraActivities?.filter((activity:any) => activity.id !== activityId); // Remove activity after deletion
      },
      (error) => {
        console.error('Error deleting activity:', error);
      }
    );
  }

  onAddActivity(): void {
    console.log('Adding new activity...');
<<<<<<< HEAD
    // Open activity add modal or navigate to add page
=======
    const dialogRef = this.dialog.open(ExtraActComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((extraAct) => {
      if (extraAct) {
        // If a new work experience was returned, update the list
        this.fetchUserDataAndInitializeCV();
      }
    }); 
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  }

  onUpdateWorkExperience(workId: number): void {
    console.log('Updating work experience with ID:', workId);
<<<<<<< HEAD
    // Open work experience update modal or navigate to update page
=======
    const dialogRef = this.dialog.open(WorkExpComponent, {
      data: this.studentData.workExperiences?.find((workExp: any) => workExp.id === workId)
    });

    dialogRef.componentInstance.setFormData(dialogRef.componentInstance.data); // Pass data to form
    dialogRef.afterClosed().subscribe((workExp) => {
      if (workExp) {
         this.fetchUserDataAndInitializeCV();
      }
    });
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  }

  onDeleteWorkExperience(workId: number): void {
    console.log('Deleting work experience with ID:', workId);
    this.studentProfileService.deleteWorkExperience(workId).subscribe(
      () => {
        this.studentData.workExperiences = this.studentData.workExperiences?.filter((work:any)=> work.id !== workId); // Remove work experience after deletion
      },
      (error) => {
        console.error('Error deleting work experience:', error);
      }
    );
  }

  onAddWorkExperience(): void {
    console.log('Adding new work experience...');
<<<<<<< HEAD
    // Open work experience add modal or navigate to add page
  }
=======
    const dialogRef = this.dialog.open(WorkExpComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((newWorkExp) => {
      if (newWorkExp) {
        // If a new work experience was returned, update the list
        this.fetchUserDataAndInitializeCV();
      }
    });
  }
  onExportPdf(): void {
    const dialogRef = this.dialog.open(ExportCvComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((selectedTemplate: string) => {
      if (selectedTemplate) {
        this.studentProfileService.exportPdf(this.userData, selectedTemplate);
      }
    });
  }
  
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b


}




 
