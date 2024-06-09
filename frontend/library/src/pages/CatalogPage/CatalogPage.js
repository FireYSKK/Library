import React from 'react'
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import {BookService} from "../../services/BookService/BookService.js";
import TextField from "@mui/material/TextField";
import { BookElement } from '../../components/BookElement/BookElement.js';

const CatalogPage = () => {
    const [books, setBooks] = useState([])
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    async function getBooks(){
        try {
            const books_responce = await BookService.getAll(searchParams)

            console.log(books_responce)
            console.log(books_responce.data)
            setBooks(books_responce.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        let ignore = false
        getBooks()
        return () => {
            ignore = true
        }
    }, []);


    const [inputText, setInputText] = useState("");
    let inputHandler = (event) => {
        setSearchParams({
            "search": event.target.value
        })
        getBooks()
    };

    const onSubmit = (event) => {
        event.preventDefault()

        var params = {
            "search": inputText
        };

        navigate({
            pathname: '/books', 
            search: createSearchParams(params).toString()
        })
    }

    return (
        <div className={styles.page__block}>
            <main>
                <div className={styles.search}>
                    <h1>Найти книгу</h1>
                    <div className={styles.search} onSubmit={onSubmit}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            onChange={inputHandler}
                            fullWidth
                            label="Название или автор"
                            placeholder='Что хотите найти?'
                        />
                    </div>
                </div>

                <div className={styles.bookList}>
                    {books.map(item => (
                        <BookElement key={item.id} id={item.id} title={item.title} author={item.author} description={item.description} is_available={item.is_available} image={item.image}/>
                    ))}
                </div>
                
            </main>
            
        </div>
    )
}

export {CatalogPage};