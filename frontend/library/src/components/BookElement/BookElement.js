import styles from './styles.module.css'
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = "http://158.160.134.0:3020/"

const BookElement = ({id, title, author, description, image, is_available}) => {
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();

//        confirm("Вы хотите забронировать " + title + "?")

        navigate('/books/' + id + "/take")
    }

    return (
        <div className={styles.container}>
            <Link to={'/books/' + id} className={styles.image}>
                 <img src={API_URL + image} className={styles.cardcover} alt='' />
            </Link>
            <div className={styles.bookInfo}>
                <Link to={'/books/' + id}>
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