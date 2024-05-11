import React from 'react'
import classes from "./styles.module.css";
import { Carousel } from 'primereact/carousel';
import { BookPreview } from '../../components/BookPreview/BookPreview.js';
import {useEffect, useState} from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import {BookService} from "../../services/BookService/BookService.js";
import TextField from "@mui/material/TextField";

const HomePage = () => {
    const [books, setBooks] = useState([])
    const navigate = useNavigate();

    const responsiveOptions = [
        {
            breakpoint: '1200',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    async function getBooks(){
        try {
            const books_responce = await BookService.getAll()

            console.log(books_responce)
            console.log(books_responce.data)
            setBooks(books_responce.data)

            // if (books_responce.ok){
            //     const books_json = books_responce.json()
                
            //     return books_json
            // }
        }
        catch (e) {
            console.log('e')
            return null
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
        var lowerCase = event.target.value;
        setInputText(lowerCase);
        console.log(inputText)
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
        <div className={classes.page__block}>
            <main>
                <div className={classes.search}>
                    <h1>Найти книгу</h1>
                    <form className={classes.search} onSubmit={onSubmit}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            onChange={inputHandler}
                            fullWidth
                            label="Название или автор"
                            placeholder='Что хотите найти?'
                        />
                        <input type='submit' style={{display: "none"}}></input>
                    </form>
                </div>

                <div className={classes.classic}>
                    <h2>Вечная классика</h2>
                    <p>Погрузитесь в мир великих идей и бессмертных слов, где каждая страница переносит вас через века. Откройте для себя классику, которая вдохновляла поколения!</p>
                    <div>
                        <Carousel value={books} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                                autoplayInterval={10000} itemTemplate={BookPreview} />
                    </div>
                </div>
                <div className={classes.random}>
                    <h2>Неожиданные открытия</h2>
                    <p>Положитесь на волю случая и возьмите книгу из нашей случайной подборки. Возможно Вы столкнетесь с приятным сюрпризом! (Или испытаете удачу вновь...)</p>
                    <div>
                        <Carousel value={books} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                                autoplayInterval={10000} itemTemplate={BookPreview} />
                    </div>
                </div>
                
            </main>
            
        </div>
    )
}

export {HomePage};