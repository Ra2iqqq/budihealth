import { Button, Modal, Loader, TextInput, NativeSelect, Pagination, Alert } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { fetchOrders } from '@/api/order/fetchOrders';
import { format, parseISO } from 'date-fns';
import { CreateOrderInterface, createOrder } from '@/api/order/createOrder';
import { ordersTypes } from '@/schema/orders';
import { readId, readRole } from '@/authentication/session';

export default function QuestuinaireModule() {
    const router = useRouter();
    const [orders, setOrders] = useState<ordersTypes[]>();
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const itemsPerPage = 7;

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const data = await fetchOrders(currentPage, itemsPerPage, readId(), readRole());
                if (data && isMounted) {
                    setOrders(data.items);
                    setTotalPage(data.totalPages);
                    setTotalItems(data.totalItems);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching bidai records:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchData();
        return () => { isMounted = false; }
    }, [currentPage])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: CreateOrderInterface = {
            client_name: e.currentTarget.client_name.value,
            client_address: e.currentTarget.client_address.value,
            installation_type: e.currentTarget.installation_type.value,
            order_type: parseInt(e.currentTarget.order_type.value),
            client_source: e.currentTarget.client_source.value,
        };

        try {
            const newOrder = await createOrder(formData);
            if (newOrder) {
                router.push("/order/" + newOrder.id);
                setErrorMsg(null);
            } else {
                console.error("Failed to create order");
                setErrorMsg("Failed to create order");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            setErrorMsg("Error creating order");
        }
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

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                            {totalItems} orders
                        </span>
                    </div>
                    <Button onClick={() => { setErrorMsg(null); open() }}>Create new order</Button>
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
                                                        <span>Order ID</span>

                                                        <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Created at
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Payment status
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Client name
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Order status
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Created by
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {orders?.map((row) =>
                                            <tr key={row.id} onClick={() => router.push("/order/" + row.id)} className='cursor-pointer hover:bg-slate-50'>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>{row.id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{formatDate(row.created)}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {(() => {
                                                        switch (row.payment_status) {
                                                            case 'unpaid':
                                                                return (
                                                                    <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>

                                                                        <h2 className="text-sm font-normal">Unpaid</h2>
                                                                    </div>
                                                                );
                                                            case 'advance payment':
                                                                return (
                                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-orange-500 bg-orange-100/60 dark:bg-gray-800">
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>

                                                                        <h2 className="text-sm font-normal">Advance payment</h2>
                                                                    </div>
                                                                );
                                                            case 'full payment':
                                                                return (
                                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>

                                                                        <h2 className="text-sm font-normal">Full payment</h2>
                                                                    </div>
                                                                );
                                                            case 'refunded':
                                                                return (
                                                                    <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>

                                                                        <h2 className="text-sm font-normal">Refunded</h2>
                                                                    </div>
                                                                );
                                                            default:
                                                                return null;
                                                        }
                                                    })()}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                        <div>
                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{row.client_name}</h2>
                                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{row.client_address}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{row.expand?.created_by.name}</h2>
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

                <div className="flex items-center justify-center mt-6">
                    <div className="items-center md:flex gap-x-3">
                        <Pagination
                            total={totalPage}
                            value={currentPage}
                            onChange={setCurrentPage}
                        />
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
