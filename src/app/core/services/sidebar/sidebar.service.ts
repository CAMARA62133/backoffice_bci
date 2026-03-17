import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isSidebarCollapsed = true;
  private _openSubMenus: Set<string> = new Set<string>();

  // Observables pour réagir aux changements
  private sidebarState = new BehaviorSubject<boolean>(this._isSidebarCollapsed);
  sidebarState$ = this.sidebarState.asObservable();

  private subMenusState = new BehaviorSubject<Set<string>>(this._openSubMenus);
  subMenusState$ = this.subMenusState.asObservable();

  constructor() {
    this.loadState();
  }

  get isSidebarCollapsed(): boolean {
    return this._isSidebarCollapsed;
  }

  set isSidebarCollapsed(value: boolean) {
    this._isSidebarCollapsed = value;
    this.sidebarState.next(value);
    localStorage.setItem('sidebarCollapsed', String(value));
  }

  get openSubMenus(): Set<string> {
    return this._openSubMenus;
  }

  toggleSubMenu(menuId: string): void {
    if (this._openSubMenus.has(menuId)) {
      this._openSubMenus.delete(menuId);
    } else {
      this._openSubMenus.add(menuId);
    }
    this.subMenusState.next(this._openSubMenus);
    this.saveSubMenus();
  }

  isSubMenuOpen(menuId: string): boolean {
    return this._openSubMenus.has(menuId);
  }

  closeAllSubMenus(): void {
    this._openSubMenus.clear();
    this.subMenusState.next(this._openSubMenus);
    this.saveSubMenus();
  }

  openSubMenu(menuId: string): void {
    this._openSubMenus.add(menuId);
    this.subMenusState.next(this._openSubMenus);
    this.saveSubMenus();
  }

  private loadState(): void {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed !== null) {
      this._isSidebarCollapsed = savedCollapsed === 'true';
      this.sidebarState.next(this._isSidebarCollapsed);
    }

    const savedSubMenus = localStorage.getItem('openSubMenus');
    if (savedSubMenus) {
      try {
        const arr = JSON.parse(savedSubMenus);
        this._openSubMenus = new Set(arr);
        this.subMenusState.next(this._openSubMenus);
      } catch (e) {
        console.error('Error parsing openSubMenus from localStorage', e);
      }
    }
  }

  private saveSubMenus(): void {
    localStorage.setItem(
      'openSubMenus',
      JSON.stringify(Array.from(this._openSubMenus)),
    );
  }
}
