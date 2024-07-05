class GreedySearch {
  constructor(initial) {
    this.initial = initial;
    this.state = this.initial;
    this.node = { state: this.state };
    this.reached = [this.state];
    this.frontier = [this.node];
    this.search();
  }

  search() {
    this.getNext();
    if (this.isGoalState()) {
      this.solution = this.getPath({ ...this.node }, []);
      return;
    }
    this.expandNode();
    this.search();
  }

  getPath(node, path) {
    if (node.parent) {
      return this.getPath(node.parent, [node.state, ...path]);
    } else {
      return [node.state, ...path];
    }
  }

  isGoalState() {
    for (let i = 0; i < 9; i++) {
      if (!(this.state[i] == i)) {
        return false;
      }
    }
    return true;
  }

  h1(state) {
    let h1 = 0;
    for (let [index, value] of state.entries()) {
      if (value !== 0 && !(index == value)) {
        h1++;
      }
    }
    return h1;
  }

  getNext() {
    let min = Infinity;
    let next = null;
    for (let node of this.frontier) {
      let h1 = this.h1(node.state);
      if (h1 < min) {
        min = h1;
        next = node;
      }
    }
    let index = this.frontier.indexOf(next);
    this.frontier.splice(index, 1);
    this.node = next;
    this.state = this.node.state;
  }

  notInReached(state) {
    for (let reached of this.reached) {
      if (state.every((value, index) => value === reached[index])) {
        return false;
      }
    }
    return true;
  }

  getMovable() {
    let blank = this.state.indexOf(0);
    let movable = [];
    switch (blank) {
      case 0:
        movable = [1, 3];
        break;
      case 1:
        movable = [0, 2, 4];
        break;
      case 2:
        movable = [1, 5];
        break;
      case 3:
        movable = [0, 4, 6];
        break;
      case 4:
        movable = [1, 3, 5, 7];
        break;
      case 5:
        movable = [2, 4, 8];
        break;
      case 6:
        movable = [3, 7];
        break;
      case 7:
        movable = [4, 6, 8];
        break;
      case 8:
        movable = [5, 7];
        break;
    }
    return movable;
  }

  expandNode() {
    const movable = this.getMovable();
    const blank = this.state.indexOf(0);
    const frontier = [];
    for (let index of movable) {
      let newState = [...this.state];
      [newState[index], newState[blank]] = [newState[blank], newState[index]];
      if (this.notInReached(newState)) {
        frontier.push({ state: newState, parent: { ...this.node } });
      }
      this.reached.push(newState);
    }
    this.frontier = [...this.frontier, ...frontier];
  }
}

export default GreedySearch;
