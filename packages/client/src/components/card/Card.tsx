import "./styles.less"

type CardProps = {
    title: string,
    imgSrc: string,
    text: string
}

export const Card = ({title, imgSrc, text}: CardProps) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <img className="card__image" src={imgSrc}/>
            <p>{text}</p>
        </div>
    )
}
