import { useNavigate } from 'react-router-dom'
import videoHomepage from '../../assets/video-homepage.webm'

const HomePage = (props) =>{
    const navigate = useNavigate();
    return(
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                    
                />
            </video>
            <div className='homepage-content'>
                <div className="title-1">Enjoying a satisfying shopping experience</div>
                <div className="title-2">Don't worry about the dress problem, come to my-app, we will solve it for you</div>
                <div className="title-3">
                    <button onClick={()=> {navigate("/users")}}>Let's go</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;
