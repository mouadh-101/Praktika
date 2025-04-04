import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit {
  messages: any[] = [];
  content: string = '';
  senderId!: string;
  receiverId!: string;
  receiverName!: string;
  connected = false;
  users: any[] = [];  // Tableau pour stocker les utilisateurs
  usersLastSeen: { [key: string]: string } = {}; // Un dictionnaire clé-valeur pour stocker la dernière connexion

  typingUsers: { [key: string]: boolean } = {}; // Stocke les utilisateurs en train d'écrire

  isTyping: boolean = false;
  typingUser: string = '';
  

  constructor(
    private chatService: ChatService,
    private userService: UserService ,
    private authService: AuthService ,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    // Récupérer les utilisateurs
    this.userService.getUsers().subscribe((users) => {
      this.users = users;  // Stocker la liste des utilisateurs dans le tableau users
      console.log('Liste des utilisateurs:', this.users); // Pour déboguer
      this.loadLastSeenInfo(); // Charger les informations de dernier accès
    });
   this.getUserid();
  // 🔹 Écoute les utilisateurs en ligne
 // 🔹 Mise à jour automatique des utilisateurs en ligne
 this.chatService.getOnlineUsers().subscribe(onlineUsers => {
  this.users.forEach(user => {
    user.isOnline = onlineUsers.includes(user.userId);
  });
});
  
  }

  send(): void {
    const message = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: this.content
    };

    this.chatService.sendMessage(message);
    this.messages.push(message);
    
    this.content = '';
   
  }
 
  // Méthode pour sélectionner un utilisateur (et affecter son ID au receiverId)
  selectReceiver(userId: string) {
    this.receiverId = userId;  // Mettre à jour l'ID du destinataire
    console.log('ID du destinataire sélectionné:', this.receiverId);
    
    // Une fois le destinataire sélectionné, tu peux charger l'historique des messages
    this.loadMessageHistory();
  }

  // Méthode pour récupérer l'historique des messages
  loadMessageHistory() {
    if (this.senderId && this.receiverId) {
      this.chatService.getMessageHistory(this.senderId, this.receiverId).subscribe(
        (messages) => {
          this.messages = messages;
          console.log('Historique des messages:', this.messages);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'historique des messages', error);
        }
      );
    }
  }
  loadLastSeenInfo(): void {
    const lastSeenRequests = this.users.map(user =>
      this.authService.getLastSeen(user.userId)
    );

    forkJoin(lastSeenRequests).subscribe(lastSeenData => {
      this.users.forEach((user, index) => {
        this.usersLastSeen[user.userId] = lastSeenData[index] || 'Inconnue';
      });
    });
    this.chatService.getOnlineUsers().subscribe(onlineUsers => {
      onlineUsers.forEach(userId => {
        this.usersLastSeen[userId] = "Online";
      });
     
    });
    
  }
  getUserid(): void {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.senderId = userData.userId;
        console.log('ID de l\'utilisateur connecté:', this.senderId);

        // 🔥 Connexion automatique au WebSocket
        this.chatService.connect(this.senderId);
        this.chatService.receiveMessages().subscribe(msg => {
          this.messages.push(msg);
        });


       
        this.chatService.receiveTyping().subscribe(({ senderId }) => {
          if (senderId !== this.senderId) {
            this.isTyping = true;
            this.typingUser = this.users.find(u => u.userId === senderId)?.name || 'Quelqu’un';
      
            // Supprime l’indicateur après 3 secondes d’inactivité
            setTimeout(() => this.isTyping = false, 3000);
          }
        });
        
        this.connected = true;
        this.loadUsers();

      },
      (error) => {
        console.error('Erreur lors de la récupération du rôle utilisateur', error);
      }
    );
  }
  closeChat(): void {
    this.receiverId = '';
    this.messages = [];
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      // Exclure l'utilisateur connecté de la liste des utilisateurs
      this.users = users.filter(user => user.userId !== this.senderId);

      this.loadLastSeenInfo(); // Charger les informations de dernier accès après avoir filtré les utilisateurs
    });
  }


/** 📌 Indiquer que l'utilisateur est en train d'écrire */
  onTyping(): void {
    if (this.receiverId) {
      this.chatService.sendTyping({ senderId: this.senderId, receiverId: this.receiverId });
    }
  }
  
  isUserListOpen: boolean = true;  // Initialiser à 'true' pour que la liste soit visible par défaut
  

  toggleUserList() {
    this.isUserListOpen = !this.isUserListOpen;
  }
}
