const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const path = '*';
let run = true;

let randomArray = ['*', '^', '░', 'O'];
let randomIndex = Math.floor(Math.random() * 4);

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.xLocation = 0;
        this.yLocation = 0;
        this.field[0][0] = path;
    }

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                field[x][y] = prob > percentage ? fieldCharacter : hole;
            }
        }
        // Set the hat location
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };

        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.x][hatLocation.y] = hat;
        return field;
    }


    hitHat() {
        return this.field[this.xLocation][this.yLocation] === hat;
    }

    hitHole() {
        return this.field[this.xLocation][this.yLocation] === hole;

    }

    outOfBound() {
        console.log(this.xLocation, this.yLocation)
        console.log(`array lenght${this.field.length}, nested array ${this.field[0].lenght}`)
        if (this.xLocation < 0 || this.yLocation < 0 || this.xLocation >= this.field.length || this.yLocation >= this.field.length) {
            return true;

        }
        // this.yLocation >= 0 &&
        //  this.xLocation < this.field.width &&
        // this.yLocation < this.field.length
    }

    prompt() {
        const input = prompt('Where would you like to move?');
        switch (input) {
            case 'up':
                this.xLocation -= 1;
                break;
            case 'down':
                this.xLocation += 1;
                break;
            case 'left':
                this.yLocation -= 1;
                break;
            case 'right':
                this.yLocation += 1;
                break;
            default:
                console.log('Enter one of the following: up,down, left or right: ');
                this.prompt();
                break;
        }
        if (this.outOfBound()) {
            console.log('You went out of bound !')
            run = false;
        } else {
            if (this.hitHat()) {
                console.log('You won!');
                run = false;
            }
            if (this.hitHole()) {
                console.log('You fell into a hole!');
                run = false;
            }
        }

        if (run) {
            this.field[this.xLocation][this.yLocation] = path;
        }

    }

    print() {
        const display = this.field.map(row => row.join('')).join('\n');
        return display;
    }

    Game() {
        while (run) {
            console.log(this.print());
            this.prompt();
        }
    }
}


const myField = new Field(Field.generateField(5, 5));

myField.Game();