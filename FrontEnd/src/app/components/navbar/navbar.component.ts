import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  showDropdown = false;
<<<<<<< HEAD

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLogedIn();
    if (this.isLoggedIn) {
      this.userService.getUserData().subscribe({
        next: (data) => this.user = data,
        error: (err) => console.error('Failed to fetch user data', err)
      });
    }
=======
  userRole='';

  notificationCount: number = 0;  // Compteur de notifications
  notificationsVisible: boolean = false;  // Détermine si les notifications sont visibles
  notifications: any[] = [];
  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private userService:UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getUserRole();
      this.userService.getUserData().subscribe({
        next: (data) => this.user = data,
        error: (err) => console.error('Failed to fetch user data', err)
        
      });
    }

     // Abonnement aux notifications
     this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      this.notificationCount = notifications.length;  // Mettre à jour le compteur de notifications
    });

    // Connexion au WebSocket pour recevoir les notifications
    this.notificationService.connectToWebSocket();
  }
  toggleNotifications(): void {
    this.notificationsVisible = !this.notificationsVisible;  // Bascule entre afficher/masquer les notifications
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
<<<<<<< HEAD
  }
}
=======
    this.router.navigate(['/sign-in']);
    
  }
  getUserRole() {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.userRole = userData.role; 
        console.log('Rôle de l\'utilisateur:', this.userRole);
      },
      (error) => {
        console.error('Erreur lors de la récupération du rôle utilisateur', error);
      }
    );
  }
}
>>>>>>> 364d59e95ab09b5de510e2f347ee51853e0eb61b
