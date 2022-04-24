import './Avatar.css'
const Avatar = ({ url, name }) => {
    return (
        <div>
            <div className="avatarContainer">
                <div className="avatar">
                    <a href="https://codepen.io/MarioDesigns/">
                        <img src={url} alt={`${name} avatar`} />
                    </a>
                </div>
                <div className="content">
                    <h1>{name}</h1>
                </div>
            </div>


        </div>
    )
}

export default Avatar
