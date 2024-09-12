import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {}

  // Connexion
  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/user/signIn', { email, password }).pipe(
      tap(response => {
        this.storeTokens(response.accessToken, response.refreshToken);
      }),
      catchError(this.handleError)
    );
  }

  // Déconnexion
  signOut(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Stocker les tokens dans le localStorage
  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // Obtenir le token d'accès
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  // Obtenir le token de rafraîchissement
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Vérifier si le token d'accès est expiré (décoder le JWT et vérifier l'expiration)
  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Math.floor(Date.now() / 1000);
  }

  // Renouveler l'Access Token avec le Refresh Token
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('No refresh token available');
    }

    return this.http.post<any>('/api/user/token', { refreshToken }).pipe(
      tap(response => {
        this.storeTokens(response.accessToken, refreshToken); // Mettre à jour l'Access Token
      }),
      catchError(this.handleError)
    );
  }

  // Gérer les erreurs HTTP
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}