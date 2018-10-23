class Player {
    constructor() {
        this.finder = new AStar();
        this.directions = {
            backward: 'backward',
            left: 'left',
            forward: 'forward',
            right: 'right',
        };
    }

    playTurn(warrior) {
        // Cool code goes here.
        var state = 'walk';
        var direction = warrior.directionOfStairs();
        var units = warrior.listen();
        var space = units.find(x => x.getUnit().isUnderEffect('ticking'));
        var rushing = !!space;

        if (space) {
            var grid = [];
            var offsetX = 0;
            var offsetY = 0;
            var destX = 0;
            var destY = 0;
            // determine offset
            for (let i = units.length; i--;) {
                let loc = units[i].getLocation();
                if (loc[0] < 0 && loc[0] * -1 > offsetX)
                    offsetX = loc[0] * -1;
                if (loc[1] < 0 && loc[1] * -1 > offsetY)
                    offsetY = loc[1] * -1;
            }
            var width = 0;
            var height = 0;
            for (let i = units.length; i--;) {
                let unit = units[i];
                let loc = unit.getLocation();
                let x = loc[0] + offsetX;
                let y = loc[1] + offsetY;
                if (x > width)
                    width = x;
                if (y > height)
                    height = y;
                if (!grid[y])
                    grid[y] = [];
                if (unit === space) {
                    destX = x;
                    destY = y;
                }
                grid[y][x] = unit.getUnit().isEnemy() ? 2 : 1;
            }
            for (let y = height + 1; y--;)
                for (let x = width + 1; x--;)
                    if (!grid[y][x])
                        grid[y][x] = 0;

            this.finder.setGrid(grid);
            this.finder.setAcceptableTiles([0, 1]);
            var path = this.finder.findPath([offsetX, offsetY], [destX, destY]);
            if (path.length > 1) {
                let dir = '';
                let nextX = path[1][0];
                let nextY = path[1][1];
                if (nextX > offsetX)
                    dir = 'forward';
                else if (nextX < offsetX)
                    dir = 'backward';
                else if (nextY > offsetY)
                    dir = 'right';
                else
                    dir = 'left';
                space = warrior.feel(dir);
            } else {
                space = null;
            }
        }

        if (!space) {
            var closest = Infinity;
            var closestIndex = -1;
            for (let i = units.length; i--;) {
                let closestSum = units[i].getLocation().reduce((a, b) => a + b, 0);
                if (closestSum < closest || (closestSum === closest && units[closestIndex].getUnit().isBound())) {
                    closestIndex = i;
                }
            }
            if (~closestIndex) {
                var s = units[closestIndex];
                space = warrior.feel(warrior.directionOf(s));
            }
        }

        if (space) {
            direction = warrior.directionOf(space);
            if (space.isUnit()) {
                var unit = space.getUnit();
                if (unit.isEnemy()) {
                    state = rushing || unit.isBound() ? (false ? 'detonate' : 'attack') : 'bind';
                } else {
                    state = 'rescue';
                }
            } else if (!rushing && warrior.health() < 10) {
                // TODO: heal to amount calculated on sum unit.health
                state = 'rest';
            }
        }
        warrior[state](direction);
    }
}

var abs = Math.abs;

class AStar {
    constructor() {
        this.acceptableTiles = [0];
        this.grid = [[]];
    }
    setAcceptableTiles(acceptableTiles) {
        this.acceptableTiles = acceptableTiles;
    }
    setGrid(level) {
        this.grid = level;
        // Note that this A-star implementation expects the world array to be square: 
        // it must have equal height and width. If your game world is rectangular, 
        // just fill the array with dummy values to pad the empty space.
        this.worldHeight = level.length;
        this.worldWidth = level[0].length;
        this.worldSize = this.worldHeight * this.worldWidth;
    }
    ManhattanDistance(Point, Goal) {
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }
    Neighbours(x, y) {
        var N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            myN = N > -1 && this.canWalkHere(x, N),
            myS = S < this.worldHeight && this.canWalkHere(x, S),
            myE = E < this.worldWidth && this.canWalkHere(E, y),
            myW = W > -1 && this.canWalkHere(W, y),
            result = [];

        if (myN)
            result.push({ x: x, y: N });
        if (myE)
            result.push({ x: E, y: y });
        if (myS)
            result.push({ x: x, y: S });
        if (myW)
            result.push({ x: W, y: y });
        return result;
    }
    canWalkHere(x, y) {
        return this.grid && this.grid[y] &&
            this.acceptableTiles.indexOf(this.grid[y][x]) !== -1;
    }
    findPath(pathStart, pathEnd) {
        var distanceFunction = this.ManhattanDistance;
        var a = this;
        function Node(Parent, Point) {
            return {
                // pointer to another Node object
                Parent: Parent,
                // array index of this Node in the world linear array
                value: Point.x + (Point.y * a.worldWidth),
                // the location coordinates of this Node
                x: Point.x,
                y: Point.y,
                // the heuristic estimated cost
                // of an entire path using this node
                f: 0,
                // the distanceFunction cost to get
                // from the starting point to this node
                g: 0
            };
        }
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
        var mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });
        // create an array that will contain all world cells
        var AStar = [];
        // list of currently open Nodes
        var Open = [mypathStart];
        // list of closed Nodes
        var Closed = [];
        // list of the final output array
        var result = [];
        // reference to a Node (that is nearby)
        var myNeighbours;
        // reference to a Node (that we are considering now)
        var myNode;
        // reference to a Node (that starts a path in question)
        var myPath;
        // temp integer variables used in the calculations
        var length, max, min, i, j;
        // iterate through the open list until none are left
        while (length = Open.length) {
            max = this.worldSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            } else {// not the destination                
                // find which nearby nodes are walkable
                myNeighbours = this.Neighbours(myNode.x, myNode.y);
                // test each one that hasn't been tried already
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                        // remember this new path for testing above
                        Open.push(myPath);
                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        } // keep iterating until the Open list is empty
        return result;
    }
}
