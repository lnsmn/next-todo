import { prisma } from '@/lib/helpers';
import { TodoItem } from '../TodoItem';
import { auth } from '@clerk/nextjs';


export default async function Page() {
  const {userId} = auth()
  
  const todos = await prisma.todo.findMany({
    where: {
      done: false,
      authorId: userId!,
    }
  });

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl pt-4 font-semibold">Inbox</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo}/>
        ))}
      </ul>
    </div>
  );
}