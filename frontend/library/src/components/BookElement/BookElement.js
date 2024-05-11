import styles from './styles.module.css'
import {Link} from "react-router-dom";
import {BookService} from "../../services/BookService/BookService.js";
import { useNavigate } from "react-router-dom";

const BookElement = ({id, title, author, description, image_online, is_available}) => {
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();

        alert("Вы хотите забронировать " + title + "?")

        navigate('/books/' + id + "/take")
    }

    return (
        <div className={styles.container}>
            <Link to={'/books/' + id} className={styles.image}>
                 <img src={image_online} className={styles.cardcover} alt='' />
            </Link>
            <div className={styles.bookInfo}>
                <Link to={'/book/' + id}>
                    <h3>{title}</h3>
                </Link>
                <p><i>Автор: {author}</i></p>
                <p>{description}</p>
                <form method='POST' onSubmit={onSubmit}>
                    <input className={styles.take} type='submit' disabled={!(is_available)} value={is_available ? "Забронировать" : "Недоступна"}></input>
                </form>
            </div>
        </div>
    )
}

export {BookElement}