import { CardType } from '../pages/game/types'

export const cardList: CardType[] = [
    {
        value: 1,
        count: 5,
        title: '1: Стражница',
        imgSrc: (theme = 'light') => `/src/assets/images/1-${theme}.svg`,
        text: 'Выберите соперника и назовите значение карты, отличное от 1. Если у этого игрока на руке есть карта с названным значением, он выбывает из раунда.'
    },
    {
        value: 2,
        count:2,
        title: '2: Священник',
        imgSrc: (theme = 'light') => `/src/assets/images/2-${theme}.svg`,
        text: 'Можете посмотреть карту соперника.'
    },
    {
        value: 3,
        count: 2,
        title: '3: Барон',
        imgSrc: (theme = 'light') => `/src/assets/images/3-${theme}.svg`,
        text: 'Сравните с соперником карты на руках. Обладатель карты с меньшим значением оказывается выбывает из раунда.'
    },
    {
        value: 4,
        count: 2,
        title: '4: Служанка',
        imgSrc: (theme = 'light') => `/src/assets/images/4-${theme}.png`,
        text: 'Вы до начала своего следующего хода защищены от всех свойств карт соперников.'
    },
    {
        value: 5,
        count: 2,
        title: '5: Принц',
        imgSrc: (theme = 'light') => `/src/assets/images/5-${theme}.png`,
        text: 'Противник сбрасывает с руки карту, не применяя её свойство, и берёт новую.'
    },
    {
        value: 6,
        count: 1,
        title: '6: Король',
        imgSrc: (theme = 'light') => `/src/assets/images/6-${theme}.png`,
        text: 'Обменяйтесь с ним картами с соперником.'
    },
    {
        value: 7,
        count: 1,
        title: '7: Графиня',
        imgSrc: (theme = 'light') => `/src/assets/images/7-${theme}.png`,
        text: 'Вы должны сбросить эту карту, если она оказалась у вас на руках вместе с королем или принцем.'
    },
    {
        value: 8,
        count: 1,
        title: '8: Принцесса',
        imgSrc: (theme = 'light') => `/src/assets/images/8-${theme}.png`,
        text: 'Если вы сбрасываете эту карту, то выбываете из раунда.'
    }
]
