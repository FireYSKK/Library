import styles from './styles.module.css'
import {Link} from "react-router-dom";
import 'primeicons/primeicons.css';
import { useNavigate } from "react-router-dom";

const TransactionLine = ({id, customer, book, status, confirmed_by, is_expired}) => {
    //const navigate = useNavigate()

    const STATUS = {
        0: "Создана",
        1: "В обработке",
        2: "Выдана",
        3: "Отклонена",
        4: "Просрочена",
        5: "Закрыта"
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     navigate('/transactions/' + id)
    // }

    return (
        <tr key={id} className={styles.container}>
            <td>{customer}</td>
            <td>{book}</td>
            <td className={is_expired ? styles.expired : styles.normal}>{STATUS[status]}</td>
            <td>{confirmed_by}</td>
            <td>
                <Link to={'/transactions/' + id}>
                    <i className="pi pi-pencil" style={{ fontSize: '1.3rem' }}></i>
                </Link>
            </td>
            <td>
                <Link to={'/transactions/' + id}>
                    <i className="pi pi-trash" style={{ fontSize: '1.3rem' }}></i>
                </Link>
            </td>
        </tr>
    )
}

export {TransactionLine}