import princessCard from "../assets/images/card_princess.jpg"

export type Card = {
    value: number,
    title: string,
    imgSrc: string,
    text: string,
    count: number
}

export const cardList: Card[] = [
    {
        value: 1,
        title: '1: Стражница',
        imgSrc: princessCard,
        text: 'Выберите соперника и назовите значение карты, отличное от 1. Если у этого игрока на руке есть карта с названным значением, он выбывает из раунда.',
        count: 5
    },
    {
        value: 2,
        title: '2: Священник',
        imgSrc: princessCard,
        text: 'Можете посмотреть карту любого из соперников.',
        count: 2
    },
    {
        value: 3,
        title: '3: Барон',
        imgSrc: princessCard,
        text: 'Выберите соперника и тайно сравните карты у вас на руках. Обладатель карты с меньшим значением оказывается выбывает из раунда.',
        count: 2
    },
    {
        value: 4,
        title: '4: Служанка',
        imgSrc: princessCard,
        text: 'Вы до начала своего следующего хода защищены от всех свойств карт соперников.',
        count: 2
    },
    {
        value: 5,
        title: '5: Принц',
        imgSrc: princessCard,
        text: 'Выберите любого игрока (можно и себя). Этот игрок сбрасывает с руки карту, не применяя её свойство, и берёт новую.',
        count: 2
    },
    {
        value: 6,
        title: '6: Король',
        imgSrc: princessCard,
        text: 'Выберите соперника и обменяйтесь с ним картами.',
        count: 1
    },
    {
        value: 7,
        title: '7: Графиня',
        imgSrc: princessCard,
        text: 'Вы должны сбросить эту карту, если она оказалась у вас на руках вместе с королем или принцем.',
        count: 1
    },
    {
        value: 8,
        title: '8: Принцесса',
        imgSrc: princessCard,
        text: 'Если вы сбрасываете эту карту, то выбываете из раунда.',
        count: 1
    }
]
