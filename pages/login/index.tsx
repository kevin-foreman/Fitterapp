import LoginForm from "../../components/LoginForm"
import { SyntheticEvent } from "react";
import { useState } from "react";
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN } from '../api/mutations'
import { userProfileAtom } from '../../lib/globalAtoms'
import { useSetAtom } from 'jotai'
import Router from "next/router";
import Layout from "../../components/layouts/article";
import { GetServerSideProps } from "next";
import { LOGIN_REDIRECT } from "../api/queries";
import initializeApollo from "../../apollo/client";

const Login = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, loading }] = useMutation(LOGIN);
    const setUserProfile = useSetAtom(userProfileAtom)
    const client = useApolloClient()

    const handleFormSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!formState.username || !formState.password) return

        try {
            const { data } = await login({
                variables: {
                    username: formState.username,
                    password: formState.password
                },
            });

            if (data.login) {
                await client.resetStore()
                setUserProfile(data.login)
                Router.push('/')
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event: any) => {
        const userInput = event.target.value
        const fieldType = event.target.dataset.input

        setFormState({
            ...formState,
            [fieldType]: userInput,
        });
    };

    return (
        <Layout>
            <LoginForm
                handleChange={handleChange}
                error={error}
                handleFormSubmit={handleFormSubmit}
                loading={loading}
            />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo(context)

    try {
        await client.query({
            query: LOGIN_REDIRECT,
        })

        return {
            props: {
                initialApolloState: client.cache.extract()
            }
        }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
}

export default Login