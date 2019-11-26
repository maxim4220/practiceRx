import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements OnChanges {
  @Input() options = [];
  @Input() searchValue: string;
  @Output() autocomplete = new EventEmitter<string>();

  public filteredValues = [];

  ngOnChanges() {
    this.filteredValues = this.searchValue.length < 2 ? [] : this.options.filter(v => v.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1).slice(0, 10);
  }

  public emitAutocomplete(val) {
    this.autocomplete.emit(val);
  }

}
