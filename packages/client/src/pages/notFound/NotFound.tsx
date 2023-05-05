import { Button } from "@mui/material"
import { useNavigate } from "react-router"

import "./styles.less"

export const NotFound = () =>  {
	const navigate = useNavigate()

	const goToStartPage = () => {
        navigate(`/`)
    }

    return (
      	<div className="page not-found-page">
			<div className="page not-found-page__container">
				<h1>Кажется, вы потерялись...</h1>
				<Button className="button-filled" onClick={goToStartPage}>
					Вернуться на главную страницу
				</Button>
			</div>
		</div>
  	)
}
