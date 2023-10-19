import {Link} from "@mui/material";
import './forum.less'
import AddPost from "./components/AddPost/AddPost";
import Post from "./components/Post/Post";
import { useNavigate } from "react-router-dom";

const Forum = () => {

  const navigate = useNavigate();
  
  const goToThread = () => {
    navigate(`/thread`)
}
  return (
    <main className="forum">
      <AddPost />
      <Link onClick={goToThread}><Post /></Link>
      <Link onClick={goToThread}><Post /></Link>
      <Link onClick={goToThread}><Post /></Link>
    </main>
  )
}

export default Forum;
