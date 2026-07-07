import { Component } from '@angular/core';
import { Item, ItemService } from '../services/item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DSSIUI';
  items: Item[] = [];
  newItemName = '';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addItem() {
    if (!this.newItemName.trim()) return;
    const data:Item = {id: 0,name: this.newItemName};
    this.itemService.addItem(data).subscribe(() => {
      this.newItemName = '';
      this.loadItems();
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }
}
