import React from 'react'
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {BookService} from "../../services/BookService/BookService.js";

const API_URL = "http://158.160.134.0:3020/"

const BookPage = () => {
    const [book, setBook] = useState([])
    const navigate = useNavigate();
    const {id} = useParams();

    async function getBook(){
        try {
            const book_responce = await BookService.getOne(id)

            console.log(book_responce)
            console.log(book_responce.data)
            setBook(book_responce.data)
        }
        catch (e) {
            console.log(e)
            navigate('/not-found')
        }
    }

    useEffect(() => {
        let ignore = false
        getBook()
        return () => {
            ignore = true
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        confirm("Вы хотите забронировать " + book.title + "?")

        navigate('/books/' + book.id + "/take")
    }
    

    return (
        <div className={styles.container}>
            <Link to={'/book/' + book.id} className={styles.image}>
                <img src={API_URL + book.image} className={styles.cardcover} alt='' />
            </Link>
            <div className={styles.bookInfo}>
                <Link to={'/book/' + book.id}>
                    <h3>{book.title}</h3>
                </Link>
                <p><i>Автор: {book.author}</i></p>
                <p>{book.description}</p>
                <form method='POST' onSubmit={onSubmit}>
                    <input className={styles.take} type='submit' disabled={!(book.is_available)} value="Забронировать"></input>
                </form>
            </div>
        </div>
    )
}

export {BookPage};