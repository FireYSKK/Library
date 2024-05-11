import styles from './styles.module.css'
import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}

export {AuthLayout}