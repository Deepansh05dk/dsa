import type { LeetCodeProblem } from '../../types/problem';

export const graphGeneralProblems: LeetCodeProblem[] = [
  {
    id: 200,
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    pattern: 'graph-general',
    category: 'Graph General',
    statement: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1'
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is \'0\' or \'1\'.'
    ],
    bruteForce: {
      name: 'Auxiliary Visited Matrix BFS',
      code: `function numIslandsAux(grid: string[][]): number {
  const m = grid.length, n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  let count = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1' && !visited[r][c]) {
        count++;
        const q: Array<[number, number]> = [[r, c]];
        visited[r][c] = true;
        while (q.length > 0) {
          const [cr, cc] = q.shift()!;
          const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
          for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === '1' && !visited[nr][nc]) {
              visited[nr][nc] = true;
              q.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return count;
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N)'
      },
      explanation: 'Traverse grid and maintain an M x N boolean visited matrix to record traversed land cells.'
    },
    optimal: {
      name: 'In-Place Sink Flood Fill (DFS)',
      code: `function numIslands(grid: string[][]): number {
  let count = 0;
  const m = grid.length;
  const n = grid[0].length;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // Sink the land in-place
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N) worst case recursion stack'
      },
      explanation: 'Whenever unvisited land \'1\' is encountered, increment count and sink all adjacent connected lands to \'0\' recursively via DFS.',
      whyOptimalIsPreferred: 'Modifies grid cells in-place to avoid allocating an auxiliary O(M*N) visited matrix.',
      patternInvariant: 'Connected components in a grid can be marked in-place by transforming visited nodes directly into water.'
    },
    defaultInputDescription: 'grid = [["1","1","0"],["1","0","0"],["0","0","1"]]'
  },
  {
    id: 130,
    slug: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'Medium',
    pattern: 'graph-general',
    category: 'Graph General',
    statement: 'Given an m x n matrix board containing \'X\' and \'O\', capture all regions that are 4-directionally surrounded by \'X\'. A region is captured by flipping all \'O\'s into \'X\'s in that surrounded region.',
    examples: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
        explanation: 'Notice that an \'O\' should not be flipped if: - It is on the border, or - It is adjacent to an \'O\' that should not be flipped. The bottom \'O\' is on the border, so it is not flipped.'
      },
      {
        input: 'board = [["X"]]',
        output: '[["X"]]'
      }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 200',
      'board[i][j] is \'X\' or \'O\'.'
    ],
    bruteForce: {
      name: 'Internal Island Boundary Traversal with Backtracking',
      code: `function solveBrute(board: string[][]): void {
  const m = board.length, n = board[0].length;
  for (let r = 1; r < m - 1; r++) {
    for (let c = 1; c < n - 1; c++) {
      if (board[r][c] === 'O') {
        const cells: Array<[number, number]> = [];
        let touchesBorder = false;
        const visited = new Set<string>();
        function dfs(cr: number, cc: number) {
          if (cr < 0 || cr >= m || cc < 0 || cc >= n) return;
          if (board[cr][cc] !== 'O') return;
          const key = \`\${cr},\${cc}\`;
          if (visited.has(key)) return;
          visited.add(key);
          cells.push([cr, cc]);
          if (cr === 0 || cr === m - 1 || cc === 0 || cc === n - 1) touchesBorder = true;
          dfs(cr + 1, cc); dfs(cr - 1, cc); dfs(cr, cc + 1); dfs(cr, cc - 1);
        }
        dfs(r, c);
        if (!touchesBorder) {
          for (const [xr, xc] of cells) board[xr][xc] = 'X';
        }
      }
    }
  }
}`,
      complexity: {
        time: 'O(M^2 * N^2)',
        space: 'O(M * N)'
      },
      explanation: 'Initiates DFS from every internal cell and checks if the connected component reaches any border.'
    },
    optimal: {
      name: 'Boundary Inward Flood Fill (Escape Sentinel Marking)',
      code: `function solve(board: string[][]): void {
  const m = board.length;
  const n = board[0].length;
  if (m <= 2 || n <= 2) return;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') return;
    board[r][c] = 'E'; // Mark as un-capturable Escaped cell
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // Step 1: Flood fill from boundary 'O' cells
  for (let r = 0; r < m; r++) {
    if (board[r][0] === 'O') dfs(r, 0);
    if (board[r][n - 1] === 'O') dfs(r, n - 1);
  }
  for (let c = 0; c < n; c++) {
    if (board[0][c] === 'O') dfs(0, c);
    if (board[m - 1][c] === 'O') dfs(m - 1, c);
  }

  // Step 2: Flip remaining internal 'O' -> 'X', and restore 'E' -> 'O'
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'E') {
        board[r][c] = 'O';
      }
    }
  }
}`,
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N) recursion stack'
      },
      explanation: 'Invert the problem: only \'O\'s connected to the boundary survive. Flood-fill from boundary cells, marking them as \'E\'. Any remaining \'O\'s must be fully surrounded and are flipped to \'X\'. Finally restore \'E\' back to \'O\'.',
      whyOptimalIsPreferred: 'Linear O(M*N) time by starting flood fills only from outer perimeter cells rather than inspecting every internal island.',
      patternInvariant: 'Complementary boundary analysis: an island is surrounded if and only if it has no path to any border cell.'
    },
    defaultInputDescription: 'board = 4x4 matrix with surrounded center Os'
  },
  {
    id: 133,
    slug: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'Medium',
    pattern: 'graph-general',
    category: 'Graph General',
    statement: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.',
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: '[[2,4],[1,3],[2,4],[1,3]]',
        explanation: 'There are 4 nodes in the graph: Node 1 -> [2, 4], Node 2 -> [1, 3], Node 3 -> [2, 4], Node 4 -> [1, 3].'
      },
      {
        input: 'adjList = [[]]',
        output: '[[]]'
      },
      {
        input: 'adjList = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 <= Node.val <= 100',
      'Node.val is unique for each node.',
      'There are no repeated edges and no self-loops in the graph.',
      'The Graph is connected and all nodes can be visited starting from the given node.'
    ],
    bruteForce: {
      name: 'Two-Pass Node Allocation and Edge Linking',
      code: `function cloneGraphBrute(node: any): any {
  if (!node) return null;
  const nodes = new Map<number, any>();
  const visited = new Set<number>();
  function collect(curr: any) {
    if (!curr || visited.has(curr.val)) return;
    visited.add(curr.val);
    nodes.set(curr.val, { val: curr.val, neighbors: [] });
    for (const nb of curr.neighbors) collect(nb);
  }
  collect(node);
  const visited2 = new Set<number>();
  function link(curr: any) {
    if (!curr || visited2.has(curr.val)) return;
    visited2.add(curr.val);
    for (const nb of curr.neighbors) {
      nodes.get(curr.val).neighbors.push(nodes.get(nb.val));
      link(nb);
    }
  }
  link(node);
  return nodes.get(node.val);
}`,
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      },
      explanation: 'First DFS pass collects all nodes into a map; second DFS pass constructs neighbor edges.'
    },
    optimal: {
      name: 'Single-Pass DFS with Cloned Node Memoization Map',
      code: `function cloneGraph(node: any): any {
  if (!node) return null;
  const visited = new Map<any, any>();

  function dfs(curr: any): any {
    if (visited.has(curr)) {
      return visited.get(curr);
    }

    const copy = { val: curr.val, neighbors: [] as any[] };
    visited.set(curr, copy);

    for (const neighbor of curr.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      },
      explanation: 'Use a hash map mapping original nodes to cloned copies. DFS visits each node and recursively clones unvisited neighbors, handling graph cycles cleanly in O(V + E) time.',
      whyOptimalIsPreferred: 'Single recursive pass that resolves cyclic graph dependencies seamlessly using memoization.',
      patternInvariant: 'Graph cloning invariant: map originalNode -> clonedNode prevents infinite recursion in cyclic graphs.'
    },
    defaultInputDescription: 'adjList = [[2, 4], [1, 3], [2, 4], [1, 3]]'
  },
  {
    id: 399,
    slug: 'evaluate-division',
    title: 'Evaluate Division',
    difficulty: 'Medium',
    pattern: 'graph-general',
    category: 'Graph General',
    statement: 'You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string representing a single variable. You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?. Return the answers to all queries. If a single answer cannot be determined, return -1.0.',
    examples: [
      {
        input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
        output: '[6.00000,0.50000,-1.00000,1.00000,-1.00000]',
        explanation: 'Given a / b = 2.0, b / c = 3.0. queries: a / c = 6.0, b / a = 0.5, a / e = -1.0, a / a = 1.0, x / x = -1.0.'
      }
    ],
    constraints: [
      '1 <= equations.length <= 20',
      'equations[i].length == 2',
      '1 <= |Ai|, |Bi| <= 5',
      'values.length == equations.length',
      '0.0 < values[i] <= 20.0',
      '1 <= queries.length <= 20',
      'queries[i].length == 2',
      '1 <= |Cj|, |Dj| <= 5',
      'Ai, Bi, Cj, Dj consist of lower case English letters and digits.'
    ],
    bruteForce: {
      name: 'Unindexed Equation Substitution Search',
      code: `function calcEquationBrute(equations: string[][], values: number[], queries: string[][]): number[] {
  return queries.map(([start, end]) => {
    const visited = new Set<string>();
    function search(curr: string, val: number): number {
      if (curr === end) return val;
      visited.add(curr);
      for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        if (a === curr && !visited.has(b)) {
          const res = search(b, val * values[i]);
          if (res !== -1.0) return res;
        }
        if (b === curr && !visited.has(a)) {
          const res = search(a, val * (1.0 / values[i]));
          if (res !== -1.0) return res;
        }
      }
      return -1.0;
    }
    const hasStart = equations.some(([a, b]) => a === start || b === start);
    return hasStart ? search(start, 1.0) : -1.0;
  });
}`,
      complexity: {
        time: 'O(Q * E!)',
        space: 'O(V)'
      },
      explanation: 'Scans raw equation lists on each step to trace transformation chains.'
    },
    optimal: {
      name: 'Weighted Directed Adjacency Graph DFS Traversal',
      code: `function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const graph = new Map<string, Map<string, number>>();

  // Step 1: Build bidirectional weighted graph
  for (let i = 0; i < equations.length; i++) {
    const [u, v] = equations[i];
    const val = values[i];

    if (!graph.has(u)) graph.set(u, new Map());
    if (!graph.has(v)) graph.set(v, new Map());

    graph.get(u)!.set(v, val);
    graph.get(v)!.set(u, 1.0 / val);
  }

  // Step 2: DFS path finding for each query
  function dfs(curr: string, target: string, visited: Set<string>): number {
    if (!graph.has(curr) || !graph.has(target)) return -1.0;
    if (curr === target) return 1.0;
    visited.add(curr);

    const neighbors = graph.get(curr)!;
    for (const [neighbor, weight] of neighbors.entries()) {
      if (!visited.has(neighbor)) {
        const product = dfs(neighbor, target, visited);
        if (product !== -1.0) {
          return weight * product;
        }
      }
    }

    return -1.0;
  }

  return queries.map(([src, dst]) => dfs(src, dst, new Set<string>()));
}`,
      complexity: {
        time: 'O(Q * (V + E))',
        space: 'O(V + E)'
      },
      explanation: 'Model variables as vertices. Edge u -> v has weight val, edge v -> u has weight 1/val. A query evaluates to the product of edge weights along any path from start to end, found via DFS in O(V + E) time.',
      whyOptimalIsPreferred: 'Fast graph pathfinding with adjacency lookups in O(Q * (V + E)) rather than scanning the raw equations array repeatedly.',
      patternInvariant: 'Transitive multiplicative path invariant: path weight product (a/b) * (b/c) = (a/c).'
    },
    defaultInputDescription: 'equations = [["a","b"],["b","c"]], values = [2.0, 3.0], queries = [["a","c"], ["b","a"]]'
  },
  {
    id: 207,
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    pattern: 'graph-general',
    category: 'Graph General',
    statement: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return true if you can finish all courses. Otherwise, return false.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        output: 'false',
        explanation: 'To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    bruteForce: {
      name: 'Unmemoized Cycle Search from Every Node',
      code: `function canFinishBrute(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [c, p] of prerequisites) adj[p].push(c);
  for (let start = 0; start < numCourses; start++) {
    const visited = new Set<number>();
    function hasCycle(curr: number): boolean {
      if (visited.has(curr)) return true;
      visited.add(curr);
      for (const next of adj[curr]) {
        if (hasCycle(next)) return true;
      }
      visited.delete(curr);
      return false;
    }
    if (hasCycle(start)) return false;
  }
  return true;
}`,
      complexity: {
        time: 'O(V * (V + E))',
        space: 'O(V + E)'
      },
      explanation: 'Runs a separate cycle detection DFS starting from each vertex without global state memoization.'
    },
    optimal: {
      name: 'Topological Sort via Kahn\'s Algorithm (BFS In-Degree)',
      code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let visitedCount = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    visitedCount++;

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return visitedCount === numCourses;
}`,
      complexity: {
        time: 'O(V + E)',
        space: 'O(V + E)'
      },
      explanation: 'Build in-degree array. Courses with in-degree 0 have no prerequisites and are added to queue. As each course completes, decrement in-degree of dependent courses. If total completed equals numCourses, graph is a DAG (no cycle).',
      whyOptimalIsPreferred: 'Linear O(V + E) time execution avoiding quadratic worst-case DFS without recursion depth limits.',
      patternInvariant: 'Kahn\'s topological sort: a directed graph has no cycles if and only if all vertices can be systematically pruned by in-degree = 0.'
    },
    defaultInputDescription: 'numCourses = 2, prerequisites = [[1, 0]]'
  },
  {
    id: 210,
    slug: 'course-schedule-ii',
    title: 'Course Schedule II',
    difficulty: 'Medium',
    pattern: 'graph-general',
    category: 'Graph General',
    statement: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: '[0,1]',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].'
      },
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        output: '[0,2,1,3]',
        explanation: 'There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both [0,1,2,3] and [0,2,1,3] are valid.'
      },
      {
        input: 'numCourses = 1, prerequisites = []',
        output: '[0]'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= numCourses * (numCourses - 1)',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'ai != bi',
      'All the pairs [ai, bi] are distinct.'
    ],
    bruteForce: {
      name: 'Permutation Permissibility Check',
      code: `function findOrderBrute(numCourses: number, prerequisites: number[][]): number[] {
  // Naive DFS topological sort attempting permutations
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [c, p] of prerequisites) adj[p].push(c);
  const visited = new Array(numCourses).fill(0);
  const order: number[] = [];
  let hasCycle = false;
  function dfs(u: number) {
    if (visited[u] === 1) { hasCycle = true; return; }
    if (visited[u] === 2) return;
    visited[u] = 1;
    for (const v of adj[u]) dfs(v);
    visited[u] = 2;
    order.push(u);
  }
  for (let i = 0; i < numCourses; i++) {
    if (visited[i] === 0) dfs(i);
  }
  return hasCycle ? [] : order.reverse();
}`,
      complexity: {
        time: 'O(V + E)',
        space: 'O(V + E)'
      },
      explanation: 'Uses 3-color DFS to build post-order traversal and reverses it.'
    },
    optimal: {
      name: 'Kahn\'s Algorithm Topological Ordering',
      code: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const order: number[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    order.push(curr);

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === numCourses ? order : [];
}`,
      complexity: {
        time: 'O(V + E)',
        space: 'O(V + E)'
      },
      explanation: 'Execute Kahn\'s algorithm. Collect vertices with in-degree 0 into a queue, dequeue to order array, decrement child in-degrees, and enqueue newly freed nodes. If order length equals numCourses, return order; otherwise return [].',
      whyOptimalIsPreferred: 'Linear O(V + E) BFS produces the topological schedule directly without post-reversals or recursive call stack limits.',
      patternInvariant: 'Topological order guarantee: vertices with zero incoming dependencies can be safely scheduled before any of their outgoing neighbors.'
    },
    defaultInputDescription: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]'
  }
];
