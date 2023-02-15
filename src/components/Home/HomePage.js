// import {useSelector} from 'react-redux'
import videoHomepage from '../../assets/video-homepage.webm'

const HomePage = (props) =>{
    // const account = useSelector(state => state.user.account)
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated )
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
                    <button>Let's go</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;
