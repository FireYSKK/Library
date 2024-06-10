import styles from './styles.module.css'
import {Link} from "react-router-dom";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { TransactionService } from '../../services/TransactionService/TransactionService';

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


    const onClickUpdate = async () => {
        if (window.confirm("Принять заявку?")) {
            try {
                const body = {
                    status: status
                }

                await TransactionService.patch(id, body);
                window.location.reload();
            }
            catch (e) {
                alert("Произошла ошибка");
            }
        }
    }

    const onClickDelete = async () => {
        if (window.confirm("Удалить запись?")) {
            try {
                await TransactionService.delete(id);
                window.location.reload();
            }
            catch (e) {
                alert("Произошла ошибка");
            }
        }
    }

    return (
        <tr key={id} className={styles.container}>
            <td>{customer}</td>
            <td>{book}</td>
            <td className={is_expired ? styles.expired : styles.normal}>{STATUS[status]}</td>
            <td>{confirmed_by}</td>
            <td>
                <Button onClick={onClickUpdate}>
                    <i className="pi pi-pencil" style={{ fontSize: '1.3rem' }}></i>
                </Button>
            </td>
            <td>
                <Button onClick={onClickDelete}>
                    <i className="pi pi-trash" style={{ fontSize: '1.3rem' }}></i>
                </Button>
            </td>
        </tr>
    )
}

export {TransactionLine}