import { Link, Navigate } from "react-router-dom"

import { Carousel } from "../../components/carousel/Carousel"

import personIcon from "../../assets/icons/person.svg"
import clockIcon from "../../assets/icons/clock.svg"

import "./styles.less"
import { isAuth } from "../../utils/isAuthenticated"

export const Home = () => {
    if (!isAuth()) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div className="page home-page">
                <h1>Тайное послание</h1>
                <div className="home-page__subtitle">
                    <div className="home-page__subtitle_item">
                        <img src={personIcon} alt="кол-во игроков" />
                        <p>2-4</p>
                    </div>
                    <div className="home-page__subtitle_item">
                        <img src={clockIcon} alt="время партии" />
                        <p>10-20 мин</p>
                    </div>
                </div>
                <div className="home-page__body">
                    <span className="home-page__body_description">
                        <p>
                            Убитая горем из-за ареста своей матери принцесса Аннетта закрылась в замке.
                            Поклонники принцессы со всего королевства спешат к ней с тайным посланием,
                            чтобы добиться ее расположения. Сможете ли вы доставить письмо принцессе
                            раньше всех и завоевать ее сердце?
                        </p>
                        <p>
                            Тайное послание — это карточная игра на риск, дедукцию и удачу с простыми правилами,
                            которые создают динамичное и увлекательное взаимодействие между игроками.
                        </p>
                        <p>
                            Правила в двух словах: игрок в свой ход разыгрывает карту, применяя её свойство.
                            В раунде побеждает игрок, у которого в конце раунда (когда закончится колода) на руках находится карта с наибольшим значением,
                            или тот, кто смог выбить всех соперников из игры до того, как колода опустеет. Более подробно с правилами можно ознакомиться в разделе{' '}
                            <Link className="home-page__body_link" to="/rules">Правила</Link>.
                        </p>
                    </span>
                    <Carousel />
                </div>
            </div>
        )
    }
}
