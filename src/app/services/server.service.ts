import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import Board, { Card, Column } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private boardPath = '/boards';
  boardsRef: AngularFireList<Board>;
  boardRef: AngularFireObject<Board>;

  private columnPath = '';
  columnsRef: AngularFireList<Column>;

  private cardPath = '';
  cardsRef: AngularFireList<Card>;

  constructor(private db: AngularFireDatabase) {
    this.boardsRef = db.list(this.boardPath);
  }

  public getAllBoards(): AngularFireList<Board> {
    return this.boardsRef;
  }

  public getBoard(keyBoard: string) {
    this.boardRef = this.db.object(this.boardPath + '/' + keyBoard);
    return this.boardRef;
  }

  public createBoard(board: Board): any {
    return this.boardsRef.push(board);
  }

  public updateBoard(keyBoard: string, value: any): Promise<void> {
    return this.boardsRef.update(keyBoard, value);
  }

  public deleteBoard(keyBoard: string): Promise<void> {
    return this.boardsRef.remove(keyBoard);
  }

  private selectColumnPath(keyBoard: string) {
    this.columnPath = this.boardPath + "/" + keyBoard + '/columns';
    this.columnsRef = this.db.list(this.columnPath);
  }

  public getAllColumns(keyBoard: string): AngularFireList<Column> {
    this.selectColumnPath(keyBoard);
    return this.columnsRef;
  }

  public createColumn(column: Column, keyBoard: string): any {
    this.selectColumnPath(keyBoard);
    return this.columnsRef.push(column);
  }

  public updateColumn(keyBoard: string, keyColumn: string, value: any): Promise<void> {
    this.selectColumnPath(keyBoard);
    return this.columnsRef.update(keyColumn, value);
  }

  public deleteColumn(keyBoard: string, keyColumn: string): Promise<void> {
    this.selectColumnPath(keyBoard);
    return this.columnsRef.remove(keyColumn);
  }

  private selectCardPath(keyBoard: string, keyColumn: string) {
    this.cardPath = this.boardPath + "/" + keyBoard + '/columns/' + keyColumn + '/cards';
    this.cardsRef = this.db.list(this.cardPath);
  }

  public getAllCards(keyBoard: string, keyColumn: string): AngularFireList<Card> {
    this.selectCardPath(keyBoard, keyColumn);
    return this.cardsRef;
  }

  public createCard(card: Card, keyBoard: string, keyColumn: string): any {
    this.selectCardPath(keyBoard, keyColumn);
    return this.cardsRef.push(card);
  }

  public updateCard(keyBoard: string, keyColumn: string, keyCard: string, value: any): Promise<void> {
    this.selectCardPath(keyBoard, keyColumn);
    return this.cardsRef.update(keyCard, value);
  }

  public deleteCard(keyBoard: string, keyColumn: string, keyCard: string): Promise<void> {
    this.selectCardPath(keyBoard, keyColumn);
    return this.cardsRef.remove(keyCard);
  }

}
