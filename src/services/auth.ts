import { User, AuthResponse, UpdateUserResponse } from '@/types';

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


class AuthService {
  // représente l’utilisateur actuellement connecté (ou null s’il n’y en a pas).
  private currentUser: User | null = null;
  // tableau qui contient tous les utilisateurs enregistrés
  // private users: User[] = [];
  private token: string | null = null;

  constructor() {
    // Charger les données depuis localStorage
    this.loadFromStorage();
  }

  //  On récupère depuis le localStorage
  private loadFromStorage() {
    // marketplace_user → l’utilisateur connecté.
    const userData = localStorage.getItem('marketplace_user');
    // marketplace_token → le token d'authentification.
    const tokenData = localStorage.getItem('marketplace_token');
    // Si ces données existent, on les désérialise (avec JSON.parse) pour recréer les objets en mémoire
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
    if (tokenData) {
      this.token = tokenData;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }
  //Chaque fois que l’utilisateur se connecte ou que son profil est mis à jour, cette fonction enregistre les infos dans le navigateur pour persister la session.
  private saveToStorage() {
    if (this.currentUser) {
      localStorage.setItem('marketplace_user', JSON.stringify(this.currentUser));
    }
    if (this.token) {
      localStorage.setItem('marketplace_token', this.token);
    }
  }

  async register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    type: 'vendeur' | 'client',
    phone?: string
  ): Promise<User> {
    // On lance la requête HTTP vers l’API pour enregistrer un nouvel utilisateur
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation,
      type,
      phone,
    });
    // On recupere le user connecté et le token , et on save dans le localStorage
    const { user, token } = response.data;
    this.currentUser = user;
    this.token = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.saveToStorage();

    return user;
  }

  async login(login: string, password: string): Promise<User> {
    // On lance la requête HTTP vers l’API pour connecter un utilisateur , et on save dans le localStorage
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, { login, password });

    const { user, token } = response.data;
    this.currentUser = user;
    this.token = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.saveToStorage();

    return user;
  }

  async logout(): Promise<void> {
    // On lance la requête HTTP vers l’API pour déconnecter l’utilisateur , et le supprimer du localStorage
    if (!this.token) return;
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    } finally {
      this.currentUser = null;
      this.token = null;
      localStorage.removeItem('marketplace_user');
      localStorage.removeItem('marketplace_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  // Retourne l’utilisateur actuellement connecté ou null s’il n’y en a pas
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Indique si un utilisateur est connecté ou non
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  // Indique si l’utilisateur connecté est un vendeur
  isVendor(): boolean {
    return this.currentUser?.type === 'vendeur';
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const response = await axios.put<User>(`${API_URL}/users/${this.currentUser.id}`, updates);

    this.currentUser = response.data;
    this.saveToStorage();

    return this.currentUser;
  }

}


export const authService = new AuthService();