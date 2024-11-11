// import {
//   Group,
//   ActionIcon,
//   Paper,
//   Loader,
//   Text,
//   Title,
//   Button,
//   Drawer,
//   rem,
//   Avatar,
//   Modal,
//   TextInput,
//   NativeSelect,
//   Radio,
//   Space,
//   Fieldset,
// } from "@mantine/core";
// import { modals } from "@mantine/modals";
// import { useDisclosure } from "@mantine/hooks";
// import { fetchSingleUser } from "@/api/patient/fetchStaff";
// import { useState, useEffect } from "react";
// import { IconPencil, IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
// import { deleteUser } from "@/api/patient/deleteUser";
// import { useRouter } from "next/router";
// import { usersTypes } from "@/schema/users";
// import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

// interface StaffDetailModuleProps {
//   staffID: string;
// }

// export default function StaffDetailModule({ staffID }: StaffDetailModuleProps) {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [user, setUser] = useState<usersTypes | null>();
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     let isMounted = true;
//     async function fetchData() {
//       try {
//         const data = await fetchSingleUser(staffID);
//         console.log(data);
//         isMounted && setUser(data || null);
//       } catch (error) {
//         isMounted && console.error("Error fetching order record:", error);
//       } finally {
//         isMounted && setIsLoading(false);
//       }
//     }

//     fetchData();
//     return () => {
//       isMounted = false;
//     };
//   }, [staffID]);

//   if (isLoading) {
//     return (
//       <div className="min-h-[calc(100vh-112px)] flex items-center justify-center">
//         <Loader color="blue" />
//       </div>
//     );
//   }

//   if (!user) {
//     return <div>Staff does not exist</div>;
//   }

//   const openDeleteModal = () =>
//     modals.openConfirmModal({
//       title: `Delete ${user.name}`,
//       centered: true,
//       children: (
//         <Text size="sm">
//           Are you sure you want to delete this user? This action is destructive
//           and you will have to contact support to restore your data.
//         </Text>
//       ),
//       labels: { confirm: "Delete user", cancel: "Cancel" },
//       confirmProps: { color: "red" },
//       onCancel: () => console.log("Cancel"),
//       onConfirm: () => {
//         deleteUser(user.id);
//         router.push("/staff");
//       },
//     });

//   return (
//     <main className="min-h-[calc(100vh-112px) space-y-5">
//       <Modal
//         opened={opened}
//         onClose={close}
//         overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
//         title="Create Staff"
//         centered
//         closeOnClickOutside={false}
//         size="xl"
//         radius={10}
//       >
//         <div className="flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0">
//           <Paper
//             shadow="xl"
//             radius="lg"
//             withBorder
//             p="xl"
//           >
//             <div className="flex flex-col space-y-5">
//               <div className="flex flex-row">
//                 <div className="ml-5">
//                   <Fieldset legend="Staff information">
//                     <TextInput label="Full Name :" />
//                     <TextInput label="Email :" />
//                     <TextInput label="Staff Id :" />
//                     <TextInput label="Address :" />
//                     <TextInput label="Phone :" />
//                   </Fieldset>
//                 </div>
//                 <div className="ml-5">
//                   <Fieldset legend="Staff Details">
//                     <NativeSelect label="Role:" data={["Admin", "Staff", "Installer"]} />
//                     <TextInput label="Created By :" />
//                     <TextInput label="Update Progress :" />
//                     <Text >Status :</Text>
//                     <Radio.Group name="status">
//                       <Group mt="xs">
//                         <Radio value="active" label="Active" />
//                         <Radio value="inactive" label="Inactive" />
//                       </Group>
//                     </Radio.Group>
//                   </Fieldset>
//                 </div>
//               </div>
//             </div>
//           </Paper>
//           <Paper
//             shadow="xl"
//             radius="lg"
//             withBorder
//             p="xl"
//             className="flex-2 md:w-1/2 space-y-2"
//           >
//             <div className="flex flex-col space-y-5">
//               <div>
//                 <Text size="xl" inline>
//                   Drag images here or click to select files
//                 </Text>
//                 <Text size="sm" c="dimmed" inline mt={7}>
//                   Attach as many files as you like, each file should not
//                   exceed 10mb
//                 </Text>
//               </div> <Dropzone
//                 onDrop={(files) => console.log("accepted files", files)}
//                 onReject={(files) => console.log("rejected files", files)}
//                 maxSize={10 * 1024 ** 2}
//                 accept={IMAGE_MIME_TYPE}
//               >
//                 <Group
//                   justify="center"
//                   gap="xl"
//                   mih={220}
//                   style={{ pointerEvents: "none" }}
//                 >
//                   <Dropzone.Accept>
//                     <IconUpload
//                       style={{
//                         width: rem(52),
//                         height: rem(52),
//                         color: "var(--mantine-color-blue-6)",
//                       }}
//                       stroke={1.5}
//                     />
//                   </Dropzone.Accept>
//                   <Dropzone.Reject>
//                     <IconX
//                       style={{
//                         width: rem(52),
//                         height: rem(52),
//                         color: "var(--mantine-color-red-6)",
//                       }}
//                       stroke={1.5}
//                     />
//                   </Dropzone.Reject>
//                   <Dropzone.Idle>
//                     <IconPhoto
//                       style={{
//                         width: rem(52),
//                         height: rem(52),
//                         color: "var(--mantine-color-dimmed)",
//                       }}
//                       stroke={1.5}
//                     />
//                   </Dropzone.Idle>
//                 </Group>
//               </Dropzone>
//             </div>
//           </Paper>
//         </div>
//         <Space h="md" />
//         <Group gap={20} justify="flex-end">
//           <Button onClick={close} variant="outline" color="red">
//             Cancel
//           </Button>
//           <Button type="submit" justify="flex-end">
//             Save
//           </Button></Group>
//       </Modal>

