import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NxWelcomeComponent, FormsModule], // Add FormsModule here
})
export class AppComponent {
  title = 'my-workspace';
  testValue: string = ''; // Add the `testValue` property to avoid errors
}
