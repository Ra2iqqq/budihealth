import { AppShell, Burger, Group, Divider, NavLink, Avatar, Button, ActionIcon } from '@mantine/core';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { readRole, readName, readAvatar, logout } from '@/authentication/session';
import { IconLogout2, IconStack2, IconClipboardData } from '@tabler/icons-react';
import { useDashboard } from './DashboardContext';
import { AudioLines, Headset, HeartPulse } from 'lucide-react';

interface DashboardProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardProps) {
    const router = useRouter();
    const sessionRole = readRole();
    const sessionName = readName();
    const { desktopOpened, toggleDesktop } = useDashboard();

    const navLink = [
        {
            href: "/questuionnaire",
            title: "Questuionnaire",
            logo: <IconStack2 />,
            role: ['admin', 'user',]
        },
        {
            href: "/heartrate",
            title: "Heart Rate",
            logo: <HeartPulse />,
            role: ['user',]
        },
        {
            href: "/blog",
            title: "Blog",
            logo: <IconClipboardData />,
            role: ['admin', 'user',]
        },
        {
            href: "/helpline",
            title: "Helpline",
            logo: <Headset />,
            role: ['admin', 'user',]
        },
        {
            href: "/ai",
            title: "AI Support",
            logo: <AudioLines />,
            role: ['user',]
        },

    ]

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        <h1>Budi Health</h1>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <div className="flex flex-col h-full">
                        <div className='flex-grow'>
                            {navLink.map((nav, index) => (
                                // nav.role.includes(sessionRole) && (
                                <NavLink
                                    key={index}
                                    label={nav.title}
                                    leftSection={nav.logo}
                                    onClick={() => { router.push(nav.href) }}
                                />
                                // )
                            ))}
                        </div>
                        <Divider my="md" />
                        <div className='mt-auto px-5 flex flex-row items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <Avatar src={readAvatar()} name={readName()} size="md" radius="xl" />
                                <h1>{sessionName}</h1>
                            </div>
                            <ActionIcon variant='default' size={37} onClick={() => { logout(); router.push("/") }}>
                                <IconLogout2 size={25} />
                            </ActionIcon>
                        </div>
                    </div>
                </AppShell.Navbar>
                <AppShell.Main className='min-w-fit'>{children}</AppShell.Main>
            </AppShell>

        </>
    )
}