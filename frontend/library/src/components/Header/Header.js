import styles from './styles.module.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuthService} from "../../services/AuthService/AuthService.js";
import logo from '../../assets/book.png'

const Header = () => {

    const [user, setUser] = useState()

    const isLogin = !!localStorage.getItem('access_token')
    const navigate = useNavigate()

    useEffect(() => {

        const fetch = async () => {
            try {
                const user = await AuthService.check()
                setUser(user.data)
            }
            catch (e) {
                console.log('Access token is invalid')
    
                try {
                    const refresh_response = await AuthService.refresh()
                    setUser(refresh_response.data)
                }
                catch (e) {
                    console.log("Both token are invalid")
                }
            }
        }

        if (isLogin) {
            fetch()
        }
    }, [isLogin]);

    const OnLogout = async (event) => {
        event.preventDefault()
        localStorage.clear()
        try {
            await AuthService.logout()
        }
        catch (e) {
            console.log("There's no escape...")
        }
        navigate('/')
    }

    return (
        <header className={styles.container}>
            <section className={styles.contant}>
                <NavLink to="/" className={styles.nav_logo}>
                    <img src={logo} className={styles.logo} alt='' />
                </NavLink>
                <div className={styles.linkContainer}>
                    {!isLogin ? (
                            <div className={styles.navList}>
                                <div className={styles.navItem}>
                                    <Link to={'/login'}>Вход</Link>
                                </div>
                                <div className={styles.navItem}>
                                    <Link to={'/register'}>Регистрация</Link>
                                </div>
                                
                            </div>
                        ) :
                        <span className={styles.sp}>
                            {user?.is_manager &&
                            <div className={styles.navItem}>
                                <Link to={'/transactions'}>Панель управления</Link>
                            </div>}
                            {user?.first_name}
                            <Link to={'/'} onClick={OnLogout}>Выйти</Link>
                        </span>
                    }
                </div>
            </section>
        </header>
    )
}

export {Header}