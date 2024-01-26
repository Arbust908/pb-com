const TPerson = 'john'
type typePerson = typeof TPerson;

const obj = {
    name: 'john',
    age: 30
}
type typeObj = typeof obj;
type typeObjKeys = keyof typeof obj;

const func = () => {
    const val = '000';

    return val;
}

type Return = ReturnType<typeof func>;
const asyncFunc = async () => {
    const val = '000';

    return val;
}

type Return2 = Awaited<ReturnType<typeof asyncFunc>>;

interface MainType {
    name: string;
    age: number;
}

type NestedType = MainType & {
    isDev: boolean;
}

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

type idk = Prettify<NestedType>;

interface Todo {
    title: string;
    description: string;
    completed: boolean;
    updated?: number;
}

const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
    return { ...todo, ...fieldsToUpdate };
}

const forceFullUpdate = (todo: Todo, fieldsToUpdate: Required<Todo>) => {
    return { ...todo, ...fieldsToUpdate };
}

const updateWithoutDescription = (todo: Todo, fields: Omit<Todo, 'description'>) => {
    return { ...todo, ...fields };
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
    completed: false,
};

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
})

const todo3 = forceFullUpdate(todo1, {
    title: 'organize desk',
    description: 'throw out trash',
    completed: true,
    updated: 123456789,
})

const todo4 = updateWithoutDescription(todo1, {
    title: 'organize desk',
    completed: true,
})

type Shapes = {
    kind: 'circle';
    radius: number;
} | {
    kind: 'square';
    sideLength: number;
} | {
    kind: 'triangle';
    sideLength: number;
}

// type Omitted = Omit<Shapes, {kind: 'circle}>;
type noCircle = Exclude<Shapes, { kind: 'circle' }>;

type Props = {
    name: string
  } & (
    | {
        gender: 'male'
        age: number
      }
    | {
        gender: 'female'
        salary: number
      }
  )