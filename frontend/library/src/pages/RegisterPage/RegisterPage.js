import {Controller, useForm} from "react-hook-form";
import styles from "./styles.module.css";
import 'primeicons/primeicons.css';
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService/AuthService.js";


const RegisterPage = () => {

    const defaultValues = {
        first_name: '',
        last_name: '',
        login: '',
        password: ''
    };

    const {
        control,
        formState: {errors},
        handleSubmit,
        setError
    } = useForm({defaultValues});

    const [isDisabled, setDisabled] = useState(true)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        
        const body = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.login,
            password: data.password,
            is_manager: false
        }
        setLoading(true)

        try {
            const response = await AuthService.registration(body)

            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            localStorage.setItem('userID', String(response.data.user_id))

            navigate('/login')

        } catch (e) {
            setError('first_name', {
                type: "manual",
                message: e.response.data,
            })
            setError('last_name', {
                type: "manual",
                message: e.response.data,
            })
            setError('login', {
                type: "manual",
                message: String(e.response.data),
            })
            setError('password', {
                type: "manual",
                message: e.response.data,
            })
        }


        setLoading(false)
    };

    // const getFormErrorMessage = (name) => {
    //     // @ts-ignore
    //     return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    // };

    return (
        <>
            <h1>Регистрация</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="first_name"
                    control={control}
                    rules={{required: 'Имя обязательно'}}
                    render={({field, fieldState}) => (
                        <div>
                            <label htmlFor={field.name} className={classNames({'p-error': errors.name})}>Имя</label>
                            <InputText id={field.name} value={field.value} className={classNames({'p-invalid': fieldState.error}, styles.input)} onChange={(e) => field.onChange(e.target.value)}/>
                            {/* {getFormErrorMessage(field.name)} */}
                        </div>
                    )}
                />

                <Controller
                    name="last_name"
                    control={control}
                    rules={{required: 'Фамилия обязательна'}}
                    render={({field, fieldState}) => (
                        <div>
                            <label htmlFor={field.name} className={classNames({'p-error': errors.name})}>Фамилия</label>
                            <InputText id={field.name} value={field.value} className={classNames({'p-invalid': fieldState.error}, styles.input)} onChange={(e) => field.onChange(e.target.value)}/>
                            {/* {getFormErrorMessage(field.name)} */}
                        </div>
                    )}
                />

                <Controller
                    name="login"
                    control={control}
                    rules={{required: 'Логин обязателен'}}
                    render={({field, fieldState}) => (
                        <div>
                            <label htmlFor={field.name} className={classNames({'p-error': errors.login})}>Адрес электронной почты</label>
                            <InputText id={field.name} value={field.value} className={classNames({'p-invalid': fieldState.error}, styles.input)} onChange={(e) => field.onChange(e.target.value)}/>
                            {/* {getFormErrorMessage(field.name)} */}
                        </div>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{required: 'Пароль обязателен'}}
                    render={({field, fieldState}) => (
                        <div>
                            <label htmlFor={field.name} className={classNames({'p-error': errors.password})}>Пароль</label>
                            <Password feedback={false} id={field.name} value={field.value} className={classNames({'p-invalid': fieldState.error}, styles.input)} onChange={(e) => field.onChange(e.target.value)}/>
                            {/* {getFormErrorMessage(field.name)} */}
                        </div>
                    )}
                />

                <div className={styles.checkbox}>
                    <label htmlFor='UserPolicy' className={classNames({'p-error': errors.userPolice}, styles.labelCheckbox)}>
                        <input type="checkbox" id='UserPolicy' onChange={(e) => {
                            setDisabled(!e.target.checked)
                        }}/>
                        Пользовательское соглашение
                    </label>
                </div>

                <Button type="submit" icon="pi" severity="secondary" disabled={isDisabled} className={styles.btn}>
                    {loading ? <i className="pi pi-spin pi-spinner" style={{fontSize: '1rem'}}></i> : 'Зарегистрироваться'}
                </Button>
            </form>
        </>
    )
}

export {RegisterPage}