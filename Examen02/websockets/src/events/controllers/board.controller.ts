export class BoardController {

    constructor() {
    }

    backSide = 'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/back.png';
    frontSidesURLs = [
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/1.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/2.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/3.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/4.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/5.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/6.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/7.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/8.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/9.png',
        'https://raw.githubusercontent.com/2021-B-Web-Avanzada/wavan-quijano-zanipattini-mahatma-israel/desarrollo/Examen02/websockets/src/events/controllers/imgs/10.png',
    ];

    static MATCH_POINTS = 10;
    static  MAX_PLAYERS = 8;

    getRandomArray(): string[] {
        const cards = [
            ...this.frontSidesURLs,
            ...this.frontSidesURLs,
            // TODO: Volver a poner esto
            // ...this.frontSidesURLs,
            // ...this.frontSidesURLs,
        ];
        // Shuffle
        let index = cards.length - 1;
        while(index != 0) {
            const randomIndex = Math.floor(Math.random() * index);
            index--;
            [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
        }
        return cards;
    }


}