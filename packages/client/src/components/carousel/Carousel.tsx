import Slider from "react-slick"
import { Settings } from "react-slick"
import { cardList } from "../../constants/cardList";
import { Card } from "../card/Card";
import "./styles.less"
import { THEME } from '../../pages/game/models/Board'

export const Carousel = () => {
    const settings: Settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="carousel">
            <Slider {...settings}>
                {cardList.map(card =>
                    <div className="carousel__slide" key={card.value}>
                        <Card title={card.title} imgSrc={card.imgSrc(THEME)} text={card.text} />
                    </div>
                )}
            </Slider>
        </div>
    );
};
