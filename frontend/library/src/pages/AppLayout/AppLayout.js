import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header/Header.js";
import {Footer} from "../../components/Footer/Footer.js";
import styles from './styles.module.css'
import {createContext, useEffect, useState} from "react";
import {AuthService} from "../../services/AuthService/AuthService.js";
import wallpaper from '../../assets/bookshelf2x.png';
import "primereact/resources/themes/saga-orange/theme.css";


export const AppContext = createContext(null)
const AppLayout = () => {
    // const path = useLocation()
    const [user, setUser] = useState()

    async function checkLoginStatus(){
        try {
          const access_response = await AuthService.check()
          setUser(access_response.data)
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
    
      useEffect(() => {
        checkLoginStatus()
      }, [])

    // if (!localStorage.getItem("access_token") && path.pathname === '/') {
    //     return <Navigate to={'/login'}/>
    // }

    // if (localStorage.getItem("access_token") && ['/login', '/register'].includes(path.pathname)) {
    //     return <Navigate to={'/'}/>
    // }

    return (
        <AppContext.Provider value={{
            user
        }}>
            <div>
                <Header/>
                <div className={styles.background}>
                  <img src={wallpaper} className={styles.wallpaper} alt='' />
                </div>
                <div className={styles.content}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </AppContext.Provider>

    )
}

export {AppLayout}