import { inject, Injectable } from '@angular/core';
import { Sector } from '@core/types';
import { Observable } from 'rxjs';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  private api = inject(Api);

  getSectors(): Observable<Sector[]> {
    return this.api.getSectors();
  }

  getSectorById(id: number | string): Observable<Sector> {
    return this.api.getSectorById(id);
  }

  createSector(sector: Omit<Sector, 'id'>): Observable<Sector> {
    return this.api.createSector(sector);
  }

  updateSector(id: number | string, sector: Partial<Sector>): Observable<Sector> {
    return this.api.updateSector(id, sector);
  }

  deleteSector(id: number | string): Observable<boolean> {
    return this.api.deleteSector(id);
  }
}
