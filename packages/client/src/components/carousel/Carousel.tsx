import Slider from "react-slick"
import princessCard from "../../assets/images/card_princess.jpg"
import "./styles.less"

export const Carousel = () => {
    const settings = {
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
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>8: Принцесса</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>Если вы сбрасываете эту карту, то выбываете из раунда.</p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>1: Стражница</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>
                        Выберите соперника и назовите значение карты, отличное от 1.
                        Если у этого игрока на руке есть карта с названным значением, он выбывает из раунда.
                    </p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>2: Священник</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>Можете посмотреть карту любого из соперников.</p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>3: Барон</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>
                        Выберите соперника и тайно сравните карты у вас на руках. Обладатель карты
                        с меньшим значением оказывается выбывает из раунда.
                    </p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>4: Служанка</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>Вы до начала своего следующего хода защищены от всех свойств карт соперников.</p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>5: Принц</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>
                        Выберите любого игрока (можно и себя). Этот игрок сбрасывает с руки карту,
                        не применяя её свойство, и берёт новую.
                    </p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>6: Король</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>Выберите соперника и обменяйтесь с ним картами.</p>
                </div>
            </div>
            <div className="carousel__slide">
                <div className="carousel__slide_info">
                    <h3>7: Графиня</h3>
                    <img className="carousel__slide_image" src={princessCard}/>
                    <p>Вы должны сбросить эту карту, если она оказалась у вас на руках вместе с королем или принцем.</p>
                </div>
            </div>
        </Slider>
    </div>
    );
  };
