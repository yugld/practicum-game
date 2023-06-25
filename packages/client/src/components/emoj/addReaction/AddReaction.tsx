import { FC } from "react";
import { Dispatch } from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { EmojiList } from "../EmojiList";
import "./addReaction.less";

type Props = {
    emojis: IEmoji[];
    userId: number | null | undefined;
    setChanges: Dispatch<boolean>;
};

export const AddReaction: FC<Props> = ({ emojis, userId, setChanges }) => {
    const addNewEmoji = (targetEmoji: string) => {
        const checkIndexEmoji: number = emojis.findIndex(item => {
            return item.content === targetEmoji;
        });

        if (userId) {
            if (emojis[checkIndexEmoji]) {
                const checkUserId = emojis[checkIndexEmoji].users.findIndex(
                    id => {
                        return id === userId;
                    },
                );
                if (!emojis[checkIndexEmoji].users[checkUserId]) {
                    emojis[checkIndexEmoji].users.push(userId);
                    setChanges(true);
                }
            } else {
                emojis.push({
                    content: targetEmoji,
                    users: [userId],
                });
                setChanges(true);
            }
        }
    };

    return (
        <div className='add_reaction'>
            <SentimentSatisfiedAltIcon />
            <div className='emoji_popup'>
                {EmojiList.map((emoji, index) => {
                    return (
                        <div
                            key={index}
                            className='emoji'
                            onClick={() => addNewEmoji(emoji)}>
                            {emoji}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
