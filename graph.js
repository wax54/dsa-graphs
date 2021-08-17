class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.addVertex(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    vertex.adjacent.forEach(node => node.adjacent.delete(vertex));
    // for(let node of this.nodes) {
    //   node.adjacent.delete(vertex);
    // }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const result = [];
    const searchStack = [start];
    const seen = new Set(searchStack);
    while(searchStack.length) {
      const currNode = searchStack.pop();
      result.push(currNode.value);

      for(let node of currNode.adjacent) {
        if(!seen.has(node)) {
          searchStack.push(node);
          seen.add(node);
        }
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const result = [];
    const searchQueue = [start];
    const seen = new Set(searchQueue);

    while(searchQueue.length) {
      const currNode = searchQueue.shift();
      result.push(currNode.value);
      for(let node of currNode.adjacent) {
        if(!seen.has(node)) {
          searchQueue.push(node);
          seen.add(node);
        }
      }
    }
    return result;
  }

  shortestPath(v1, v2) {
    let testSet = new Set([v1]);
    let counter = 0;
    while(!testSet.has(v2)) {
      let temp = new Set(testSet);
      for(let testedNode of testSet) {
        for(let node of testedNode.adjacent) {
          temp.add(node);
        }
      }
      //no new vertices added
      //should find a better way of determining "END";

      if (temp.size === testSet.size) return false;
      testSet = temp;
      counter++;
    }
    return counter;
  }

}


module.exports = {Graph, Node}