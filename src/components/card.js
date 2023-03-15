import './card.css'
import { Link } from 'react-router-dom'
const Card = ({ name, price, image }) => {
  return (
    <>
      <div className="card">
        <Link
          to={`/shoes/${name}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className="image">
            <img src={image} alt="" />
          </div>
          <h4 className="title">{name}</h4>
          <h4 className="price">{price} $</h4>
        </Link>
      </div>
    </>
  )
}

export default Card
