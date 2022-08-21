import Navbar from '../navbar'
import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import Auth from '../../utils/clientAuth'
import { loggedInAtom } from '../../utils/globalAtoms'

const Main = ({ children }: React.PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom)

    useEffect(() => {
        // @ts-ignore
        setLoggedIn(Auth.loggedIn())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    return (
        <Box>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {loggedIn ?
                    <Navbar /> : null
                }
                {children}
            </main>
        </Box>
    )
}

export default Main