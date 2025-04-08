import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private roleSubject = new BehaviorSubject<'admin' | 'user' | null>(this.getStoredRole());
  public role$ = this.roleSubject.asObservable();
  private roleKey = 'user_role';

  private getStoredRole(): 'admin' | 'user' | null {
    return (localStorage.getItem('app_role') as 'admin' | 'user') || null;
  }

  login(role: 'admin' | 'user' | null): void {
    localStorage.setItem('role', role || '');
    this.roleSubject.next(role);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  clearRole(): void {
    localStorage.removeItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!this.getRole();
  }

  isadmin(): boolean {
    return this.getRole() === 'admin';
  }

  isuser(): boolean {
    return this.getRole() === 'user';
  }

  logout() {
    localStorage.removeItem('app_role');
    this.roleSubject.next(null);
  }
}
