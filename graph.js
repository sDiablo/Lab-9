class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }

    addEdge(source, destination) {
        this.adjList.get(source).push(destination);
        this.adjList.get(destination).push(source); // Assuming it's an undirected graph
    }

    getVertices() {
        return Array.from(this.adjList.keys());
    }

    getNeighbors(vertex) {
        return this.adjList.get(vertex);
    }
}

function BFS(graph, startVertex) {
    const visited = new Set();
    const queue = [];
    const bfsInfo = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
        const currentVertex = queue.shift();
        const neighbors = graph.getNeighbors(currentVertex);
        bfsInfo.push({
            currentVertex: currentVertex,
            bfsNumber: bfsInfo.length + 1,
            queue: queue.slice() // Copy the queue
        });

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return bfsInfo;
}

// Вхідні дані
const edges = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['B', 'E'],
    ['C', 'F']
];

const graph = new Graph();

// Додавання вершин та ребер
for (const [source, destination] of edges) {
    graph.addVertex(source);
    graph.addVertex(destination);
    graph.addEdge(source, destination);
}

// Початкова вершина для обходу
const startVertex = 'A';

// Виклик функції обходу графу вшир
const bfsInfo = BFS(graph, startVertex);

// Виведення результатів
console.log("Протокол обходу (BFS):");
console.log("Вершина | BFS-номер | Черга");
for (const info of bfsInfo) {
    console.log(`${info.currentVertex} | ${info.bfsNumber} | ${info.queue}`);
}