//       <Title>Staff Information : {user.username}</Title>
//       <Group gap={20} justify="flex-end">
//         <Button leftSection={<IconPencil size={14} />} variant="outline" onClick={open}>Edit</Button>
//         <Button leftSection={<IconTrash size={14} />} variant="outline" color="red" onClick={openDeleteModal}>Detele</Button>
//       </Group>
//       <div className="flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0">
//         <Paper
//           shadow="xl"
//           radius="lg"
//           withBorder
//           p="xl"
//           className="flex-2 md:w-1/2 space-y-5
// "
//         >
//           <div className="flex flex-col">
//             <div className="">
//               <Avatar
//                 radius="md"
//                 src={user.avatar}
//                 name={user.name}
//                 size={200}
//               />
//               <Space h="md" />
//             </div>
//             <div className="flex flex-row">
//               <div className="ml-20">
//                 <Text fw={700}>Full Name :</Text>
//                 <Text fw={500} c="dimmed" >{user.name}</Text>
//                 <Text fw={700}>Email :</Text>
//                 <Text fw={500} c="dimmed"> {user.email}</Text>
//                 <Text fw={700}>Staff Id:</Text>
//                 <Text fw={500} c="dimmed"> {user.id}</Text>
//                 <Text fw={700}>Address :</Text>
//                 <Text fw={500} c="dimmed"> {user.address}</Text>
//                 <Text fw={700}>Phone :</Text>
//                 <Text fw={500} c="dimmed"> {user.phone_number}</Text>
//               </div>
//               <div className="ml-20">
//                 <Text fw={700}>Role : </Text>
//                 <Text fw={500} c="dimmed"> {user.role}</Text>
//                 <Text fw={700}>Created by :</Text>
//                 <Text fw={500} c="dimmed"> {user.created}</Text>
//                 <Text fw={700}>Update Progress:</Text>
//                 <Text fw={500} c="dimmed"> {user.updated}</Text>
//                 <Text fw={700}>Status :</Text>
//                 {user.isActive ? (
//                   <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
//                     <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
//                     <h2 className="text-sm font-normal text-emerald-500">
//                       Active
//                     </h2>
//                   </div>
//                 ) : (
//                   <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
//                     <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
//                     <h2 className="text-sm font-normal text-red-500">
//                       Inactive
//                     </h2>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <Group justify="center">
//           </Group>
//         </Paper>
//         <Paper
//           shadow="xl"
//           radius="lg"
//           withBorder
//           p="xl"
//           className="flex-2 md:w-1/2 space-y-2"
//         >
//           <Title>Oder :</Title>
//         </Paper>
//       </div>
//     </main>
//   );
// }
