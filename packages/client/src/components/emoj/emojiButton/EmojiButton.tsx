import { FC } from "react";
import { Dispatch } from "react";

import { EmojiList } from "../EmojiList";
import "./emojiButton.less";

type Props = {
    text: string;
    setText: Dispatch<string>;
};

export const EmojiButton: FC<Props> = ({ text, setText }) => {
    const addReaction = (str: string) => {
        setText(`${text}${str}`);
    };

    return (
        <div className='emoji_btn'>
            {EmojiList.map((emoji, index) => {
                return (
                    <button
                        className='emoji_btn__item'
                        key={index}
                        type="button"
                        onClick={() => addReaction(emoji)}>
                        {emoji}
                    </button>
                );
            })}
        </div>
    );
};
