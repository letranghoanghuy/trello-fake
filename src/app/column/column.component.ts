import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { mapOrder } from 'src/share/sorts';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { initData } from 'src/actions/initData';
import { v4 as uuidv4 } from 'uuid';
import { ServerService } from '../services/server.service';
import Board, { Column } from '../models/data.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() board?: Column;
  @ViewChild('inputRef') valueInput: ElementRef;
  @ViewChild('valueAdd') cardInput: ElementRef;
  @Output() newItemEvent = new EventEmitter<any>();
  cards: any;
  connectedTo: any[] = [];
  currentData: any;
  isFirstClick: boolean = true;
  titleColumn: string;
  valueCard: string = "";
  isShow = false;

  columns: Column[];

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.getColumns(this.board.key);
    this.titleColumn = this.board.title;

    // this.cards = mapOrder(this.item.cards, this.item.cardOrder, 'id');
    // const boardInitData = initData.boards.find(item => item.id === 'board-1');
    // if (boardInitData) {
    //   this.currentData = boardInitData.columns;
    //   for (let i of this.currentData) {
    //     this.connectedTo.push(i.id);
    //   }
    // }
  }

  getColumns(keyBoard: string): void {
    this.server.getAllColumns(keyBoard).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.columns = data;
      for (let i of this.columns) {
        this.connectedTo.push(i.key);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  selectAllText(event) {
    if (this.isFirstClick) {
      event.target.select();
    } else {
      setTimeout(() => {
        this.valueInput.nativeElement.setSelectionRange(this.titleColumn.length, this.titleColumn.length);
      }, 0);
    }
    this.isFirstClick = false;
    // event.target.focus();
  }

  changeTitle(event) {
    this.titleColumn = event.target.value;
  }

  handleClickOutside() {
    this.isFirstClick = true;
    const newColumn = {
      ...this.board,
      title: this.titleColumn,
      _destroy: false
    }
    this.newItemEvent.emit(newColumn);
  }

  remove() {
    let text = "Remove a column!\nAre you sure to remove this column: " + this.board.title;
    if (confirm(text) == true) {
      const newColumn = {
        ...this.board,
        _destroy: true
      }
      this.newItemEvent.emit(newColumn);
    } else {
      return;
    }
  }

  showForm() {
    this.isShow = true;
    setTimeout(() => {
      this.cardInput.nativeElement.focus();
    }, 0);
  }

  // addCard() {
  //   if (!this.valueCard) {
  //     setTimeout(() => {
  //       this.cardInput.nativeElement.focus();
  //     }, 0);
  //     return;
  //   }
  //   const newCard = {
  //     id: uuidv4(),
  //     boardId: this.item.boardId,
  //     columnId: this.item.id,
  //     title: this.valueCard,
  //     image: null
  //   }

  //   let newColumn = { ...this.item };
  //   newColumn.cards = [...newColumn.cards, newCard];
  //   newColumn.cardOrder = newColumn.cards.map(card => card.id);
  //   this.newItemEvent.emit(newColumn);
  // }

}
