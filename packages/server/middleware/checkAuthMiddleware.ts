import { NextFunction, Request, Response } from 'express'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const URL = 'https://ya-praktikum.tech'

export const proxyMiddleware = () =>
    createProxyMiddleware({
        target: URL,
        changeOrigin: true,
        cookieDomainRewrite: { '*': '' },
        onError: error => {
            console.log('Error proxyMiddleware', error);
        },
        onProxyReq: fixRequestBody,
    })

export const checkAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cookies = req.cookies
        if (cookies) {
            const yandexAuth = await fetch(`${URL}/api/v2/auth/user`, {
                headers: { Cookie: `cookies=${cookies}`, },
                credentials: 'include',
            })
            if (yandexAuth.status >= 400) {
                throw new Error('Error at server auth')
            }
            next()
        }
    } catch (error) {
        res.redirect('/')
        next(error)
    }
}
