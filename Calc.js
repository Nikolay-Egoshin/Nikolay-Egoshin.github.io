function splitByIndex(value, index) {
  return [value.substring(0, index), value.substring(index)];
}

class Level {
    _activeButtons = new Array();
    
    constructor(defaultNum, moves, goal, buttons) {
        this.defaultNum = defaultNum
        this.moves = moves;
        this.goal = goal;
        this.buttons = buttons;

        this.currentMoves = moves;
        this.value = defaultNum;
    }

    Load() {
        document.getElementById('field').value = this.defaultNum;
        document.getElementById('moves').innerHTML = 'Moves: ' + this.moves;
        document.getElementById('goal').innerHTML = 'Goal: ' + this.goal;

        let i = 2;
        for(let item of this.buttons) {
            if(i == 3) i++;
            let currentButton = document.getElementById('n' + i);
            currentButton.value = item;
            currentButton.style.opacity = '1';
            currentButton.disabled = false;
            this._activeButtons.push(currentButton);
            i++;
        }
    }

    Unload() {
        while(this._activeButtons.length > 0) {
            let currentButton = this._activeButtons.pop();
            currentButton.value = '';
            currentButton.style.opacity = '0.5';
            currentButton.disabled = true;
        }
    }

    Check(data) {
        let [operation, value] = splitByIndex(data, 1);
        switch(operation) {
            case '+':
              this.value += +value;
              break;
            case '-':
              this.value -= +value;
              break;
            case 'x':
              this.value *= +value;
              break;
            case '/':
              this.value /= +value;
              break;
            case '>':
              this.value = ~~(this.value / 10);
              break;              
        }
        if(this.currentMoves < 1) 
            return false;
        this.currentMoves--;
        document.getElementById('field').value = this.value;
        document.getElementById('moves').innerHTML = 'Moves: ' + this.currentMoves;
        if(this.value == this.goal) {
            return true;
        }
        return false;
    }

    Restart() {
        this.currentMoves = this.moves;
        this.value = this.defaultNum;
        document.getElementById('field').value = this.defaultNum;
        document.getElementById('moves').innerHTML = 'Moves: ' + this.moves;
        document.getElementById('goal').innerHTML = 'Goal: ' + this.goal;
    }
}

let levels = [
    new Level(0, 2, 2, ["+1"]),
    new Level(0, 3, 8, ["+2", "+3"]),
    new Level(0, 3, 12, ["x4", "+1", "+2"]),
    new Level(1, 3, 7, ["+4", "-2"]),
    new Level(3, 3, 4, ["+4", "x4", "/4"]),
    new Level(0, 4, 64, ["+2", "x4"]),
    new Level(4, 3, 5, ["/3", "+3", "x3"]),
    new Level(4321, 3, 4, [">>"]),
    new Level(0, 3, 4, ["+8", "x5", ">>"]),
    new Level(50, 4, 9, ["/5", "x3", ">>"]),
    new Level(99, 3, 100, ["-8", "x11", ">>"]),
    new Level("You win!", '-', '-', [])
];

let level = 0;

window.onload = function() {
    document.getElementById("n3").addEventListener('click', function() {
    levels[level].Restart();
});

let operationButtons = document.getElementsByClassName("operation_button");
for (let element of operationButtons) {
    element.addEventListener('click', SelectOperation);
}
    document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
    n3.disabled = false;
    n3.style.opacity = '1';
    levels[level].Load();
}


SelectOperation = function(event) {
    let check = levels[level].Check(event.currentTarget.value);
    if(check) {
        levels[level].Unload();
        levels[++level].Load();
        document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
    }
}

