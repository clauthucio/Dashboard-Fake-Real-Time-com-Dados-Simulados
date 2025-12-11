import { inject, Injectable } from '@angular/core';
import { Sector } from '@core/types';
import { Api } from '@shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  private api = inject(Api);

  getSectors(): Observable<Sector[]> {
    return this.api.getSectors();
  }

  createSector(sector: Omit<Sector, 'id'>): Observable<Sector> {
    return this.api.createSector(sector);
  }

  updateSector(id: number, sector: Partial<Sector>): Observable<Sector> {
    return this.api.updateSector(id, sector);
  }

  deleteSector(id: number): Observable<boolean> {
    return this.api.deleteSector(id);
  }
}
