import { FC, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Store } from "../../../store/store.types";

import { EmojiItem } from "../emojiItem/EmojiItem";
import { AddReaction } from "../addReaction/AddReaction";
import "./emojiPicker.less";


interface Props {
    emojis: IEmoji[];
}

export const EmojiPicker: FC<Props> = ({ emojis }) => {

    const currentUserId = useSelector((state: Store) => state.user.user.id);
    const [changes, setChanges] = useState(false);
    useEffect(() => {setChanges(false);}, [changes]);

    return (
        <div className='emoji_list'>
            {emojis.map((item, index) => {
                if (item.users.length) {
                    return (
                        <div className='emoji_listitem' key={index}>
                            <EmojiItem
                                emoji={item}
                                userId={currentUserId}
                                setChanges={setChanges}
                            />
                        </div>
                    );
                }
            })}
            <AddReaction
                emojis={emojis}
                userId={currentUserId}
                setChanges={setChanges}
            />
        </div>
    );
};
