import { decorate, observable } from "mobx"

export default class ResultStore {
  constructor() {
    this.resultsList = {
      results: []
  };
  let basicResults = Object.keys(this.resultsList);

  }
}

decorate(ResultStore, {
  colors: observable,
  currentColorSelected: observable
});