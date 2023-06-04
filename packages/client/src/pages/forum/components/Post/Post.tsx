import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './post.less';
import IconComments from "../icons/IconComments";

const Post = () => {
    const navigate = useNavigate();

    return (
        <div className="post">
            <div className='post__info'>
                <div className="post__title">Question title</div>
                <div className="post__date">29.05.2023</div>
            </div>
            <div >
                <div className="post__text">Ask a simple questions to engage with the user.</div>
                <div className="post__info-comment">
                    <div className='post__info-comment'>
                        <div>Опубликовано:</div>
                        <Avatar className='post__avatar' sx={{ width: 20, height: 20 }} />
                        <div className='post__author'>Haaaaaaaa Haaaaaaaaa</div>
                    </div>
                    <div className='post__comments'>
                        <div className='post__comments__icon'>
                            <IconComments />
                        </div>
                        <span className='post__comments__number'>10</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
