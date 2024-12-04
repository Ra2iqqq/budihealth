import { Button, Modal, Loader, TextInput, NativeSelect, Pagination, Alert } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { format, parseISO } from 'date-fns';
import { ordersTypes } from '@/schema/orders';
import createClient from '@/utils/pocketbase/api';
import { quizsTypes } from '@/schema/quizs';

export default function QuestuinaireModule() {
    const pb = createClient();
    const [topics, setTopics] = useState<quizsTypes[]>();
    const userRole = pb.authStore.model?.role;
    const router = useRouter();
    const [orders, setOrders] = useState<ordersTypes[]>();
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const fetchQuizs = async () => {
        try {
            const records = await pb.collection('quizs').getFullList<quizsTypes>({
                sort: '-created',
            });

            if (records) {
                setTopics(records)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchQuizs()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    if (isLoading) {
        return <div className="min-h-[calc(100vh-112px)] flex items-center justify-center"><Loader color="blue" /></div>;
    }

    return (
        <main className="min-h-[calc(100vh-112px) space-y-5">
            <Modal
                opened={opened}
                onClose={close}
                title="Create order"
                overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
                centered
                closeOnClickOutside={false}
            >
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <TextInput
                        required
                        label="Client name"
                        placeholder="Input placeholder"
                        name='client_name'
                    />
                    <TextInput
                        required
                        label="address"
                        placeholder="Input placeholder"
                        name='client_address'
                    />
                    <NativeSelect
                        required
                        label="Type"
                        data={[
                            { label: 'Measurement', value: '1' },
                            { label: 'NonMeasurement', value: '2' }
                        ]}
                        name='order_type'
                    />
                    <NativeSelect
                        required
                        label="Installation type"
                        data={[
                            { label: 'Installation', value: 'installation' },
                            { label: 'Pick up', value: 'pick up' },
                            { label: 'Postage', value: 'postage' },
                        ]}
                        name='installation_type'
                    />
                    <NativeSelect
                        required
                        label="Client source"
                        data={[
                            { label: 'Media social', value: 'social media' },
                            { label: 'Whatsapp', value: 'whatsapp' },
                            { label: 'Youtube', value: 'youtube' },
                            { label: 'Website', value: 'website' },
                            { label: 'Panggilan Telefon', value: 'phone call' },
                            { label: 'Others', value: 'others' }
                        ]}
                        name='client_source'
                    />
                    {errorMsg && <Alert variant="filled" color="red" title="Error message">{errorMsg}</Alert>}
                    <Button type='submit'>Create</Button>
                </form>
            </Modal>

            <section className="container px-4 mx-auto">
                <div className="flex items-center justify-between gap-x-3">
                    <div className='flex gap-x-3 items-center'>
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            Orders
                        </h2>


                    </div>
                    {userRole === 'admin' && <Button onClick={() => { setErrorMsg(null); open() }}>Create new order</Button>}
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Topics</span>
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {topics?.map((topic, index) =>
                                            <tr key={index} className='cursor-pointer hover:bg-slate-50' onClick={() => router.push(`/questuionnaire/${topic.id}`)}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>{topic.title}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'PPP');
};
