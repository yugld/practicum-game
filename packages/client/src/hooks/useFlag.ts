import {useCallback, useState} from 'react';

export const useFlag = (initialState = false): [boolean, () => void, () => void, () => void] => {
    const [isEnabled, setIsEnabled] = useState(initialState);

    const handleEnable = useCallback(() => {
        setIsEnabled(true);
    }, []);

    const handleDisable = useCallback(() => {
        setIsEnabled(false);
    }, []);

    const handleToggle = useCallback(() => {
        setIsEnabled((prevState) => !prevState);
    }, []);

    return [isEnabled, handleEnable, handleDisable, handleToggle];
};
