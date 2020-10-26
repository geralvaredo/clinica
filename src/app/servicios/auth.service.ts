import { Injectable } from '@angular/core';
import {Usuario} from '../clases/usuario';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorLogin = 'ErrorLogin ->';
  errorVerificationEmailFireBase = 'ErrorVerificationEmailFireBase->';
  errorRegisterFireBase = 'ErrorRegisterFireBase ->';
  paginaLogin = '';
  logOutError = 'error';

  constructor(private afAuth: AngularFireAuth, private  router: Router) {
  }

  async login(usuario: Usuario): Promise<firebase.User> {
    try {
      const {user} = await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.pass);
      return user;
    } catch (error) {
      console.log(this.errorLogin, error);
    }
  }

  getStorage(): any{
    return sessionStorage.getItem('usuario');
  }

  guardarEnStorage(user): void {
    sessionStorage.setItem('usuario', JSON.stringify(user));
  }

  async register(usuario: Usuario): Promise<firebase.User> {
    try {
      const {user} = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass);
      await this.verificationEmailFirebase();
      return user;
    } catch (error) {
      console.log(this.errorRegisterFireBase, error);
    }
  }



  async verificationEmailFirebase(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log(this.errorVerificationEmailFireBase, error);
    }
  }


  async logOut(): Promise<void> {
    await this.afAuth.signOut().then(res => {
       sessionStorage.clear();
       this.redirect(this.paginaLogin);
       return res;
    }).catch(error => {
      console.log(error);
      this.redirect(this.logOutError);
    });

  }

  public redirect(router: string): void {
    this.router.navigate([router]);
  }
}
