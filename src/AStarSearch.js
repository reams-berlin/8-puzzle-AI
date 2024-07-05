import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class AStarSearch {
  constructor(initial) {
    this.initial = initial;
    this.state = this.initial;
    this.node = { state: this.state, cost: 0, heuristic: this.h1(this.state) };
    this.reached = new Map();
    this.reached.set(JSON.stringify(this.state), 0);
    this.frontier = new MinPriorityQueue((node) => this.f(node));
    this.frontier.enqueue(this.node);
    this.search();
  }

  search() {
    while (!this.frontier.isEmpty()) {
      this.getNext();
      if (this.isGoalState()) {
        this.solution = this.getPath({ ...this.node }, []);
        return;
      }
      this.expandNode();
    }
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
      if (value !== 0 && value !== index) {
        h1++;
      }
    }
    return h1;
  }

  f(n) {
    return n.heuristic + n.cost;
  }

  getNext() {
    this.node = this.frontier.dequeue();
    this.state = this.node.state;
  }

  expandNode() {
    const movable = this.getMovable();
    const blank = this.state.indexOf(0);
    for (let index of movable) {
      let newState = [...this.state];
      [newState[index], newState[blank]] = [newState[blank], newState[index]];
      let newCost = this.node.cost + 1;
      let newHeuristic = this.h1(newState);
      if (
        !this.reached.has(JSON.stringify(newState)) ||
        newCost < this.reached.get(JSON.stringify(newState))
      ) {
        this.reached.set(JSON.stringify(newState), newCost);
        this.frontier.enqueue({
          state: newState,
          parent: { ...this.node },
          cost: newCost,
          heuristic: newHeuristic,
        });
      }
    }
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
}

export default AStarSearch;
