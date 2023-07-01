import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private startProcess = new Subject<void>();
  private endProcess = new Subject<void>();

  get startProcess$() {
    return this.startProcess.asObservable();
  }

  get endProcess$() {
    return this.endProcess.asObservable();
  }

  startLoading() {
    this.startProcess.next();
  }

  stopLoading() {
    this.endProcess.next();
  }
}
