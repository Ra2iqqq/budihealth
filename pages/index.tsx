import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PersonStanding,Timer, ZoomIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessagesSquare, Play } from 'lucide-react';
import {
  BarChartHorizontal,
  BatteryCharging,
  CircleHelp,
  Layers,
  WandSparkles,
} from 'lucide-react';


const people = [
  {
    id: 'person-1',
    name: 'Mohd Fadhli',
    role: 'Supervisor',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-2.webp',
  }, 
  {
    id: 'person-2',
    name: 'Siti Norsuraya',
    role: 'Testing',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-3.webp',
  },

  {
    id: 'person-3',
    name: 'Dani Harith',
    role: 'Design',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-1.webp',
  },
  {
    id: 'person-4',
    name: 'Muhammad Raziq',
    role: 'Developer',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-4.webp',
  },
  
];


const subMenuItemsOne = [
  {
    title: 'Blog',
    description: 'The latest industry news, updates, and info',
    icon: <Book className="size-5 shrink-0" />,
  },
  {
    title: 'Compnay',
    description: 'Our mission is to innovate and empower the world',
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: 'Careers',
    description: 'Browse job listing and discover our workspace',
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: 'Support',
    description:
      'Get in touch with our support team or visit our community forums',
    icon: <Zap className="size-5 shrink-0" />,
  },
];

const subMenuItemsTwo = [
  {
    title: 'Help Center',
    description: 'Get all the answers you need right here',
    icon: <Zap className="size-5 shrink-0" />,
  },
  {
    title: 'Contact Us',
    description: 'We are here to help you with any questions you have',
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: 'Status',
    description: 'Check the current status of our services and APIs',
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: 'Terms of Service',
    description: 'Our terms and conditions for using our services',
    icon: <Book className="size-5 shrink-0" />,
  },
];

const reasons = [
  {
    title: 'Questions',
    description:
      'Questions test to know how you feel and provide you with the necessary information about your health.',
    icon: <ZoomIn className="size-6" />,
  },
  {
    title: 'Blog Posts',
    description:
      'Awareness about your health and provide you with the necessary information to make informed decisions about your health.',
    icon: <BarChartHorizontal className="size-6" />,
  },
  {
    title: 'Heart Rate ',
    description:
      'Monitoring your heart rate and provide you with the necessary information to make informed decisions about your health.',
    icon: <Zap className="size-6" />,
  },
  {
    title: 'Helpline',
    description:
      'Provide you recomendations places check out and necessary information to make informed decisions about your health.',
    icon: <CircleHelp className="size-6" />,
  },
  {
    title: 'AI Support',
    description:
      'Your personal assintants to help to make informed decisions about your health.',
    icon: <WandSparkles className="size-6" />,
  },
  {
    title: 'Secured',
    description:
      'Physician and patient data is encrypted and secure.',
    icon: <BatteryCharging className="size-6" />,
  },
];



export default function Home() {
  return (
    <>
    <section className="w-full p-9">
    <div className="w-full">
      <nav className="hidden justify-between lg:flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">BudiHealth</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
            >
              Home
            </a>
            <a
              href="#"
            >
             Questions
            </a>
            <a
              href="#"
            >
              Helpline 
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/login" passHref>
            <Button variant={'outline'}>Log in</Button>
          </Link>
          <Link href="/register" passHref>
            <Button>Sign up</Button>
          </Link>
        </div>
      </nav>
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://www.shadcnblocks.com/images/block/block-1.svg"
              className="w-8"
              alt="logo"
            />
            <span className="text-xl font-bold">Shadcn Blocks</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={'outline'} size={'icon'}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://www.shadcnblocks.com/images/block/block-1.svg"
                      className="w-8"
                      alt="logo"
                    />
                    <span className="text-xl font-bold">Shadcn Blocks</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="my-8 flex flex-col gap-4">
                <a href="#" className="font-semibold">
                  Home
                </a>
                <a href="#" className="font-semibold">
                  Questions
                </a>
                <a href="#" className="font-semibold">
                  Helpline
                </a>
                <div className="mt-2 flex flex-col gap-3">
                  <Button variant={'outline'}>Log in</Button>
                  <Button>Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </section>

    <section className="py-9">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Welcome to BudiHealth
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              BudiHealth is a platform that connects patients with doctors and other healthcare providers. We are dedicated to providing the best healthcare services to our patients.
            </p>
          </div>
          <img
            src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1000/https://www.teamarmadapg.com/wp-content/uploads/2021/08/mental-health-wellness-during-covid-19.jpg"
            alt="placeholder hero"
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>


    <section className="py-9">
      <div className="container mx-auto">
        <p className="mb-4 text-xs text-muted-foreground">Why Us?</p>
        <h2 className="text-3xl font-medium lg:text-4xl">
          A better way to manage your health and wellness online.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <Timer className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
                Efficiency
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
              Helps users monitor their well-being levels and provides them with the necessary information to make informed decisions about their health.
              </p>
            </div>
          </div>
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <Layers className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
              Guidance
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
              Provides personalized recommendations based on user stress level to take control of their health and wellness.
              </p>
            </div>
          </div>
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <PersonStanding className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
                Quality
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
              Generate detailed reports for the Testim software product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-9">
      <div className="container mx-auto">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            Our Services
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-9">
      <div className="container mx-auto flex flex-col items-center text-center">
        <p className="semibold">We&apos;re hiring</p>
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Meet our team
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          We are a team of passionate individuals who are dedicated to providing the best healthcare services to our patients.
        </p>
      </div>
      <div className="container mx-auto mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{person.name}</p>
            <p className="text-center text-muted-foreground">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  );


}

