import { posts } from './data.index';
import { ArrowRight } from 'lucide-react';
import {Modal, Paper, TextInput, Fieldset, Loader, Group, Space, Text } from "@mantine/core";
import { Button } from '@/components/ui/button';
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import {useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { usersTypes } from "@/schema/users";
import createClient from '@/utils/pocketbase/api';

export default function OrderModule() {
  const pb = createClient();
  const userRole = pb.authStore.model?.role;  
  const [opened, setOpened] = useState(false);

  return (
    <>
<Modal
        opened={opened}
        onClose={() => setOpened(false)}
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

            <Paper shadow="xl" radius="lg" withBorder p="xl" className="flex-2 md:w-1/2 space-y-2">
              <div className="flex flex-col space-y-5">
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 10mb
                </Text>
                <Dropzone
                  onDrop={(files) => console.log("accepted files", files)}
                  onReject={(files) => console.log("rejected files", files)}
                  maxSize={10 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                    <Dropzone.Accept>
                      <IconUpload style={{ width: "52px", height: "52px", color: "#3b82f6" }} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX style={{ width: "52px", height: "52px", color: "#f87171" }} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto style={{ width: "52px", height: "52px", color: "#6b7280" }} stroke={1.5} />
                    </Dropzone.Idle>
                  </Group>
                </Dropzone>
              </div>
            </Paper>
          </div>

          <Space h="md" />
          <Group gap={20} justify="flex-end">
            <Button onClick={() => setOpened(false)} variant="outline" color="red">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
      </Modal>

      <section className="pt-5">
        <div className="container flex flex-col items-center gap-6 lg:px-16">
          <div className="text-center">
            <p className="mb-6 text-xs font-medium uppercase tracking-wider">
              Spread Awareness
            </p>
            <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              Blog Posts
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              Mental health refers to our emotional, psychological, and social well-being. It affects how we think, feel, and behave in daily life, influencing how we handle stress, relate to others, and make decisions. Taking care of mental health is just as important as physical health, as it helps us maintain balance and resilience.
            </p>
            <Button variant="link" className="w-full sm:w-auto">
              Explore all posts
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          {userRole === 'admin' && <Button className='ml-auto' onClick={() => setOpened(true)}>Add article</Button>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.href}
                className="flex flex-col text-clip rounded-xl border border-border"
              >
                <div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/9] size-full object-cover object-center"
                  />
                </div>
                <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                  <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                    {post.title}
                  </h3>
                  <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                    {post.summary}
                  </p>
                  <p className="flex items-center hover:underline">
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}