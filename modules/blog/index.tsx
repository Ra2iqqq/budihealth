import { BarChart } from '@mantine/charts';
import { posts} from './data.index';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function BlogModule() {
  return (
    <>
     <section className="py-32">
      <div className="container flex flex-col items-center gap-16 lg:px-16">
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