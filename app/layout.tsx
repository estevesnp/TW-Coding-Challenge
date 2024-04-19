import './styles.css'


export const metadata = {
    title: 'Crypto Tracker',
    description: 'Real Time Crypto Tracker',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
