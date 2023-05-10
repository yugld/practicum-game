import Player from './Player'

export class Queue {
   _oldestIndex: number
   _newestIndex: number
   _storage: any

  constructor () {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
  }

  size(){
    return this._newestIndex - this._oldestIndex;
  }

  enqueue(data: Player){
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
  }

  dequeue() {
    const oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex
    let deletedData;

        if (oldestIndex !== newestIndex) {
            deletedData = this._storage[oldestIndex];
            delete this._storage[oldestIndex];
            this._oldestIndex++;
            return deletedData;
        }
  }
}
