import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { initData } from 'src/actions/initData';
import { mapOrder } from 'src/share/sorts';
import * as _ from 'lodash';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { ServerService } from './services/server.service';
import Board, { Column } from './models/data.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('valueAdd') valueInputElement: ElementRef;
  @ViewChild('valueAddBoard') valueAddBoardElement: ElementRef;
  @ViewChild('inputRef') BoardElement: ElementRef;

  // board: any = {};
  // columns: any = [];
  item: any;
  currentData: any;

  isShow: boolean = false;
  showAddBoard: boolean = false;
  valueInput: string = '';
  valueBoard: string = '';

  boards?: Board[];
  currentBoard: Board;

  columns: Column[];

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.getBoards();
    // const boardInitData = initData.boards.find(item => item.id === 'board-1');
    // if (boardInitData) {
    //   this.board = boardInitData;
    //   this.columns = mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id');
    // }
  }

  drop(event: CdkDragDrop<Column[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    // this.item = event.previousContainer.data[event.currentIndex];
    // this.currentData = event.previousContainer.data;
    // console.log(this.currentData);
    // console.log(this.item);
  }

  // addList() {
  //   if (!this.valueInput) {
  //     setTimeout(() => {
  //       this.valueInputElement.nativeElement.focus();
  //     }, 0);
  //     return;
  //   }
  //   const _columns = _.cloneDeep(this.columns);
  //   _columns.push({
  //     id: uuidv4(),
  //     boardId: this.board.id,
  //     title: this.valueInput,
  //     cards: []
  //   });
  //   this.columns = _columns;
  //   this.valueInput = '';
  //   setTimeout(() => {
  //     this.valueInputElement.nativeElement.focus();
  //   }, 0);
  // }

  showForm() {
    this.isShow = true;
    setTimeout(() => {
      this.valueInputElement.nativeElement.focus();
    }, 0);
  }

  showBoard() {
    this.showAddBoard = true;
    setTimeout(() => {
      this.valueAddBoardElement.nativeElement.focus();
    }, 0);
  }

  onUpdate(value: any) {
    const columnIDUpdate = value.id;
    let newCols = [...this.columns];
    let index = newCols.findIndex(col => col.key === columnIDUpdate);
    if (value._destroy) {
      newCols.splice(index, 1);
    } else {
      newCols[index] = value;
    }
    this.columns = newCols;
  }


  getBoards(): void {
    this.server.getAllBoards().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.boards = data;
      this.currentBoard = this.boards[0]
      this.getColumns(this.currentBoard.key);
    });
  }

  addBoard() {
    if (!this.valueBoard) {
      setTimeout(() => {
        this.valueAddBoardElement.nativeElement.focus();
      }, 0);
      return;
    }
    const board: Board = {
      title: this.valueBoard,
      columns: []
    }
    this.server.createBoard(board).then(() => {
      this.valueBoard = '';
      setTimeout(() => {
        this.valueAddBoardElement.nativeElement.focus();
      }, 0);
    })
  }

  removeBoard(keyBoard: string, title: string) {
    let text = "Remove a board!\nAre you sure to remove this board: " + title;
    if (confirm(text) == true) {
      this.server.deleteBoard(keyBoard)
        .then(() => {
        })
        .catch(err => console.log(err));
    } else {
      return;
    }
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
    });
  }

  addColumn() {
    if (!this.valueInput) {
      setTimeout(() => {
        this.valueInputElement.nativeElement.focus();
      }, 0);
      return;
    }
    const column: Column = {
      boardId: this.currentBoard.key,
      title: this.valueInput,
      cards: []
    }
    this.server.createColumn(column, this.currentBoard.key).then(() => {
      this.valueInput = '';
      setTimeout(() => {
        this.valueInputElement.nativeElement.focus();
      }, 0);
    })
  }

}
