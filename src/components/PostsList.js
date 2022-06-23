import { React, useState, useEffect } from 'react'
import {
    TextField, InputLabel, Button, List,
    ListItemText, FormGroup, Box, Modal, Typography
} from '@mui/material'

const url = 'https://jsonplaceholder.typicode.com/posts'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function PostsList() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('')
    const [id, setId] = useState('')

    const handleClose = () => setOpen(false);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            });

        return () => {

        }

    }, [])

    const removeElement = removeId => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${removeId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                setPosts({ data: data })
                console.log(data)
            });
    }


    const formSubmit = e => {
        const post = {
            id: posts.length,
            title: title,
            body: body
        }
        console.log(post)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts({ data: data })
            });
    }

    // const handleOpen = title => {
    //     setOpen(true);        
    // }

    const editPost = () => {
        const post = {
            id: id,
            title: editTitle
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post })
        };
        console.log(post)
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => setPosts({ data: data }));
    }

    return (
        <div>
            <Box sx={{ boxShadow: 5, color: 'primary.main', m: 1, p: { xs: 1, }, zIndex: 'tooltip' }}>
                <InputLabel >Add a Post </InputLabel>
                <FormGroup>
                    <div>
                        <TextField label="Enter the title" variant="standard" value={title} onChange={e => { setTitle(e.target.value) }} />
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Enter the body" value={body} variant="standard" onChange={e => { setBody(e.target.value) }} />
                    </div>
                    <br></br>
                    <div>
                        <Button variant="contained" onClick={formSubmit}>Add </Button>
                    </div>
                </FormGroup >
            </Box>
            <div>
                <InputLabel>List of Posts : </InputLabel>
            </div>
            <List>
                {
                    posts.map((post) => (
                        <ListItemText key={post.id}>{post.title}
                            <Button onClick={() => { setOpen(true); setEditTitle(post.title); setId(post.id) }}>Edit</Button>
                            <Button onClick={() => { removeElement(post.id) }}>Remove</Button>
                        </ListItemText>))
                }
            </List>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField label="Enter the title" variant="standard" value={editTitle} onChange={e => { setEditTitle(e.target.value) }} />
                        <Button variant="contained" onClick={editPost}>Submit</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default PostsList