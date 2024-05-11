import React from "react";
import styles from "./styles.module.css"
 
const Footer = () => {
    return (
        <div className={styles.footer__box}>
            <div className={styles.footer__container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className={styles.heading}>О Нас</p>
                        <a className={styles.footer__link} href="./">
                            Lorem 
                        </a>
                        <a className={styles.footer__link} href="./">
                            ipsum 
                        </a>
                        <a className={styles.footer__link} href="./">
                            dolor 
                        </a>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.heading}>Услуги</p>
                        <a className={styles.footer__link} href="./">
                            sit 
                        </a>
                        <a className={styles.footer__link} href="./">
                            amet
                        </a>
                        <a className={styles.footer__link} href="./">
                            consectetur 
                        </a>
                        <a className={styles.footer__link} href="./">
                            adipiscing 
                        </a>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.heading}>Контакты</p>
                        <a className={styles.footer__link} href="./">
                            elit
                        </a>
                        <a className={styles.footer__link} href="./">
                            Ut 
                        </a>
                        <a className={styles.footer__link} href="./">
                            mattis 
                        </a>
                        <a className={styles.footer__link} href="./">
                            cursus 
                        </a>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.heading}>Медиа</p>
                        <a className={styles.footer__link} href="./">
                            quam 
                        </a>
                        <a className={styles.footer__link} href="./">
                            eleifend
                        </a>
                        <a className={styles.footer__link} href="./">
                            Nullam 
                        </a>
                        <a className={styles.footer__link} href="./">
                            bibendum
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Footer}