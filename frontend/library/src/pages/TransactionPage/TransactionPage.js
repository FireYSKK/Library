import React from 'react'
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {TransactionService} from "../../services/TransactionService/TransactionService.js"
import {TransactionLine} from "../../components/TransactionLine/TransactionLine.js"

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([])
    const [filtered, setFiltered] = useState([])
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');

    async function getTransactions(){
        try {
            const transactions_responce = await TransactionService.getAll()

            setTransactions(transactions_responce.data)
            setInputText('')
            setFiltered(transactions_responce.data)
            console.log({"trans": transactions_responce.data})
            console.log({"filter": filtered})
            console.log(inputText)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTransactions()
    }, []);


    let inputHandler = async (event) => {
        var lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
        setFiltered(transactions.filter((el) => {
            if (lowerCase === '') {
                return el;
            }
            else {
                return el.customer.toLowerCase().includes(lowerCase)
            }
        }))
    };

    const onSubmit = (event) => {
        event.preventDefault()

        var params = {
            "search": inputText
        };

        navigate({
            pathname: '/transactions', 
            search: createSearchParams(params).toString()
        })
    }


    return (
        <div className={styles.page__block}>
            <main>
                <div className={styles.search}>
                    <h1>Заявки</h1>
                    <div className={styles.search} onSubmit={onSubmit}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            onChange={inputHandler}
                            fullWidth
                            label="Фамилия посетителя"
                        />
                    </div>
                </div>

                <table className={styles.transactions}>
                    <thead>
                        <tr>
                            <th>Посетитель</th>
                            <th>Книга</th>
                            <th>Статус</th>
                            <th>Администратор</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(item => (
                            <TransactionLine key={item.id} id={item.id} customer={item.customer} book={item.book} status={item.status} confirmed_by={item.confirmed_by} is_expired={item.is_expired} />
                        ))}
                    </tbody>
                </table>
                
            </main>
            
        </div>
    )
}

export {TransactionPage};