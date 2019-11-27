import { Component, Input, OnChanges, Output, EventEmitter, TemplateRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent {
  // @Input() options = [];
  // @Input() searchValue: string;
  // @Output() autocomplete = new EventEmitter<string>();
  // public filteredValues = [];
  // ngOnChanges() {
  //   this.filteredValues = this.searchValue.length < 2 ? [] : this.options.filter(v => v.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1).slice(0, 10);
  // }
  // public emitAutocomplete(val) {
  //   this.autocomplete.emit(val);
  // }

  @Input() ngTemplateOutlet: TemplateRef<any> | null;

}
