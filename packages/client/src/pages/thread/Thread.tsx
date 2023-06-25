import { Avatar, IconButton, InputBase, Link, Paper } from "@mui/material";
import './thread.less';
import IconBack from "./components/icons/IconBack";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import IconSend from "./components/icons/IconSend";
import { useNavigate } from "react-router-dom";
import { EmojiPicker } from "../../components/emoj/emojiPicker/EmojiPicker";


const Thread = () => {
    const navigate = useNavigate();

    const goToForum = () => {
        navigate(`/forum`)
    }

    return (
        <main className="page thread">
            <div className='thread__info'>
                <Link className='thread__info__icon-back' onClick={goToForum}><IconBack /></Link>
                <div className="thread__title">Question title</div>
                <div className="thread__date">29.05.2023</div>
            </div>
            <div >
                <div className="thread__text">lorem*300Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis, at itaque fugiat sunt laborum obcaecati placeat rem, facilis ab cumque reprehenderit molestiae neque labore doloremque maxime ratione voluptatum atque optio debitis libero tempora dolores. Cumque repellendus similique, ipsum reiciendis fugit aut illo quas reprehenderit. Numquam excepturi placeat, aut animi repellendus, quisquam hic libero, quae aliquam maxime ipsam sed sint fugiat! Molestiae eaque provident neque doloremque quia error quod voluptate repudiandae vero libero, ipsum hic laboriosam odit. Ipsum libero explicabo accusamus qui enim iure labore, quibusdam excepturi praesentium illo nobis vitae sed corrupti quas soluta, id provident delectus? Delectus, harum in?</div>
                <div className="thread__info-comment">
                    <div className='thread__info-comment'>
                        <div>Опубликовано:</div>
                        <Avatar className='thread__avatar' sx={{ width: 20, height: 20 }} />
                        <div className='thread__author'>Haaaaaaaa Haaaaaaaaa</div>
                    </div>
                    <EmojiPicker emojis={
                        [{
                            "content": "🐧",
                            "users": [565757, 45454]
                        },
                        {
                            "content": "🐱",
                            "users": [565757]
                        }]} />
                </div>
            </div>
            <div className='thread__comments'>
                <div className='thread__comments__title'>Коментарии</div>
                <form className='thread__comments__form'>
                    <Paper
                        className='thread__comments__input'
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Введите текст"
                            fullWidth={true}
                            className='thread__comments__input'
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                    </Paper>
                    <IconButton size="large">
                        <IconSend />
                    </IconButton>
                </form>
                <div className='thread__comments__history'>
                    <div className="comment">
                        <Avatar className='comment__avatar' sx={{ width: 40, height: 40 }} />
                        <div className='comment__info'>
                            <div className='comment__author'>Haaaaaaaa Haaaaaaaaa</div>
                            <div className='comment__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis?</div>
                        </div>
                        <div className='comment__date'>12:35 12.04.23</div>
                    </div>
                    <div className="comment">
                        <Avatar className='comment__avatar' sx={{ width: 40, height: 40 }} />
                        <div className='comment__info'>
                            <div className='comment__author'>Haaaaaaaa Haaaaaaaaa</div>
                            <div className='comment__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit esse commodi recusandae modi dolore atque vitae ea fugiat corrupti, doloremque laudantium eligendi qui quod rerum exercitationem consectetur incidunt doloribus distinctio?</div>
                        </div>
                        <div className='comment__date'>12:35 12.04.23</div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Thread;
