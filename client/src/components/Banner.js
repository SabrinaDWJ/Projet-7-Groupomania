import logo from '../assets/'

function Banner() {
    const title = 'La maison jungle'
    return (
        <div>
            <img src={logo} alt='La maison jungle' />
            <h1>{title}</h1>
        </div>
    )
}


export default Banner