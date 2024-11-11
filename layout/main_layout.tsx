interface mainLayout {
    title: any;
    children: React.ReactNode;
}

export function MainLayout({ title, children }: mainLayout) {
    return (
        <>
            <title>{title}</title>
            {children}
        </>
    )
}