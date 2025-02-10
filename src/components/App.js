import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import CreatePost from './CreatePost';
import Header from './Header';
import PostList from './PostList';
import Login from './Login';
import ShowPost from './ShowPost';
import ShowUser from './ShowUser';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/posts/:slug' element={<ShowPost />} />
          <Route path='/users/:userId' element={<ShowUser />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
