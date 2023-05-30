import { IconButton, InputBase, Paper } from '@mui/material';
import IconSearch from '@mui/icons-material/Search';
import './addPost.less';
import AddPostModal from '../AddPostModal/AddPostModal';

const CreatePostForm = () => {
    return (
        <div>
            <form className='post_form'>
                <Paper
                    className='post_input'
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}>
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
            </form>
        </div>
    );
};

export default CreatePostForm;
