import { FC } from "react";
import { Dispatch } from "react";
import "./emojiItem.less";
import {IEmoji} from "../emoji.types"

type Props = {
    emoji: IEmoji;
    userId: number | null | undefined;
    setChanges: Dispatch<boolean>;
};

export const EmojiItem: FC<Props> = ({emoji, userId, setChanges }) => {
    const { users } = emoji;

    const updateEmoji = () => {
        if (userId) {
            const checkUserId = users.findIndex(
                curId => curId === userId,
            );
            if (users[checkUserId]) {
                users.splice(checkUserId, 1);
            } else {
                users.push(userId);
            }
            setChanges(true);
        }
    };
    
    return (
        <>
            <div className='emoji_count'>{users.length}</div>
            <div className='emoji_icon' onClick={() => updateEmoji()}>
                {emoji.content}
            </div>
        </>
    );
};
