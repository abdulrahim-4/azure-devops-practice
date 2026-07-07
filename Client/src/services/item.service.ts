import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  private apiUrl = 'https://localhost:7235/api/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Item): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl,item);
  }

  updateItem(item: Item): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
