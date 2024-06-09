import styles from './styles.module.css'
import {Link} from "react-router-dom";


const API_URL = "http://158.160.134.0:3020";


const BookPreview = (book) => {

    return (
        <Link to={'/books/' + book.id}>
            <div className={styles.card}>
                <img src={API_URL + book.image} className={styles.cardcover} alt='' />
            </div>
            <div className={styles.bookInfo}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
            </div>
        </Link>
    )
}

export {BookPreview}