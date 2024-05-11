import styles from './styles.module.css'
import {Link} from "react-router-dom";

const BookPreview = (book) => {

    return (
        <Link to={'/books/' + book.id}>
            <div className={styles.card}>
                <img src={book.image_online} className={styles.cardcover} alt='' />
            </div>
            <div className={styles.bookInfo}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
            </div>
        </Link>
    )
}

export {BookPreview}