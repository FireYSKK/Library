import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppLayout} from "../../pages/AppLayout/AppLayout.js";
import {LoginPage} from "../../pages/LoginPage/LoginPage.js";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage.js";
import {HomePage} from "../../pages/HomePage/HomePage.js";
import {CatalogPage} from "../../pages/CatalogPage/CatalogPage.js";
import {BookPage} from "../../pages/BookPage/BookPage.js";
import {NotFoundPage} from "../../pages/NotFoundPage/NotFoundPage.js";
import {AuthLayout} from "../../pages/AuthLayout/AuthLayout.js";
import {TransactionPage} from "../../pages/TransactionPage/TransactionPage.js";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path={'/books/:id'} element={<BookPage/>}></Route>
                    <Route path={'/books'} element={<CatalogPage/>}></Route>
                    <Route path={'/transactions/:id'} element={<TransactionPage/>}></Route>
                    <Route path={'/transactions'} element={<TransactionPage/>}></Route>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route element={<AuthLayout/>}>
                        <Route path={'/login'} element={<LoginPage/>}/>
                        <Route path={'/register'} element={<RegisterPage/>}/>
                    </Route>
                    <Route path={'/*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export {AppRouter}