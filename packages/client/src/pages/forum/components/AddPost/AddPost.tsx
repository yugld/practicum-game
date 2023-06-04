import { IconButton, InputBase, Paper } from '@mui/material';
import IconSearch from '@mui/icons-material/Search';
import './addPost.less';
import AddPostModal from '../AddPostModal/AddPostModal';

const CreatePostForm = () => {
    return (
            <div className='post_header'>
                <Paper
                    className='post_input'
                    component="form">
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <IconSearch />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Поиск по темам"
                        fullWidth={true}
                    />
                </Paper>
                <AddPostModal/>
            </div>
    );
};

export default CreatePostForm;
