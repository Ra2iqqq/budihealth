import {
  Button,
  Table,
  Avatar,
  Modal,
  Loader,
  TextInput,
  NativeSelect,
  Text,
  Pagination,
  Paper,
  Radio,
  Group,
  rem,
  Space,
  Fieldset
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { fetchUsers, createUser } from "@/api/patient/fetchStaff";
import { usersTypes } from "@/schema/users";
import { format, parseISO } from "date-fns";
import { modals } from "@mantine/modals";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

export default function OrderModule() {
  const router = useRouter();
  const [staffs, setStaffs] = useState<usersTypes[]>();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const data = await fetchUsers(currentPage, itemsPerPage, role);
        if (data && isMounted) {
          setStaffs(data.items);
          setTotalPage(data.totalPages);
          setTotalItems(data.totalItems)
        }
      } catch (error) {
        isMounted && console.error("Error fetching staff records:", error);
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [currentPage, role]);

  const rows = staffs?.map((row) => (
    <Table.Tr
      key={row.id}
      onClick={() => {
        router.push("/staff/" + row.id);
      }}
      className="cursor-pointer"
    >
      <Table.Td>
        <Avatar src={row.avatar} name={row.name} size="lg" />
      </Table.Td>
      <Table.Td>{row.username}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>{row.isActive ? <h1>Active</h1> : <h1>InActive</h1>}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center">
        <Loader color="blue" />
      </div>
    );
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });


  return (
    <main className="min-h-[calc(100vh-112px) space-y-5">
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        title="Edit Staff"
        centered
        closeOnClickOutside={false}
        size="xl"
        radius={10}
      >
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0">
        <Paper shadow="xl" radius="lg" withBorder p="xl" className="flex-2 md:w-1/2 space-y-2">
              <div className="flex flex-col space-y-5">
                <Fieldset legend="Personal Information">
                  <TextInput label="Title" name="inTitle" required />
                  <TextInput label="Name" name="inName" required />
                  <TextInput label="Password" name="inPassword" type="password" required />
                  <TextInput label="Confirm Password" name="inPasswordConfirm" type="password" required />
                  <TextInput label="Role" name="inRole" required />
                </Fieldset>
              </div>
            </Paper>
          <Paper
            shadow="xl"
            radius="lg"
            withBorder
            p="xl"
            className="flex-2 md:w-1/2 space-y-2"
          >
            <div className="flex flex-col space-y-5">
              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not
                  exceed 10mb
                </Text>
              </div> <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={10 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group
                  justify="center"
                  gap="xl"
                  mih={220}
                  style={{ pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-blue-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-red-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-dimmed)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                </Group>
              </Dropzone>
            </div>
          </Paper>
        </div>
        <Space h="md" />
        <Group gap={20} justify="flex-end">
          <Button onClick={close} variant="outline" color="red">
            Cancel
          </Button>
          <Button type="submit" justify="flex-end">
            Save
          </Button></Group>
      </Modal>

      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex gap-x-3 items-center">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              ALL USERS
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {totalItems} Users
            </span>
            <h3>Role :</h3>
            <NativeSelect
              value={role}
              onChange={(e) => setRole(e.currentTarget.value)}
              data={[
                { label: "All", value: "" },
                { label: "Patient", value: "user" },
                { label: "Admin", value: "admin" },
              ]}
              className="w-fit"
            />
          </div>
          <Button onClick={open}>Create</Button>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>

                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="0.3"
                            />
                          </svg>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Role</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </button>
                      </th>

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {staffs?.map((staff) => (
                      <tr key={staff.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <Avatar
                                src={staff.avatar}
                                name={staff.name}
                                size="md"
                              />
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {staff.name}
                                </h2>
                                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                  {staff.username}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {staff.isActive ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              <h2 className="text-sm font-normal text-emerald-500">
                                Active
                              </h2>
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                              <h2 className="text-sm font-normal text-red-500">
                                Inactive
                              </h2>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {Array.isArray(staff.role) ? staff.role.join(', ') : staff.role}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button onClick={openDeleteModal} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" title="Delete">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>

                            <button onClick={() => router.push("/staff/" + staff.id)} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none" title="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
  );
}
